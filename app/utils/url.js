/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'
import {getLocaleByReference, getParamsFromPath, getUrlConfig} from './utils'
import {getDefaultSite, getSiteByReference, getSites} from './site-utils'
import {HOME_HREF, urlPartPositions} from '../constants'
import {keepVse} from '../hooks/use-navigation'

/**
 * A function that takes a path and qualifies it with the current host and protocol.
 * This function works on the client and on the server.
 *
 * @example
 * absoluteUrl(/women/dresses?color=black)
 *
 * // => http(s)://www.site.com/women/dresses?color=black
 * @param path
 * @returns {string|*}
 */
export const absoluteUrl = (path) => {
    return new URL(path, getAppOrigin()).toString()
}

/**
 * Modifies a given url by adding/updating query parameters.
 *
 * @param {string} url - The base url of the output url set.
 * @param {object} extraParams - A key values pairing used to add static search param values.
 * @returns {string} A URL with additional params
 * @example
 * import {rebuildPathWithParams} from '/path/to/utils/url'
 *
 * rebuildPathWithParams(
 *     '/en-GB/product/25501032M',
 *     {color: 'JJ2SKXX', size: 'MD'}
 * )
 *
 * // Returns
 * // '/en-GB/product/25501032M?color=JJ2SKXX&size=9MD'
 */
export const rebuildPathWithParams = (url, extraParams) => {
    const [pathname, search] = url.split('?')
    const params = new URLSearchParams(search)

    updateSearchParams(params, extraParams)

    // Clean up any trailing `=` for params without values.
    const paramStr = params
        .toString()
        .replace(/=&/g, '&')
        .replace(/=$/, '')

    // Generate the newly updated url.
    return `${pathname}${Array.from(paramStr).length > 0 ? `?${paramStr}` : ''}`
}

export const updateSearchParams = (searchParams, newParams) => {
    Object.entries(newParams).forEach(([key, value]) => {
        // 0 is a valid value as for a param
        if (!value && value !== 0) {
            searchParams.delete(key)
        } else {
            searchParams.set(key, value)
        }
    })
}

/**
 * Builds a list of modified Urls with the provided params key and values,
 * preserving any search params provided in the original url.Optionally
 * you can pass and object used to set static params values.
 * @param {string} url - The base url of the output url set.
 * @param {string} key - The search params for the associated values
 * @param {Array} values - The search param values
 * @param {object} extraParams - A key values pairing used to add static search param values.
 * @returns {string[]} A list of URLs
 * @example
 * import {buildUrlSet} from '/path/to/utils/url'
 *
 * buildUrlSet(
 *     '/womens/clothing',
 *     'sort',
 *     ['price-high-to-low', 'price-low-to-high'],
 *     {offset: 0}
 * )
 *
 * // Returns
 * // ['/womens/clothing?sort=price-high-to-low', '/womens/clothing?sort=price-low-to-high']
 */
export const buildUrlSet = (url = '', key = '', values = [], extraParams = {}) =>
    values.map((value) => rebuildPathWithParams(url, {[key]: value, ...extraParams}))

/**
 * Given a category and the current locale returns an href to the product list page.
 *
 * @param {Object} category
 * @returns {string}
 */
export const categoryUrlBuilder = (category) => encodeURI(`/category/${category.id}`)

/**
 * Given a product and the current locale returns an href to the product detail page.
 *
 * @param {Object} product
 * @returns {string}
 */
export const productUrlBuilder = (product) => encodeURI(`/product/${product.id}`)
/**
 * Given a product and the current locale returns an href to the product detail page.
 *
 * @param {Object} product
 * @returns {string}
 */
export const productUrlBuilderAndQuery = (product, locale, baseLocation) => {
    const location = baseLocation || (window && window.location) || {}
    const {search = ''} = location
    return keepVse(search, `/product/${product.id}`)
}

/**
 * Given a search term, constructs a search url.
 *
 * @param {string} searchTerm
 * @returns {string}
 */
export const searchUrlBuilder = (searchTerm) => '/search?q=' + encodeURIComponent(searchTerm)

/**
 * Returns a relative URL for a locale short code.
 * Based on your app configuration, this function will replace your current locale shortCode with a new one
 *
 * @param {String} shortCode - The locale short code.
 * @param {function(*, *, *, *=): string} - Generates a site URL from the provided path, site and locale.
 * @param {string[]} opts.disallowParams - URL parameters to remove
 * @param {Object} opts.location - location object to replace the default `window.location`
 * @returns {String} url - The relative URL for the specific locale.
 */
export const getPathWithLocale = (shortCode, opts = {}) => {
    const location = opts.location ? opts.location : window.location
    let {siteRef, localeRef} = getParamsFromPath(`${location.pathname}${location.search}`)
    let {pathname, search} = location

    // sanitize the site from current url if existing
    if (siteRef) {
        pathname = pathname.replace(`/${siteRef}`, '')
        search = search.replace(`site=${siteRef}`, '')
    }
    // sanitize the locale from current url if existing
    if (localeRef) {
        pathname = pathname.replace(`/${localeRef}`, '')
        search = search.replace(`locale=${localeRef}`, '')
    }
    // remove ending any &
    search = search.replace(/&$/, '')

    const defaultSite = getDefaultSite()
    const isHomeRef = pathname === HOME_HREF

    const isDefaultLocaleOfDefaultSite = shortCode === defaultSite.l10n.defaultLocale
    const isDefaultSite = siteRef === defaultSite.alias || siteRef === defaultSite.id

    const site = getSiteByReference(siteRef)

    const locale = getLocaleByReference(site, shortCode)

    // rebuild the url with new locale,
    const newUrl = buildPathWithUrlConfig(
        `${pathname}${search}`,
        {
            // By default, as for home page, when the values of site and locale belongs to the default site,
            // they will be not shown in the url just
            site:
                isDefaultLocaleOfDefaultSite && isDefaultSite && isHomeRef
                    ? ''
                    : siteRef || defaultSite.alias || defaultSite.id,
            locale:
                isDefaultLocaleOfDefaultSite && isDefaultSite && isHomeRef
                    ? ''
                    : locale?.alias || locale?.id
        },
        opts
    )
    return newUrl
}

/**
 * Generates the URL Template literal (Template string) used to build URLs in the App according
 * the current selected site/locale and the default App URL configuration.
 *
 * @param appConfig Application default configuration.
 * @param siteRef Current selected Site reference. The value can be the Site id or alias.
 * @param localeRef Current selected Locale reference. The value can be the Locale id or alias.
 * @returns {function(*, *, *): string} function providing: path, site and locale generates a URL.
 */
export const createUrlTemplate = (appConfig, siteRef, localeRef) => {
    const {site: siteConfig, locale: localeConfig, showDefaults: showDefaultsConfig} = appConfig.url
    const defaultSite = getDefaultSite()
    const site = getSiteByReference(siteRef)
    const defaultLocale = getLocaleByReference(site, site.l10n.defaultLocale)

    const isDefaultSite =
        defaultSite.id === siteRef || (defaultSite.alias && defaultSite.alias === siteRef)
    const isDefaultLocale =
        defaultLocale.id === localeRef || (defaultLocale.alias && defaultLocale.alias === localeRef)

    const querySite =
        (siteConfig === urlPartPositions.QUERY_PARAM && showDefaultsConfig) ||
        (siteConfig === urlPartPositions.QUERY_PARAM && !showDefaultsConfig && !isDefaultSite)
    const queryLocale =
        (localeConfig === urlPartPositions.QUERY_PARAM && showDefaultsConfig) ||
        (localeConfig === urlPartPositions.QUERY_PARAM && !showDefaultsConfig && !isDefaultLocale)

    const isQuery = querySite || queryLocale

    const pathSite =
        (siteConfig === urlPartPositions.PATH && showDefaultsConfig) ||
        (siteConfig === urlPartPositions.PATH && !showDefaultsConfig && !isDefaultSite)
    const pathLocale =
        (localeConfig === urlPartPositions.PATH && showDefaultsConfig) ||
        (localeConfig === urlPartPositions.PATH && !showDefaultsConfig && !isDefaultLocale)

    return (path, site, locale) => {
        const isHomeWithDefaultSiteAndLocale =
            path === HOME_HREF &&
            (defaultSite.id === site || (defaultSite.alias && defaultSite.alias === site)) &&
            (defaultLocale.id === locale || (defaultLocale.alias && defaultLocale.alias === locale))

        const sitePath = pathSite && site && !isHomeWithDefaultSiteAndLocale ? `/${site}` : ''
        const localePath =
            pathLocale && locale && !isHomeWithDefaultSiteAndLocale ? `/${locale}` : ''

        const hasQuery = isQuery && (site || locale) && !isHomeWithDefaultSiteAndLocale
        let queryString = ''
        if (hasQuery) {
            const searchParams = new URLSearchParams()
            querySite && site && searchParams.append('site', site)
            queryLocale && locale && searchParams.append('locale', locale)
            queryString = `?${searchParams.toString()}`
        }
        return `${sitePath}${localePath}${path}${queryString}`
    }
}

/**
 * Builds the Home page URL for a given locale and site.
 * By default, when the values of site and locale belongs to the default site,
 * they will be not shown in the url.
 *
 * Adjust the logic here to fit your cases
 *
 * @param homeHref
 * @param options
 * @returns {string}
 */
export const homeUrlBuilder = (homeHref, options = {}) => {
    const {locale, site} = options
    const defaultSite = getDefaultSite()
    const isDefaultLocaleOfDefaultSite =
        locale.alias === defaultSite.l10n.defaultLocale ||
        locale.id === defaultSite.l10n.defaultLocale
    const isDefaultSite = site.id === defaultSite.id || site.alias === defaultSite.alias
    const updatedUrl = buildPathWithUrlConfig(homeHref, {
        locale: isDefaultLocaleOfDefaultSite && isDefaultSite ? '' : locale.alias || locale.id,
        site: isDefaultLocaleOfDefaultSite && isDefaultSite ? '' : site.alias || site.id
    })
    return encodeURI(updatedUrl)
}

/*
 * Remove query params from a give url path based on a given list of keys
 *
 * @param {string} path - The part of url to have params removed from.
 * @param {array} keys - list of params to be removed
 * @returns {string} - the url after param has been removed
 * @example
 * import {removeQueryParamsFromPath} from /path/to/util/url
 *
 * removeQueryParamsFromPath(
 *   /en-GB/cart?pid=1234&color=black&size=s&abc=12,
 *   ['pid', 'color', 'size']
 * )
 * // returns
 * // '/en-GB/cart?abc=12'
 */
export const removeQueryParamsFromPath = (path, keys) => {
    const [pathname, search] = path.split('?')
    const params = new URLSearchParams(search)
    keys.forEach((key) => {
        if (params.has(key)) {
            params.delete(key)
        }
    })

    // Clean up any trailing `=` for params without values.
    const paramStr = params
        .toString()
        .replace(/=&/g, '&')
        .replace(/=$/, '')

    return `${pathname}${paramStr && '?'}${paramStr}`
}

/**
 * Rebuild the path with locale/site values with a given url
 * The position of those values will based on the url config of your current app configuration.
 *
 * @param {string} relativeUrl - the base relative Url to be reconstructed on
 * @param {object} configValues - object that contains values of url config
 * @param {Object} [opts] - Options, if there's any.
 * @param {string[]} opts.disallowParams - URL parameters to remove
 * @return {string} - an output path that has locale and site
 *
 * @example
 * // configuration
 * url {
 *    locale: "query_param",
 *    site: "path",
 *    showDefaults: true
 * }
 *
 *
 * const site = {
 *   id: 'RefArch',
 *   alias: 'global'
 *   l10n: {
 *     defaultLocale: 'en-GB'
 *     supportedLocales: [
 *       {id: 'en-GB', preferCurrency: 'GBP'}
 *     ]
 *     // other props
 *   }
 * }
 * buildPathWithUrlConfig('/women/dresses', {locale: 'en-GB', site: 'global'})
 * => /global/women/dresses?locale=en-GB
 *
 */
export const buildPathWithUrlConfig = (relativeUrl, configValues = {}, opts = {}) => {
    const urlConfig = getUrlConfig()
    const sites = getSites()
    const defaultSite = getDefaultSite()
    const site =
        sites.find((site) => {
            return site.alias === configValues['site'] || site.id === configValues['site']
        }) || defaultSite
    const defaultLocale = getLocaleByReference(site, site.l10n.defaultLocale)
    const defaultLocaleRefs = [defaultLocale.alias, defaultLocale.id].filter(Boolean)
    const {disallowParams = []} = opts
    if (!Object.values(configValues).length) return relativeUrl
    const [pathname, search] = relativeUrl.split('?')

    const params = new URLSearchParams(search)
    // Remove any disallowed params.
    if (disallowParams.length) {
        disallowParams.forEach((param) => {
            params.delete(param)
        })
    }

    const queryParams = {...Object.fromEntries(params)}
    let basePathSegments = []

    // get the default values for site and locale
    const showDefaults = urlConfig.showDefaults

    const defaultSiteRefs = [defaultSite.id, defaultSite.alias]
    const defaultValues = [...defaultSiteRefs, ...defaultLocaleRefs]

    const options = ['site', 'locale']
    options.forEach((option) => {
        const position = urlConfig[option] || urlPartPositions.NONE
        const val = configValues[option]
        if (position === urlPartPositions.PATH) {
            // if showDefaults is false, the default value will not be show in the url
            if (!showDefaults && defaultValues.includes(val)) {
                return
            }
            basePathSegments.push(val)
        } else if (position === urlPartPositions.QUERY_PARAM) {
            // if showDefaults is false, the default value will not be show in the url
            if (!showDefaults && defaultValues.includes(val)) {
                return
            }
            queryParams[option] = val
        }
    })
    // filter out falsy (empty string, undefined, null, etc) values in the array
    basePathSegments = basePathSegments.filter(Boolean)
    let updatedPath = `${
        basePathSegments.length ? `/${basePathSegments.join('/')}` : ''
    }${pathname}`
    // append the query param to pathname
    if (Object.keys(queryParams).length) {
        updatedPath = rebuildPathWithParams(updatedPath, queryParams)
    }
    return updatedPath
}

/*
 * Remove site alias and locale from a given url, to be used for "navigate" urls
 *
 * @param {string} pathName - The part of url to have site alias and locale removed from
 * @returns {string} - the path after site alias and locale have been removed
 * @example
 * import {removeSiteLocaleFromPath} from /path/to/util/url
 *
 * removeSiteLocaleFromPath(/RefArch/en-US/account/wishlist)
 * // returns '/account/wishlist'
 */
export const removeSiteLocaleFromPath = (pathName = '') => {
    let {siteRef, localeRef} = getParamsFromPath(pathName)

    // remove the site alias from the current pathName
    if (siteRef) {
        pathName = pathName.replace(new RegExp(`/${siteRef}`, 'g'), '')
    }
    // remove the locale from the current pathName
    if (localeRef) {
        pathName = pathName.replace(new RegExp(`/${localeRef}`, 'g'), '')
    }

    return pathName
}
