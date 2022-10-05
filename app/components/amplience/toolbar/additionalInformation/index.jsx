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
    Heading,
} from '@chakra-ui/react'
import {AmplienceContext} from '../../../../contexts/amplience'

const AdditionalInformation = ({_meta, match}) => {
    const styles = useMultiStyleConfig('PreviewHeader')
    const { defaultEnv, envs, vse = '' } = useContext(AmplienceContext)
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

    const combineContentLink = () => {
        return `https://content.amplience.net/#!/${currentHub}/authoring/content-item/edit/${_meta.deliveryId}`
    }

    const items = [{
        color: 'teal',
        icon: (<p>P</p>),
        content: (<Text fontSize='xs'>{match}</Text>),
        visibility: () => !!match
    }, {
        color: 'blue',
        icon: (<p>C</p>),
        content: (
            <>
                <Heading as='h2' size='xs'>
                    <Link 
                        color={'ampliencePink.500'} 
                        target={'_blank'} 
                        href={combineContentLink()}>{_meta.name}</Link>
                </Heading>
                <Text fontSize='xs' fontWeight={'bold'}>{_meta.schema}</Text>
                <Text fontSize='xs' fontStyle={'italic'}>{_meta.deliveryId}</Text>
                {
                    _meta?.deliveryKey &&
                    <Text fontSize='xs' fontStyle={'italic'}>{_meta.deliveryKey}</Text>
                }
            </>
        ),
    }]

    return (
        <div className={"matchInfo"} style={styles.infoContainer}>
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