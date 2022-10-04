import {Box, Heading, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, useMultiStyleConfig} from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'


const AboutPanel = ({vse, hubname, locale, contentId, toolbarOpacity, setToolbarOpacity}) => {
    const styles = useMultiStyleConfig('PreviewHeader')

    return (
        <Box {...styles.box}>
            <Heading mb={4} as='h2' size='xs'>Details</Heading>
            <Text fontSize='xs' style={{paddingBottom: 8}}>
                The Amplience Toolbar alllows you to easily navigate preview and visualisation using the different panels available.
            </Text>
            <Text fontSize='xs' style={{paddingBottom: 8}}>
                The Preview Panel allows you to do time travel in your events and editions.
            </Text>
            <Text fontSize='xs' style={{paddingBottom: 8}}>
                The Environments Panel allows you to switch from your default environment to additional ones (for instance UAT, Test, etc.).
            </Text>
            <Text fontSize='xs' style={{paddingBottom: 8}}>
                The Personalisation Panel allows you to show personalisation rules match, and simulate customer groups to test your rules.
            </Text>
            <Heading mt={4} mb={2} as='h2' size='xs'>Toolbar Opacity</Heading>
            <Slider 
                aria-label='Toolbar Opacity' 
                defaultValue={100} 
                step={1} 
                colorScheme={'ampliencePink'}
                onChange={(val) => setToolbarOpacity(0.5 + val/200.0)}>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb borderColor={'gray.500'} borderWidth={2} />
            </Slider>
        </Box>
    )
}

AboutPanel.propTypes = {
    vse: PropTypes.string,
    hubname: PropTypes.string,
    locale: PropTypes.string,
    contentId: PropTypes.string
}

export default AboutPanel;