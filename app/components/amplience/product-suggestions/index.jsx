/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {Text, Button, Stack, Box, HStack, VStack, Grid, GridItem, Skeleton} from '@chakra-ui/react'
import {useCommerceAPI} from '../../../commerce-api/contexts'
import {handleAsyncError} from '../../../commerce-api/utils'
import AmplienceProductTile from '../product-tile'
import { productUrlBuilder } from '../../../utils/url'

const selectImage = (product) => {
    const groups = product.imageGroups
    if (groups == null || groups.length === 0) {
        return {}
    }

    const desiredViewType = 'large'
    const desiredGroup = groups.find((group) => group.viewType === desiredViewType) ?? groups[0]

    return desiredGroup.images[0]
}

const ProductSuggestions = ({suggestions, closeAndNavigate}) => {
    if (!suggestions) {
        return null
    }
    const api = useCommerceAPI()
    const [apiProducts, setApiProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        let active = true

        if (suggestions?.length === 0) {
            // No products likely means that the IDs haven't arrived yet.
            setApiProducts([])
            setIsLoading(true)
            return
        }

        handleAsyncError(async () => {
            const products = suggestions.map(suggestion => suggestion.productId)
            const response = await api.shopperProducts.getProducts({
                parameters: {ids: products.join(',')}
            })

            if (active) {
                const products = response.data.map((product) => ({
                    ...product,
                    productId: product.id,
                    link: productUrlBuilder({id: product.id}),
                    image: selectImage(product)
                }))

                setApiProducts(products)
                setIsLoading(false)
                console.log("API Products:", products)
            }
        })()

        return () => (active = false)
    }, [api, suggestions])

    return (
        <Grid w={'2xl'} templateColumns='repeat(3, 1fr)' gap={2}>
            {
                isLoading &&
                <>
                    <GridItem><Skeleton w={219} h={219}/></GridItem>
                    <GridItem><Skeleton w={219} h={219}/></GridItem>
                    <GridItem><Skeleton w={219} h={219}/></GridItem>
                    <GridItem><Skeleton w={219} h={219}/></GridItem>
                    <GridItem><Skeleton w={219} h={219}/></GridItem>
                    <GridItem><Skeleton w={219} h={219}/></GridItem>
                </>
            }
            {
                apiProducts && 
                apiProducts.map(item=>
                    <GridItem>
                        <AmplienceProductTile 
                            onMouseDown={() => closeAndNavigate(item.link)}
                            product={item}
                        />
                    </GridItem>)
            }
        </Grid>
    )
}

ProductSuggestions.propTypes = {
    suggestions: PropTypes.array,
    closeAndNavigate: PropTypes.func
}

export default ProductSuggestions
