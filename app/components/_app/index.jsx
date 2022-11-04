/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useState, useEffect} from 'react'
import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'
import {getAssetUrl} from 'pwa-kit-react-sdk/ssr/universal/utils'
import {getAppOrigin} from 'pwa-kit-react-sdk/utils/url'

// Chakra
import {Box, useDisclosure, useStyleConfig} from '@chakra-ui/react'
import {SkipNavLink, SkipNavContent} from '@chakra-ui/skip-nav'

// Contexts
import {CategoriesProvider, CurrencyProvider} from '../../contexts'
import {
    generateVseProps,
    RealtimeVisualization,
    AmplienceContextProvider,
    getGroupsFromLocalStorage
} from '../../contexts/amplience'

// Local Project Components
import Header from '../../components/amplience/header'
import OfflineBanner from '../../components/offline-banner'
import OfflineBoundary from '../../components/offline-boundary'
import ScrollToTop from '../../components/scroll-to-top'
import Footer from '../../components/amplience/footer'
import CheckoutHeader from '../../pages/checkout/partials/checkout-header'
import CheckoutFooter from '../../pages/checkout/partials/checkout-footer'
import DrawerMenu from '../amplience/drawer-menu'
import AmplienceListMenu from '../amplience/list-menu'
import {HideOnDesktop, HideOnMobile} from '../responsive'

// Hooks
import useShopper from '../../commerce-api/hooks/useShopper'
import useCustomer from '../../commerce-api/hooks/useCustomer'
import {AuthModal, useAuthModal} from '../../hooks/use-auth-modal'
import {AddToCartModalProvider} from '../../hooks/use-add-to-cart-modal'
import useWishlist from '../../hooks/use-wishlist'

// Localization
import {IntlProvider} from 'react-intl'

// Others
import {watchOnlineStatus, flatten} from '../../utils/utils'
import {getTargetLocale, fetchTranslations} from '../../utils/locale'
import {DEFAULT_SITE_TITLE, THEME_COLOR} from '../../constants'
import {applyRtvToNav, enrichNavigation} from '../../utils/amplience/link'

import Seo from '../seo'
import {resolveSiteFromUrl} from '../../utils/site-utils'
import useMultiSite from '../../hooks/use-multi-site'

import {init} from 'dc-visualization-sdk'
import Toolbar from '../amplience/toolbar'
import {defaultAmpClient} from '../../amplience-api'
import {useAmpRtvNav} from '../../utils/amplience/rtv'

import OcapiApi from '../../ocapi-api'
import {app} from '../../../config/default'
import useNavigation from '../../hooks/use-navigation'

const DEFAULT_NAV_DEPTH = 3
const DEFAULT_ROOT_CATEGORY = 'root'
const DEFAULT_LOCALE = 'en-US'

const App = (props) => {
    const {
        children,
        targetLocale = DEFAULT_LOCALE,
        messages = {},
        categories: allCategories = {},
        ampProps
    } = props

    const appOrigin = getAppOrigin()
    const navigate = useNavigation()
    const location = useLocation()
    const authModal = useAuthModal()
    const customer = useCustomer()
    const {site, locale, buildUrl} = useMultiSite()

    const [isOnline, setIsOnline] = useState(true)
    const styles = useStyleConfig('App')

    const [headerNav, setHeaderNav] = useState(props.headerNav)
    const [footerNav, setFooterNav] = useState(props.footerNav)
    const {isOpen, onOpen, onClose} = useDisclosure()
    const [showVse, setShowVse] = useState(ampProps.showVse)

    // Used to conditionally render header/footer for checkout page
    const isCheckout = /\/checkout$/.test(location?.pathname)

    const {l10n} = site
    // Get the current currency to be used through out the app
    const currency = locale.preferredCurrency || l10n.defaultCurrency

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
            applyRtvToNav(headerNav, model, setHeaderNav, allCategories, targetLocale)
            applyRtvToNav(footerNav, model, setFooterNav, allCategories, targetLocale)
        },
        ampVizSdk,
        defaultAmpClient,
        allCategories,
        targetLocale
    )

    // Set up customer and basket
    useShopper({currency})

    const wishlist = useWishlist()
    useEffect(() => {
        if (!customer.isInitialized) {
            return
        }
        if (customer.isRegistered) {
            wishlist.init()
        }
        if (customer.isGuest) {
            wishlist.reset()
        }
    }, [customer.authType])

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

    if (typeof window !== 'undefined') {
        // On the clientside, make sure the default Amplience client has the vse set up.
        useEffect(() => {
            defaultAmpClient.setVse(ampProps.vse)
            defaultAmpClient.setGroups(ampProps.groups)
        }, [ampProps])
    }

    const onLogoClick = () => {
        // Goto the home page.
        navigate('/')

        // Close the drawer.
        onClose()
    }

    const onCartClick = () => {
        navigate('/cart')

        // Close the drawer.
        onClose()
    }

    const onAccountClick = () => {
        // Link to account page for registered customer, open auth modal otherwise
        if (customer.isRegistered) {
            navigate('/account')
        } else {
            // if they already are at the login page, do not show login modal
            if (new RegExp(`^/login$`).test(location.pathname)) return
            authModal.onOpen()
        }
    }

    const onWishlistClick = () => {
        navigate('/account/wishlist')
    }

    const headerStyles = {...styles.headerWrapper}

    if (showVse) {
        Object.assign(headerStyles, styles.headerAmpPreview)
    }

    return (
        <Box className="sf-app" {...styles.container}>
            <IntlProvider
                onError={(err) => {
                    if (err.code === 'MISSING_TRANSLATION') {
                        // NOTE: Remove the console error for missing translations during development,
                        // as we knew translations would be added later.
                        console.warn('Missing translation', err.message)
                        return
                    }
                    throw err
                }}
                locale={targetLocale}
                messages={messages}
                // For react-intl, the _default locale_ refers to the locale that the inline `defaultMessage`s are written for.
                // NOTE: if you update this value, please also update the following npm scripts in `template-retail-react-app/package.json`:
                // - "extract-default-translations"
                // - "compile-translations:pseudo"
                defaultLocale={DEFAULT_LOCALE}
            >
                <CategoriesProvider categories={allCategories}>
                    <CurrencyProvider currency={currency}>
                        <AmplienceContextProvider {...ampProps} showVse={showVse}>
                            {showVse && <Toolbar {...ampProps} showVse={showVse} />}
                            <RealtimeVisualization.Provider value={{ampVizSdk, status}}>
                                <Seo>
                                    <meta name="theme-color" content={THEME_COLOR} />
                                    <meta
                                        name="apple-mobile-web-app-title"
                                        content={DEFAULT_SITE_TITLE}
                                    />
                                    <link
                                        rel="apple-touch-icon"
                                        href={getAssetUrl('static/img/global/apple-touch-icon.png')}
                                    />
                                    <link
                                        rel="manifest"
                                        href={getAssetUrl('static/manifest.json')}
                                    />

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
                                    <link
                                        rel="alternate"
                                        hrefLang="x-default"
                                        href={`${appOrigin}/`}
                                    />
                                    {/* Amplience rich text styling */}
                                    <link rel="stylesheet" href="/css/rich-text.css"></link>
                                </Seo>

                                <ScrollToTop />

                                <Box id="app" display="flex" flexDirection="column" flex={1}>
                                    <SkipNavLink zIndex="skipLink">Skip to Content</SkipNavLink>

                                    <Box {...styles.headerWrapper}>
                                        {!isCheckout ? (
                                            <Header
                                                onMenuClick={onOpen}
                                                onLogoClick={onLogoClick}
                                                onMyCartClick={onCartClick}
                                                onMyAccountClick={onAccountClick}
                                                onWishlistClick={onWishlistClick}
                                                logo={headerNav.icon}
                                            >
                                                <HideOnDesktop>
                                                    <DrawerMenu
                                                        isOpen={isOpen}
                                                        onClose={onClose}
                                                        onLogoClick={onLogoClick}
                                                        root={headerNav}
                                                        footer={footerNav}
                                                        locale={locale}
                                                        logo={headerNav.icon}
                                                        showVse={showVse}
                                                    />
                                                </HideOnDesktop>

                                                <HideOnMobile>
                                                    <AmplienceListMenu root={headerNav} />
                                                </HideOnMobile>
                                            </Header>
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
                                                <OfflineBoundary isOnline={false}>
                                                    {children}
                                                </OfflineBoundary>
                                            </Box>
                                        </SkipNavContent>

                                        {!isCheckout ? (
                                            <Footer root={footerNav} />
                                        ) : (
                                            <CheckoutFooter />
                                        )}

                                        <AuthModal {...authModal} />
                                    </AddToCartModalProvider>
                                </Box>
                            </RealtimeVisualization.Provider>
                        </AmplienceContextProvider>
                    </CurrencyProvider>
                </CategoriesProvider>
            </IntlProvider>
        </Box>
    )
}

App.shouldGetProps = () => {
    // In this case, we only want to fetch data for the app once, on the server.
    return typeof window === 'undefined'
}

App.getProps = async ({api, res, req, ampClient}) => {
    const site = resolveSiteFromUrl(res.locals.originalUrl)
    const l10nConfig = site.l10n
    const defaultLocale = l10nConfig.defaultLocale
    const targetLocale = getTargetLocale({
        getUserPreferredLocales: () => {
            // CONFIG: This function should return an array of preferred locales. They can be
            // derived from various sources. Below are some examples of those:
            //
            // - client side: window.navigator.languages
            // - the page URL they're on (example.com/en-GB/home)
            // - cookie (if their previous preference is saved there)
            //
            // If this function returns an empty array (e.g. there isn't locale in the page url),
            // then the app would use the default locale as the fallback.

            // NOTE: Your implementation may differ, this is just what we did.
            //
            // Since the CommerceAPI client already has the current `locale` set,
            // we can use it's value to load the correct messages for the application.
            // Take a look at the `app/components/_app-config` component on how the
            // preferred locale was derived.
            const {locale} = api.getConfig()

            return [locale]
        },
        l10nConfig
    })
    const messages = await fetchTranslations(targetLocale)

    // Login as `guest` to get session.
    await api.auth.login()

    // Get the root category, this will be used for things like the navigation.
    let rootCategory = await api.shopperProducts.getCategory({
        parameters: {
            id: DEFAULT_ROOT_CATEGORY,
            levels: DEFAULT_NAV_DEPTH,
            locale: targetLocale
        }
    })

    if (rootCategory.isError) {
        rootCategory = await api.shopperProducts.getCategory({
            parameters: {
                id: DEFAULT_ROOT_CATEGORY,
                levels: DEFAULT_NAV_DEPTH,
                locale: defaultLocale
            }
        })
    }

    // Flatten the root so we can easily access all the categories throughout
    // the application.
    const categories = flatten(rootCategory, 'categories')

    const ocapiApi = new OcapiApi(app.commerceAPI)
    const groupList = await ocapiApi.getAllGroups()
    const customerGroups = groupList?.data[0].c_customerGroups || [
        'Unregistered',
        'Registered',
        'Everyone'
    ]

    // The serverside and clientside both have an Amplience client, both should receive the VSE params.
    const ampProps = generateVseProps({req, res, query: req.query})
    const groups = getGroupsFromLocalStorage({req, res, query: req.query})
    ampClient.setVse(ampProps.vse)
    ampClient.setGroups(groups)

    ampProps.groups = groups
    ampProps.customerGroups = customerGroups
    ampProps.showVse = ampProps.vse != null || req?.query['pagevse'] != null

    let headerKey = 'main-nav'
    let footerKey = 'footer-nav'

    if (req.query['navvis'] != null) {
        let navName
        if (req.query['navroot'] != null) {
            navName = req.query['navroot']
        } else if (req.query['navchild']) {
            // Attempt to find the root nav item from the hierarchy child.
            const root = await ampClient.fetchHierarchyRootFromChild(req.query['navchild'])

            navName = root?._meta?.deliveryKey
        }

        if (navName != null) {
            switch (req.query['navvis']) {
                case 'header':
                    headerKey = navName
                    break
                case 'footer':
                    footerKey = navName
                    break
            }
        }
    }

    const [headerNav, footerNav] = await Promise.all(
        [headerKey, footerKey].map(async (key) =>
            enrichNavigation(
                await ampClient.fetchHierarchy({key}, undefined, targetLocale),
                categories,
                targetLocale
            )
        )
    )

    return {
        targetLocale,
        messages,
        categories,
        config: res?.locals?.config,
        ampProps,
        headerNav,
        footerNav,
        customerGroups
    }
}

App.propTypes = {
    children: PropTypes.node,
    targetLocale: PropTypes.string,
    messages: PropTypes.object,
    categories: PropTypes.object,
    config: PropTypes.object,
    ampProps: PropTypes.object,
    headerNav: PropTypes.object,
    footerNav: PropTypes.object
}

export default App
