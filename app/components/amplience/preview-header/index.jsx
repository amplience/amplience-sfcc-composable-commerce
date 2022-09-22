/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useEffect, useState} from 'react'
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
import {SettingsIcon} from '@chakra-ui/icons'
import {useIntl} from 'react-intl'
import moment from 'moment'

import {Table, Tbody, Tr, Td, TableContainer} from '@chakra-ui/react'

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

const PreviewHeader = ({vse, vseTimestamp, customerGroups, ...otherProps}) => {
    const intl = useIntl()
    const styles = useMultiStyleConfig('PreviewHeader')

    const [previewDate, setPreviewDate] = useState(moment(vseTimestamp).format('YYYY-MM-DD'))
    const [previewTime, setPreviewTime] = useState(moment(vseTimestamp).format('HH:mm:ss'))
    const [previewTimestamp, setPreviewTimestamp] = useState(vseTimestamp)
    const [previewCustomerGroups, setPreviewCustomerGroups] = useState([])

    useEffect(() => {
        if (vse) {
            document.cookie = `vse=${vse};`
            document.cookie = `vse-timestamp=${vseTimestamp};`
        }
    }, [vse, vseTimestamp])

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
        window.location.assign(`/?vse=${vse}&vse-timestamp=${previewTimestamp}`)
    }

    const clickCustomerGroup = (obj) => {
        if (previewCustomerGroups.includes(obj.target.value)) {
            setPreviewCustomerGroups(previewCustomerGroups.filter(x => x !== obj.target.value))
        }
        else {
            setPreviewCustomerGroups([...previewCustomerGroups, obj.target.value])
        }
    }    

    const {isOpen, onOpen, onClose} = useDisclosure()

    return (
        <>
            <IconButton
                width={5}
                zIndex={10000}
                position={'fixed'}
                opacity={0.5}
                icon={<SettingsIcon />}
                onClick={onOpen}
            />

            <Drawer placement={'top'} onClose={onClose} isOpen={isOpen}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader borderBottomWidth="1px">
                        Preview/Visualization Settings
                    </DrawerHeader>
                    <DrawerBody>
                        {vseTimestamp && (
                            <Box {...styles.container} {...otherProps}>
                                <TableContainer>
                                    <Table>
                                        <Tbody>
                                            <Tr>
                                                <Td>
                                                    {intl.formatMessage({
                                                        id: 'amplience.preview.active',
                                                        defaultMessage: 'Preview Active'
                                                    })}{' '}
                                                </Td>
                                                <Td>
                                                    <input
                                                        id="preview-date"
                                                        type="date"
                                                        value={previewDate}
                                                        onChange={(x) =>
                                                            setPreviewDate(x.target.value)
                                                        }
                                                        min={moment(vseTimestamp).format(
                                                            'YYYY-MM-DD'
                                                        )}
                                                    />
                                                </Td>
                                                <Td>
                                                    <input
                                                        id="preview-time"
                                                        type="time"
                                                        value={previewTime}
                                                        onChange={(x) =>
                                                            setPreviewTime(x.target.value)
                                                        }
                                                    />
                                                </Td>
                                                <Td>
                                                    {previewTimestamp !== vseTimestamp && (
                                                        <Button
                                                            variant="link"
                                                            onClick={updateVseTimestamp}
                                                        >
                                                            Update
                                                        </Button>
                                                    )}
                                                </Td>
                                                <Td>
                                                    <Button variant="link" onClick={clearVse}>
                                                        {intl.formatMessage({
                                                            id: 'amplience.preview.cancel',
                                                            defaultMessage: 'Cancel'
                                                        })}
                                                    </Button>
                                                </Td>
                                            </Tr>
                                        </Tbody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        )}

                        <Box
                            style={{
                                padding: 20,
                                marginBottom: 20,
                                backgroundColor: '#fef4fd',
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

                        <Box>
                            <Wrap spacing={4}>
                                {customerGroups.map(group => {
                                    const groupColor = previewCustomerGroups.includes(group) ? 'blue' : 'gray'
                                    return <WrapItem><Button value={group} colorScheme={groupColor} onClick={clickCustomerGroup}>{group}</Button></WrapItem>
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
    vseTimestamp: PropTypes.number
}

export default PreviewHeader
