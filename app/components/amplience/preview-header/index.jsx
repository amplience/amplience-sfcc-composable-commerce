/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import {Box, Button, useMultiStyleConfig} from '@chakra-ui/react'
import {useIntl} from 'react-intl'

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

const PreviewHeader = ({vse, vseTimestamp, ...otherProps}) => {
    const intl = useIntl()
    const styles = useMultiStyleConfig('PreviewHeader')

    useEffect(() => {
        if (vse) {
            document.cookie = `vse=${vse};`
            document.cookie = `vse-timestamp=${vseTimestamp};`
        }
    }, [vse, vseTimestamp])

    const deleteCookie = (name) => {
        document.cookie = name + '=; max-age=0;'
    }

    const clearVse = () => {
        deleteCookie('vse')
        deleteCookie('vse-timestamp')
        window.location.assign('/')
    }

    return (
        <Box {...styles.container} {...otherProps}>
            {intl.formatMessage({
                id: 'amplience.preview.active',
                defaultMessage: 'Preview Active: '
            })}{' '}
            {timestampToString(intl, vseTimestamp)}
            <Button variant="link" onClick={clearVse}>
                {intl.formatMessage({
                    id: 'amplience.preview.cancel',
                    defaultMessage: 'Cancel'
                })}
            </Button>
        </Box>
    )
}

PreviewHeader.propTypes = {
    vse: PropTypes.string,
    vseTimestamp: PropTypes.number
}

export default PreviewHeader
