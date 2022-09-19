import {
    camelCaseKeysToUnderscore,
    checkRequiredParameters,
    createOcapiFetch
} from '../commerce-api/utils'

class OcapiCustomers {
    constructor(config) {
        this.fetch = createOcapiFetch(config)
    }

    async getAuthCustomerToken(...args){
        const required = ['body']
        let requiredParametersError = checkRequiredParameters(args[0], required)
        if (requiredParametersError) {
            return requiredParametersError
        }

        const {body} = args[0]
        return await this.fetch('customers', 'POST', args, 'auth', camelCaseKeysToUnderscore(body))
    }

    /**
     * THis request requires the token retruned from getAuthCustomerToken
     * @param  {...any} args
     * @returns {}
     */
    async getCustomerData(...args){
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
