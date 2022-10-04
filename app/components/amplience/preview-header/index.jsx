/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, { useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Button,
    IconButton,
    useMultiStyleConfig,
    Drawer,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Wrap,
    WrapItem,
    Text
} from '@chakra-ui/react'
import { SettingsIcon } from '@chakra-ui/icons'
import { useIntl } from 'react-intl'
import moment from 'moment'

import { useContext } from 'react'
import { AmplienceContext } from '../../../contexts/amplience'
import useNavigation from '../../../hooks/use-navigation'

const timestampToString = (intl, timestamp) => {
    if (timestamp == 0) {
        return intl.formatMessage({
            id: 'amplience.preview.edition',
            defaultMessage: 'Edition Preview '
        })
    }

    const date = new Date(timestamp)
    return date.toLocaleString()
}

const PreviewHeader = ({ vse, vseTimestamp, customerGroups, ...otherProps }) => {
    const intl = useIntl()
    const styles = useMultiStyleConfig('PreviewHeader')

    const { groups, updateGroups } = useContext(AmplienceContext)
    const { currentEnv, setNewCurrentEnv } = useContext(AmplienceContext)
    const { envs } = useContext(AmplienceContext)

    const [previewDate, setPreviewDate] = useState(moment(vseTimestamp).format('YYYY-MM-DD'))
    const [previewTime, setPreviewTime] = useState(moment(vseTimestamp).format('HH:mm:ss'))
    const [previewTimestamp, setPreviewTimestamp] = useState(vseTimestamp)
    const [previewCustomerGroups, setPreviewCustomerGroups] = useState(groups || [])
    const [matchVisible, setMatchVisible] = useState(true)
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
        if (vse) {
            document.cookie = `vse=${vse};`
            document.cookie = `vse-timestamp=${vseTimestamp};`
        }
    }, [vse, vseTimestamp])

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

    useEffect(() => {
        const m = moment(`${previewDate} ${previewTime}`, `YYYY-MM-DD HH:mm:ss`)
        setPreviewTimestamp(m.unix() * 1000)
    }, [previewDate, previewTime])

    const deleteCookie = (name) => {
        document.cookie = name + '=; max-age=0;'
    }

    const clearVse = () => {
        deleteCookie('vse')
        deleteCookie('vse-timestamp')
        window.location.assign('/')
    }

    const updateVseTimestamp = () => {
        const regExp = /(.*-.*)-(.*)(\.staging.bigcontent.io)/
        const matches = vse.match(regExp)
        const newVse = `${matches[1]}-${previewTimestamp}.staging.bigcontent.io`
        window.location.assign(`/?vse=${newVse}&vse-timestamp=${previewTimestamp}`)
    }

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

    const handleNewCurrentEnv = (e) => {
        const env = JSON.parse(decodeURIComponent(e.target.dataset.env))
        setNewCurrentEnv(env)
        vse = env.vse
        navigate(`/?vse=${env.vse}`)
        onClose()
        window.location.reload()
    }

    const {isOpen, onToggle, onClose} = useDisclosure()

    const currentHub = envs.find(item => {
        if ( !vseTimestamp) {
            return item.vse === vse
        } else {
            const regExp = /(.*)-(.*)-(.*)(\.staging.bigcontent.io)/
            const matches = vse.match(regExp)
            const originalVse = `${matches[1]}.staging.bigcontent.io`
            return item.vse === originalVse
        }
    }).hub


    return (
        <>
            <IconButton
                icon={<SettingsIcon />}
                onClick={onToggle}
                {...styles.previewIcon}
            />

            <Drawer 
                placement={'left'}
                onClose={onClose} 
                isOpen={isOpen} 
                size={'sm'}
                trapFocus={false}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader 
                        textAlign='center' 
                        borderBottomWidth="1px" 
                        paddingTop="40px" 
                        paddingBottom="40px">
                        Preview Settings
                    </DrawerHeader>
                    <DrawerBody padding={3}>
                        {vseTimestamp ? (
                            <Box {...styles.container} {...otherProps}>
                                <Text style={{fontWeight: 700, color: 'red'}}>
                                    {intl.formatMessage({
                                        id: 'amplience.preview.active',
                                        defaultMessage: 'Preview Active'
                                    })}
                                </Text>
                                <Text>
                                    Date: <input
                                        id="preview-date"
                                        type="date"
                                        value={previewDate}
                                        onChange={(x) =>
                                            setPreviewDate(x.target.value)
                                        }
                                        min={moment().format(
                                            'YYYY-MM-DD'
                                        )}
                                    />
                                </Text>
                                <Text>
                                    Time: <input
                                        id="preview-time"
                                        type="time"
                                        value={previewTime}
                                        onChange={(x) =>
                                            setPreviewTime(x.target.value)
                                        }
                                    />
                                </Text>
                                <Text>
                                    {previewTimestamp !== vseTimestamp && (
                                        <Button
                                            style={{marginRight: 10}}
                                            onClick={updateVseTimestamp}
                                        >
                                            Update
                                        </Button>
                                    )}
                                    <Button onClick={clearVse}>
                                        {intl.formatMessage({
                                            id: 'amplience.preview.cancel',
                                            defaultMessage: 'Cancel'
                                        })}
                                    </Button>
                                </Text>
                            </Box>
                        ) : <></>}

                        <Box
                            style={{
                                padding: 20,
                                marginBottom: 20,
                                border: '1px solid #fba9ed'
                            }}
                        >
                            <p><b>Environments</b></p>
                            <p>
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
                            </p>
                        </Box>

                        <Box
                            style={{
                                padding: 20,
                                marginBottom: 20,
                                border: '1px solid #fba9ed'
                            }}
                        >
                            { 
                                vse && envs &&
                                <>
                                    <Text>
                                        <b>Visualisation Details</b>
                                    </Text>
                                    <Text style={{fontSize: '13px'}}>
                                        <b>Hub Name</b><br/>{currentHub}
                                    </Text>
                                    <Text style={{fontSize: '13px'}}>
                                        <b>VSE</b><br/> {vse}
                                    </Text>
                                    <Text style={{fontSize: '13px'}}>
                                        <b>Locale</b><br/>{otherProps.locale || intl.locale}
                                    </Text>
                                    <Text style={{fontSize: '13px'}}>
                                        <b>Content ID</b><br/>{otherProps.contentId}
                                    </Text>
                                </>
                            }
                        </Box>

                        <Box
                            style={{
                                padding: 20,
                                marginBottom: 20,
                                border: '1px solid #fba9ed'
                            }}
                        >
                            <p>
                                <b>Personalisation</b>
                            </p>
                            <Button
                                size='xs'
                                onClick={() => setMatchVisible(!matchVisible)}
                                margin={'10px 0'}
                            >
                                {matchVisible ? intl.formatMessage({
                                    id: 'amplience.preview.hideMatches',
                                    defaultMessage: 'Hide matches'
                                }) : intl.formatMessage({
                                    id: 'amplience.preview.showMatches',
                                    defaultMessage: 'Show matches'
                                })}
                            </Button>
                            <Text style={{fontSize: '13px'}}>
                                <b>Customer groups</b>
                            </Text>
                            <Wrap spacing={2} paddingTop={4}>
                                {customerGroups.sort().map((group, index) => {
                                    const groupColor = previewCustomerGroups.includes(group)
                                        ? 'blue'
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
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

PreviewHeader.propTypes = {
    vse: PropTypes.string,
    vseTimestamp: PropTypes.number,
    customerGroups: PropTypes.array
}

export default PreviewHeader
