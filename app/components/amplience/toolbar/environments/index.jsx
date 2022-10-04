import {Box, Button, Text, useMultiStyleConfig} from '@chakra-ui/react'
import React, {useState, useEffect} from 'react'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types'

import { useContext } from 'react'
import { AmplienceContext } from '../../../../contexts/amplience'
import useNavigation from '../../../../hooks/use-navigation'

const EnvironmentsPanel = ({vse, hubname, locale, contentId}) => {
    const intl = useIntl()
    const styles = useMultiStyleConfig('PreviewHeader')
    const { envs } = useContext(AmplienceContext)
    const navigate = useNavigation()
    const [currentHub, setCurrentHub] = useState({})

    const handleNewCurrentEnv = (e) => {
        const env = JSON.parse(decodeURIComponent(e.target.dataset.env))
        setCurrentHub(env.hub)
        navigate(`/?vse=${env.vse}&vse-timestamp=null`)
        window.location.reload()
    }
    
    useEffect(() => {
        const hub = envs.find(item => {
            const regExp = /(.*)-(.*)-(.*)(\.staging.bigcontent.io)/
            const matches = vse.match(regExp)
            if (matches) {
                const originalVse = `${matches[1]}.staging.bigcontent.io`
                return item.vse === originalVse
            } else {
                return item.vse === vse
            }
        }).hub
        setCurrentHub(hub)
    }, [])

    return (
        <Box {...styles.box}>
            {
                vse && envs.map(env => {
                    if (env.hub == currentHub) {
                        return <Text style={{fontSize: '13px'}}>
                                <b>{env.name} ({env.hub})</b><br/>
                            </Text>
                    } else {
                        return <>
                            <Button 
                                style={{fontSize: '13px'}}
                                variant="link" 
                                onClick={handleNewCurrentEnv} 
                                data-env={encodeURIComponent(JSON.stringify(env))}>
                                    {env.name} ({env.hub})
                            </Button>
                            <br/>
                        </>
                    }
                })
            }
        </Box>
    )
}

EnvironmentsPanel.propTypes = {
    vse: PropTypes.string,
    hubname: PropTypes.string,
    locale: PropTypes.string,
    contentId: PropTypes.string
}

export default EnvironmentsPanel;