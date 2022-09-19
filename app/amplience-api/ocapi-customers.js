import {
    camelCaseKeysToUnderscore,
    checkRequiredParameters,
    createOcapiFetch
} from '../commerce-api/utils'

/**
 * Some notes. createOcapiFetch in ../commerce-api/utils seems to be something we can re-use
 * to makes requests to OCAPI. Not entirely sure how the Curl examples in the
 * ticket will map into the fetch function here, but it might be a good place to start.
 * In the NOVADEV-758 there are 3 calls outlined
 * - oauth2 token (seems like this is already done)
 * - customer auth token (returns auth token & customer_id required for the next call)
 * - customers/{customer_id}
 */
class OcapiCustomers {
    constructor(config) {
        this.fetch = createOcapiFetch(config)
    }

    /**
     * Should we follow the pattern in auth.js of storing needed bits of data in .storage?
     * @param  {...any} args
     * @returns {}
     */
    async getAuthCustomerToken(...args) {
        const required = ['body']
        let requiredParametersError = checkRequiredParameters(args[0], required)
        if (requiredParametersError) {
            return requiredParametersError
        }

        const {body} = args[0]
        return await this.fetch('customers', 'POST', args, 'auth', camelCaseKeysToUnderscore(body))
    }

    /**
     * This request requires the token & customer_id retruned from getAuthCustomerToken above
     * @param  {...any} args
     * @returns {}
     */
    async getCustomerData(...args) {
        const required = ['body']
        let requiredParametersError = checkRequiredParameters(args[0], required)
        if (requiredParametersError) {
            return requiredParametersError
        }

        const {body} = args[0]
        return await this.fetch('customers', 'GET', args, camelCaseKeysToUnderscore(body))
    }
}

export default OcapiCustomers
