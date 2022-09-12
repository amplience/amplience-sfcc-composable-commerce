import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'

//Amplience Rendering Templates
import Hero from '../hero'
import Section from '../section'
import CuratedProductList from '../curated-product-list'
import CardEnhanced from '../card-enhanced'
// Slots
import flexibleListSlot from '../flexibleListSlot'
import {useIntl} from 'react-intl'
import {AmplienceContext} from '../../../contexts/amplience'

const Blank = () => <></>

const componentsMapping = {
    'https://sfcc.com/components/hero': Hero,
    'https://sfcc.com/components/section': Section,
    'https://sfcc.com/components/curated-product': CuratedProductList,
    'https://sfcc.com/components/card-enhanced': CardEnhanced,
    'https://sfcc.com/slots/flexible-list': flexibleListSlot,

    'https://sfcc.com/site/navigation/root': Blank,
    'https://sfcc.com/site/navigation/external': Blank,
    'https://sfcc.com/site/navigation/internal': Blank,
    'https://sfcc.com/site/navigation/content-page': Blank,
    'https://sfcc.com/site/navigation/category': Blank,
    'https://sfcc.com/site/navigation/group': Blank
}

const AmplienceWrapper = ({fetch, content, components}) => {
    const {client} = useContext(AmplienceContext)
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
    }, [fetch, content])

    const Component = mapping[fetchedContent?._meta?.schema]
    return Component ? <Component {...fetchedContent} /> : <>{JSON.stringify(fetchedContent)}</>
}

AmplienceWrapper.displayName = 'Amplience Wrapper Block'

AmplienceWrapper.propTypes = {
    fetch: PropTypes.object,
    content: PropTypes.object,
    components: PropTypes.object
}

export default AmplienceWrapper
