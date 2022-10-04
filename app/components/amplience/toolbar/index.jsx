/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    IconButton,
    useMultiStyleConfig,
    Drawer,
    useDisclosure,
    DrawerOverlay,
    DrawerContent,
    DrawerHeader,
    DrawerBody,
    Slide,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionIcon,
    AccordionPanel
} from '@chakra-ui/react'
import { SettingsIcon, CloseIcon, ArrowBack } from '@chakra-ui/icons'
import VisualisationPanel from './visualisation'
import PersonalisationPanel from './personalisation'
import PreviewPanel from './preview'
import EnvironmentsPanel from './environments'
import { AmplienceLogo } from '../../icons'

const items = [
    {
        title: 'Preview',
        Component: PreviewPanel,
        visibility: ({ vseTimestamp }) => !!vseTimestamp
    }, 
    {
        title: 'Environments',
        Component: EnvironmentsPanel
    }, 
    {
        title: 'Visualisation',
        Component: VisualisationPanel
    }, 
    {
        title: 'Personalisation',
        Component: PersonalisationPanel
    }
]

const AccordionItemRender = ({ title, Component, ...otherProps }) => {
    const styles = useMultiStyleConfig('PreviewHeader')

    return (<AccordionItem {...styles.section}>
        <AccordionButton {...styles.button}>
            <Box flex="1" textAlign="left" {...styles.sectionTitle}>
                <h2>{title}</h2>
            </Box>
            <AccordionIcon />
        </AccordionButton>
        <AccordionPanel {...styles.pannel}>
            <Component {...otherProps} />
        </AccordionPanel>
    </AccordionItem>)
}

const Toolbar = (props) => {
    const styles = useMultiStyleConfig('PreviewHeader')

    const { isOpen, onToggle, onClose } = useDisclosure()

    return (
        <>
            <IconButton
                icon={<SettingsIcon />}
                onClick={onToggle}
                style={{
                    display: isOpen ? 'none' : 'block'
                }}
                {...styles.previewIcon}
            />
            <Slide direction={'left'} in={isOpen} style={{ zIndex: 1400 }}>
                <IconButton
                    icon={<CloseIcon />}
                    onClick={onToggle}
                    {...styles.previewIcon}
                    {...styles.previewIconClose}
                    left={{ base: 'calc(100vw - 50px)', lg: '460px' }}
                />
            </Slide>
            <Drawer
                placement={'left'}
                onClose={onClose}
                isOpen={isOpen}
                size={'sm'}
                trapFocus={false}>
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerHeader{...styles.header}>
                        <AmplienceLogo color={"#000000"} width={'unset'} height={'unset'} />
                    </DrawerHeader>
                    <DrawerBody padding={0}>
                        <Accordion allowToggle={true} defaultIndex={[0]} allowMultiple={true}>
                            {items.map((data, index) => {
                                data.visibility = data.visibility || (() => true)
                                if (data.visibility && typeof data.visibility === 'function' && data.visibility({ ...props })) {
                                    return (<AccordionItemRender key={index} {...data} {...props} />)
                                }
                            })}
                        </Accordion>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

Toolbar.propTypes = {
    vse: PropTypes.string,
    vseTimestamp: PropTypes.number,
    customerGroups: PropTypes.array,
    showVse: PropTypes.bool
}

export default Toolbar
