/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {forwardRef, useRef} from 'react'
import PropTypes from 'prop-types'
import {AspectRatio, Box, Heading, IconButton, Skeleton, Stack, useMultiStyleConfig} from '@chakra-ui/react'
import {ChevronLeftIcon, ChevronRightIcon} from '../../icons'
import BlogCard from '../blog-card'

/**
 * Renders a scrollable, horizontal container of products with native scroll
 * snapping and manual button controls.
 */
const Scroller = forwardRef(
    (
        {
            title,
            items,
            isLoading,
            scrollProps,
            RenderComponent = BlogCard,
            itemWidth = {base: '70%', md: '40%', lg: 'calc(25% - 10px)'},
            productTileProps,
            ...props
        },
        ref
    ) => {
        const scrollRef = useRef()
        const styles = useMultiStyleConfig('Scroller')


        // Renders nothing if we aren't loading and have no items.
        if ((!items || items.length < 1) && !isLoading) {
            return null
        }

        // Scroll the container left or right by 100%. Passing no args or `1`
        // scrolls to the right, and passing `-1` scrolls left.
        const scroll = (direction = 1) => {
            scrollRef.current?.scrollBy({
                top: 0,
                left: direction * window.innerWidth,
                behavior: 'smooth'
            })
        }

        return (
            <Box position="relative" data-testid="scroller" ref={ref} {...styles.container}>
                <Stack spacing={6} {...props}>
                    {isLoading && <Skeleton height={6} width="150px" m="auto" />}

                    {title && !isLoading && (
                        <Heading as="h2" fontSize="xl" textAlign="center">
                            {title}
                        </Heading>
                    )}

                    <Stack
                        ref={scrollRef}
                        direction="row"
                        spacing={4}
                        wrap="nowrap"
                        overflowX="scroll"
                        px={{base: 3, md: 8, lg: 0}}
                        {...scrollProps}
                        sx={{
                            scrollPadding: {base: 16, md: 32, lg: 0},
                            scrollSnapType: 'x mandatory',
                            WebkitOverflowScrolling: 'touch', // Safari touch scrolling needed for scroll snap
                            ...scrollProps?.sx
                        }}
                    >
                        {(isLoading ? [0, 1, 2, 3] : items).map((item, idx) => {
                            return (
                                <Box
                                    key={item?.id || idx}
                                    flex="0 0 auto"
                                    width={itemWidth}
                                    style={{scrollSnapAlign: 'start'}}
                                >
                                    {isLoading ? (
                                        <Stack data-testid="product-scroller-item-skeleton">
                                            <AspectRatio ratio={1}>
                                                <Skeleton />
                                            </AspectRatio>
                                        </Stack>
                                    ) : (
                                        <RenderComponent item={item}/>
                                    )}
                                </Box>
                            )
                        })}
                    </Stack>
                </Stack>

                {items?.length > 4 && (
                    <>
                        <Box
                            display={{
                                base: 'none',
                                lg: 'block'
                            }}
                            position="absolute"
                            top="50%"
                            left={{base: 0, lg: 3}}
                            transform="translateY(-50%)"
                        >
                            <IconButton
                                data-testid="product-scroller-nav-left"
                                aria-label="Scroll items left"
                                icon={<ChevronLeftIcon color="black" />}
                                borderRadius="full"
                                colorScheme="whiteAlpha"
                                onClick={() => scroll(-1)}
                            />
                        </Box>

                        <Box
                            display={{
                                base: 'none',
                                lg: 'block'
                            }}
                            position="absolute"
                            top="50%"
                            right={{base: 0, lg: 3}}
                            transform="translateY(-50%)"
                        >
                            <IconButton
                                data-testid="product-scroller-nav-right"
                                aria-label="Scroll items right"
                                icon={<ChevronRightIcon color="black" />}
                                borderRadius="full"
                                colorScheme="whiteAlpha"
                                onClick={() => scroll(1)}
                            />
                        </Box>
                    </>
                )}
            </Box>
        )
    }
)

Scroller.displayName = 'Scroller'

Scroller.propTypes = {
    title: PropTypes.string,
    products: PropTypes.array,
    isLoading: PropTypes.bool,
    scrollProps: PropTypes.object,
    itemWidth: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    productTileProps: PropTypes.oneOfType([PropTypes.func, PropTypes.object])
}

export default Scroller
