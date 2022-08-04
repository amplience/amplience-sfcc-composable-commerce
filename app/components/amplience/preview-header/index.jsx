/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
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

const PreviewHeader = ({vseTimestamp, ...otherProps}) => {
    const intl = useIntl()
    const styles = useMultiStyleConfig('PreviewHeader')

    return (
        <Box {...styles.container} {...otherProps}>
            {intl.formatMessage({
                id: 'amplience.preview.active',
                defaultMessage: 'Preview Active: '
            })}{' '}
            {timestampToString(intl, vseTimestamp)}
            <Button variant="link" onClick={() => window.location.assign('/?vse-clear=true')}>
                {intl.formatMessage({
                    id: 'amplience.preview.cancel',
                    defaultMessage: 'Cancel'
                })}
            </Button>
        </Box>
    )
}

PreviewHeader.propTypes = {
    vseTimestamp: PropTypes.number
}

export default PreviewHeader
