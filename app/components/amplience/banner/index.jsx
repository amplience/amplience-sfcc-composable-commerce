import React, {useRef} from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Image, Link, useMultiStyleConfig} from '@chakra-ui/react'
import {getImageUrl} from '../../../utils/amplience/image'

const Banner = ({image, clickThru, ...props}) => {
    const styles = useMultiStyleConfig('Hero', {})
    const imageRef = useRef()
    let src = ''
    let alt = ''
    if (image && image?.image && image?.image?.image) {
        src = getImageUrl(image?.image?.image) + `?${image?.image?.query}&fmt=auto`
        alt = image?.imageAltText
    }

    return (
        <Box {...styles.container} {...props}>
            {image?.image?.image && (
                <Flex {...styles.imageContainer}>
                    <Box position={'relative'} width={'full'}>
                        {clickThru && (
                            <Link href={clickThru}>
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
                            </Link>
                        )}
                        {!clickThru && (
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
                        )}
                    </Box>
                </Flex>
            )}
        </Box>
    )
}

Banner.displayName = 'Banner'

Banner.propTypes = {
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
    clickThru: PropTypes.string
}

export default Banner
