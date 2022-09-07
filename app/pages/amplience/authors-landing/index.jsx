import React from 'react'
import PropTypes from 'prop-types'
import {resolveSiteFromUrl} from '../../../utils/site-utils'
import {getTargetLocale} from '../../../utils/locale'

// Components
import {Box, SimpleGrid, useMultiStyleConfig} from '@chakra-ui/react'

// Amplience Wrapper Component
import AmplienceWrapper from '../../../components/amplience/wrapper'

// Constants
import {MAX_CACHE_AGE} from '../../../constants'
import {AmplienceContextProvider} from '../../../contexts/amplience'
import {AmplienceAPI} from '../../../amplience-api'
import AuthorCard from '../../../components/amplience/author-card'

/**
 * This is an example content page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const AuthorsPage = ({results = [], pageVse}) => {
    const styles = useMultiStyleConfig('Author', {variant: 'extendedCard'})

    const pageBody = (
        <Box data-testid="amplience-page" layerStyle="page">
            <AmplienceWrapper fetch={{key: 'authors/slot/top'}}></AmplienceWrapper>

            <SimpleGrid {...styles.resultsGrid}>
                {results.map((item, index) => {
                    return <AuthorCard item={item.content} key={index} />
                })}
            </SimpleGrid>
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

    const results = await client.fetchBlogAuthors({locale: targetLocale});
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
