/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {Text, Button, Stack, Box, HStack, VStack, Grid, GridItem, Skeleton, AspectRatio, SimpleGrid, useBreakpointValue, SkeletonText, Img} from '@chakra-ui/react'
import {useCommerceAPI} from '../../../commerce-api/contexts'
import {handleAsyncError} from '../../../commerce-api/utils'
import AmplienceProductTile from '../product-tile'
import { productUrlBuilder } from '../../../utils/url'
import {HideOnDesktop, HideOnMobile} from '../../responsive'
import DynamicImage from '../../dynamic-image'
import { useCurrency } from '../../../hooks'
import {useIntl} from 'react-intl'

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
    const isMobile = useBreakpointValue({base: true, lg: false, xl: false, xxl: false, xxxl: false})
    const {currency: activeCurrency} = useCurrency()
    const intl = useIntl()

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
            }
        })()

        return () => (active = false)
    }, [api, suggestions])

    return (
        <>
        <SimpleGrid columns={{sm: 1, lg: 3}} spacing={2}>
            {
                isLoading && !isMobile &&
                    [...new Array(6)].map(item => 
                        <Stack>
                            <AspectRatio ratio={1}>
                                <Skeleton />
                            </AspectRatio>
                            <SkeletonText noOfLines={2}/>
                        </Stack>
                    )
            }
            {
                isLoading && isMobile &&
                <Box w={'100%'} alignItems={'flex-start'}>
                    {
                        [...new Array(6)].map(item => 
                            <HStack h={'48px'} gap={4}>
                                <Skeleton w={'40px'} h={'40px'} />
                                <SkeletonText w={'100px'} noOfLines={1}/>
                                <SkeletonText w={'50px'} noOfLines={1}/>
                            </HStack>
                        )
                    }
                </Box>
            }
            {
                apiProducts && 
                apiProducts.map(item=>
                    <Box w={'100%'} alignItems={'flex-start'}>
                        {
                            !isMobile &&
                            <VStack
                                style={{cursor: 'pointer'}}
                                onMouseDown={() => closeAndNavigate(item.link)}
                            >
                                <Img
                                    src={item.image.link}
                                    width={140}
                                    alt={item.image.alt}
                                />
                                <Text fontSize={'xs'} fontWeight={700}>{item.name}</Text>
                                <Text fontSize={'xs'}>
                                {intl.formatNumber(item.price, {
                                    style: 'currency',
                                    currency: item.currency || activeCurrency
                                })}
                                </Text>
                            </VStack>
                        }
                        {
                            isMobile &&
                                <HStack h={'40px'}
                                    gap={4}
                                    style={{cursor: 'pointer'}}
                                    onMouseDown={() => closeAndNavigate(item.link)}
                                >
                                    <Box 
                                        w={'40px'}
                                        style={{minWidth: '40px'}}
                                    >
                                        <DynamicImage
                                            src={`${item.image.disBaseLink || item.image.link}[?sw={width}&q=60]`}
                                            widths={[40]}
                                            imageProps={{
                                                alt: item.image.alt,
                                            }}
                                        />
                                    </Box>
                                    <Text fontSize='xs' fontWeight={700}>{item.name}</Text>
                                    <Text fontSize='xs'>
                                    {intl.formatNumber(item.price, {
                                        style: 'currency',
                                        currency: item.currency || activeCurrency
                                    })}
                                    </Text>
                                </HStack>
                    }
                    </Box>)
            }
        </SimpleGrid>
        </>
    )
}

ProductSuggestions.propTypes = {
    suggestions: PropTypes.array,
    closeAndNavigate: PropTypes.func
}

export default ProductSuggestions
