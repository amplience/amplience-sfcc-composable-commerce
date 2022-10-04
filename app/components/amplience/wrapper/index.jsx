import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useLocation} from 'react-router-dom'

//Amplience Rendering Templates
import Hero from '../hero'
import Section from '../section'
import CuratedProductList from '../curated-product-list'
import CardEnhanced from '../card-enhanced'
// Slots
import flexibleListSlot from '../flexibleListSlot'
import {useIntl} from 'react-intl'
import {AmplienceContext} from '../../../contexts/amplience'
import {Box, Skeleton} from '@chakra-ui/react'
import PersonalisedContainer from '../personalised-container'
import PersonalisedComponent from '../personalised-component'
import {indexStyle} from '../personalised-container'

const Blank = () => <></>

const componentsMapping = {
    'https://sfcc.com/components/hero': Hero,
    'https://sfcc.com/components/section': Section,
    'https://sfcc.com/components/curated-product': CuratedProductList,
    'https://sfcc.com/components/card-enhanced': CardEnhanced,
    'https://sfcc.com/components/personalised-component': PersonalisedComponent,
    'https://sfcc.com/components/personalised-ingrid-component': PersonalisedComponent,
    'https://sfcc.com/components/personalised-container': PersonalisedContainer,
    'https://sfcc.com/slots/flexible-list': flexibleListSlot,
    'https://sfcc.com/slots/personalised-slot': PersonalisedComponent,

    'https://sfcc.com/site/navigation/root': Blank,
    'https://sfcc.com/site/navigation/external': Blank,
    'https://sfcc.com/site/navigation/internal': Blank,
    'https://sfcc.com/site/navigation/content-page': Blank,
    'https://sfcc.com/site/navigation/category': Blank,
    'https://sfcc.com/site/navigation/group': Blank
}

const AmplienceWrapper = ({fetch, content, components, skeleton, ...rest}) => {
    const {client, groups} = useContext(AmplienceContext)
    const [fetchedContent, setFetchedContent] = useState(content)
    const {locale} = useIntl()

    const mapping = components ? {...componentsMapping, ...components} : componentsMapping

    useEffect(() => {
        let active = true

        const fetchCont = async () => {
            const data = await client.fetchContent([fetch], {locale})
            if (active) {
                setFetchedContent(data.pop())
            }
        }
        if (fetch) {
            fetchCont()
        } else if (content !== fetchedContent) {
            setFetchedContent(content)
        }

        return () => (active = false)
    }, [fetch?.id, fetch?.key, content, groups])

    const Component = mapping[fetchedContent?._meta?.schema]

    const isSlot = (fetchedContent?._meta?.schema.indexOf("/slots/") > 0) || false
    const isPersonalised = (fetchedContent?._meta?.schema.indexOf("/personalised-") > 0) || false

    const location = useLocation()
    const showInfo = !isSlot && !isPersonalised && ((location.search && (location.search.includes('vse=') || location.search.includes('pagevse='))))
    const infoMargin = "55px"
    
    const result = Component ? (
        <>
            {
                showInfo && 
                <Box className={"matchInfo"} {...indexStyle} style={{marginTop: infoMargin}}>
                    {Component.displayName} - {fetchedContent?._meta?.name}
                </Box>
            }
            <Component {...fetchedContent} {...rest} />
        </>
    ) : (
        <>{JSON.stringify(fetchedContent)}</>
    )

    return skeleton ? (
        <Skeleton {...skeleton} isLoaded={fetchedContent != null}>
            {result}
        </Skeleton>
    ) : (
        result
    )
}

AmplienceWrapper.displayName = 'Amplience Wrapper Block'

AmplienceWrapper.propTypes = {
    fetch: PropTypes.object,
    content: PropTypes.object,
    components: PropTypes.object,
    skeleton: PropTypes.object
}

export default AmplienceWrapper
