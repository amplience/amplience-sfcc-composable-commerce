import React, { useEffect, useState } from 'react'

//Amplience Rendering Templates
import fetchContent from '../../../amplience/api'
import Hero from '../../hero'

const componentsMapping = {
    'https://sfcc.com/hero': Hero
}

const AmplienceWrapper = ({ fetch, content, components = componentsMapping }) => {
    const [fetchedContent, setFetchedContent] = useState(undefined)

    if (fetch) {
        useEffect(() => {
            fetchContent([fetch]).then(c => c.pop()).then(setFetchedContent)
        }, [fetchedContent])
    }
    else {
        setFetchedContent(content)
    }

    const Component = components[fetchedContent?._meta?.schema];
    return Component ? <Component {...fetchedContent} /> : <>{JSON.stringify(fetchedContent)}</>;
}

AmplienceWrapper.displayName = 'Amplience Wrapper Block'

export default AmplienceWrapper
