import React from 'react'
// Algolia
import algoliasearch from 'algoliasearch/lite';
import { InstantSearch, SearchBox, Hits, RefinementList } from 'react-instantsearch-hooks-web';

// Components
import Button from '../../../components/amplience/button';
import {
    Box,
    Heading,
    SimpleGrid,
    VStack,
    Text,
    Flex,
    Stack,
    Container,
    Link,
    Image
} from '@chakra-ui/react'



/**
 * This is an example blog page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const BlogLanding = () => {

    const searchClient = algoliasearch('4BS5I6EVVD', 'fa9be8756d95a97f0021f0aba6f02bc4');

    function Hit({ hit }) {
        console.log({hit});

        /// the URL should be the delivery key
        const linkurl = `/${hit.deliveryKey}`;
        const imageurl = `${hit.image}&aspect-1:1&w=400`
        return (
            <Container>
            <Box
            background={'white'}
            boxShadow={'0px 2px 2px rgba(0, 0, 0, 0.1)'}
            borderRadius={'4px'}
        >
            <VStack>
            {hit.name && (    
                <Heading as="h1">{hit.name}</Heading>
            )}
            {hit.image && ( 
            <Image
                                fit={'cover'}
                                align={'center'}
                                width={'100%'}
                                height={'100%'}
                                src={imageurl}
                                alt={hit.name}
                            />
             )}
             {hit.description && ( 
            <Text color={'gray.700'} fontWeight={600}>
                {hit.description}
            </Text>
             )}
             {hit.deliveryKey && ( 
            <Box paddingTop="2" width={{base: 'full', md: 'auto'}}>
                <Button label="View" url={linkurl} target='_self'></Button>
            </Box>
             )}
            </VStack>
          </Box>
          </Container>
        );
      }

    // TODO: render author, image

    return  (
        <Box data-testid="amplience-page" layerStyle="page">
            <InstantSearch searchClient={searchClient} indexName="sfcccompdev.blog-staging">
            
                <SearchBox />
                <RefinementList attribute="tags" />
                <RefinementList attribute="categories" />
                <RefinementList attribute="author.name" />
                <SimpleGrid
                    columns={{base: 1, md: 1, lg: 3}}
                    spacingX={{base: 1, md: 4}}
                    spacingY={{base: 4, md: 14}}
                >
                    <Hits hitComponent={Hit} />
                </SimpleGrid>
            </InstantSearch>
        </Box>
    )
}

BlogLanding.getTemplateName = () => 'bloglanding'

BlogLanding.propTypes = {
}

export default BlogLanding
