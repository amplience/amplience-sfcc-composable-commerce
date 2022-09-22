import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'
//import fetch from 'cross-fetch'

type requestOptions = {
    method: string;
    headers: Headers;
    body?: URLSearchParams;
    redirect: any;
}

type Config = {
    proxyPath: string;
    parameters: {
        clientId: string;
        organizationId: string;
        shortCode: string;
        siteId: string;
    }
}

const proxy = `/mobify/proxy/ocapi`

export class OcapiApi {
    baseUrl: string
    oathUrl: string
    dataUrl: string
    //fetch: Function
    headers: Headers
    urlencoded: URLSearchParams
    requestOptions: requestOptions
    api: any

    constructor(config: Config) {
        this.baseUrl = `${getAppOrigin()}${proxy}`
        this.oathUrl =
            this.baseUrl + '/dw/oauth2/access_token?client_id=' + config.parameters.clientId

        this.dataUrl =
            this.baseUrl + '/s/Sites-Site/dw/data/v21_3/sites/' + config.parameters.siteId + '/'
        //this.fetch = createOcapiFetch(config)
    }

    async oauthToken() {
        this.headers = new Headers()
        this.headers.append('Content-Type', 'application/x-www-form-urlencoded')
        this.headers.append(
            'Authorization',
            'Basic cmJhcnJhZ2FuLXN3ZWV0ZW5AYW1wbGllbmNlLmNvbTpSUTlaYVk5eHo1MUc6c2VjcmV0VGh5bWUyMDIw'
        )

        this.urlencoded = new URLSearchParams()
        this.urlencoded.append(
            'grant_type',
            'urn:demandware:params:oauth:grant-type:client-id:dwsid:dwsecuretoken'
        )

        this.requestOptions = {
            method: 'POST',
            headers: this.headers,
            body: this.urlencoded,
            redirect: 'follow'
        }

        const response = await fetch(this.oathUrl, this.requestOptions)
        const json = await response.json()
        return json
    }

    async getAllGroups() {
        const auth = await this.oauthToken()
        console.log('tok response', auth)

        this.headers = new Headers()
        this.headers.append('Authorization', auth.token_type + ' ' + auth.access_token)

        this.requestOptions = {
            method: 'GET',
            headers: this.headers,
            redirect: 'follow'
        }

        const response = await fetch(this.dataUrl + 'customer_groups', this.requestOptions)
        const json = await response.json()
        return json
    }
}

export default OcapiApi
