import {Box, Text, useMultiStyleConfig} from '@chakra-ui/react'
import React from 'react'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types'

import { useContext } from 'react'
import { AmplienceContext } from '../../../../contexts/amplience'

const VisualisationPanel = ({vse, locale, contentId}) => {
    const intl = useIntl()
    const styles = useMultiStyleConfig('PreviewHeader')
    const { defaultEnv, envs } = useContext(AmplienceContext)

    const currentHub = envs?.find(item => {
        const regExp = /(.*)-(.*)-(.*)(\.staging.bigcontent.io)/
        const matches = vse.match(regExp)
        if (matches) {
            const originalVse = `${matches[1]}.staging.bigcontent.io`
            return item.vse === originalVse
        } else {
            return item.vse === vse
        }
    })?.hub || defaultEnv.hub

    return (
        <Box {...styles.box}>
            { 
                vse && ( envs || defaultEnv ) &&
                <>
                    <Text style={{fontSize: '13px', paddingBottom: 8}}>
                        <b>Hub Name</b><br/>{currentHub}
                    </Text>
                    <Text style={{fontSize: '13px', paddingBottom: 8}}>
                        <b>VSE</b><br/> {vse}
                    </Text>
                    <Text style={{fontSize: '13px', paddingBottom: 8}}>
                        <b>Locale</b><br/>{locale || intl.locale}
                    </Text>
                    {
                        contentId && 
                        <Text style={{fontSize: '13px', paddingBottom: 8}}>
                            <b>Content ID</b><br/>{contentId}
                        </Text>
                    }
                </>
            }
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