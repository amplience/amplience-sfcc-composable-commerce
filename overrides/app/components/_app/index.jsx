/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useHistory, useLocation} from 'react-router-dom'
import {getAssetUrl} from '@salesforce/pwa-kit-react-sdk/ssr/universal/utils'
import {getAppOrigin} from '@salesforce/pwa-kit-react-sdk/utils/url'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'
import {useQuery, useQueries} from '@tanstack/react-query'
import {
    useAccessToken,
    useCategory,
    useCommerceApi,
    useCustomerType,
    useCustomerBaskets,
    useShopperBasketsMutation
} from '@salesforce/commerce-sdk-react'
import * as queryKeyHelpers from '@salesforce/commerce-sdk-react/hooks/ShopperProducts/queryKeyHelpers'
// Chakra
import {
    Box,
    useDisclosure,
    useStyleConfig
} from '@salesforce/retail-react-app/app/components/shared/ui'
import {SkipNavLink, SkipNavContent} from '@chakra-ui/skip-nav'

// Contexts
import {CurrencyProvider} from '@salesforce/retail-react-app/app/contexts'

// Local Project Components
import Header from '../amplience/header'
import OfflineBanner from '@salesforce/retail-react-app/app/components/offline-banner'
import OfflineBoundary from '@salesforce/retail-react-app/app/components/offline-boundary'
import ScrollToTop from '@salesforce/retail-react-app/app/components/scroll-to-top'
import CheckoutHeader from '@salesforce/retail-react-app/app/pages/checkout/partials/checkout-header'
import CheckoutFooter from '@salesforce/retail-react-app/app/pages/checkout/partials/checkout-footer'
//import Footer from '@salesforce/retail-react-app/app/components/footer'
//import DrawerMenu from '@salesforce/retail-react-app/app/components/drawer-menu'
//import ListMenu from '@salesforce/retail-react-app/app/components/list-menu'
import DrawerMenu from '../amplience/drawer-menu'
import {AmplienceListMenu as ListMenu} from '../amplience/list-menu'
import Footer from '../amplience/footer'
import {HideOnDesktop, HideOnMobile} from '@salesforce/retail-react-app/app/components/responsive'
import AboveHeader from '@salesforce/retail-react-app/app/components/_app/partials/above-header'

// Hooks
import {AuthModal, useAuthModal} from '@salesforce/retail-react-app/app/hooks/use-auth-modal'
import {AddToCartModalProvider} from '@salesforce/retail-react-app/app/hooks/use-add-to-cart-modal'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'
import {useCurrentCustomer} from '@salesforce/retail-react-app/app/hooks/use-current-customer'
import {useCurrentBasket} from '@salesforce/retail-react-app/app/hooks/use-current-basket'

// Localization
import {IntlProvider} from 'react-intl'

// Others
import {
    watchOnlineStatus,
    flatten,
    mergeMatchedItems,
    isServer
} from '@salesforce/retail-react-app/app/utils/utils'
import {fetchTranslations} from '@salesforce/retail-react-app/app/utils/locale'
import {
    DEFAULT_SITE_TITLE,
    HOME_HREF,
    THEME_COLOR,
    CAT_MENU_DEFAULT_NAV_SSR_DEPTH,
    CAT_MENU_DEFAULT_ROOT_CATEGORY,
    DEFAULT_LOCALE
} from '@salesforce/retail-react-app/app/constants'

import Seo from '@salesforce/retail-react-app/app/components/seo'

import {useAmplienceApi} from 'amplience-api-react/dist/hooks/useAmplienceApi'
import {useAmplienceNav} from 'amplience-api-react/dist/hooks/useAmplienceNav'
import {enrichNavigation, applyRtvToNav} from 'amplience-api-react'
import {useServerContext} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'
import Toolbar from '../amplience/toolbar'
import { init } from 'dc-visualization-sdk'
import {useAmpRtvNav} from 'amplience-api-react/dist/utils/rtv'
import {RealtimeVisualization} from 'amplience-api-react/dist/provider'


const onClient = typeof window !== 'undefined'

/*
The categories tree can be really large! For performance reasons,
we only load the level 0 categories on server side, and load the rest
on client side to reduce SSR page size.
*/
const useLazyLoadCategories = () => {
    const itemsKey = 'categories'

    const levelZeroCategoriesQuery = useCategory({
        parameters: {id: CAT_MENU_DEFAULT_ROOT_CATEGORY, levels: CAT_MENU_DEFAULT_NAV_SSR_DEPTH}
    })

    const ids = levelZeroCategoriesQuery.data?.[itemsKey]?.map((category) => category.id)
    const queries = useCategoryBulk(ids, {
        enabled: onClient && ids?.length > 0
    })
    const dataArray = queries.map((query) => query.data).filter(Boolean)
    const isLoading = queries.some((query) => query.isLoading)
    const isError = queries.some((query) => query.isError)
    return {
        isLoading,
        isError,
        data: {
            ...levelZeroCategoriesQuery.data,
            [itemsKey]: mergeMatchedItems(
                levelZeroCategoriesQuery.data?.categories || [],
                dataArray
            )
        }
    }
}

const App = (props) => {
    const {children} = props
    
    const {site, locale, buildUrl} = useMultiSite()
    
    const itemsKey = 'categories'
    const query = useCategory({
        parameters: {
            id: CAT_MENU_DEFAULT_ROOT_CATEGORY,
            levels: 3
        }
    })

    //const ids = query.data?.[itemsKey]?.map((category) => category.id)
    const categories = flatten(query.data || {}, itemsKey)
    const ampContext = useAmplienceApi()
    const {req} = useServerContext()
    const ampNavsQuery = useAmplienceNav({req, targetLocale: locale.id, categories, client: ampContext.client})
    const [headerNav, setHeaderNav] = useState(null)
    const [footerNav, setFooterNav] = useState(null)
    const [showVse, setShowVse] = useState(ampContext.showVse)

    const getGroupsOcapi = () => {
        return ampContext.ocapi.getAllGroups().then((res) => res)
    }
    
    const groupsQuery = useQuery(
        ['groups'],
        getGroupsOcapi,
        {
            enabled: !!ampContext.ocapi
        }
    )

    useEffect(() => {
        if(groupsQuery.isSuccess && groupsQuery.data && groupsQuery.fetchStatus == 'idle'){
            const customerGroups = groupsQuery.data?.data[0].c_customerGroups || [
                'Unregistered',
                'Registered',
                'Everyone'
            ]
            ampContext.updateGroups(customerGroups)
        }
    }, [groupsQuery.data])

    ampContext.client.setFlatCats(categories)
    //console.log('ampContext: ', ampContext)

    useEffect(() => {
        console.log(ampNavsQuery)
        if(ampNavsQuery.isSuccess && ampNavsQuery.fetchStatus === 'idle'){
            setFooterNav(enrichNavigation(ampNavsQuery.data[1], categories, locale.id))
            setHeaderNav(enrichNavigation(ampNavsQuery.data[0], categories, locale.id))
        }
    }, [ampNavsQuery.isSuccess])

    // Setup Realtime Viz
    const [status, setStatus] = useState('connecting')
    const [ampVizSdk, setAmpVizSdk] = useState(null)

    const connectRealtimeViz = async () => {
        const sdk = await init({debug: true})

        setAmpVizSdk(sdk)
        setStatus('connected')
    }

    useAmpRtvNav(
        (model) => {
            // handle form model change
            applyRtvToNav(headerNav, model, setHeaderNav, categories, locale.id)
            applyRtvToNav(footerNav, model, setFooterNav, categories, locale.id)
        },
        ampVizSdk,
        ampContext.client,
        categories,
        locale.id
    )

    const appOrigin = getAppOrigin()

    const history = useHistory()
    const location = useLocation()
    const authModal = useAuthModal()
    const {isRegistered} = useCustomerType()

    const [isOnline, setIsOnline] = useState(true)
    const styles = useStyleConfig('App')

    const {isOpen, onOpen, onClose} = useDisclosure()

    // If the translation file exists, it'll be served directly from static folder (and won't reach this code here).
    // However, if the file is missing, the App would render a 404 page.
    const is404ForMissingTranslationFile = /\/static\/translations\/compiled\/[^.]+\.json$/.test(
        location?.pathname
    )

    // Fetch the translation message data using the target locale.
    const {data: messages} = useQuery({
        queryKey: ['app', 'translations', 'messages', locale.id],
        queryFn: () => {
            if (is404ForMissingTranslationFile) {
                // Return early to prevent an infinite loop
                // Otherwise, it'll continue to fetch the missing translation file again
                return {}
            }
            return fetchTranslations(locale?.id)
        },
        enabled: isServer
    })

    // Used to conditionally render header/footer for checkout page
    const isCheckout = /\/checkout$/.test(location?.pathname)

    const {l10n} = site
    // Get the current currency to be used through out the app
    const currency = locale.preferredCurrency || l10n.defaultCurrency

    // Handle creating a new basket if there isn't one already assigned to the current
    // customer.
    const {data: customer} = useCurrentCustomer()
    console.log('customer: ', customer)
    const {data: baskets} = useCustomerBaskets(
        {parameters: {customerId: customer.customerId}},
        {enabled: !!customer.customerId && !isServer}
    )
    const {data: basket} = useCurrentBasket()

    const createBasket = useShopperBasketsMutation('createBasket')
    const updateBasket = useShopperBasketsMutation('updateBasket')
    const updateCustomerForBasket = useShopperBasketsMutation('updateCustomerForBasket')

    useEffect(() => {
        // Create a new basket if the current customer doesn't have one.
        if (baskets?.total === 0) {
            createBasket.mutate({
                body: {}
            })
        }
    }, [baskets])

    useEffect(() => {
        // update the basket currency if it doesn't match the current locale currency
        if (basket?.currency && basket?.currency !== currency) {
            updateBasket.mutate({
                parameters: {basketId: basket.basketId},
                body: {currency}
            })
        }
    }, [basket?.currency])

    useEffect(() => {
        // update the basket customer email
        if (
            basket &&
            customer?.isRegistered &&
            customer?.email &&
            customer?.email !== basket?.customerInfo?.email
        ) {
            updateCustomerForBasket.mutate({
                parameters: {basketId: basket.basketId},
                body: {
                    email: customer.email
                }
            })
        }
    }, [customer?.isRegistered, customer?.email, basket?.customerInfo?.email])

    useEffect(() => {
        // Listen for online status changes.
        watchOnlineStatus((isOnline) => {
            setIsOnline(isOnline)
        })

        connectRealtimeViz()
    }, [])

    useEffect(() => {
        // Lets automatically close the mobile navigation when the
        // location path is changed.
        onClose()

        const activeParams = new URLSearchParams(location.search || '')
        const showPreview =
            activeParams &&
            ((activeParams.has('vse') && activeParams.get('vse')) ||
                (activeParams.has('pagevse') && activeParams.get('pagevse')))
        
        setShowVse(showPreview)

    }, [location])

    if(typeof window !== 'undefined') {
        // On the clientside, make sure the default Amplience client has the vse set up.
        useEffect(() => {
            ampContext.client.setVse(ampContext.vse)
            ampContext.client.setGroups(ampContext.groups)
        }, [ampContext.client])
    }

    const onLogoClick = () => {
        // Goto the home page.
        const path = buildUrl(HOME_HREF)

        history.push(path)

        // Close the drawer.
        onClose()
    }

    const onCartClick = () => {
        const path = buildUrl('/cart')
        history.push(path)

        // Close the drawer.
        onClose()
    }

    const onAccountClick = () => {
        // Link to account page for registered customer, open auth modal otherwise
        if (isRegistered) {
            const path = buildUrl('/account')
            history.push(path)
        } else {
            // if they already are at the login page, do not show login modal
            if (new RegExp(`^/login$`).test(location.pathname)) return
            authModal.onOpen()
        }
    }

    const onWishlistClick = () => {
        const path = buildUrl('/account/wishlist')
        history.push(path)
    }

    const headerStyles = {...styles.headerWrapper}

    if (showVse) {
        Object.assign(headerStyles, styles.headerAmpPreview)
    }

    return (
        <Box className="sf-app" {...styles.container}>
            <IntlProvider
                onError={(err) => {
                    if (!messages) {
                        // During the ssr prepass phase the messages object has not loaded, so we can suppress
                        // errors during this time.
                        return
                    }
                    if (err.code === 'MISSING_TRANSLATION') {
                        // NOTE: Remove the console error for missing translations during development,
                        // as we knew translations would be added later.
                        console.warn('Missing translation', err.message)
                        return
                    }
                    throw err
                }}
                locale={locale.id}
                messages={messages}
                // For react-intl, the _default locale_ refers to the locale that the inline `defaultMessage`s are written for.
                // NOTE: if you update this value, please also update the following npm scripts in `template-retail-react-app/package.json`:
                // - "extract-default-translations"
                // - "compile-translations:pseudo"
                defaultLocale={DEFAULT_LOCALE}
            >
                <CurrencyProvider currency={currency}>
                    {showVse && <Toolbar {...ampContext} showVse={showVse} />}
                    <RealtimeVisualization.Provider value={{ampVizSdk, status}}>
                        <Seo>
                            <meta name="theme-color" content={THEME_COLOR} />
                            <meta name="apple-mobile-web-app-title" content={DEFAULT_SITE_TITLE} />
                            <link
                                rel="apple-touch-icon"
                                href={getAssetUrl('static/img/global/apple-touch-icon.png')}
                            />
                            <link rel="manifest" href={getAssetUrl('static/manifest.json')} />

                            {/* Urls for all localized versions of this page (including current page)
                                For more details on hrefLang, see https://developers.google.com/search/docs/advanced/crawling/localized-versions */}
                            {site.l10n?.supportedLocales.map((locale) => (
                                <link
                                    rel="alternate"
                                    hrefLang={locale.id.toLowerCase()}
                                    href={`${appOrigin}${buildUrl(location.pathname)}`}
                                    key={locale.id}
                                />
                            ))}
                            {/* A general locale as fallback. For example: "en" if default locale is "en-GB" */}
                            <link
                                rel="alternate"
                                hrefLang={site.l10n.defaultLocale.slice(0, 2)}
                                href={`${appOrigin}${buildUrl(location.pathname)}`}
                            />
                            {/* A wider fallback for user locales that the app does not support */}
                            <link rel="alternate" hrefLang="x-default" href={`${appOrigin}/`} />
                        </Seo>

                        <ScrollToTop />

                        <Box id="app" display="flex" flexDirection="column" flex={1}>
                            <SkipNavLink zIndex="skipLink">Skip to Content</SkipNavLink>

                            <Box {...styles.headerWrapper}>
                                {!isCheckout ? (
                                    <>
                                        <AboveHeader />
                                        <Header
                                            onMenuClick={onOpen}
                                            onLogoClick={onLogoClick}
                                            onMyCartClick={onCartClick}
                                            onMyAccountClick={onAccountClick}
                                            onWishlistClick={onWishlistClick}
                                            logo={headerNav?.icon}
                                        >
                                            <HideOnDesktop>
                                                <DrawerMenu
                                                    isOpen={isOpen}
                                                    onClose={onClose}
                                                    onLogoClick={onLogoClick}
                                                    root={headerNav}
                                                    /* root={categories?.[CAT_MENU_DEFAULT_ROOT_CATEGORY]} */
                                                />
                                            </HideOnDesktop>

                                            <HideOnMobile>
                                                <ListMenu
                                                    root={headerNav}
                                                />
                                            </HideOnMobile>
                                        </Header>
                                    </>
                                ) : (
                                    <CheckoutHeader />
                                )}
                            </Box>
                            {!isOnline && <OfflineBanner />}
                            <AddToCartModalProvider>
                                <SkipNavContent
                                    style={{
                                        display: 'flex',
                                        flexDirection: 'column',
                                        flex: 1,
                                        outline: 0
                                    }}
                                >
                                    <Box
                                        as="main"
                                        id="app-main"
                                        role="main"
                                        display="flex"
                                        flexDirection="column"
                                        flex="1"
                                    >
                                        <OfflineBoundary isOnline={false}>{children}</OfflineBoundary>
                                    </Box>
                                </SkipNavContent>

                                {!isCheckout ? <Footer root={footerNav} /> : <CheckoutFooter />}

                                <AuthModal {...authModal} />
                            </AddToCartModalProvider>
                        </Box>
                    </RealtimeVisualization.Provider>
                </CurrencyProvider>
            </IntlProvider>
        </Box>
    )
}

App.propTypes = {
    children: PropTypes.node
}

/**
 * a hook that parallelly and individually fetches category based on the given ids
 * @param ids - list of categories ids to fetch
 * @param queryOptions -  react query options
 * @return list of react query results
 */
export const useCategoryBulk = (ids = [], queryOptions) => {
    const api = useCommerceApi()
    const {getTokenWhenReady} = useAccessToken()
    const {
        app: {commerceAPI}
    } = getConfig()
    const {
        parameters: {organizationId}
    } = commerceAPI
    const {site} = useMultiSite()

    const queries = ids.map((id) => {
        return {
            queryKey: queryKeyHelpers.getCategory.queryKey({
                id,
                levels: 2,
                organizationId,
                siteId: site.id
            }),
            queryFn: async () => {
                const token = await getTokenWhenReady()
                const res = await api.shopperProducts.getCategory({
                    parameters: {id, levels: 2},
                    headers: {
                        authorization: `Bearer ${token}`
                    }
                })
                return res
            },
            ...queryOptions,
            enabled: queryOptions.enabled !== false && Boolean(id)
        }
    })
    const res = useQueries({queries})
    return res
}

export default App
