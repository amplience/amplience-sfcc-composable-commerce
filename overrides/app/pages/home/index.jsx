/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useLocation} from 'react-router-dom'
import {useQuery} from '@tanstack/react-query'

// Components
import {Box} from '@salesforce/retail-react-app/app/components/shared/ui'

// Project Components
import Seo from '@salesforce/retail-react-app/app/components/seo'
import AmplienceWrapper from '../../components/amplience/wrapper'

//Hooks
import useEinstein from '@salesforce/retail-react-app/app/hooks/use-einstein'

// Constants
import {
    MAX_CACHE_AGE
} from '../../constants'

import {useAmplienceApi} from 'amplience-api-react/dist/hooks/useAmplienceApi'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'
import {useServerContext} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'

// TODO: parsonlization needs to be added to the content query key so if it changes, the query runs again
import {personalisationChanged} from 'amplience-api-react'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Home = () => {
    const intl = useIntl()
    const einstein = useEinstein()
    const {pathname} = useLocation()
    const {site, locale} = useMultiSite()
    const ampContext = useAmplienceApi()

    // useServerContext is a special hook introduced in v3 PWA Kit SDK.
    // It replaces the legacy `getProps` and provide a react hook interface for SSR.
    // it returns the request and response objects on the server side,
    // and these objects are undefined on the client side.
    const {res} = useServerContext()
    if (res && !ampContext.vse) {
        res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    const [homeSlotTop, setHomeTopSlot] = useState()
    
    const query = useQuery(
        [`page/developer/topslot`],
        () => {
            return ampContext.client.fetchContent([{key: 'home/slot/top'}], {locale: locale.id}).then((res) => res).then((res) => res)
        }
    )

    useEffect(() => {
        if(query.isSuccess) {
            const content = query.data?.pop()
            setHomeTopSlot(content)
        }
    }, [query.isSuccess])

    /**************** Einstein ****************/
    useEffect(() => {
        einstein.sendViewPage(pathname)
    }, [])

    return (
        <Box data-testid="home-page" layerStyle="page">
            <Seo
                title="Home Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />

            <AmplienceWrapper fetch={{key: 'home/slot/top-personalised'}}></AmplienceWrapper>
            <AmplienceWrapper fetch={{key: 'home/hero-features'}}></AmplienceWrapper>
            <AmplienceWrapper content={homeSlotTop}></AmplienceWrapper>
            <AmplienceWrapper fetch={{key: 'shoppable/woman-fall'}}></AmplienceWrapper>
            <AmplienceWrapper fetch={{key: 'simple-product-list'}}></AmplienceWrapper>
            <AmplienceWrapper fetch={{key: 'section'}}></AmplienceWrapper>
            <AmplienceWrapper fetch={{key: 'home/features'}}></AmplienceWrapper>
            <AmplienceWrapper fetch={{key: 'section/we-are-here'}}></AmplienceWrapper>
        </Box>
    )
}

Home.getTemplateName = () => 'home'

export default Home
