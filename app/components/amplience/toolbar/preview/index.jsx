import {Box, Button, Text, useMultiStyleConfig} from '@chakra-ui/react'
import moment from 'moment'
import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useIntl} from 'react-intl'

const PreviewPanel = ({vseTimestamp, vse,  ...otherProps}) => {
    const intl = useIntl()
    const styles = useMultiStyleConfig('PreviewHeader')
    const [previewDate, setPreviewDate] = useState(moment(vseTimestamp).format('YYYY-MM-DD'))
    const [previewTime, setPreviewTime] = useState(moment(vseTimestamp).format('HH:mm:ss'))
    const [previewTimestamp, setPreviewTimestamp] = useState(vseTimestamp)

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
        const regExp = /(.*-.*)-(.*)(\.staging.bigcontent.io)/
        const matches = vse.match(regExp)
        const newVse = `${matches[1]}-${previewTimestamp}.staging.bigcontent.io`
        window.location.assign(`/?vse=${newVse}&vse-timestamp=${previewTimestamp}`)
    }

    return vseTimestamp ? (
        <Box {...styles.container} {...otherProps}>
            <Text style={{fontSize: '13px'}}>
                <b>Date:</b> <input
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
            <Text style={{fontSize: '13px'}}>
                <b>Time:</b> <input
                id="preview-time"
                type="time"
                value={previewTime}
                onChange={(x) =>
                    setPreviewTime(x.target.value)
                }
            />
            </Text>
            <Text style={{fontSize: '13px'}}>
                {previewTimestamp !== vseTimestamp && (
                    <Button
                        size='xs'
                        style={{marginRight: 10}}
                        colorScheme={'ampliencePink'}
                        onClick={updateVseTimestamp}
                    >
                        Update
                    </Button>
                )}
                <Button 
                    size='xs'
                    colorScheme={'ampliencePink'}
                    onClick={clearVse}>
                    {intl.formatMessage({
                        id: 'amplience.preview.cancel',
                        defaultMessage: 'Cancel'
                    })}
                </Button>
            </Text>
        </Box>
    ) : (<></>)
}

PreviewPanel.propTypes = {
    vseTimestamp: PropTypes.number,
    vse: PropTypes.string
}

export default PreviewPanel