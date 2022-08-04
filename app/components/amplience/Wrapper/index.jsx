import React, {useEffect, useState} from 'react'

//Amplience Rendering Templates
import fetchContent from '../../../amplience/api'
import Hero from '../../hero'

const componentsMapping = {
    'https://sfcc.com/hero': Hero
}

const AmplienceWrapper = ({fetch, content, components = componentsMapping}) => {
    const [fetchedContent, setFetchedContent] = useState(undefined)
    useEffect(() => {
        const fetchCont = async () => {
            const data = await fetchContent([fetch])
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
