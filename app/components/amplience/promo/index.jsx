import React from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Image, Stack, useMultiStyleConfig} from '@chakra-ui/react'
import Button from '../button'
import {getImageUrl} from '../../../utils/amplience/image'
import AmplienceMarkdown from '../markdown'
import styled from '@emotion/styled'

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
const Promo = ({
                  headline,
                  img,
                  clickThru,
                  coupon,
                  promotionalLanguage,
                  productSku,
                  ...props
              }) => {
    const styles = useMultiStyleConfig('Hero', {})
    let src = ''
    let alt = ''
    if (img) {
        src = getImageUrl(img.image)
        alt = img.alt
    }

    return (
        <Contain>
            <Box
                {...styles.container}
                {...props}
            >
                <Stack
                    {...styles.stackContainer}
                    justifyContent={{base: "unset"}}
                    alignItems={{base: "unset"}}
                >
                    <Stack {...styles.textContainer} textAlign={{base: 'center'}}
                        position={{base: 'unset', md: 'absolute'}}>
                        
                        <AmplienceMarkdown content={headline} className="amp-rich-text" />

                        {headline}

                        {clickThru && (
                            <Box maxWidth={{base: 'full', md: '75%'}}>
                                <Button label={promotionalLanguage} url={clickThru}></Button>
                            </Box>
                        )}
                    </Stack>
                    {img?.image && (
                        <Flex
                            {...styles.imageContainer}
                        >
                            <Box position={'relative'} width={'full'}>
                                <Image
                                    fit={'cover'}
                                    align={'center'}
                                    width={'100%'}
                                    height={'100%'}
                                    src={src}
                                    alt={alt}
                                />
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
     * Hero component image
     */
    img: PropTypes.shape({
        image: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            endpoint: PropTypes.string,
            defaultHost: PropTypes.string
        }),
        alt: PropTypes.string
    }),
    /**
     * Click Thru
     */
    clickThru: PropTypes.string,
    headline: PropTypes.string,
    promotionalLanguage: PropTypes.string,
    coupon: PropTypes.shape({
        code: PropTypes.string,
        limit: PropTypes.number
    }),
}

export default Promo
