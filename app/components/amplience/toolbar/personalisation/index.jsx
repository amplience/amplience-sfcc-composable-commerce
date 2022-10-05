import {Box, Button, useMultiStyleConfig, Wrap, WrapItem, Switch, Text, Heading} from '@chakra-ui/react'
import React, {useContext, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {AmplienceContext} from '../../../../contexts/amplience'
import useNavigation from '../../../../hooks/use-navigation'
import PropTypes from 'prop-types'

const PersonalisationPanel = ({customerGroups, toolbarState}) => {
    const styles = useMultiStyleConfig('PreviewHeader')
    const { groups, updateGroups } = useContext(AmplienceContext)
    const [previewCustomerGroups, setPreviewCustomerGroups] = useState(groups || [])
    const [matchVisible, setMatchVisible] = useState(toolbarState.matchVisible)
    const intl = useIntl()
    const navigate = useNavigation()

    useEffect(() => {
        if (window && !previewCustomerGroups.length) {
            const customerGroups = window.localStorage.getItem('customerGroups')
            if (customerGroups) {
                updateGroups(JSON.parse(customerGroups))
            }
        }
    }, [])

    useEffect(() => {
        if (document) {
            const body = document.getElementsByTagName('body')

            if (body && !matchVisible) {
                body[0].classList.add('matchVisible')
            } else if (body && matchVisible) {
                body[0].classList.remove('matchVisible')
            }
        }

    }, [matchVisible])

    useEffect(() => {
        setPreviewCustomerGroups(groups || [])
    }, [groups])

    const clickCustomerGroup = (obj) => {
        let groups
        if (previewCustomerGroups.includes(obj.target.value)) {
            groups = previewCustomerGroups.filter((x) => x !== obj.target.value)
        } else {
            groups = [...previewCustomerGroups, obj.target.value]
        }

        setPreviewCustomerGroups(groups)
        updateGroups(groups)
        navigate()
    }

    return (
        <Box {...styles.box}>
            <Heading as='h2' size='xs'>Personalisation Rules</Heading>
            <Wrap spacing={2} paddingTop={4} marginBottom={6}>
                <Switch
                    defaultChecked={toolbarState.matchVisible}
                    size='sm'
                    onChange={() => { 
                        toolbarState.matchVisible = !matchVisible
                        setMatchVisible(!matchVisible)
                    }}
                    colorScheme={'ampliencePink'} 
                    isChecked={matchVisible}
                />
                <Text 
                    onClick={() => {
                        toolbarState.matchVisible = !matchVisible
                        setMatchVisible(!matchVisible)
                    }}
                    fontSize='xs'>
                    {
                        intl.formatMessage({
                            id: 'amplience.preview.showMatches',
                            defaultMessage: 'Show matches'
                        })
                    }
                </Text>
            </Wrap>
            <Heading as='h2' size='xs'>Customer groups</Heading>
            <Wrap spacing={2} paddingTop={4}>
                {customerGroups.sort().map((group, index) => {
                    const groupColor = previewCustomerGroups.includes(group)
                        ? 'ampliencePink'
                        : 'gray'
                    return (
                        <WrapItem key={index}>
                            <Button
                                size='xs'
                                height={`${group.length > 30 ? "60px" : "30px"}`}
                                style={{
                                    whiteSpace: "normal",
                                    wordWrap: "break-word"
                                }}
                                value={group}
                                colorScheme={groupColor}
                                onClick={clickCustomerGroup}
                            >
                                {group}
                            </Button>
                        </WrapItem>
                    )
                })}
            </Wrap>
        </Box>
    )
}

PersonalisationPanel.propTypes = {
    customerGroups: PropTypes.array
}

export default PersonalisationPanel;