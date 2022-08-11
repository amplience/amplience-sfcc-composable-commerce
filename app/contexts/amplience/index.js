import React, {useState} from 'react'
import PropTypes from 'prop-types'
import * as cookie from 'cookie'
import {AmplienceAPI} from '../../amplience-api'

/**
 * This is the global Amplience Realtime Visualization Context on Non-category pages
 *
 * To use these context's simply import them into the component requiring context
 * like the below example:
 *
 * import React, {useContext} from 'react'
 * import {RealtimeVisualization} from './contexts/amplience'
 *
 * const RTV = useContext(RealtimeVisualization)
 *
 * export const RootCurrencyLabel = () => {
 *    const {currency} = useContext(CurrencyContext)
 *    return <div>{currency}</div>
 * }
 */
import {init} from 'dc-visualization-sdk'

export const RealtimeVisualization = React.createContext()

// Q: is there a way for a react context to run its own async function?
// thinking it would be nice NOT to init the viz SDK at the app level so we can
// import/init only where needed
export const RealtimeVisualizationProvider = ({status: initState, ampViz}) => {
    const [status, setStatus] = useState(initState)
    const [ampVizSdk, setAmpVizSdk] = useState(ampViz)

    ;async () => {
        const sdk = await init({debug: true})

        setAmpVizSdk(sdk)
        setStatus('connected')
    }

    return (
        <RealtimeVisualization.Provider
            value={[
                {status, setStatus},
                {ampVizSdk, setAmpVizSdk}
            ]}
        />
    )
}

RealtimeVisualizationProvider.propTypes = {
    status: PropTypes.string,
    ampViz: PropTypes.object
}

/**
 * This is the global Amplience Visualization Context
 *
 * To use these context's simply import them into the component requiring context
 * like the below example:
 *
 * import React, {useContext} from 'react'
 * import {AmplienceContext} from './contexts/amplience'
 *
 * const vis = useContext(AmplienceContext)
 */

export const AmplienceContext = React.createContext()

export const AmplienceContextProvider = ({vse, vseTimestamp, children}) => {
    // Init client using VSE
    const [client] = useState(new AmplienceAPI())

    // Switch the API to use the provided VSE, if present.
    client.setVse(vse)

    return (
        <AmplienceContext.Provider value={{vse, vseTimestamp, client}}>
            {children}
        </AmplienceContext.Provider>
    )
}

const getCookies = (headers) => {
    for (let i = 0; i < headers.length; i += 2) {
        if (headers[i] === 'Cookie') {
            return cookie.parse(headers[i + 1])
        }
    }

    return {}
}

export const generateVseProps = ({req, res, query}) => {
    let vse = null
    let vseTimestamp = 0

    if (res) {
        vse = query.vse
        vseTimestamp = query['vse-timestamp']
        vseTimestamp = vseTimestamp == 'null' ? 0 : Number(vseTimestamp)

        if (vse == null) {
            const cookies = getCookies(req.rawHeaders)
            vse = cookies['vse']
            vseTimestamp = cookies['vse-timestamp']
            vseTimestamp = vseTimestamp != null ? Number(vseTimestamp) : undefined
        }
    }

    return {vse, vseTimestamp}
}

AmplienceContextProvider.propTypes = {
    vse: PropTypes.string,
    vseTimestamp: PropTypes.number,

    children: PropTypes.node.isRequired
}
