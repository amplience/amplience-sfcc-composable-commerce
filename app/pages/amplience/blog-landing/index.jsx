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
    CloseButton,
    Flex,
    useMultiStyleConfig
} from '@chakra-ui/react'
import { useIntl, FormattedMessage } from 'react-intl'

/**
 * This is an example blog page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const BlogLanding = () => {
    const locale = useLocale()
    const intl = useIntl()
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
    const [userSearch, setUserSearch] = useState(false)

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
        const pageParam = url.searchParams.get('page') || 1
        const authorParam = url.searchParams.get('author')
        const categoryParam = url.searchParams.get('category')
        const tagParam = url.searchParams.get('tag')

        setCurrentIndex(Number(pageParam) - 1 || 0)
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

    const fetchResultsFirstPage = () => {
        if (currentIndex !== 0 && userSearch) {
            setUrlParams('page', 1)
            setCurrentIndex(0)
        } else {
            fetchResults()
        }
    }

    useEffect(fetchResults, [currentIndex])
    useEffect(fetchResultsFirstPage, [query, tag, author, category, maxIndex])

    const setUrlParams = (paramname, paramvalue) => {
        const url = new URL(window.location)
        url.searchParams.set(paramname, paramvalue)
        window.history.pushState(null, '', url.toString())

        setUserSearch(true)
    }

    const onSearchInputChange = (e) => {
        const input = e.target.value
        setUrlParams('query', input)
        setQuery(input)
    }

    const onTagDropDownChanged = (e) => {
        const input = e.target.value
        setUrlParams('tag', input.toLowerCase())
        setTag(input.toLowerCase())
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
    const clearFilter = () => {
        const url = new URL(window.location)

        url.searchParams.delete('query')
        url.searchParams.delete('tag')
        url.searchParams.delete('author')
        url.searchParams.delete('category')

        window.history.pushState(null, '', url.toString())

        setQuery('')
        setTag('')
        setAuthor('')
        setCategory('')
        setUserSearch(true)
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
                        placeholder={intl.formatMessage({
                            id: 'amplience.blog_landing.search_blogs',
                            defaultMessage: 'Search Blog Posts...'})}
                        value={query}
                    />
                </InputGroup>
                <Flex width={'100%'}>
                    <SimpleGrid {...styles.filters}>
                        <Select
                            value={tag}
                            placeholder={intl.formatMessage({
                                id: 'amplience.blog_landing.all_tags',
                                defaultMessage: 'All tags'})}
                            onChange={(e) => onTagDropDownChanged(e)}
                        >
                            {tags.map((item, index) => {
                                var text = item.label + ` (${item.count})`
                                return (
                                    <option value={item.value.toLowerCase()} key={index}>
                                        {text}
                                    </option>
                                )
                            })}
                        </Select>
                        <Select
                            value={category}
                            placeholder={intl.formatMessage({
                                id: 'amplience.blog_landing.all_categories',
                                defaultMessage: 'All categories'})}
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
                            value={author}
                            placeholder={intl.formatMessage({
                                id: 'amplience.blog_landing.all_authors',
                                defaultMessage: 'All authors'})}
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
                    <CloseButton
                        title={intl.formatMessage({
                            id: 'amplience.blog_landing.clear_filters',
                            defaultMessage: 'Clear filters'})}
                        height={'44px'}
                        onClick={clearFilter}
                        variant="unstyled"
                    />
                </Flex>
                <Text>{numBlogs} <FormattedMessage defaultMessage="Blog Posts" id="amplience.blog_landing.blog_posts" /></Text>
            </VStack>
            <SimpleGrid {...styles.resultsGrid}>
                {results.map((item, index) => {
                    return <BlogCard item={item} key={index} />
                })}
            </SimpleGrid>
            <Box {...styles.pagination}>
                <FormattedMessage 
                    defaultMessage="Page {currentPage} of {totalPages}" 
                    id="amplience.blog_landing.pagination" 
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
}

BlogLanding.getTemplateName = () => 'bloglanding'

BlogLanding.propTypes = {}

export default BlogLanding
