import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import {hub, searchAPIKey, searchAppID} from '../../../../config/amplience/default'
import algoliasearch from 'algoliasearch/lite'
import useLocale from '../../../hooks/use-locale'
import {AmplienceContext} from '../../../contexts/amplience'
import BlogCard from '../../../components/amplience/blog-card'
import {AspectRatio, Heading, SimpleGrid, Skeleton, Stack, useMultiStyleConfig} from '@chakra-ui/react'
import Scroller from '../scroller'

const ITEMS_COUNT = 8

const DefaultRender = ({items = [], title = '', isLoading}) => {
    const styles = useMultiStyleConfig('BlogLanding')

    return (<>
            {isLoading && <Skeleton height={6} width="150px" m="auto" />}
            {title && !isLoading (
                <Heading as="h2" fontSize="xl" textAlign="center">
                    {title}
                </Heading>
            )}
            <SimpleGrid {...(styles && styles.resultsGrid)}>
                {items.map((item, index) => {
                    return isLoading ? (
                        <Stack data-testid="product-scroller-item-skeleton">
                            <AspectRatio ratio={1}>
                                <Skeleton />
                            </AspectRatio>
                        </Stack>
                    ) : (<BlogCard item={item} key={index} />)
                })}
            </SimpleGrid>
        </>
    )
}

const renderMapping = {
    'Grid': DefaultRender,
    'Scroller': Scroller
}

/**
 * BlogList component could be used anywhere
 */
const BlogList = ({
                      numItems = ITEMS_COUNT,
                      page = 0,
                      query = '',
                      author,
                      category,
                      tag,
                      filtersArray = [],
                      RenderComponent,
                      render,
                      fetchAll = false,
                      ...otherProps
                  }) => {
    const [results, setResults] = useState([])
    const [isLoading, selLoading] = useState(true)
    const locale = useLocale()
    const {vse} = useContext(AmplienceContext)
    const Renderer = RenderComponent || renderMapping[render] || DefaultRender

    const siteLocale = locale.id.toLowerCase()

    const indexType = vse ? 'staging' : 'production'
    const algoliaIndexName = hub + '.blog-' + indexType + '-' + siteLocale

    const searchClient = algoliasearch(searchAppID, searchAPIKey)
    const index = searchClient.initIndex(algoliaIndexName)

    useEffect(() => {
        let active = true

        const fetchResults = async () => {
            let items = []
            if (author && author.name) {
                filtersArray.push('author.name:' + author.name)
            }
            if (tag && tag.name) {
                filtersArray.push('tags.deliveryKey:' + tag._meta.deliveryKey)
            }
            if (category) {
                filtersArray.push('categories.id:' + category)
            }
            const getItems = async (page) => {
                return index.search(query, {
                    facetFilters: filtersArray,
                    hitsPerPage: numItems,
                    page
                })
            }
            const {hits, nbHits} = await getItems(page)
            items = items.concat(hits)

            if (fetchAll) {
                while (items.length < nbHits) {
                    const page = Math.ceil((nbHits - items.length) / numItems)
                    const {hits} = await getItems(page)
                    items = items.concat(hits)
                }
            }

            setResults(items)
            selLoading(false);
        }

        fetchResults()

        return () => (active = false)
    }, [filtersArray, author, numItems, fetchAll, tag, category])

    return Renderer ? (<Renderer items={results} isLoading={isLoading} {...otherProps} />) : results
}

BlogList.displayName = 'BlogList'

/*BlogList.propTypes = {
    numItems: PropTypes.number,
    render: PropTypes.string,
    author: PropTypes.any,
    category: PropTypes.any,
    tag: PropTypes.any,
    filtersArray: PropTypes.arrayOf(PropTypes.any),
    RenderComponent: React.Component,
    styles: PropTypes.any
}*/

export default BlogList
