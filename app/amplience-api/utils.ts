import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'
import {HTTPError} from 'pwa-kit-react-sdk/ssr/universal/errors'
import fetch from 'cross-fetch'

const toCamel = (str) => {
    if (str.startsWith('_') || str.startsWith('c_')) {
        return str
    }
    return str.replace(/([-_][a-z])/gi, ($1) => {
        return $1
            .toUpperCase()
            .replace('-', '')
            .replace('_', '')
    })
}

const isObject = (obj) => {
    return obj === Object(obj) && !Array.isArray(obj) && typeof obj !== 'function'
}

export const keysToCamel = (obj) => {
    if (isObject(obj)) {
        const n = {}

        Object.keys(obj).forEach((k) => {
            n[toCamel(k)] = keysToCamel(obj[k])
        })

        return n
    } else if (Array.isArray(obj)) {
        return obj.map((i) => {
            return keysToCamel(i)
        })
    }

    return obj
}

/**
 * This function coverts errors/faults returned from the OCAPI API to the format that is returned from the CAPI
 * The fault key has been added to make life easier as it's hard to discern a CAPI error
 * @param error An ocapi error.
 * @returns A capi style error object.
 */
export const convertOcapiFaultToCapiError = (error) => {
    return {
        title: error.message,
        type: error.type,
        detail: error.message,
        // Unique to OCAPI I think
        arguments: error.arguments,
        fault: true
    }
}

/**
 * This function is used to interact with the OCAPI API.
 * @param commerceAPIConfig Commerce API Configuration.
 */ 
export const createOcapiFetch = (commerceAPIConfig) => async (
    endpoint,
    method,
    args,
    methodName,
    body
) => {
    const proxy = `/mobify/proxy/ocapi`

    // The api config will only have `ocapiHost` during testing to workaround localhost proxy
    const host = `${getAppOrigin()}${proxy}`

    const siteId = commerceAPIConfig.parameters.siteId
    const headers = {
        ...args[0].headers,
        'Content-Type': 'application/json',
        'x-dw-client-id': commerceAPIConfig.parameters.clientId
    }

    let response
    response = await fetch(`${host}/s/${siteId}/dw/shop/v21_3/${endpoint}`, {
        method: method,
        headers: headers,
        ...(body && {
            body: JSON.stringify(body)
        })
    })
    const httpStatus = response.status

    if (!args[1] && response.json) {
        response = await response.json()
    }

    const convertedResponse = keysToCamel(response)
    if (convertedResponse.fault) {
        const error = convertOcapiFaultToCapiError(convertedResponse.fault)
        throw new HTTPError(httpStatus, error.detail)
    } else {
        return convertedResponse
    }
}

let forceReload = false

/**
 * Determine if personalisation has been changed since the last check.
 * @returns True if a change was detected, false otherwise.
 */
export const personalisationChanged = () => {
    const reload = forceReload

    forceReload = false

    return reload
}

/**
 * Signals that personalisation has been changed.
 */
export const signalPersonalisationChanged = () => {
    forceReload = true
}
