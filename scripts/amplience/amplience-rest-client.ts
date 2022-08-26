import axios, { AxiosInstance, AxiosRequestConfig } from 'axios'
import _ from 'lodash'
import { HttpMethod } from 'dc-management-sdk-js'

export type OAuthRestClientInterface = {
    [Z in keyof typeof HttpMethod as Lowercase<Z>]: (config: AxiosRequestConfig | string) => Promise<any>
}

export const sleep = (delay: number) => new Promise((resolve) => setTimeout(resolve, delay))

type AuthenticationStatus = 'NOT_LOGGED_IN' | 'LOGGING_IN' | 'LOGGED_IN'
export const AmplienceRestClient = (config: { clientId: string, clientSecret: string }): OAuthRestClientInterface => {
    let authenticatedAxios: AxiosInstance
    let status: AuthenticationStatus = 'NOT_LOGGED_IN'

    const apiUrl = `https://api.amplience.net/v2/content`
    const authUrl = `https://auth.amplience.net/oauth/token?client_id=${config.clientId}&client_secret=${config.clientSecret}&grant_type=client_credentials`

    const authenticate = async (): Promise<AxiosInstance> => {
        if (!authenticatedAxios) {
            let response = await axios.post(authUrl, {}, {
                headers: {
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })
            const auth = response.data

            authenticatedAxios = axios.create({
                baseURL: apiUrl,
                headers: {
                    Authorization: `${auth.token_type || 'Bearer'} ${auth.access_token}`,
                    'content-type': 'application/x-www-form-urlencoded'
                }
            })
        }
        return authenticatedAxios
    }

    const request = (method: HttpMethod) => async (config: AxiosRequestConfig | string): Promise<any> => {
        if (typeof config === 'string') {
            config = { url: config }
        }

        // authentication
        switch (status) {
            case 'LOGGING_IN':
                await sleep(100)
                return await request(method)(config)

            case 'NOT_LOGGED_IN':
                authenticatedAxios = await authenticate()
                status = 'LOGGED_IN'
    
            case 'LOGGED_IN':
                break;
        }

        try {
            return await (await authenticatedAxios.request({ method, ...config })).data
        } catch (error: any) {
            if (error.response?.status === 429) {
                await sleep(1000)
                return await request(method)(config)
            }
            else if (error.response?.status === 404) {
                // don't throw on a 404 just return an empty result set
                return null
            }
            console.log(`Error while ${method}ing URL [ ${config.url} ]: ${error.message} ${error.code}`)
        }
    }

    return {
        get:    request(HttpMethod.GET),
        delete: request(HttpMethod.DELETE),
        put:    request(HttpMethod.PUT),
        post:   request(HttpMethod.POST),
        patch:  request(HttpMethod.PATCH)
    }
}

export default AmplienceRestClient