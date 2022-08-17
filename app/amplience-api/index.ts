import {ContentClient} from 'dc-delivery-sdk-js'
import {app} from '../../config/default'

export type IdOrKey = {id: string} | {key: string}
export type FilterType = ((item: any) => boolean) | undefined

const referenceTypes = [
    'http://bigcontent.io/cms/schema/v1/core#/definitions/content-link',
    'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference'
]

export class AmplienceAPI {
    client
    vse

    clientReady
    clientReadyResolve

    constructor() {
        this.clientReady = new Promise((resolve) => (this.clientReadyResolve = resolve))
        this.client = new ContentClient({hubName: app.amplience.hub})
    }

    setVse(vse) {
        if (this.vse != vse) {
            this.client = new ContentClient({
                hubName: app.amplience.hub,
                stagingEnvironment: vse
            })

            this.vse = vse
        }

        this.clientReadyResolve()
    }

    async fetchContent(args: IdOrKey[], locale = 'en-US') {
        await this.clientReady

        let responses = await (await this.client.getContentItems(args, {locale})).responses
        return responses.map((response) => {
            if ('content' in response) {
                return response.content
            }
            return response.error
        })
    }

    async getChildren(parent: any, filter: FilterType, locale = 'en-US') {
        const id = parent._meta.deliveryId

        // TODO: pagination, rate limit
        const result = await this.client
            .filterByParentId(id)
            .sortBy('default', 'ASC')
            .request({
                format: 'inlined',
                depth: 'all',
                locale
            })

        const items = result.responses
            .map((response) => response.content)
            .filter((response) => response != null && (!filter || filter(response)))

        if (items.length > 0) {
            parent.children = items
        }

        await Promise.all(items.map((item) => this.getChildren(item, filter, locale)))
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
                refs.set(item.id, item)
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
            const items = await this.fetchContent(ids, locale)

            for (let item of items) {
                const key = item._meta.deliveryKey
                if (key) {
                    refs.get(item._meta.deliveryId)._meta.deliveryKey = key
                }
            }
        }
    }

    async fetchHierarchy(parent: IdOrKey, filter: FilterType, locale = 'en-US') {
        await this.clientReady

        const root = (await this.fetchContent([parent], locale))[0]

        await this.getChildren(root, filter, locale)

        await this.enrichReferenceDeliveryKeys(root, locale)

        return root
    }
}

export const defaultAmpClient = new AmplienceAPI()
