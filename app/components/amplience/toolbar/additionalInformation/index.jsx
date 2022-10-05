import React from 'react'
import {
    IconButton,
    Popover,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    useDisclosure, useMultiStyleConfig, PopoverTrigger
} from '@chakra-ui/react'

const AdditionalInformation = ({_meta, match}) => {
    const styles = useMultiStyleConfig('PreviewHeader')

    const items = [{
        color: 'teal',
        icon: (<p>P</p>),
        content: (<p>{match}</p>),
        visibility: () => !!match
    }]

    return (
        <div style={styles.infoContainer}>
            {items
                .filter(data => {
                    data.visibility = data.visibility || (() => true)
                    return data.visibility && typeof data.visibility === 'function' && data.visibility()
                })
                .map(({icon, content, color}, index) => {
                    const {isOpen, onToggle, onClose} = useDisclosure()
                    return (
                        <React.Fragment key={index}>
                            <Popover
                                returnFocusOnClose={false}
                                isOpen={isOpen}
                                onClose={onClose}
                                closeOnBlur={false}
                                size={'sm'}
                            >
                                <PopoverTrigger>
                                    <IconButton
                                        zIndex={2}
                                        onClick={onToggle}
                                        colorScheme={color}
                                        size="sm"
                                        icon={icon}
                                        {...styles.infoIcon}
                                    />
                                </PopoverTrigger>
                                <PopoverContent>
                                    <PopoverArrow />
                                    <PopoverBody>{content}</PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </React.Fragment>)
                })}
        </div>
    )
}

AdditionalInformation.propTypes = {}

export default AdditionalInformation