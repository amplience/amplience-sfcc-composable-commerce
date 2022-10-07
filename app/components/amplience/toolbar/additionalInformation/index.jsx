import React, {useContext} from 'react'
import {
    IconButton,
    Popover,
    PopoverContent,
    PopoverBody,
    PopoverArrow,
    useDisclosure,
    useMultiStyleConfig,
    PopoverTrigger,
    Link,
    Text,
    Heading
} from '@chakra-ui/react'
import {AmplienceContext} from '../../../../contexts/amplience'

const AdditionalInformation = ({_meta, match, slot}) => {
    const styles = useMultiStyleConfig('PreviewHeader')
    const {defaultEnv, envs, vse = ''} = useContext(AmplienceContext)
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

    const combineContentLink = (deliveryId) => {
        return `https://content.amplience.net/#!/${currentHub}/authoring/content-item/edit/${deliveryId}`
    }

    const SlotContentRender = ({deliveryId, name, schema, deliveryKey}) => (
        <>
            <Heading as="h2" size="xs">
                <Link
                    color={'ampliencePink.500'}
                    target={'_blank'}
                    href={`https://content.amplience.net/#!/${currentHub}/authoring/content-item/edit/${deliveryId}`}>{name}</Link>
            </Heading>
            <Text fontSize="xs" fontWeight={'bold'}>{schema}</Text>
            <Text fontSize="xs" fontStyle={'italic'}>{deliveryId}</Text>
            {
                deliveryKey &&
                <Text fontSize="xs" fontStyle={'italic'}>{deliveryKey}</Text>
            }
        </>
    )

    const items = [{
        color: 'teal',
        icon: (<p>P</p>),
        content: (<Text fontSize="xs">{match}</Text>),
        visibility: () => !!match
    }, {
        color: 'orange',
        icon: (<p>S</p>),
        content: (<SlotContentRender {...slot} />),
        visibility: () => !!slot
    }, {
        color: 'blue',
        icon: (<p>C</p>),
        content: <SlotContentRender {..._meta} />
    }]

    return (
        <div className={'matchInfo'} style={styles.infoContainer}>
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
                                isOpen={isOpen}
                                onClose={onClose}
                                closeOnBlur={true}
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
                                    <PopoverBody  {...styles.popoverBody}>{content}</PopoverBody>
                                </PopoverContent>
                            </Popover>
                        </React.Fragment>)
                })}
        </div>
    )
}

AdditionalInformation.propTypes = {}

export default AdditionalInformation