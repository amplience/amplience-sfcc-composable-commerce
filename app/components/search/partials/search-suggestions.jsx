/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Grid, GridItem, Heading, HStack, Stack} from '@chakra-ui/react'
import RecentSearches from './recent-searches'
import Suggestions from './suggestions'
import ProductSuggestions from '../../amplience/product-suggestions'

const SearchSuggestions = ({recentSearches, searchSuggestions, closeAndNavigate}) => {
    const useSuggestions = searchSuggestions && searchSuggestions?.categorySuggestions?.length
    return (
        <Flex w={'100%'} wrap={'wrap'}>
            <Box p={4} w={{sm: '100%', lg: '300px'}}>
                {useSuggestions ? (
                    <Fragment>
                        {
                        searchSuggestions?.phraseSuggestions &&
                        <Heading as='h2' fontSize={'md'} textTransform={'uppercase'}>Searches</Heading> 
                        }
                        <Suggestions
                            closeAndNavigate={closeAndNavigate}
                            suggestions={searchSuggestions?.phraseSuggestions}
                        />
                        {
                        searchSuggestions?.categorySuggestions &&
                        <Heading as='h2' fontSize={'md'} textTransform={'uppercase'}>Categories</Heading> 
                        }
                        <Suggestions
                            closeAndNavigate={closeAndNavigate}
                            suggestions={searchSuggestions?.categorySuggestions}
                        />
                        {/* {
                        searchSuggestions?.categorySuggestions &&
                        <Heading as='h2' fontSize={'md'} textTransform={'uppercase'}>Brands</Heading> 
                        }
                        <Suggestions
                            closeAndNavigate={closeAndNavigate}
                            suggestions={searchSuggestions?.brandSuggestions}
                        /> */}
                        <Heading as='h2' mt={4} fontSize={'md'} textTransform={'uppercase'}>Pages</Heading> 
                    </Fragment>
                ) : (
                    <RecentSearches
                        recentSearches={recentSearches}
                        closeAndNavigate={closeAndNavigate}
                    />
                )}
            </Box>
            <Box p={4} w={{sm: '100%', lg: '470px'}}>
                {
                    searchSuggestions?.productSuggestions &&
                    <Heading as='h2' mb={4} fontSize={'md'} textTransform={'uppercase'}>Products</Heading> 
                }
                <ProductSuggestions 
                    closeAndNavigate={closeAndNavigate}
                    suggestions={searchSuggestions?.productSuggestions} 
                />
            </Box>
        </Flex> 
    )
}

SearchSuggestions.propTypes = {
    recentSearches: PropTypes.array,
    searchSuggestions: PropTypes.object,
    closeAndNavigate: PropTypes.func
}

export default SearchSuggestions
