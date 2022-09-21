import {ContentClient, ContentItem, ContentReference} from 'dc-delivery-sdk-js'
import {chunk, flatten, intersection, compact} from 'lodash'
import {app} from '../../config/default'
import {EnrichTarget, isContentReference, enrichContent, isPersonalized} from './enrich'

export type IdOrKey = {id: string} | {key: string}
export type FilterType = ((item: any) => boolean) | undefined

export type Variant = {
    segment: String[];
    content: ContentReference[];
}

export type PersonalisedContent = {
    defaultContent: ContentItem;
    maxNumberMatches: number;
    variants: Variant[];
}

export type FetchParams = {
    locale?: string;
    depth?: 'all' | 'root';
    format?: 'inlined';
    client?: ContentClient;
}

const isTimeMachineVse = (vse: string): boolean => {
    if (vse == null || vse.length === 0) {
        return false
    }

    const dotSplit = vse.split('.')
    const dashSplit = dotSplit[0].split('-')

    return dashSplit.length > 1
}

const clearTimeMachine = (vse: string): string => {
    const dotSplit = vse.split('.')
    const dashSplit = dotSplit[0].split('-')

    return [dashSplit[0], ...dotSplit.slice(1)].join('.')
}

export class AmplienceAPI {
    client: ContentClient
    hierarchyClient: ContentClient
    vse: string

    clientReady: Promise<void>
    clientReadyResolve

    constructor() {
        this.clientReady = new Promise((resolve) => (this.clientReadyResolve = resolve))
        this.client = new ContentClient({hubName: app.amplience.hub})
        this.hierarchyClient = this.client
    }

    setVse(vse) {
        if (this.vse != vse) {
            this.client = new ContentClient({
                hubName: app.amplience.hub,
                stagingEnvironment: vse
            })

            if (isTimeMachineVse(vse)) {
                this.hierarchyClient = new ContentClient({
                    hubName: app.amplience.hub,
                    stagingEnvironment: clearTimeMachine(vse)
                })
            } else {
                this.hierarchyClient = this.client
            }

            this.vse = vse
        }

        this.clientReadyResolve()
    }

    async fetchContent(args: IdOrKey[], params: FetchParams = {}) {
        await this.clientReady

        if (params && !params.locale) {
            params.locale = 'en-US'
        }

        const client = params?.client ?? this.client

        delete params.client
        const chunks = chunk(args, 12)

        let responses = await Promise.all(
            chunks.map(async (arg) => (await client.getContentItems(arg, params)).responses)
        )

        return flatten(responses).map((response) => {
            if ('content' in response) {
                return response.content
            }
            return response.error
        })
    }

    async getChildren(parent: any, filter: FilterType) {
        const id = parent._meta.deliveryId

        // TODO: pagination, rate limit
        const result = await this.hierarchyClient
            .filterByParentId(id)
            .sortBy('default', 'ASC')
            .request({
                format: 'inlined',
                depth: 'all'
            })

        const items = result.responses
            .map((response) => response.content)
            .filter((response) => response != null && (!filter || filter(response)))

        if (items.length > 0) {
            parent.children = items
        }

        await Promise.all(items.map((item) => this.getChildren(item, filter)))
    }

    async enrichReferenceDeliveryKeysInternal(targets: EnrichTarget[], locale: string) {
        const ids = new Set<string>(targets.map((target) => target.item.id))

        if (ids.size > 0) {
            const items = await this.fetchContent(
                Array.from(ids).map((id) => ({
                    id
                })),
                {
                    locale,
                    depth: 'root',
                    client: this.hierarchyClient
                }
            )

            for (let item of items) {
                const key = item._meta.deliveryKey
                if (key) {
                    targets
                        .filter((target) => target.item.id === item._meta.deliveryId)
                        .forEach((target) => (target.item.deliveryKey = key))
                }
            }
        }
    }

    async getVariantsContent({
                                 variants,
                                 maxNumberMatches = 1,
                                 matchMode = 'Any',
                                 defaultContent
                             }: PersonalisedContent, params) {
        const customerGroups = ['Everyone'] //todo change
        let allContent = []

        const matches = compact(variants.map(async (arg: Variant) => {
            const similar = intersection(arg.segment, customerGroups)
            if (similar && ((matchMode === 'All' && similar.length < arg.segment.length) || (matchMode === 'Any' && !similar.length))) {
                return null
            }
            return arg;
        }))

        let responses = await Promise.all(matches.slice(0, maxNumberMatches).map(async (arg: Variant) => {
            const content = await (await this.client.getContentItems(arg.content.map(({id}) => ({id})), params)).responses
            const mappedContent: any = content.map((response) => {
                if ('content' in response) {
                    return response.content
                }
                return response.error
            })
            allContent = allContent.concat(mappedContent)

            return {
                ...arg,
                content: mappedContent
            }
        }))

        return {
            variants: responses,
            content: allContent
        }
    }

    async enrichVariantsInternal(targets: EnrichTarget[], locale: string) {
        for (let target of targets) {
            const item = target.item
            Object.assign(item, await this.getVariantsContent(item, {locale}))
        }
    }

    async enrichVariants(item: any, locale = 'en-US') {
        await enrichContent(item, [
            {
                trigger: isPersonalized,
                enrich: (targets: EnrichTarget[]) => this.enrichVariantsInternal(targets, locale)
            }
        ])
    }

    async enrichReferenceDeliveryKeys(item: any, locale = 'en-US') {
        await enrichContent(item, [
            {
                trigger: isContentReference,
                enrich: (targets: EnrichTarget[]) =>
                    this.enrichReferenceDeliveryKeysInternal(targets, locale)
            }
        ])
    }

    async fetchHierarchy(parent: IdOrKey, filter: FilterType, locale = 'en-US') {
        await this.clientReady

        const root = (await this.fetchContent([parent], {locale, client: this.hierarchyClient}))[0]

        await this.getChildren(root, filter)

        await this.enrichReferenceDeliveryKeys(root, locale)

        return root
    }

    async fetchHierarchyRootFromChild(childId: string, locale = 'en-US') {
        await this.clientReady

        let root: any = undefined

        do {
            root = (
                await this.fetchContent([{id: childId}], {locale, client: this.hierarchyClient})
            )[0]

            childId = root._meta.hierarchy?.parentId
        } while (childId != null)

        return root
    }
}

export const defaultAmpClient = new AmplienceAPI()
