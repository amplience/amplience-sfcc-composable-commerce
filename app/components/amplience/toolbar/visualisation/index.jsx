import {
    Box,
    Heading,
    Input,
    IconButton,
    useClipboard,
    useMultiStyleConfig,
    Wrap,
    Text,
    HStack,
    Switch
} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import PropTypes from 'prop-types'
import {CopyIcon} from '@chakra-ui/icons'

import {useContext} from 'react'
import {AmplienceContext} from '../../../../contexts/amplience'

const VisualisationPanel = ({vse, locale, contentId, toolbarState}) => {
    const intl = useIntl()
    const styles = useMultiStyleConfig('PreviewHeader')
    const {defaultEnv, envs} = useContext(AmplienceContext)

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

    const [hubValue, setHubValue] = React.useState(currentHub)
    const {hasCopied: hasCopiedHub, onCopy: onCopyHub} = useClipboard(hubValue)

    const [vseValue, setVseValue] = React.useState(vse)
    const {hasCopied: hasCopiedVse, onCopy: onCopyVse} = useClipboard(vseValue)

    const [localeValue, setLocaleValue] = React.useState(locale || intl.locale)
    const {hasCopied: hasCopiedLocale, onCopy: onCopyLocale} = useClipboard(localeValue)

    const [contentIdValue, setContentIdValue] = React.useState(contentId || null)
    const {hasCopied: hasCopiedContentId, onCopy: onCopyContentId} = useClipboard(contentIdValue)
    const [matchVisible, setMatchVisible] = useState(toolbarState.matchVisible)

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

    return (
        <Box {...styles.box}>
            {
                vse && (envs || defaultEnv) &&
                <>
                    <Heading as="h4" mb={2} size="xs">
                        {intl.formatMessage({
                            id: 'toolbar.visualisation.title',
                            defaultMessage: 'Hub Name'
                        })}
                    </Heading>
                    <HStack>
                        <Input size="xs" isReadonly={true} value={hubValue} />
                        <IconButton
                            size="xs"
                            colorScheme={'ampliencePink'}
                            bgColor={hasCopiedHub ? 'gray.500' : 'ampliencePink.500'}
                            onClick={onCopyHub}
                            aria-label="Copy"
                            icon={<CopyIcon />} />
                    </HStack>
                    <Heading as="h4" size="xs" mt={4} mb={2}>VSE</Heading>
                    <HStack>
                        <Input size="xs" isReadonly={true} value={vse} />
                        <IconButton
                            size="xs"
                            colorScheme={'ampliencePink'}
                            bgColor={hasCopiedVse ? 'gray.500' : 'ampliencePink.500'}
                            onClick={onCopyVse}
                            aria-label="Copy"
                            icon={<CopyIcon />} />
                    </HStack>
                    <Heading as="h4" size="xs" mt={4} mb={2}>
                        {intl.formatMessage({
                            id: 'toolbar.visualisation.locale',
                            defaultMessage: 'Locale'
                        })}
                    </Heading>
                    <HStack>
                        <Input size="xs" isReadonly={true} value={locale || intl.locale} />
                        <IconButton
                            colorScheme={'ampliencePink'}
                            size="xs"
                            bgColor={hasCopiedLocale ? 'gray.500' : 'ampliencePink.500'}
                            onClick={onCopyLocale}
                            aria-label="Copy"
                            icon={<CopyIcon />} />
                    </HStack>
                    {
                        contentId && (
                            <>
                                <Heading as="h4" size="xs" mt={4} mb={2}>
                                    {intl.formatMessage({
                                        id: 'toolbar.visualisation.content',
                                        defaultMessage: 'Content ID'
                                    })}
                                </Heading>
                                <HStack>
                                    <Input size="xs" isReadonly={true} value={contentId} />
                                    <IconButton
                                        colorScheme={'ampliencePink'}
                                        size="xs"
                                        bgColor={hasCopiedContentId ? 'gray.500' : 'ampliencePink.500'}
                                        onClick={onCopyContentId}
                                        aria-label="Copy"
                                        icon={<CopyIcon />} />
                                </HStack>
                            </>
                        )
                    }
                    <Wrap spacing={2} paddingTop={6} marginBottom={6}>
                        <Switch
                            defaultChecked={toolbarState.matchVisible}
                            size="sm"
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
                            fontSize="xs">
                            {
                                intl.formatMessage({
                                    id: 'toolbar.visualisation.showMatches',
                                    defaultMessage: 'Show information'
                                })
                            }
                        </Text>
                    </Wrap>
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

export default VisualisationPanel