import {Box, Button, useMultiStyleConfig, Wrap, WrapItem, Heading} from '@chakra-ui/react'
import React, {useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {useAmplienceApi} from 'amplience-api-react/dist/hooks/useAmplienceApi'
import useNavigation from '@salesforce/retail-react-app/app/hooks/use-navigation'
import PropTypes from 'prop-types'

const PersonalisationPanel = ({groups}) => {
    const styles = useMultiStyleConfig('PreviewHeader')
    const ampContext = useAmplienceApi()
    const [previewCustomerGroups, setPreviewCustomerGroups] = useState(groups || [])
    const {formatMessage} = useIntl()
    const navigate = useNavigation()

    useEffect(() => {
        if (window && !previewCustomerGroups.length) {
            const groups = ampContext?.groups || []
            if (groups) {
                updateGroups(JSON.parse(groups))
            }
        }
    }, [])

    useEffect(() => {
        setPreviewCustomerGroups(ampContext?.groups || [])
    }, [ampContext?.groups])

    const clickCustomerGroup = (obj) => {
        let groups
        if (previewCustomerGroups.includes(obj.target.value)) {
            groups = previewCustomerGroups.filter((x) => x !== obj.target.value)
        } else {
            groups = [...previewCustomerGroups, obj.target.value]
        }

        setPreviewCustomerGroups(groups)
        ampContext.updateGroups(groups)
        navigate()
    }

    return (
        <Box {...styles.box}>
            <Heading as="h2" size="xs">
                {formatMessage({
                    defaultMessage: 'Customer groups',
                    id: 'toolbar.personalisation.heading'
                })}
            </Heading>
            <Wrap spacing={2} paddingTop={4}>
                {ampContext.groups.sort().map((group, index) => {
                    const groupColor = previewCustomerGroups?.includes(group)
                        ? 'ampliencePink'
                        : 'gray'
                    return (
                        <WrapItem key={index}>
                            <Button
                                size="xs"
                                height={`${group.length > 30 ? '60px' : '30px'}`}
                                style={{
                                    whiteSpace: 'normal',
                                    wordWrap: 'break-word'
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
    groups: PropTypes.array
}

export default PersonalisationPanel
