import {Box, Text, useMultiStyleConfig} from '@chakra-ui/react'
import React from 'react'
import PropTypes from 'prop-types'


const AboutPanel = ({vse, hubname, locale, contentId}) => {
    const styles = useMultiStyleConfig('PreviewHeader')

    return (
        <Box {...styles.box}>
            <Text style={{fontSize: '13px', paddingBottom: 8}}>
                The Amplience Toolbar alllows you to easily navigate preview and visualisation using the different panels available.
            </Text>
            <Text style={{fontSize: '13px', paddingBottom: 8}}>
                The Preview Panel allows you to do time travel in your events and editions.
            </Text>
            <Text style={{fontSize: '13px', paddingBottom: 8}}>
                The Environments Panel allows you to switch from your default environment to additional ones (for instance UAT, Test, etc.).
            </Text>
            <Text style={{fontSize: '13px', paddingBottom: 8}}>
                The Personalisation Panel allows you to show personalisation rules match, and simulate customer groups to test your rules.
            </Text>
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