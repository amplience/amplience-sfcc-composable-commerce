import React, { useState, useEffect } from 'react'
// Algolia
import algoliasearch from 'algoliasearch/lite';

// Components
import Button from '../../../components/amplience/button';
import { SearchIcon } from '../../../components/icons';
import {
    Box,
    Heading,
    SimpleGrid,
    Input,
    InputGroup,
    InputLeftElement,
    VStack,
    Text,
    Image,
    useMultiStyleConfig,
    Select
} from '@chakra-ui/react'



/**
 * This is an example blog page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const BlogLanding = (props) => {

    const [results, setResults] = useState([]);
    const [query, setQuery] = useState('');
    const [authors, setAuthors] = useState([]);
    const [author, setAuthor] = useState('');
    const [tags, setTags] = useState([]);
    const [tag, setTag] = useState('');
    const [categories, setCategories] = useState([]);
    const [category, setCategory] = useState('');

    const algoliaID = '4BS5I6EVVD'
    const algoliaKey = 'fa9be8756d95a97f0021f0aba6f02bc4'
    const algoliaIndexName = 'sfcccompdev.blog-staging'
    const numItems = 8;

    const searchClient = algoliasearch(algoliaID, algoliaKey);
    const index = searchClient.initIndex(algoliaIndexName);

    const facetHitsToArray = (list) => {
        let facetArray = []
        for (const property in list) {
            facetArray.push({ value: property, count: list[property] })
        }
        return facetArray;

    }

    const fetchResults = () => {
        // Lets get the facets
        console.log("What is the query, ", query)
        let filtersArray = []
        if (tag) {
            filtersArray.push('tags:' + tag)
        }
        if (author) {
            filtersArray.push('author.name:' + author)
        }
        if (category) {
            filtersArray.push('categories.name:' + category)
        }
        console.log(filtersArray)
        index.search(query, {
            facets: ['tags', 'author.name', 'categories.name'],
            facetFilters: filtersArray,
            hitsPerPage: numItems
        }).then((results) => {
            setTags(facetHitsToArray(results.facets.tags))
            setCategories(facetHitsToArray(results.facets['categories.name']))
            setAuthors(facetHitsToArray(results.facets['author.name']))
            // Need to set the results of the renders
            setResults(results.hits)

            console.log("Combined results:", results);
        });
    }

    useEffect(fetchResults, [query, tag, author, category]);

    const onSearchInputChange = (e) => {
        const input = e.target.value;
        setQuery(input)
    }

    const onTagDropDownChanged = (e) => {
        const input = e.target.value;
        setTag(input)
    }
    const onAuthorDropDownChanged = (e) => {
        const input = e.target.value;
        setAuthor(input)
    }
    const onCategoryDropDownChanged = (e) => {
        const input = e.target.value;
        setCategory(input)
    }



    function BlogCard(props) {
        const {
            item,
            key,
            ...other
        } = props;
        const content = props.item
        const styles = useMultiStyleConfig('ProductTile')

        /// the URL should be the delivery key
        const linkurl = `/${content.deliveryKey}`;
        const imageurl = `${content.image}&aspect-1:1&w=400`
        return (
            <Box {...styles.container}>


                {content.name && (
                    <Heading as="h1">{content.name}</Heading>
                )}
                {content.image && (
                    <Image
                        fit={'cover'}
                        align={'center'}
                        width={'100%'}
                        height={'100%'}
                        src={imageurl}
                        alt={content.name}
                    />
                )}
                {content.description && (
                    <Text color={'gray.700'} fontWeight={600}>
                        {content.description}
                    </Text>
                )}
                {content.deliveryKey && (
                    <Box paddingTop="2" width={{ base: 'full', md: 'auto' }}>
                        <Button label="View" url={linkurl} target='_self'></Button>
                    </Box>
                )}


            </Box>
        );
    }

    return (
        <Box data-testid="amplience-page" layerStyle="page">
            <VStack>
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
                    />
                </InputGroup>
                <SimpleGrid columns={[1, 1, 3]} spacing='40px'>
                    <Select placeholder='Select Tags' onChange={(e) => onTagDropDownChanged(e)}>
                        {
                            tags.map((item, index) => {
                                var text = item.value + ` (${item.count})`
                                return <option value={item.value}>{text}</option>
                            })
                        }
                    </Select>
                    <Select placeholder='Select Categories' onChange={(e) => onCategoryDropDownChanged(e)}>
                        {
                            categories.map((item, index) => {
                                var text = item.value + ` (${item.count})`
                                return <option value={item.value}>{text}</option>
                            })
                        }
                    </Select>
                    <Select placeholder='Select Authors' onChange={(e) => onAuthorDropDownChanged(e)}>
                        {
                            authors.map((item, index) => {
                                var text = item.value + ` (${item.count})`
                                return <option value={item.value}>{text}</option>
                            })
                        }
                    </Select>
                </SimpleGrid>
            </VStack>
            <SimpleGrid
                columns={[1, 2, 3, 4]}
                spacingX={10}
                spacingY={{ base: 12, lg: 16 }}
            >
                {
                    results.map((item, index) => {
                        return <BlogCard item={item} key={index} />
                    })
                }
            </SimpleGrid>
        </Box>
    )
}

BlogLanding.getTemplateName = () => 'bloglanding'

BlogLanding.propTypes = {
}

export default BlogLanding
