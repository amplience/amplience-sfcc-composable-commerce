import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {resolveSiteFromUrl} from '../../../utils/site-utils'
import {getTargetLocale} from '../../../utils/locale'
import {useMultiStyleConfig} from '@chakra-ui/react'

// Components
import {Avatar, Box, Heading, Skeleton} from '@chakra-ui/react'

// Project Components
import Seo from '../../../components/amplience/seo'
import Link from '../../../components/link'

// Amplience Rich Text Component
import AmplienceRichText from '../../../components/amplience/rich-text'

// Constants
import {MAX_CACHE_AGE} from '../../../constants'
import {useAmpRtv} from '../../../utils/amplience/rtv'
import {useCategories} from '../../../hooks/use-categories'
import {AmplienceContextProvider} from '../../../contexts/amplience'
import {AmplienceAPI} from '../../../amplience-api'

import {getImageUrl} from '../../../utils/amplience/image'
import AmpliencePOIBackgroundImage from '../../../components/amplience/poi-background-image'

/**
 * This is an example blog page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const BlogPage = ({page, pageVse}) => {
    const [pageModel, setPageModel] = useState(undefined)

    const {categories} = useCategories()

    useEffect(() => {
        setPageModel(page)
    }, [page])

    useAmpRtv((model) => {
        // handle form model change
        setPageModel(model.content)
    })

    const styles = useMultiStyleConfig('BlogPage')

    const authorUrl = `/blog?author=${encodeURIComponent(pageModel.author.name)}`

    const pageBody = (
        <Box data-testid="amplience-page" layerStyle="page" {...styles.container}>
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
                    <AmpliencePOIBackgroundImage image={pageModel.image?.image} {...styles.header}>
                        <Box {...styles.headerContainer}>
                            <Box {...styles.topInfo}>
                                {new Date(pageModel.date).toDateString()} | {pageModel.readtime} Min
                            </Box>
                            <Heading
                                as="h1"
                                fontSize={{base: '4xl', md: '5xl', lg: '6xl'}}
                                maxWidth={{base: '75%', md: '50%', lg: 'md'}}
                                {...styles.title}
                            >
                                {pageModel.seo?.title}
                            </Heading>

                            <Box {...styles.infoBlock}>
                                <Box {...styles.author}>
                                    <Link to={authorUrl}>
                                        <Avatar
                                            name={pageModel.author.name}
                                            src={getImageUrl(pageModel.author.image)}
                                            size="md"
                                            {...styles.authorImage}
                                        ></Avatar>
                                    </Link>
                                    <Box {...styles.authorInfo}>
                                        <Link to={authorUrl} {...styles.authorName}>
                                            {pageModel.author.name}
                                        </Link>
                                        <Box {...styles.authorRole}>{pageModel.author.role}</Box>
                                    </Box>
                                </Box>
                                <Box {...styles.tags}>
                                    {pageModel.tags.map((tag, index) => (
                                        <Link
                                            key={index}
                                            to={`/blog?tag=${encodeURIComponent(tag)}`}
                                            {...styles.tag}
                                        >
                                            {tag}
                                        </Link>
                                    ))}

                                    {pageModel.categories.map((category, index) => (
                                        <Link
                                            key={index}
                                            to={`/blog?category=${encodeURIComponent(category.id)}`}
                                            {...styles.category}
                                        >
                                            {categories[category.id]?.name ?? 'Unknown Category'}
                                        </Link>
                                    ))}
                                </Box>
                            </Box>
                        </Box>
                    </AmpliencePOIBackgroundImage>
                </>
            )}
            {pageModel == undefined ? (
                <Skeleton height="200px" />
            ) : (
                <Box {...styles.content}>
                    <AmplienceRichText content={pageModel.content.richText}></AmplienceRichText>
                </Box>
            )}
        </Box>
    )

    if (pageVse) {
        return <AmplienceContextProvider vse={pageVse}>{pageBody}</AmplienceContextProvider>
    } else {
        return pageBody
    }
}

BlogPage.getTemplateName = () => 'blogpage'

BlogPage.shouldGetProps = ({previousLocation, location}) =>
    !previousLocation || previousLocation.pathname !== location.pathname

BlogPage.getProps = async ({req, res, params, location, api, ampClient}) => {
    const {blogId, blogId2} = params

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

    if (blogId) {
        const blogKey = 'blog/' + blogId + (blogId2 != null ? '/' + blogId2 : '')

        page = await (await client.fetchContent([{key: blogKey}], {locale: targetLocale})).pop()
    }

    return {
        page,
        pageVse
    }
}

BlogPage.propTypes = {
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool,
    page: PropTypes.object,
    pageVse: PropTypes.string
}

export default BlogPage
