/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {Box, Flex, Heading, Stack, Image} from '@chakra-ui/react'
import Button from '../button'
import {getImageUrl} from '../../utils/image'

type LocalizedValues = {
    values: LocaleValue[]
}

type LocaleValue = {
    locale: string
    value: string
}

const findDefaultLocaleString = (lva: LocalizedValues) => lva && lva.values ? lva.values.find(val => val.locale === 'en-US')?.value || lva.values[0]?.value : lva;
const Hero = ({title, img, actions, ...props}) => {
    const {image, alt} = img
    const src = getImageUrl(image)

    return (
        <Box
            marginBottom={{base: 0, md: 10}}
            height={{lg: 'xl'}}
            position={{lg: 'relative'}}
            {...props}
        >
            <Stack
                align={'center'}
                spacing={{base: 8, md: 10}}
                paddingTop={{base: 12, md: 10}}
                paddingBottom={{base: 6, md: 10}}
                direction={{base: 'column', lg: 'row'}}
            >
                <Stack flex={1} spacing={{base: 5, md: 8}}>
                    <Heading
                        as="h1"
                        fontSize={{base: '4xl', md: '5xl', lg: '6xl'}}
                        maxWidth={{base: '75%', md: '50%', lg: 'md'}}
                    >
                        {findDefaultLocaleString(title)}
                    </Heading>

                    {actions && (
                        <Box width={{base: 'full', lg: 'inherit'}}>
                            {actions.map((props, ind) => (
                                <Button 
                                    key={ind} 
                                    label={findDefaultLocaleString(props.label)}
                                    url={props.url}>
                                </Button>
                            ))}
                        </Box>
                    )}
                </Stack>
                <Flex
                    flex={1}
                    justify={'center'}
                    align={'center'}
                    position={'relative'}
                    width={'full'}
                    paddingTop={{base: 4, lg: 0}}
                >
                    <Box position={'relative'} width={{base: 'full', md: '80%', lg: 'full'}}>
                        <Image
                            fit={'cover'}
                            align={'center'}
                            width={'100%'}
                            height={'100%'}
                            src={src}
                            alt={alt}
                        />
                    </Box>
                </Flex>
            </Stack>
        </Box>
    )
}

Hero.displayName = 'Hero'

const localeValueArray = PropTypes.shape({
    values: PropTypes.arrayOf(
        PropTypes.shape({
            locale: PropTypes.string,
            value: PropTypes.string
        })
    )
})

Hero.propTypes = {
    /**
     * Hero component image
     */
    img: PropTypes.shape({
        image: PropTypes.shape({
            id: PropTypes.string,
            name: PropTypes.string,
            endpoint: PropTypes.string,
            defaultHost: PropTypes.string
        }),
        alt: PropTypes.string
    }),
    /**
     * Hero component main title
     */
    // title: PropTypes.string,
    title: localeValueArray,
    /**
     * Call to action component(s)
     */
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: localeValueArray,
            url: PropTypes.string
        })
    )
}

export default Hero
