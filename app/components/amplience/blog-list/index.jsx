import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'

import {hub, searchAPIKey, searchAppID} from '../../../../config/amplience/default'
import algoliasearch from 'algoliasearch/lite'
import useLocale from '../../../hooks/use-locale'
import {AmplienceContext} from '../../../contexts/amplience'
import BlogCard from '../../../components/amplience/blog-card'
import {SimpleGrid, useMultiStyleConfig} from '@chakra-ui/react'

const ITEMS_COUNT = 8

const DefaultRender = ({items = []}) => {
    const styles = useMultiStyleConfig('BlogLanding')

    return (<SimpleGrid {...(styles && styles.resultsGrid)}>
        {items.map((item, index) => {
            return <BlogCard item={item} key={index} />
        })}
    </SimpleGrid>)
}

/**
 * BlogList component could be used anywhere
 */
const BlogList = ({
                      numItems = ITEMS_COUNT,
                      page = 0,
                      query = '',
                      filtersArray = [],
                      RenderComponent = DefaultRender,
                      fetchAll = false,
                      ...otherProps
                  }) => {
    const [results, setResults] = useState([])
    const locale = useLocale()
    const {vse} = useContext(AmplienceContext)

    const siteLocale = locale.id.toLowerCase()

    const indexType = vse ? 'staging' : 'production'
    const algoliaIndexName = hub + '.blog-' + indexType + '-' + siteLocale

    const searchClient = algoliasearch(searchAppID, searchAPIKey)
    const index = searchClient.initIndex(algoliaIndexName)

    useEffect(() => {
        let active = true

        const fetchResults = async () => {
            let items = []
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
                    const page = Math.ceil((nbHits - items.length) / numItems);
                    const {hits} = await getItems(page)
                    items = items.concat(hits)
                }
            }

            setResults(items)
        }

        fetchResults()

        return () => (active = false)
    }, [filtersArray, numItems, fetchAll])

    return <RenderComponent items={results} {...otherProps} />
}

BlogList.displayName = 'BlogList'

BlogList.propTypes = {
    numItems: PropTypes.number,
    filtersArray: PropTypes.arrayOf(PropTypes.any),
    RenderComponent: React.Component,
    styles: PropTypes.any
}

export default BlogList
