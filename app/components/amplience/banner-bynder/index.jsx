import React from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Image, Link, useMultiStyleConfig} from '@chakra-ui/react'

const BannerBynder = ({
                  bynder,
                  clickThru,
                  ...props
              }) => {
    const styles = useMultiStyleConfig('Hero', {})
    let src = ''
    if (bynder) {
        src = bynder.files?.webImage?.url
    }

    return (
        <Box
            {...styles.container}
            {...props}
        >
            {
                src && (
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

BannerBynder.displayName = 'BannerBynder'

BannerBynder.propTypes = {
    /**
     * Hero component image
     */
    bynder: PropTypes.shape({
        image: PropTypes.shape({
            files: PropTypes.shape({
                webImage: PropTypes.shape({
                    url: PropTypes.string
                })
            })
        }),
    }),
    /**
     * Click Thru
     */
    clickThru: PropTypes.string
}

export default BannerBynder
