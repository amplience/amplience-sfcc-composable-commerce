import React, {useContext, useEffect, useState} from 'react'
import PropTypes from 'prop-types'

//Amplience Rendering Templates
import Hero from '../../hero'
import Section from '../../section'
// Slots
import flexibleListSlot from '../flexibleListSlot'
import {useIntl} from 'react-intl'
import {AmplienceContext} from '../../../contexts'

const componentsMapping = {
    'https://sfcc.com/hero': Hero,
    'https://sfcc.com/section': Section,
    'https://sfcc.com/slots/flexiblelist': flexibleListSlot
}

const AmplienceWrapper = ({fetch, content, components = componentsMapping}) => {
    const {client} = useContext(AmplienceContext)
    const [fetchedContent, setFetchedContent] = useState(content)
    const {locale} = useIntl()

    useEffect(() => {
        const fetchCont = async () => {
            const data = await client.fetchContent([fetch], locale)
            setFetchedContent(data.pop())
        }
        if (fetch) {
            fetchCont()
        } else if (content !== fetchedContent) {
            setFetchedContent(content)
        }
    }, [fetch, content])

    const Component = components[fetchedContent?._meta?.schema]
    return Component ? <Component {...fetchedContent} /> : <>{JSON.stringify(fetchedContent)}</>
}

AmplienceWrapper.displayName = 'Amplience Wrapper Block'

AmplienceWrapper.propTypes = {
    fetch: PropTypes.object,
    content: PropTypes.object,
    components: PropTypes.object
}

export default AmplienceWrapper
