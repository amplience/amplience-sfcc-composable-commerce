import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {resolveSiteFromUrl} from '../../../utils/site-utils'
import {getTargetLocale} from '../../../utils/locale'
import {useMultiStyleConfig} from '@chakra-ui/react'

// Components
import {Box, Skeleton} from '@chakra-ui/react'

// Project Components
import Seo from '../../../components/amplience/seo'
import Author from '../../../components/amplience/author'
import AuthorCard from '../../../components/amplience/author-card'

// Constants
import {MAX_CACHE_AGE} from '../../../constants'
import {useAmpRtv} from '../../../utils/amplience/rtv'
import {AmplienceContextProvider} from '../../../contexts/amplience'
import {AmplienceAPI} from '../../../amplience-api'
import AmplienceWrapper from '../../../components/amplience/wrapper'
import {truncate} from '../../../utils/amplience/string'

/**
 * This is an example blog author page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 */
const AuthorPage = ({page, pageVse}) => {
    const [pageModel, setPageModel] = useState(page)

    useEffect(() => {
        if (pageModel != page) {
            setPageModel(page)
        }
    }, [page])

    useAmpRtv((model) => {
        // handle form model change
        setPageModel(model.content)
    })

    const styles = useMultiStyleConfig('Author')

    const pageBody = (
        <Box data-testid="amplience-page" layerStyle="page" {...styles.container}>
            {pageModel == undefined ? (
                <Skeleton height="200px" />
            ) : (
                <>
                    <Seo
                        title={pageModel.seo?.title || truncate(pageModel.name, 160)}
                        description={pageModel.seo?.description || truncate(pageModel.about, 290)}
                        keywords={pageModel.seo?.keywords}
                        noIndex={pageModel.seo?.noindex}
                    />
                    <Box {...styles.content}>
                        <AmplienceWrapper fetch={{key: 'authors/slot/top'}}></AmplienceWrapper>
                        <AuthorCard item={pageModel} variant={"horizontal"} />
                    </Box>
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

AuthorPage.getTemplateName = () => 'authorpage'

AuthorPage.shouldGetProps = ({previousLocation, location}) =>
    !previousLocation || previousLocation.pathname !== location.pathname

AuthorPage.getProps = async ({req, res, params, location, api, ampClient}) => {
    const {authorId} = params

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

    let page

    if (authorId) {
        const authorKey = 'author/' + authorId

        page = await (await client.fetchContent([{key: authorKey}], {locale: targetLocale})).pop()
    }

    return {
        targetLocale,
        page,
        pageVse
    }
}

AuthorPage.propTypes = {
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool,
    targetLocale: PropTypes.date,
    page: PropTypes.object,
    pageVse: PropTypes.string
}

export default AuthorPage
