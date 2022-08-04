/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
//import Cookies from 'cookies'
import {AmplienceAPI} from '../amplience/api'

/**
 * This is the global state for categories, we use this for navigation and for
 * the product list page.
 *
 * To use these context's simply import them into the component requiring context
 * like the below example:
 *
 * import React, {useContext} from 'react'
 * import {CategoriesContext} from './contexts'
 *
 * export const RootCategoryLabel = () => {
 *    const {categories} = useContext(CategoriesContext)
 *    return <div>{categories['root'].name}</div>
 * }
 *
 * Alternatively you can use the hook provided by us:
 *
 * import {useCategories} from './hooks'
 *
 * const {categories, setCategories} = useCategories()
 *
 */
export const CategoriesContext = React.createContext()
export const CategoriesProvider = ({categories: initialCategories = {}, children}) => {
    const [categories, setCategories] = useState(initialCategories)

    return (
        <CategoriesContext.Provider value={{categories, setCategories}}>
            {children}
        </CategoriesContext.Provider>
    )
}

CategoriesProvider.propTypes = {
    children: PropTypes.node.isRequired,
    categories: PropTypes.object
}

/**
 * This is the global state for currency, we use this throughout the site. For example, on
 * the product-list, product-detail and cart and basket pages..
 *
 * To use these context's simply import them into the component requiring context
 * like the below example:
 *
 * import React, {useContext} from 'react'
 * import {CurrencyContext} from './contexts'
 *
 * export const RootCurrencyLabel = () => {
 *    const {currency} = useContext(CurrencyContext)
 *    return <div>{currency}</div>
 * }
 *
 * Alternatively you can use the hook provided by us:
 *
 * import {useCurrency} from './hooks'
 *
 * const {currency, setCurrency} = useCurrency()
 *
 */
export const CurrencyContext = React.createContext()
export const CurrencyProvider = ({currency: initialCurrency, children}) => {
    const [currency, setCurrency] = useState(initialCurrency)

    return (
        <CurrencyContext.Provider value={{currency, setCurrency}}>
            {children}
        </CurrencyContext.Provider>
    )
}

CurrencyProvider.propTypes = {
    children: PropTypes.node.isRequired,
    currency: PropTypes.string
}

/**
 * This is the global Amplience Realtime Visualization Context on Non-category pages
 *
 * To use these context's simply import them into the component requiring context
 * like the below example:
 *
 * import React, {useContext} from 'react'
 * import {RealtimeVisualization} from './contexts'
 *
 * const RTV = useContext(RealtimeVisualization)
 *
 * export const RootCurrencyLabel = () => {
 *    const {currency} = useContext(CurrencyContext)
 *    return <div>{currency}</div>
 * }
 */
import {init} from 'dc-visualization-sdk'

export const RealtimeVisualization = React.createContext()

// Q: is there a way for a react context to run its own async function?
// thinking it would be nice NOT to init the viz SDK at the app level so we can
// import/init only where needed
export const RealtimeVisualizationProvider = ({status: initState, ampViz}) => {
    const [status, setStatus] = useState(initState)
    const [ampVizSdk, setAmpVizSdk] = useState(ampViz)

    ;async () => {
        const sdk = await init({debug: true})

        setAmpVizSdk(sdk)
        setStatus('connected')
    }

    return (
        <RealtimeVisualization.Provider
            value={[
                {status, setStatus},
                {ampVizSdk, setAmpVizSdk}
            ]}
        />
    )
}

/**
 * This is the global Amplience Visualization Context
 *
 * To use these context's simply import them into the component requiring context
 * like the below example:
 *
 * import React, {useContext} from 'react'
 * import {AmplienceContext} from './contexts'
 *
 * const vis = useContext(AmplienceContext)
 */

export const AmplienceContext = React.createContext()

export const AmplienceContextProvider = ({vse, vseTimestamp, children}) => {
    // Init client using VSE
    const [client] = useState(new AmplienceAPI())

    useEffect(() => {
        // Switch the API to use the provided VSE, if present.
        client.setVse(vse)
    }, [vse, vseTimestamp])

    return (
        <AmplienceContext.Provider value={{vse, vseTimestamp, client}}>
            {children}
        </AmplienceContext.Provider>
    )
}

export const generateVseProps = ({req, res, query}) => {
    let vse = null
    let vseTimestamp = 0

    if (res) {
        //const cookies = new Cookies(req, res)

        vse = query.vse
        vseTimestamp = query['vse-timestamp']
        vseTimestamp = vseTimestamp == 'null' ? 0 : Number(vseTimestamp)

        const clearVse = query['clear-vse']

        /*
        if (vse == null && clearVse === undefined) {
            //console.log('trying to get cookies')
            vse = cookies.get('vse')
            vseTimestamp = cookies.get('vse-timestamp')
            vseTimestamp = vseTimestamp != null ? Number(vseTimestamp) : undefined
            //console.log(vse)
            //console.log(vseTimestamp)
        } else {
            cookies.set('vse', vse)
            cookies.set('vse-timestamp', vseTimestamp)
        }
        */
    }

    return {vse, vseTimestamp}
}

AmplienceContextProvider.propTypes = {
    vse: PropTypes.string,
    vseTimestamp: PropTypes.number,

    children: PropTypes.node.isRequired
}
