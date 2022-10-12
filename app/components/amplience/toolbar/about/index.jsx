import {Box, Heading, Slider, SliderFilledTrack, SliderMark, SliderThumb, SliderTrack, Text, useMultiStyleConfig} from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../../wrapper'


const AboutPanel = ({vse, hubname, locale, contentId, toolbarOpacity, setToolbarOpacity}) => {
    const styles = useMultiStyleConfig('PreviewHeader')

    return (
        <Box {...styles.box} {...styles.panelText}>
            <AmplienceWrapper fetch={{key: 'rich-text/amplience-toolbar'}}></AmplienceWrapper>
            <Heading mt={4} mb={2} as='h2' size='xs'>Toolbar Opacity</Heading>
            <Slider 
                aria-label='Toolbar Opacity' 
                defaultValue={toolbarOpacity * 200 - 100} 
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