import {ContentClient, ContentReference} from 'dc-delivery-sdk-js'
import {chunk, flatten, intersection, compact} from 'lodash'
import {app} from '../../config/default'
import {
    EnrichTarget,
    isContentReference,
    enrichContent,
    isPersonalised,
    EnrichStrategy
} from './enrich'

export type IdOrKey = {id: string} | {key: string}
export type FilterType = ((item: any) => boolean) | undefined

export type Variant = {
    segment: String[];
    content: ContentReference[];
    matchMode: 'Any' | 'All';
}

export type PersonalisedContent = {
    defaultContent: any[];
    maxNumberMatches: number;
    variants: Variant[];
}

export type FetchParams = {
    locale?: string;
    depth?: 'all' | 'root';
    format?: 'inlined';
    client?: ContentClient;
    personalised?: boolean;
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

const defaultParams: FetchParams = {
    personalised: true
}

const addDefaultParams = (params: FetchParams = {}): FetchParams => {
    if (params) {
        return {
            ...defaultParams,
            locale: 'en-US',
            ...params
        }
    } else {
        return {
            ...defaultParams
        }
    }
}

const getClientParams = (params: FetchParams): FetchParams => {
    const result: FetchParams = {}

    if (params.locale != null) result.locale = params.locale
    if (params.depth != null) result.depth = params.depth
    if (params.format != null) result.format = params.format

    return result
}

export class AmplienceAPI {
    client: ContentClient
    hierarchyClient: ContentClient
    vse: string
    groups: string[]

    clientReady: Promise<void>
    clientReadyResolve

    constructor() {
        this.clientReady = new Promise((resolve) => (this.clientReadyResolve = resolve))
        this.client = new ContentClient({hubName: app.amplience.hub})
        this.hierarchyClient = this.client
    }

    setGroups(groups) {
        this.groups = groups
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

        params = addDefaultParams(params)

        const client = params?.client ?? this.client
        const chunks = chunk(args, 12)

        let responses = await Promise.all(
            chunks.map(
                async (arg: IdOrKey[]) =>
                    (await client.getContentItems(arg, getClientParams(params))).responses
            )
        )

        const items = flatten(responses).map((response) => {
            if ('content' in response) {
                return response.content
            }
            return response.error
        })

        await this.defaultEnrich(items, params)

        return items
    }

    async defaultEnrich(items: any[], params: FetchParams = {}) {
        params = addDefaultParams(params)

        const strategies: EnrichStrategy[] = []

        if (params.personalised) {
            strategies.push(this.enrichVariantsStrategy(params.locale))
        }

        for (let item of items) {
            await enrichContent(item, strategies)
        }
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

    async getVariantsContent(props: PersonalisedContent, params) {
        const {variants, maxNumberMatches = 1, defaultContent} = props
        let allContent: any[] = []

        const matches = compact(
            variants.map((arg: Variant) => {
                const similar = intersection(arg.segment, this.groups)
                if (
                    arg.matchMode == 'Any'
                        ? similar.length == 0
                        : similar.length < arg.segment.length
                ) {
                    return null
                }
                return arg
            })
        )

        let responses = await Promise.all(
            matches.slice(0, maxNumberMatches).map(async (arg: Variant) => {
                const ids = compact(arg.content.map(({id}) => id && {id}))
                if (!ids || !ids.length) {
                    allContent = [...allContent, ...arg.content]
                    return Promise.resolve(arg)
                }

                const content = (await this.client.getContentItems(ids, params)).responses
                const mappedContent: any = content.map((response) => {
                    if ('content' in response) {
                        return response.content
                    }
                    return response.error
                })
                allContent = [...allContent, ...mappedContent]

                return {
                    ...arg,
                    content: mappedContent
                }
            })
        )

        if (allContent.length === 0) {
            allContent = [...defaultContent]
        }

        return {
            ...props,
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

    enrichVariantsStrategy(locale = 'en-US') {
        return {
            trigger: isPersonalised,
            enrich: (targets: EnrichTarget[]) => this.enrichVariantsInternal(targets, locale)
        }
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
