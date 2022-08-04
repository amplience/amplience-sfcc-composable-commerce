import {ContentClient} from 'dc-delivery-sdk-js'
import {app} from '../../config/default'

export type IdOrKey = {id: string} | {key: string}

export class AmplienceAPI {
    client
    vse

    constructor() {
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
    }

    async fetchContent(args: IdOrKey[], locale = 'en-US') {
        let responses = await (await this.client.getContentItems(args, {locale})).responses
        return responses.map((response) => {
            if ('content' in response) {
                return response.content
            }
            return response.error
        })
    }
}
