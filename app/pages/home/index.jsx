/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {useIntl} from 'react-intl'

// Components
import {
    Box,
    Button,
    SimpleGrid,
    HStack,
    VStack,
    Text,
    Flex,
    Stack,
    Container,
    Link
} from '@chakra-ui/react'

// Project Components
import Seo from '../../components/seo'
import Section from '../../components/section'

// Amplience Wrapper Component
import AmplienceWrapper from '../../components/amplience/wrapper'

// Others
import {heroFeatures, features} from './data'

// Constants
import {
    MAX_CACHE_AGE
} from '../../constants'
import { resolveSiteFromUrl } from '../../utils/site-utils'
import { getTargetLocale } from '../../utils/locale'
import { personalisationChanged } from '../../amplience-api/utils'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Home = ({isLoading, homeSlotTop}) => {
    const intl = useIntl()

    return (
        <Box data-testid="home-page" layerStyle="page">
            <Seo
                title="Home Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />

            <AmplienceWrapper fetch={{key: 'home/slot/top-personalised'}}></AmplienceWrapper>
            
            <Section
                background={'gray.50'}
                marginX="auto"
                paddingY={{base: 8, md: 16}}
                paddingX={{base: 4, md: 8}}
                borderRadius="base"
                width={{base: '100vw', md: 'inherit'}}
                position={{base: 'relative', md: 'inherit'}}
                left={{base: '50%', md: 'inherit'}}
                right={{base: '50%', md: 'inherit'}}
                marginTop="8"
                marginBottom="8"
                marginLeft={{base: '-50vw', md: 'auto'}}
                marginRight={{base: '-50vw', md: 'auto'}}
            >
                <SimpleGrid
                    columns={{base: 1, md: 1, lg: 3}}
                    spacingX={{base: 1, md: 4}}
                    spacingY={{base: 4, md: 14}}
                >
                    {heroFeatures.map((feature, index) => {
                        const featureMessage = feature.message
                        return (
                            <Box
                                key={index}
                                background={'white'}
                                boxShadow={'0px 2px 2px rgba(0, 0, 0, 0.1)'}
                                borderRadius={'4px'}
                            >
                                <Link target="_blank" href={feature.href}>
                                    <HStack>
                                        <Flex
                                            paddingLeft={6}
                                            height={24}
                                            align={'center'}
                                            justify={'center'}
                                        >
                                            {feature.icon}
                                        </Flex>
                                        <Text fontWeight="700">
                                            {intl.formatMessage(featureMessage.title)}
                                        </Text>
                                    </HStack>
                                </Link>
                            </Box>
                        )
                    })}
                </SimpleGrid>
            </Section>

            <AmplienceWrapper content={homeSlotTop}></AmplienceWrapper>
            <AmplienceWrapper fetch={{key: 'shoppable/woman-fall'}}></AmplienceWrapper>
            <AmplienceWrapper fetch={{key: 'simple-product-list'}}></AmplienceWrapper>
            <AmplienceWrapper fetch={{key: 'section'}}></AmplienceWrapper>

            <Container maxW={'6xl'} marginTop={10}>
                <SimpleGrid columns={{base: 1, md: 2, lg: 3}} spacing={10}>
                    {features.map((feature, index) => {
                        const featureMessage = feature.message
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
                                        {feature.icon}
                                    </Flex>
                                    <Text color={'black'} fontWeight={700} fontSize={20}>
                                        {intl.formatMessage(featureMessage.title)}
                                    </Text>
                                    <Text color={'black'}>
                                        {intl.formatMessage(featureMessage.text)}
                                    </Text>
                                </VStack>
                            </HStack>
                        )
                    })}
                </SimpleGrid>
            </Container>

            <AmplienceWrapper fetch={{key: 'section/we-are-here'}}></AmplienceWrapper>
        </Box>
    )
}

Home.getTemplateName = () => 'home'

Home.shouldGetProps = ({previousLocation, location}) =>
    !previousLocation ||
    previousLocation.pathname !== location.pathname ||
    personalisationChanged(true)

Home.getProps = async ({res, location, api, ampClient}) => {
    if (res && !ampClient.vse) {
        res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    const site = resolveSiteFromUrl(location.pathname)
    const l10nConfig = site.l10n
    const targetLocale = getTargetLocale({
        getUserPreferredLocales: () => {
            const {locale} = api.getConfig()
            return [locale]
        },
        l10nConfig
    })

    const homeSlotTop = await (await ampClient.fetchContent([{key: 'home/slot/top'}], {locale: targetLocale})).pop()

    return {homeSlotTop}
}

Home.propTypes = {
    /**
     * Home slot data requested from Amplience.
     */
    homeSlotTop: PropTypes.object,
    /**
     * The current state of `getProps` when running this value is `true`, otherwise it's
     * `false`. (Provided internally)
     */
    isLoading: PropTypes.bool
}

export default Home
