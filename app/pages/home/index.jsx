/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import PropTypes from 'prop-types'
import {useIntl, FormattedMessage} from 'react-intl'
import {Heading} from '@chakra-ui/react'

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
import Hero from '../../components/hero'
import Seo from '../../components/seo'
import Section from '../../components/section'
import ProductScroller from '../../components/product-scroller'

// Amplience Wrapper Component
import AmplienceWrapper from '../../components/amplience/wrapper'

// Others
import {getAssetUrl} from 'pwa-kit-react-sdk/ssr/universal/utils'
import {heroFeatures, features} from './data'

// Constants
import {
    MAX_CACHE_AGE,
    HOME_SHOP_PRODUCTS_CATEGORY_ID,
    HOME_SHOP_PRODUCTS_LIMIT
} from '../../constants'
import { resolveSiteFromUrl } from '../../utils/site-utils'
import { getTargetLocale } from '../../utils/locale'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const Home = ({productSearchResult, isLoading, homeSlotTop}) => {
    const intl = useIntl()

    return (
        <Box data-testid="home-page" layerStyle="page">
            <Seo
                title="Home Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />
            <Section
                background={'pink.50'}
                marginX="auto"
                paddingY={{base: 4, md: 8}}
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
                <Heading as="h3">Personalised Slot - Amplience Wrapper by content</Heading>
                <Text>Getting content from slot <i>home/slot/top-personalized</i></Text>
            </Section>
            <AmplienceWrapper content={homeSlotTop}></AmplienceWrapper>

            <Section
                background={'pink.50'}
                marginX="auto"
                paddingY={{base: 4, md: 8}}
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
                <Heading as="h3">Slot - Amplience Wrapper by key</Heading>
                <Text>Getting content from slot <i>mens/slot/top</i></Text>
            </Section>
            <AmplienceWrapper fetch={{key: 'mens/slot/top'}}></AmplienceWrapper>

            <Section
                background={'pink.50'}
                marginX="auto"
                paddingY={{base: 4, md: 8}}
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
                <Heading as="h3">Content - Amplience Wrapper by key</Heading>
                <Text>Getting content from content item <i>hero/autumn-sales</i></Text>
            </Section>
            <AmplienceWrapper fetch={{key: 'hero/autumn-sales'}}></AmplienceWrapper>
            
            <Section
                background={'pink.50'}
                marginX="auto"
                paddingY={{base: 4, md: 8}}
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
                <Heading as="h3">Personalised Content - Amplience Wrapper by key</Heading>
                <Text>Getting content from content item <i>hero/personalised-men-luxury</i></Text>
            </Section>
            <AmplienceWrapper fetch={{key: 'hero/personalised-men-luxury'}}></AmplienceWrapper>
            
            <Section
                background={'pink.50'}
                marginX="auto"
                paddingY={{base: 4, md: 8}}
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
                <Heading as="h3">Content - Amplience Wrapper by key</Heading>
                <Text>Getting content from content item <i>simple-product-list</i></Text>
            </Section>
            <AmplienceWrapper fetch={{key: 'simple-product-list'}}></AmplienceWrapper>


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

            {productSearchResult && (
                <Section
                    padding={4}
                    paddingTop={16}
                    title={intl.formatMessage({
                        defaultMessage: 'Shop Products',
                        id: 'home.heading.shop_products'
                    })}
                    subtitle={intl.formatMessage(
                        {
                            defaultMessage:
                                'This section contains content from the catalog. {docLink} on how to replace it.',
                            id: 'home.description.shop_products',
                            description:
                                '{docLink} is a html button that links the user to https://sfdc.co/business-manager-manage-catalogs'
                        },
                        {
                            docLink: (
                                <Link
                                    target="_blank"
                                    href={'https://sfdc.co/business-manager-manage-catalogs'}
                                    textDecoration={'none'}
                                    position={'relative'}
                                    _after={{
                                        position: 'absolute',
                                        content: `""`,
                                        height: '2px',
                                        bottom: '-2px',
                                        margin: '0 auto',
                                        left: 0,
                                        right: 0,
                                        background: 'gray.700'
                                    }}
                                    _hover={{textDecoration: 'none'}}
                                >
                                    {intl.formatMessage({
                                        defaultMessage: 'Read docs',
                                        id: 'home.link.read_docs'
                                    })}
                                </Link>
                            )
                        }
                    )}
                >
                    <Stack pt={8} spacing={16}>
                        <ProductScroller
                            products={productSearchResult?.hits}
                            isLoading={isLoading}
                        />
                    </Stack>
                </Section>
            )}

            <Section
                background={'pink.50'}
                marginX="auto"
                paddingY={{base: 4, md: 8}}
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
                <Heading as="h2">Content - Amplience Wrapper by key</Heading>
                <Text>Getting content from content item <i>section</i></Text>
            </Section>
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

            <Section
                padding={4}
                paddingTop={32}
                title={intl.formatMessage({
                    defaultMessage: "We're here to help",
                    id: 'home.heading.here_to_help'
                })}
                subtitle={
                    <>
                        <>
                            {intl.formatMessage({
                                defaultMessage: 'Contact our support staff.',
                                id: 'home.description.here_to_help'
                            })}
                        </>
                        <br />
                        <>
                            {intl.formatMessage({
                                defaultMessage: 'They will get you to the right place.',
                                id: 'home.description.here_to_help_line_2'
                            })}
                        </>
                    </>
                }
                actions={
                    <Button
                        as={Link}
                        href="https://help.salesforce.com/s/?language=en_US"
                        target="_blank"
                        width={'auto'}
                        paddingX={7}
                        _hover={{textDecoration: 'none'}}
                    >
                        <FormattedMessage defaultMessage="Contact Us" id="home.link.contact_us" />
                    </Button>
                }
                maxWidth={'xl'}
            />
        </Box>
    )
}

Home.getTemplateName = () => 'home'

Home.shouldGetProps = ({previousLocation, location}) =>
    !previousLocation || previousLocation.pathname !== location.pathname

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

    const productSearchResult = await api.shopperSearch.productSearch({
        parameters: {
            refine: [`cgid=${HOME_SHOP_PRODUCTS_CATEGORY_ID}`, 'htype=master'],
            limit: HOME_SHOP_PRODUCTS_LIMIT
        }
    })

    const homeSlotTop = await (await ampClient.fetchContent([{key: 'home/slot/top-personalized'}], {locale: targetLocale})).pop()

    return {productSearchResult, homeSlotTop}
}

Home.propTypes = {
    /**
     * The search result object showing all the product hits, that belong
     * in the supplied category.
     */
    productSearchResult: PropTypes.object,
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
