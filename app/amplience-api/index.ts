import {ContentClient} from 'dc-delivery-sdk-js'
import {app} from '../../config/default'

export type IdOrKey = {id: string} | {key: string}

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
}

export const defaultAmpClient = new AmplienceAPI()
