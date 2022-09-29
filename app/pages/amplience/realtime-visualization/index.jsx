/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useContext, useState} from 'react'
import {useParams} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Box} from '@chakra-ui/react'
import Seo from '../../../components/seo'

// Amplience
import {AmplienceContext, AmplienceContextProvider} from '../../../contexts/amplience'
import AmplienceWrapper from '../../../components/amplience/wrapper'
import {useAmpRtv} from '../../../utils/amplience/rtv'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const AmpRtv = ({vse}) => {
    const {contentId} = useParams()
    const [formContent, setFormContent] = useState(undefined)
    const {groups} = useContext(AmplienceContext)

    useAmpRtv(
        (model) => {
            setFormContent(model.content)
        },
        undefined,
        [groups]
    )

    // Overwrite the context to perform vis from vse.

    const fetch = formContent ? undefined : {id: contentId}

    return (
        <Box data-testid="real-viz" layerStyle="page">
            <AmplienceContextProvider vse={vse} groups={groups}>
                <Seo
                    title="Home Page"
                    description="Commerce Cloud Retail React App"
                    keywords="Commerce Cloud, Retail React App, React Storefront"
                />

                <AmplienceWrapper content={formContent} fetch={fetch} type="SLOT" rtvActive={true} />
            </AmplienceContextProvider>
        </Box>
    )
}

AmpRtv.getTemplateName = () => 'ampRtv'
AmpRtv.propTypes = {
    recommendations: PropTypes.array,
    isLoading: PropTypes.bool
}

AmpRtv.getProps = async ({req}) => {
    const vse = req?.query['vse'];

    return {vse}
}

export default AmpRtv
