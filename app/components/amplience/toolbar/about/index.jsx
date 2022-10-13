import {
    Box,
    Heading,
    Slider,
    SliderFilledTrack,
    SliderThumb,
    SliderTrack,
    useMultiStyleConfig
} from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../../wrapper'
import styled from '@emotion/styled'

const StyledBox = styled(Box)`
    .matchInfo {
      display: none !important;
    }
  
  p {
    font-size: 0.75rem;
    margin-top: 10px;
    margin-bottom: 10px;
  }
  
  h2 {
    font-size: 0.75rem;
    padding-bottom: 10px;
  }
`

const AboutPanel = ({vse, hubname, locale, contentId, toolbarOpacity, setToolbarOpacity}) => {
    const styles = useMultiStyleConfig('PreviewHeader')

    return (
        <StyledBox {...styles.box}>
            <AmplienceWrapper fetch={{key: 'rich-text/amplience-toolbar'}}></AmplienceWrapper>
            <Heading mt={8} mb={2} as="h2" fontSize="xs">Toolbar Opacity</Heading>
            <Slider
                aria-label="Toolbar Opacity"
                defaultValue={toolbarOpacity * 200 - 100}
                step={1}
                colorScheme={'ampliencePink'}
                onChange={(val) => setToolbarOpacity(0.5 + val / 200.0)}>
                <SliderTrack>
                    <SliderFilledTrack />
                </SliderTrack>
                <SliderThumb borderColor={'gray.500'} borderWidth={2} />
            </Slider>
        </StyledBox>
    )
}

AboutPanel.propTypes = {
    vse: PropTypes.string,
    hubname: PropTypes.string,
    locale: PropTypes.string,
    contentId: PropTypes.string
}

export default AboutPanel