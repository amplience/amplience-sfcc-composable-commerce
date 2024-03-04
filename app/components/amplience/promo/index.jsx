import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Image, Stack, Text, Center, useMultiStyleConfig} from '@chakra-ui/react'
import Button from '../button'
import {getImageUrl} from '../../../utils/amplience/image'
import ProductTile from '../product-tile'
import AmplienceMarkdown from '../markdown'
import styled from '@emotion/styled'
import {useCommerceAPI} from '../../../commerce-api/contexts'
import {handleAsyncError} from '../../../commerce-api/utils'

const Contain = styled(Box)`
    .amp-rich-text h1 {
        font-size: 3rem;
        font-weight: 400;
        margin-bottom: 0.4em;
    }

    .amp-rich-text h2 {
        font-size: 2.25rem;
        font-weight: 400;
        margin-bottom: 0.4em;
    }

    .amp-rich-text h3 {
        font-size: 1.875rem;
        font-weight: 400;
        margin-bottom: 0.4em;
    }

    .amp-rich-text h4 {
        font-size: 1.5rem;
        font-weight: 400;
        margin-bottom: 0.4em;
    }

    .amp-rich-text h5 {
        font-size: 1.25rem;
        font-weight: 400;
        margin-bottom: 0.4em;
    }

    .amp-rich-text h6 {
        font-size: 0.8rem;
        font-weight: 400;
        margin-bottom: 0.6em;
    }

    .amp-rich-text > p {
        margin-block-end: 1em;
    }

    .amp-rich-text > p > img {
        margin: 0 auto;
    }

    .amp-rich-text img {
        max-height: 50vh;
    }

    .amp-rich-text a {
        color: #0176d3;
        font-weight: 600;
    }

    .amp-rich-text blockquote {
        border-left: 5px solid #c9c9c9;
        padding-inline-start: 1em;
        padding-top: 0.25em;
        padding-bottom: 0.25em;
        margin-inline-start: 1em;
        margin-block-end: 1em;
    }

    .amp-rich-text pre {
        margin-block-end: 1em;
    }

    .amp-rich-text ul {
        margin-inline-start: 1.5em;
        margin-block-end: 1em;
    }

    .amp-rich-text ol {
        margin-inline-start: 1.5em;
        margin-block-end: 1em;
    }
`

const selectImage = (product) => {
    const groups = product.imageGroups
    if (groups == null || groups.length === 0) {
        return {}
    }

    const desiredViewType = 'large'
    const desiredGroup = groups.find((group) => group.viewType === desiredViewType) ?? groups[0]

    return desiredGroup.images[0]
}
const Promo = ({headline, image, clickThru, coupon, promotionalLanguage, productSku, ...props}) => {
    const styles = useMultiStyleConfig('Hero', {})
    const imageRef = useRef()
    let src = ''
    let alt = ''
    if (image && image?.image && image?.image?.image) {
        src = getImageUrl(image?.image?.image) + `?${image?.image?.query}&fmt=auto`
        alt = image?.imageAltText
    }
    const api = useCommerceAPI()
    const [apiProducts, setApiProducts] = useState(null)

    useEffect(() => {
        let active = true

        if (!productSku) {
            // No products likely means that the IDs haven't arrived yet.
            setApiProducts(null)
            return
        }

        handleAsyncError(async () => {
            const response = await api.shopperProducts.getProducts({
                parameters: {ids: [productSku]}
            })

            if (active) {
                const products = response.data.map((product) => ({
                    ...product,
                    productId: product.id,
                    image: selectImage(product)
                }))

                setApiProducts(products)
            }
        })()

        return () => (active = false)
    }, [api, productSku])

    return (
        <Contain>
            <Box {...styles.container} {...props}>
                <Stack
                    {...styles.stackContainer}
                    justifyContent={{base: 'unset'}}
                    alignItems={{base: 'unset'}}
                >
                    <Stack
                        {...styles.textContainer}
                        textAlign={{base: 'center'}}
                        position={{base: 'unset', md: 'absolute'}}
                    >
                        <AmplienceMarkdown content={headline} className="amp-rich-text" />
                        {coupon?.length && (
                            <Box position={'relative'} width={'full'}>
                                <Text>{coupon[0].code}</Text>
                                <Text>{coupon[0].limit}</Text>
                            </Box>
                        )}
                        {clickThru && (
                            <Center>
                                <Box maxWidth={{base: 'full', md: '75%'}}>
                                    <Button label={promotionalLanguage} url={clickThru}></Button>
                                </Box>
                            </Center>
                        )}
                        
                    </Stack>
                    {image?.image?.image && (
                        <Flex {...styles.imageContainer}>
                            <Box position={'relative'} width={'full'}>
                                <picture>
                                    <source
                                        srcSet={`${src}&w=1280&sm=aspect&aspect=16:9`}
                                        media="(min-width: 1280px)"
                                    />
                                    <source
                                        srcSet={`${src}&w=1024&sm=aspect&aspect=2:1`}
                                        media="(min-width: 1024px)"
                                    />
                                    <source
                                        srcSet={`${src}&w=768&sm=aspect&aspect=1.5:1`}
                                        media="(min-width: 768px)"
                                    />
                                    <Image
                                        width={'100%'}
                                        height={'100%'}
                                        src={`${src}&w=768&sm=aspect&aspect=1:1`}
                                        alt={alt}
                                        ref={imageRef}
                                    />
                                </picture>
                                {apiProducts?.length && (
                                    <Box
                                        position={{base: 'unset', md: 'absolute'}}
                                        width={{base: '100%', md: '200px'}}
                                        marginTop={{base: '30px', md: 'unset'}}
                                        style={{
                                            bottom: 10,
                                            right: 10
                                        }}
                                    >
                                        <ProductTile
                                            width={{base: '100%', md: '200px'}}
                                            data-testid="product-scroller-item"
                                            product={apiProducts[0]}
                                            dynamicImageProps={{
                                                widths: ['70vw', '70vw', '40vw', '30vw']
                                            }}
                                        />
                                    </Box>
                                )}
                            </Box>
                        </Flex>
                    )}
                </Stack>
            </Box>
        </Contain>
    )
}

Promo.displayName = 'Promo'

Promo.propTypes = {
    /**
     * New Adaptive Image
     */
    image: PropTypes.shape({
        image: PropTypes.shape({
            image: PropTypes.shape({
                id: PropTypes.string,
                name: PropTypes.string,
                endpoint: PropTypes.string,
                defaultHost: PropTypes.string
            }),
            query: PropTypes.string
        }),
        imageAltText: PropTypes.string
    }),
    /**
     * Click Thru
     */
    clickThru: PropTypes.string,
    headline: PropTypes.string,
    productSku: PropTypes.string,
    promotionalLanguage: PropTypes.string,
    coupon: PropTypes.array
}

export default Promo
