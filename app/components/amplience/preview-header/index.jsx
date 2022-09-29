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
    WrapItem
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

    const { isOpen, onToggle, onClose } = useDisclosure()

    return (
        <>
            <IconButton
                width={5}
                zIndex={10000}
                position={'fixed'}
                opacity={0.5}
                icon={<SettingsIcon />}
                onClick={onToggle}
            />

            <Drawer placement={'left'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Preview Settings
                    </DrawerHeader>
                    <DrawerBody padding={3}>
                        {vseTimestamp ? (
                            <Box {...styles.container} {...otherProps}>
                                <p style={{fontWeight: 700, color: 'red'}}>
                                    {intl.formatMessage({
                                        id: 'amplience.preview.active',
                                        defaultMessage: 'Preview Active'
                                    })}
                                </p>
                                <p>
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
                                </p>
                                <p>
                                    Time: <input
                                        id="preview-time"
                                        type="time"
                                        value={previewTime}
                                        onChange={(x) =>
                                            setPreviewTime(x.target.value)
                                        }
                                    />
                                </p>
                                <p>
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
                                </p>
                            </Box>
                        ) : <></>}

                        <Box
                            style={{
                                padding: 20,
                                marginBottom: 20,
                                border: '1px solid #fba9ed'
                            }}
                        >
                            <p>
                                <b>Hub Name:</b> {otherProps.hubname}
                            </p>
                            <p>
                                <b>VSE:</b> {vse}
                            </p>
                            <p>
                                <b>Locale:</b> {otherProps.locale || intl.locale}
                            </p>
                            <p>
                                <b>Content ID:</b> {otherProps.contentId}
                            </p>
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
                            <p>
                                <b>Customer groups</b>
                            </p>
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
