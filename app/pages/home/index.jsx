/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import { useIntl } from 'react-intl'

// Components
import {
    Box} from '@chakra-ui/react'

// Project Components

// Others

// Constants
import {
    MAX_CACHE_AGE,
    HOME_SHOP_PRODUCTS_CATEGORY_ID,
    HOME_SHOP_PRODUCTS_LIMIT
} from '../../constants'
import fetchContent from '../../amplience/api'

import { JSONTree } from 'react-json-tree'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Home = ({ homepage, slots, productSearchResult, isLoading }) => {
    const intl = useIntl()

    return <Box layerStyle="page">
        <div>
            {homepage && <div><b>key: 'homepage'</b><JSONTree data={homepage} hideRoot={true} /></div>}
        </div>
        {slots.map(slot => (<div><b>slot: '{slot._meta.name}'</b><JSONTree data={slot} hideRoot={true} /></div>))}
    </Box>
}

Home.getTemplateName = () => 'home'

Home.shouldGetProps = ({ previousLocation, location }) =>
    !previousLocation || previousLocation.pathname !== location.pathname

Home.getProps = async (props) => {
    if (props.res) {
        props.res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    const productSearchResult = await props.api.shopperSearch.productSearch({
        parameters: {
            refine: [`cgid=${HOME_SHOP_PRODUCTS_CATEGORY_ID}`, 'htype=master'],
            limit: HOME_SHOP_PRODUCTS_LIMIT
        }
    })

    const homepage = await (await fetchContent([{ key: 'homepage' }])).pop()
    const slots = await (await fetchContent(homepage.slots.map(slot => ({ id: slot.id }))))
    return { homepage, slots, productSearchResult }
}

Home.propTypes = {
    /**
     * The search result object showing all the product hits, that belong
     * in the supplied category.
     */
    productSearchResult: PropTypes.object,
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool
}

export default Home
