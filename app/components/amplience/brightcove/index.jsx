import React from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Heading, Stack, useMultiStyleConfig} from '@chakra-ui/react'
import Button from '../button'

const Brightcove = ({
                  title,
                  video,
                  playerType,
                  actions,
                  textAlign = 'Left',
                  justifyContent = 'Left',
                  alignItems = 'Center',
                  fullWidth = false,
                  variant,
                  ...props
              }) => {
    const styles = useMultiStyleConfig('Brightcove', {variant: variant || (fullWidth && 'full')})
    const playerID = playerType.split(' - ')[1]
    const type = playerType.split(' - ')[0]
    const videoID = type == 'Single' ? video : ''
    const playlistID = type == 'Playlist' ? video : ''
    const param = type == 'Single' ? 'videoId' : 'playlistId'

    return (
        <Box
            {...styles.container}
            {...props}
        >
            <Stack
                {...styles.stackContainer}
                justifyContent={{base: "unset", md: justifyContent.toLowerCase()}}
                alignItems={{base: "unset", md: alignItems.toLowerCase()}}
            >
                <Stack {...styles.textContainer} textAlign={{base: 'center', md: textAlign.toLowerCase()}}
                       position={fullWidth ? {base: 'unset', md: 'absolute'} : ''}>
                    <Heading
                        as="h1"
                        fontSize={{base: 'md', md: '4xl', lg: '6xl'}}
                        maxWidth={{base: 'full', md: '75%'}}
                        {...styles.heading}
                    >
                        {title}
                    </Heading>

                    {actions && (
                        <Box maxWidth={{base: 'full', md: '75%'}}>
                            {actions.map((props, ind) => (
                                <Button key={ind} label={props.label} url={props.url}></Button>
                            ))}
                        </Box>
                    )}
                </Stack>
                {playerID && (
                    <Flex
                        {...styles.imageContainer}
                    >
                        <Box position={'relative'} width={'full'}>

                            <div style={{position: 'relative', display: 'block'}}>
                                <div style={{paddingTop: '56.25%'}}>
                                    <iframe 
                                        src={`https://players.brightcove.net/6415707867001/${playerID}_default/index.html?${param}=${video}`}
                                        allowfullscreen="" 
                                        allow="encrypted-media" 
                                        style={{position: 'absolute', top: '0px', right: '0px', bottom: '0px', left: '0px', width: '100%', height: '100%'}}>
                                    </iframe>
                                </div>
                            </div>

                        </Box>
                    </Flex>
                )}
            </Stack>
        </Box>
    )
}

Brightcove.displayName = 'Brightcove'

Brightcove.propTypes = {
    /**
     * Brightcove video or playlist ID
     */
    video: PropTypes.string,
    /**
     * Brightcove video player type
     */
    playerType: PropTypes.string,
    /**
     * Brightcove component main title
     */
    title: PropTypes.string,
    /**
     * Call to action component(s)
     */
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            url: PropTypes.string
        })
    ),
    /**
     * Brightcove button label
     */
    label: PropTypes.string,
    /**
     * Brightcove button url
     */
    url: PropTypes.string,
    fullWidth: PropTypes.bool
}

export default Brightcove
