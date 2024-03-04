// THIS COMPONENT IS FOR DEMO PURPOSES ONLY
import React from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Heading, Stack, useMultiStyleConfig} from '@chakra-ui/react'

const BrightcoveVideo = ({title, accountId, videoId, playerId, textAlign = 'Left', ...props}) => {
    const styles = useMultiStyleConfig('Brightcove')

    return (
        <Box {...styles.container} {...props}>
            <Heading
                as="h1"
                fontSize={{base: 'md', md: 'xl', lg: '2xl'}}
                maxWidth={{base: 'full'}}
                mb={4}
                textAlign={{base: 'center', md: textAlign.toLowerCase()}}
                {...styles.heading}
            >
                {title}
            </Heading>
            <Stack {...styles.stackContainer}>
                {playerId && (
                    <Flex {...styles.imageContainer}>
                        <Box position={'relative'} width={'full'}>
                            <div style={{position: 'relative', display: 'block'}}>
                                <div style={{paddingTop: '56.25%'}}>
                                    <iframe
                                        src={`https://players.brightcove.net/${accountId}/${playerId}_default/index.html?videoId=${videoId}`}
                                        allowfullscreen=""
                                        allow="encrypted-media"
                                        style={{
                                            position: 'absolute',
                                            top: '0px',
                                            right: '0px',
                                            bottom: '0px',
                                            left: '0px',
                                            width: '100%',
                                            height: '100%'
                                        }}
                                    ></iframe>
                                </div>
                            </div>
                        </Box>
                    </Flex>
                )}
            </Stack>
        </Box>
    )
}

BrightcoveVideo.displayName = 'BrightcoveVideo'

BrightcoveVideo.propTypes = {
    title: PropTypes.string,
    textAlign: PropTypes.string,
    accountId: PropTypes.string,
    videoId: PropTypes.string,
    playerId: PropTypes.string
}

export default BrightcoveVideo
