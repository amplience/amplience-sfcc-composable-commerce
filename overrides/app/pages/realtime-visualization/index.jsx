/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useContext, useEffect, useState} from 'react'
import {useLocation} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Box} from '@chakra-ui/react'
import Seo from '@salesforce/retail-react-app/app/components/seo'

// Amplience
import AmplienceWrapper from '../../components/amplience/wrapper'
import {useAmplienceApi} from 'amplience-api-react/dist/hooks/useAmplienceApi'
import {useAmpRtv} from 'amplience-api-react'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const AmpRtv = ({vse, contentId, hubname}) => {
    const [formContent, setFormContent] = useState(undefined)
    const [localVse, setLocalVse] = useState(vse)
    const [localContentId, setLocalContentId] = useState(contentId)
    const [localHubname, setLocalHubname] = useState(hubname)
    const {groups} = useAmplienceApi()
    const location = useLocation()

    useAmpRtv(
        (model) => {
            setFormContent(model.content)
        },
        undefined,
        [groups]
    )

    useEffect(() => {
        // Lets automatically close the mobile navigation when the
        // location path is changed.
        const activeParams = new URLSearchParams(location.search || '')
        const vse = activeParams.get('vse')
        const contentId = activeParams.get('contentId')
        const hub = activeParams.get('hub')

        if (vse) {
            setLocalVse(vse)
        }

        if (contentId) {
            setLocalContentId(contentId)
        }

        if (hub) {
            setLocalHubname(hub)
        }
    }, [location])

    // Overwrite the context to perform vis from vse.

    const fetch = formContent ? undefined : {id: localContentId}

    return (
        <Box data-testid="real-viz" layerStyle="page">
                <Seo
                    title="Home Page"
                    description="Commerce Cloud Retail React App"
                    keywords="Commerce Cloud, Retail React App, React Storefront"
                />

                <AmplienceWrapper
                    content={formContent}
                    fetch={fetch}
                    type="SLOT"
                    rtvActive={true}
                />
        </Box>
    )
}

AmpRtv.getTemplateName = () => 'ampRtv'
AmpRtv.propTypes = {
    recommendations: PropTypes.array,
    isLoading: PropTypes.bool,
    vse: PropTypes.string,
    contentId: PropTypes.string,
    hubname: PropTypes.string
}

AmpRtv.getProps = async ({req}) => {
    const vse = req?.query['vse']
    const contentId = req?.query['contentId']
    const hubname = req?.query['hub']

    return {vse, contentId, hubname}
}

export default AmpRtv
