/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useQuery} from '@tanstack/react-query'

// Components
import {Box, Heading, Skeleton} from '@chakra-ui/react'

// Project Components
import Seo from '../../components/amplience/seo'

// Amplience Wrapper Component
import AmplienceWrapper from '../../components/amplience/wrapper'

// hooks
import { useParams } from 'react-router-dom'
import {AmplienceAPI} from 'amplience-api-react'
import {useAmplienceApi} from 'amplience-api-react/dist/hooks/useAmplienceApi'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'
import {useServerContext} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'
import {app} from '../../../../config/default'

// Constants
import {MAX_CACHE_AGE} from '@salesforce/retail-react-app/app/constants'
import {personalisationChanged, useAmpRtv} from 'amplience-api-react'

/**
 * This is an example content page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const ContentPage = () => {
    const {pageId} = useParams()
    const {req, res} = useServerContext()
    const {site, locale} = useMultiSite()
    const ampContext = useAmplienceApi()

    const pageVse = req?.query['pagevse']

    if (res && !ampContext.vse && !pageVse) {
        res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    const [pageModel, setPageModel] = useState(undefined)
    const [rtvActive, setRtvActive] = useState(false)

    let amp
    if (pageVse) {
        amp = new AmplienceAPI(app.amplience.default.hub)
        amp.setVse(pageVse)
    } else {
        amp = ampContext
    }

    const query = useQuery(
        [`page/${pageId}`],
        () => {
            return amp.client.fetchContent([{key: `page/${pageId}`}], {locale: locale.id}).then((res) => res).then((res) => res)
        }
    )

    useEffect(() => {
        const page = query.data?.pop()
        setPageModel(page)
    }, [query.isSuccess])

    useAmpRtv((model) => {
        // handle form model change
        setPageModel(model.content)
        setRtvActive(true)
    })

    const pageBody = (
        <Box data-testid="amplience-page" layerStyle="page">
            {pageModel == undefined ? (
                <Skeleton height="20px" />
            ) : (
                <>
                    <Seo
                        title={pageModel.seo?.title}
                        description={pageModel.seo?.description}
                        keywords={pageModel.seo?.keywords}
                        noIndex={pageModel.seo?.noindex}
                    />
                    <Heading
                        as="h1"
                        fontSize={{base: '4xl', md: '5xl', lg: '6xl'}}
                        maxWidth={{base: '75%', md: '50%', lg: 'xl'}}
                    >
                        {pageModel.seo?.title}
                    </Heading>
                </>
            )}
            {pageModel == undefined ? (
                <Skeleton height="200px" />
            ) : (
                <>
                    {pageModel.content?.map((item) => {
                        return (
                            <AmplienceWrapper
                                key={item._meta.deliveryId}
                                content={item}
                                rtvActive={rtvActive}
                            />
                        )
                    })}
                </>
            )}
        </Box>
    )

    if (pageVse) {
        return <AmplienceContextProvider vse={pageVse}>{pageBody}</AmplienceContextProvider>
    } else {
        return pageBody
    }
}

ContentPage.getTemplateName = () => 'contentpage'

ContentPage.propTypes = {
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool,
    page: PropTypes.object,
    pageVse: PropTypes.string
}

export default ContentPage
