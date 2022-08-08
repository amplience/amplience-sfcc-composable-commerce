/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useEffect} from 'react'
import {Heading} from '@chakra-ui/react'
import PropTypes from 'prop-types'
//import {useIntl, FormattedMessage} from 'react-intl'
import {resolveSiteFromUrl} from '../../../utils/site-utils'
import {getTargetLocale} from '../../../utils/locale'

// Components
import {Box} from '@chakra-ui/react'

// Project Components
import Seo from '../../../components/seo'

// Amplience Wrapper Component
import AmplienceWrapper from '../../../components/amplience/Wrapper'

// Constants
import {MAX_CACHE_AGE} from '../../../constants'

/**
 * This is an example content page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const ContentPage = ({isLoading, page, slots}) => {
    //const intl = useIntl()

    console.log('page', page)

    useEffect(() => {}, [isLoading, page])

    return (
        <Box data-testid="amplience-page" layerStyle="page">
            <Seo
                title={page.seo.title}
                description={page.seo.description}
                keywords={page.seo.keywords}
            />

            <Heading
                as="h1"
                fontSize={{base: '4xl', md: '5xl', lg: '6xl'}}
                maxWidth={{base: '75%', md: '50%', lg: 'md'}}
            >
                {page.pagetitle}
            </Heading>

            {slots.map((slot) => {
                return <AmplienceWrapper key={slot._meta.deliveryId} content={slot} type="SLOT" />
            })}
        </Box>
    )
}

ContentPage.getTemplateName = () => 'contentpage'

ContentPage.shouldGetProps = ({previousLocation, location}) =>
    !previousLocation || previousLocation.pathname !== location.pathname

ContentPage.getProps = async ({res, params, location, api, ampClient}) => {
    const {pageId} = params

    if (res) {
        res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    const site = resolveSiteFromUrl(location.pathname)
    const l10nConfig = site.l10n
    const targetLocale = getTargetLocale({
        getUserPreferredLocales: () => {
            const {locale} = api.getConfig()
            return [locale]
        },
        l10nConfig
    })

    var slots = [],
        page = {}

    console.log('params: ', params)
    console.log('page ID: ', pageId)

    if (pageId) {
        page = await (await ampClient.fetchContent([{key: pageId}], targetLocale)).pop()
    }

    if ('slots' in page) {
        slots = await ampClient.fetchContent(page.slots.map((slot) => ({id: slot.id})))
    }

    return {
        page,
        slots
    }
}

ContentPage.propTypes = {
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool,
    page: PropTypes.object,
    slots: PropTypes.array
}

export default ContentPage
