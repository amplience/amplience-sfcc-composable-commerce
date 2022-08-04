import React, {useEffect, useState} from 'react'

//Amplience Rendering Templates
import fetchContent from '../../../amplience/api'
import Hero from '../../hero'
import Section from '../../section'
// Slots
import flexibleListSlot from '../flexibleListSlot'
import {useIntl} from 'react-intl'

const componentsMapping = {
    'https://sfcc.com/hero': Hero,
    'https://sfcc.com/section': Section,
    'https://sfcc.com/slots/flexiblelist': flexibleListSlot
}

const AmplienceWrapper = ({fetch, content, components = componentsMapping}) => {
    const [fetchedContent, setFetchedContent] = useState(undefined)
    const {locale} = useIntl();
    useEffect(() => {
        const fetchCont = async () => {
            const data = await fetchContent([fetch], locale)
            setFetchedContent(data.pop())
        }
        if (fetch) {
            fetchCont()
        } else if (content) {
            setFetchedContent(content)
        }
    }, [fetch, content])

    
    const Component = components[fetchedContent?._meta?.schema]
    return Component ? <Component {...fetchedContent} /> : <>{JSON.stringify(fetchedContent)}</>
}

AmplienceWrapper.displayName = 'Amplience Wrapper Block'

export default AmplienceWrapper
