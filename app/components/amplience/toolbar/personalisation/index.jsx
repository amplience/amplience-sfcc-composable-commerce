import {Box, Button, useMultiStyleConfig, Wrap, WrapItem} from '@chakra-ui/react'
import React, {useContext, useEffect, useState} from 'react'
import {useIntl} from 'react-intl'
import {AmplienceContext} from '../../../../contexts/amplience'
import useNavigation from '../../../../hooks/use-navigation'
import PropTypes from 'prop-types'

const PersonalisationPanel = ({customerGroups}) => {
    const styles = useMultiStyleConfig('PreviewHeader')
    const { groups, updateGroups } = useContext(AmplienceContext)
    const [previewCustomerGroups, setPreviewCustomerGroups] = useState(groups || [])
    const [matchVisible, setMatchVisible] = useState(true)
    const intl = useIntl()
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

    return (<Box {...styles.box}>
        <p>
            <b>Fired Rules</b>
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
    </Box>)
}

PersonalisationPanel.propTypes = {
    customerGroups: PropTypes.array
}

export default PersonalisationPanel;