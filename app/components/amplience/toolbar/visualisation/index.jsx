import amplience from '../../../../../config/amplience/default.js'
import {Box, useMultiStyleConfig} from '@chakra-ui/react'
import React from 'react'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types'

const VisualisationPanel = ({vse, hubname, locale, contentId}) => {
    const intl = useIntl()
    const styles = useMultiStyleConfig('PreviewHeader')

    return (
        <Box {...styles.box}>
            <p>
                <b>Hub Name</b><br />{hubname || amplience.hub}
            </p>
            <p>
                <b>VSE</b><br /> {vse}
            </p>
            <p>
                <b>Locale</b><br />{locale || intl.locale}
            </p>
            <p>
                <b>Content ID</b><br />{contentId}
            </p>
        </Box>
    )
}

VisualisationPanel.propTypes = {
    vse: PropTypes.string,
    hubname: PropTypes.string,
    locale: PropTypes.string,
    contentId: PropTypes.string
}

export default VisualisationPanel;