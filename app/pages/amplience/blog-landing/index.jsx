import React, {useState, useEffect, useContext} from 'react'
// Algolia
import algoliasearch from 'algoliasearch/lite'

import amplience from '/config/amplience/default.js'
import {AmplienceContext} from '../../../contexts/amplience'
// Amplience Wrapper Component
import AmplienceWrapper from '/app/components/amplience/wrapper'
import {useCategories} from '../../../hooks/use-categories'

// Components
import BlogCard from '../../../components/amplience/blog-card'
import {SearchIcon} from '../../../components/icons'
import useLocale from '../../../hooks/use-locale'
import {
    Box,
    SimpleGrid,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    Text,
    Select,
    useMultiStyleConfig
} from '@chakra-ui/react'

/**
 * This is an example blog page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const BlogLanding = () => {
    const locale = useLocale()
    const siteLocale = locale.id.toLowerCase()

    const {vse} = useContext(AmplienceContext)
    const {categories} = useCategories()

    const [results, setResults] = useState([])
    const [query, setQuery] = useState('')
    const [authors, setAuthors] = useState([])
    const [author, setAuthor] = useState('')
    const [tags, setTags] = useState([])
    const [tag, setTag] = useState('')
    const [thecategories, setCategories] = useState([])
    const [category, setCategory] = useState('')
    const [currentIndex, setCurrentIndex] = useState(0)
    const [maxIndex, setMaxIndex] = useState(0)
    const [numBlogs, setNumBlogs] = useState(0)
    const [pages, setPages] = useState([])

    const algoliaID = amplience.searchAppID
    const algoliaKey = amplience.searchAPIKey
    let indexType = vse ? 'staging' : 'production'
    // TODO: Put back once data is there
    const algoliaIndexName = amplience.hub + '.blog-' + indexType + '-' + siteLocale
    //const algoliaIndexName = 'sfcccompdev.blog-staging'
    const numItems = 8

    const searchClient = algoliasearch(algoliaID, algoliaKey)
    const index = searchClient.initIndex(algoliaIndexName)

    const facetHitsToArray = (list, isCategory) => {
        let facetArray = []
        for (const property in list) {
            let myLabel = property
            if (isCategory) {
                myLabel = categories[property]?.name || property
            }
            facetArray.push({value: property, label: myLabel, count: list[property]})
        }
        return facetArray
    }

    useEffect(function mount() {
        const url = new URL(window.location)
        const queryParam = url.searchParams.get('query')
        const pageParam = url.searchParams.get('page')
        const authorParam = url.searchParams.get('author')
        const categoryParam = url.searchParams.get('category')
        const tagParam = url.searchParams.get('tag')

        setCurrentIndex(pageParam || 0)
        setAuthor(authorParam || '')
        setCategory(categoryParam || '')
        setTag(tagParam || '')
        setQuery(queryParam || '')
    }, [])

    const fetchResults = () => {
        // Lets get the facets
        let filtersArray = []
        if (tag) {
            filtersArray.push('tags:' + tag)
        }
        if (author) {
            filtersArray.push('author.name:' + author)
        }
        if (category) {
            filtersArray.push('categories.id:' + category)
        }
        index
            .search(query, {
                facets: ['tags', 'author.name', 'categories.id'],
                facetFilters: filtersArray,
                hitsPerPage: numItems,
                page: currentIndex
            })
            .then((results) => {
                setMaxIndex(results.nbPages)
                setNumBlogs(results.nbHits)
                let pagesArray = []
                for (var i = 0; i < maxIndex; i++) {
                    pagesArray.push(i + 1)
                }
                setPages(pagesArray)
                setTags(facetHitsToArray(results.facets.tags))
                setCategories(facetHitsToArray(results.facets['categories.id'], true))
                setAuthors(facetHitsToArray(results.facets['author.name']))
                setResults(results.hits)

                console.log('Combined results:', results)
            })
    }

    useEffect(fetchResults, [query, tag, author, category, currentIndex, maxIndex])

    const setUrlParams = (paramname, paramvalue) => {
        const url = new URL(window.location)
        url.searchParams.set(paramname, paramvalue)
        window.history.pushState(null, '', url.toString())
    }

    const onSearchInputChange = (e) => {
        const input = e.target.value
        setUrlParams('query', input)
        setQuery(input)
    }

    const onTagDropDownChanged = (e) => {
        const input = e.target.value
        setUrlParams('tag', input)
        setTag(input)
    }
    const onAuthorDropDownChanged = (e) => {
        const input = e.target.value
        setUrlParams('author', input)
        setAuthor(input)
    }
    const onCategoryDropDownChanged = (e) => {
        const input = e.target.value
        setUrlParams('category', input)
        setCategory(input)
    }

    const onPaginationChanged = (e) => {
        const input = e.target.value
        setUrlParams('page', input)
        setCurrentIndex(input - 1)
    }

    const styles = useMultiStyleConfig('BlogLanding')

    return (
        <Box data-testid="amplience-page" layerStyle="page">
            <AmplienceWrapper fetch={{key: 'blog/slot/top'}}></AmplienceWrapper>
            <VStack paddingTop="10px">
                <InputGroup>
                    <InputLeftElement pointerEvents="none">
                        <SearchIcon />
                    </InputLeftElement>
                    <Input
                        autoComplete="off"
                        id="search-input"
                        onChange={(e) => onSearchInputChange(e)}
                        type="search"
                        variant="filled"
                        placeholder="Search Blogs..."
                    />
                </InputGroup>
                <SimpleGrid {...styles.filters}>
                    <Select placeholder="Select Tags" onChange={(e) => onTagDropDownChanged(e)}>
                        {tags.map((item, index) => {
                            var text = item.label + ` (${item.count})`
                            return (
                                <option value={item.value} key={index}>
                                    {text}
                                </option>
                            )
                        })}
                    </Select>
                    <Select
                        placeholder="Select Categories"
                        onChange={(e) => onCategoryDropDownChanged(e)}
                    >
                        {thecategories.map((item, index) => {
                            var text = item.label + ` (${item.count})`
                            return (
                                <option value={item.value} key={index}>
                                    {text}
                                </option>
                            )
                        })}
                    </Select>
                    <Select
                        placeholder="Select Authors"
                        onChange={(e) => onAuthorDropDownChanged(e)}
                    >
                        {authors.map((item, index) => {
                            var text = item.label + ` (${item.count})`
                            return (
                                <option value={item.value} key={index}>
                                    {text}
                                </option>
                            )
                        })}
                    </Select>
                </SimpleGrid>
                <Text>{numBlogs} Blog Posts</Text>
            </VStack>
            <SimpleGrid {...styles.resultsGrid}>
                {results.map((item, index) => {
                    return <BlogCard item={item} key={index} />
                })}
            </SimpleGrid>
            <Box {...styles.pagination}>
                <Text>
                    Page {currentIndex + 1} of {maxIndex}
                </Text>
                <Select
                    placeholder="Select Page"
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
}

BlogLanding.getTemplateName = () => 'bloglanding'

BlogLanding.propTypes = {}

export default BlogLanding
