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
    AccordionPanel,
    Heading,
    Text,
    Fade, 
    Button,
    Slider,
    SliderMark,
    SliderTrack,
    SliderFilledTrack,
    SliderThumb
} from '@chakra-ui/react'
import {SettingsIcon, CloseIcon, ChevronLeftIcon} from '@chakra-ui/icons'
import VisualisationPanel from './visualisation'
import PersonalisationPanel from './personalisation'
import PreviewPanel from './preview'
import EnvironmentsPanel from './environments'
import AboutPanel from './about'
import { AmplienceLogo } from '../../icons'

import { useContext } from 'react'
import { AmplienceContext } from '../../../contexts/amplience'
import { useState } from 'react'

const AccordionItemRender = ({ title, Component, ...otherProps }) => {
    const styles = useMultiStyleConfig('PreviewHeader')

    return (<AccordionItem {...styles.section}>
        <AccordionButton {...styles.button}>
            <Box flex="1" textAlign="left" {...styles.sectionTitle}>
                <Heading as='h2' size='xs'>
                    <Text casing='uppercase'>{title}</Text>
                </Heading>
            </Box>
            <AccordionIcon />
        </AccordionButton>
        <AccordionPanel {...styles.pannel}>
            <Component {...otherProps} />
        </AccordionPanel>
    </AccordionItem>)
}

const Toolbar = (props) => {
    const { envs } = useContext(AmplienceContext)

    const items = [
        {
            title: 'Preview',
            Component: PreviewPanel,
            visibility: ({ vseTimestamp }) => !!vseTimestamp
        },
        {
            title: 'Visualisation',
            Component: VisualisationPanel,
            visibility: ( ) => !!props.vse
        },
        {
            title: 'Environments',
            Component: EnvironmentsPanel,
            visibility: () => !!props.vse && envs && envs.length > 0
        },
        {
            title: 'Personalisation',
            Component: PersonalisationPanel
        },
        {
            title: 'About The Toolbar',
            Component: AboutPanel
        }
    ]
    const styles = useMultiStyleConfig('PreviewHeader')

    const {isOpen, onToggle, onClose} = useDisclosure()
    const deleteCookie = (name) => {
        document.cookie = name + '=; max-age=0;'
    }

    const clearVse = () => {
        deleteCookie('vse')
        deleteCookie('vse-timestamp')
        window.location.assign('/')
    }

    const [toolbarOpacity, setToolbarOpacity] = useState(100)

    return (
        <>
            <IconButton
                icon={<SettingsIcon title={'Open'} />}
                onClick={onToggle}
                style={{
                    opacity: isOpen ? 0 : 1,
                }}
                {...styles.previewIcon}
                {...styles.previewIconInitial}
                zIndex={1200}
            />
            <Drawer
                placement={'left'}
                onClose={onClose}
                isOpen={isOpen}
                size={'sm'}
                blockScrollOnMount={false}
                trapFocus={false}>
                <DrawerOverlay />
                <div>
                    <IconButton
                        icon={<ChevronLeftIcon {...styles.backIcon} />}
                        onClick={onToggle}
                        title={'Close'}
                        {...styles.previewIcon}
                        left={{base: 'calc(100vw - 50px)', sm: '460px'}}
                    />
                    <IconButton
                        icon={<CloseIcon />}
                        onClick={clearVse}
                        title={'Exit'}
                        {...styles.previewIcon}
                        {...styles.previewIconClose}
                        left={{base: 'calc(100vw - 50px)', sm: '460px'}}
                    />
                </div>

                <DrawerContent
                    opacity={toolbarOpacity}
                    >
                    <DrawerHeader {...styles.header} mt={10}>
                        <AmplienceLogo color={"#000000"} width={'unset'} height={'unset'}  mb={10}/>
                    </DrawerHeader>
                    <DrawerBody padding={0}>
                        <Accordion allowToggle={true} defaultIndex={[0]} allowMultiple={true}>
                            {items.map((data, index) => {
                                data.visibility = data.visibility || (() => true)
                                if (data.visibility && typeof data.visibility === 'function' && data.visibility({ ...props })) {
                                    return (<AccordionItemRender key={index} {...data} {...props} toolbarOpacity={toolbarOpacity} setToolbarOpacity={setToolbarOpacity} />)
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
