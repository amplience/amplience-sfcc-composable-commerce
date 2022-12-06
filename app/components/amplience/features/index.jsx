import React from 'react'
import {Link, Text, Image, useTheme} from '@chakra-ui/react'
import PropTypes from 'prop-types'
import {Container, SimpleGrid, VStack, HStack, Flex} from '@chakra-ui/layout'
import {getImageUrl} from '../../../utils/amplience/image'

const Features = ({features}) => {
    const theme = useTheme()

    const {iconBaseStyle} = theme.components.Icon

    return (
        <Container maxW={'6xl'} marginTop={10}>
            <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={10}>
                {features.map((feature, index) => {
                    return (
                        <HStack key={index} align={'top'}>
                            <VStack align={'start'}>
                                <Flex
                                    width={16}
                                    height={16}
                                    align={'center'}
                                    justify={'left'}
                                    color={'gray.900'}
                                    paddingX={2}
                                >
                                    <Image
                                        {...iconBaseStyle}
                                        src={getImageUrl(feature.icon)}
                                    ></Image>
                                </Flex>
                                <Text color={'black'} fontWeight={700} fontSize={20}>
                                    {feature.title}
                                </Text>
                                <Text color={'black'}>{feature.text}</Text>
                            </VStack>
                        </HStack>
                    )
                })}
            </SimpleGrid>
        </Container>
    )
}

Features.displayName = 'Features'
Features.propTypes = {
    features: PropTypes.arrayOf(
        PropTypes.shape({
            title: PropTypes.string,
            text: PropTypes.string,
            value: PropTypes.string,
            icon: PropTypes.shape({
                defaultHost: PropTypes.string,
                endpoint: PropTypes.string,
                id: PropTypes.string,
                name: PropTypes.string,
                _meta: PropTypes.shape({
                    schema: PropTypes.string
                })
            }),
            link: PropTypes.object
        })
    )
}

export default Features
