/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useState, useEffect} from 'react'
import {useQuery} from '@tanstack/react-query'

// Components
import {Box, Heading} from '@chakra-ui/react'

// Project Components
import Seo from '@salesforce/retail-react-app/app/components/seo'
import Section from '@salesforce/retail-react-app/app/components/section'

// Amplience Wrapper Component
import AmplienceWrapper from '../../components/amplience/wrapper'

//Hooks
import {useAmplienceApi} from 'amplience-api-react/dist/hooks/useAmplienceApi'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'
import {useServerContext} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'

// Constants
import {MAX_CACHE_AGE} from '@salesforce/retail-react-app/app/constants'
// TODO: parsonlization needs to be added back in
//import {personalisationChanged} from 'amplience-api-react'

const Developers = () => {
    const ampContext = useAmplienceApi()
    const {site, locale} = useMultiSite()
    const {req, res} = useServerContext()

    const [homeSlotTop, setHomeTopSlot] = useState()
    
    const query = useQuery(
        [`page/developer/topslot`],
        () => {
            return ampContext.client.fetchContent([{key: 'home/slot/top'}], {locale: locale.id}).then((res) => res).then((res) => res)
        }
    )

    if (res && !ampContext.vse) {
        res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    useEffect(() => {
        if(query.isSuccess) {
            const content = query.data?.pop()
            setHomeTopSlot(content)
        }
    }, [query.isSuccess])

    return (
        <Box data-testid="developers-page" layerStyle="page">
            <Seo
                title="Developers Page"
                description="Commerce Cloud Retail React App"
                keywords="Commerce Cloud, Retail React App, React Storefront"
            />

            <Heading as="h1" fontSize={{base: '4xl', md: '5xl', lg: '6xl'}}>
                Developers Information
            </Heading>

            <AmplienceWrapper fetch={{key: 'section-developers'}}></AmplienceWrapper>

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
                <AmplienceWrapper fetch={{key: 'rich-text/dev-by-key1'}}></AmplienceWrapper>
            </Section>

            <AmplienceWrapper fetch={{key: 'home/slot/top-personalised'}}></AmplienceWrapper>

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
                <AmplienceWrapper fetch={{key: 'rich-text/dev-by-content'}}></AmplienceWrapper>
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
                <AmplienceWrapper fetch={{key: 'rich-text/dev-by-key2'}}></AmplienceWrapper>
            </Section>
            <AmplienceWrapper fetch={{key: 'simple-product-list'}}></AmplienceWrapper>
        </Box>
    )
}

Developers.getTemplateName = () => 'developers'

export default Developers
