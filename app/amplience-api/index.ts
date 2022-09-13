import {ContentClient} from 'dc-delivery-sdk-js'
import {chunk, flatten} from 'lodash'
import {app} from '../../config/default'

export type IdOrKey = {id: string} | {key: string}
export type FilterType = ((item: any) => boolean) | undefined

export type FetchParams = {
    locale?: string;
    depth?: 'all' | 'root';
    format?: 'inlined';
    client?: ContentClient;
}

const referenceTypes = [
    'http://bigcontent.io/cms/schema/v1/core#/definitions/content-link',
    'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference'
]

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

        let responses = await Promise.all(chunks.map(async (arg) => (await client.getContentItems(arg, params)).responses))

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

    getReferences(item: any, refs: Map<string, any>) {
        if (Array.isArray(item)) {
            item.forEach((contained) => {
                this.getReferences(contained, refs)
            })
        } else if (item != null && typeof item === 'object') {
            const allPropertyNames = Object.getOwnPropertyNames(item)
            // Does this object match the pattern expected for a content item or reference?
            if (
                item._meta &&
                referenceTypes.indexOf(item._meta.schema) !== -1 &&
                typeof item.contentType === 'string' &&
                typeof item.id === 'string'
            ) {
                if (!refs.get(item.id)) {
                    refs.set(item.id, [])
                }
                refs.set(item.id, [...refs.get(item.id), item])
                return
            }

            allPropertyNames.forEach((propName) => {
                const prop = item[propName]
                if (typeof prop === 'object') {
                    this.getReferences(prop, refs)
                }
            })
        }
    }

    async enrichReferenceDeliveryKeys(item: any, locale = 'en-US') {
        const refs = new Map<string, any>()

        this.getReferences(item, refs)

        const ids = Array.from(refs.keys()).map((id) => ({id}))

        if (ids.length > 0) {
            const items = await this.fetchContent(ids, {
                locale,
                depth: 'root',
                client: this.hierarchyClient
            })

            for (let item of items) {
                const key = item._meta.deliveryKey
                if (key) {
                    refs.get(item._meta.deliveryId).map((el) => {
                        el.deliveryKey = key
                        return el
                    })
                }
            }
        }
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
