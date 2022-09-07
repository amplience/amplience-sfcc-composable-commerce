/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {resolveSiteFromUrl} from '../../../utils/site-utils'
import {getTargetLocale} from '../../../utils/locale'

// Components
import {Box, Select, SimpleGrid, Text, useMultiStyleConfig} from '@chakra-ui/react'


// Amplience Wrapper Component
import AmplienceWrapper from '../../../components/amplience/wrapper'

// Constants
import {MAX_CACHE_AGE} from '../../../constants'
import {AmplienceContextProvider} from '../../../contexts/amplience'
import {AmplienceAPI} from '../../../amplience-api'
import AuthorCard from '../../../components/amplience/author-card'
import { FormattedMessage } from 'react-intl'

/**
 * This is an example content page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const AuthorsPage = ({results: initialResults, pageVse}) => {
    const [pages, setPages] = useState([])
    const [maxIndex, setMaxIndex] = useState(0)
    const [results, setResults] = useState(initialResults)
    const [currentIndex, setCurrentIndex] = useState(0)
    const styles = useMultiStyleConfig('Author', {variant: 'extendedCard'})

    /*    useAmpRtv((model) => {
            // handle form model change
            setPageModel(model.content)
        })*/

    const onPaginationChanged = (e) => {
        const input = e.target.value
        setCurrentIndex(input - 1)
    }

    const fetchResults = () => {
        if (currentIndex !== 0) {
            setResults([])
        }
    }

    useEffect(fetchResults, [currentIndex])

    const pageBody = (
        <Box data-testid="amplience-page" layerStyle="page">
            <AmplienceWrapper fetch={{key: 'authors/slot/top'}}></AmplienceWrapper>

            <SimpleGrid {...styles.resultsGrid}>
                {results.map((item, index) => {
                    return <AuthorCard item={item} key={index} />
                })}
            </SimpleGrid>
            <Box {...styles.pagination}>
                <FormattedMessage 
                    defaultMessage="Page {currentPage} of {totalPages}" 
                    id="amplience.authors_landing.pagination" 
                    values={{
                        currentPage: currentIndex + 1,
                        totalPages: maxIndex 
                    }}/>
                <Select
                    value={currentIndex + 1}
                    onChange={(e) => onPaginationChanged(e)}
                    {...styles.pageSelect}
                >
                    {pages.map((item, index) => {
                        return (
                            <option value={item} key={index}>
                                {item}
                            </option>
                        )
                    })}
                </Select>
            </Box>
        </Box>
    )

    if (pageVse) {
        return <AmplienceContextProvider vse={pageVse}>{pageBody}</AmplienceContextProvider>
    } else {
        return pageBody
    }
}

AuthorsPage.getTemplateName = () => 'authorspage'

AuthorsPage.shouldGetProps = ({previousLocation, location}) =>
    !previousLocation || previousLocation.pathname !== location.pathname

AuthorsPage.getProps = async ({req, res, location, api, ampClient}) => {

    const pageVse = req?.query['pagevse']

    if (res && !ampClient.vse && !pageVse) {
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

    let client
    if (pageVse) {
        client = new AmplienceAPI()
        client.setVse(pageVse)
    } else {
        client = ampClient
    }

    let results = await (await client.fetchContent([{key: 'author/bala-neha'}, {key: 'author/eva-emery'}], {locale: targetLocale}))

    return {
        results,
        pageVse
    }
}

AuthorsPage.propTypes = {
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool,
    results: PropTypes.any,
    pageVse: PropTypes.string
}

export default AuthorsPage
