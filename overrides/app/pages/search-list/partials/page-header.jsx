/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {Fragment} from 'react'
import PropTypes from 'prop-types'
import {isServer} from '@salesforce/retail-react-app/app/utils/utils'
// Components
import {Box, Heading, Flex, Text, Fade} from '@chakra-ui/react'

// Project Components
import Breadcrumb from '@salesforce/retail-react-app/app/components/breadcrumb'

const PageHeader = ({category, totalResult, isLoading, searchQuery, ...otherProps}) => {
    return (
        <Box {...otherProps} data-testid="sf-product-list-breadcrumb">
            {/* Breadcrumb */}
            {category && <Breadcrumb categories={category.parentCategoryTree} />}
            {searchQuery && <Text>Search Results for</Text>}
            {/* Category Title */}
            <Flex>
                <Heading as="h2" size="lg" marginRight={2}>
                    {`${category?.name || searchQuery || ''}`}
                </Heading>
                <Heading as="h2" size="lg" marginRight={2}>
                    {isServer ? (
                        <Fragment>({totalResult})</Fragment>
                    ) : (
                        // Fade in the total when available. When it's changed or not available yet, do not render it
                        !isLoading && <Fade in={true}>({totalResult})</Fade>
                    )}
                </Heading>
            </Flex>
        </Box>
    )
}

PageHeader.propTypes = {
    category: PropTypes.object,
    totalResult: PropTypes.number,
    isLoading: PropTypes.bool,
    searchQuery: PropTypes.string
}

export default PageHeader
