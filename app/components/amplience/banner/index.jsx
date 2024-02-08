import React from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Image, Link, Stack, useMultiStyleConfig} from '@chakra-ui/react'
import {getImageUrl} from '../../../utils/amplience/image'

const Banner = ({
                  img,
                  clickThru,
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
        <Box
            {...styles.container}
            {...props}
        >
            {
                img?.image && (
                    <Flex
                        {...styles.imageContainer}
                    >
                        <Box position={'relative'} width={'full'}>
                            {
                                clickThru && (
                                    <Link href={clickThru}>
                                        <Image
                                            fit={'cover'}
                                            align={'center'}
                                            width={'100%'}
                                            height={'100%'}
                                            src={src}
                                            alt={alt} 
                                        />
                                    </Link>
                                )
                            }
                            {
                                !clickThru && (
                                    <Image
                                        fit={'cover'}
                                        align={'center'}
                                        width={'100%'}
                                        height={'100%'}
                                        src={src}
                                        alt={alt} 
                                    />
                                )
                            }
                        </Box>
                    </Flex>
                )
            }
        </Box>
    )
}

Banner.displayName = 'Banner'

Banner.propTypes = {
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
    clickThru: PropTypes.string
}

export default Banner
