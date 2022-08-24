/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useContext, useEffect, useState} from 'react'
import {useParams} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Box} from '@chakra-ui/react'
import Seo from '../../../components/seo'

// Amplience
import {RealtimeVisualization, AmplienceContextProvider} from '../../../contexts/amplience'
import AmplienceWrapper from '../../../components/amplience/wrapper'

/**
 * This is the home page for Retail React App.
 * The page is created for demonstration purposes.
 * The page renders SEO metadata and a few promotion
 * categories and products, data is from local file.
 */
const AmpRtv = () => {
    const {hubname, contentId, vse, locale} = useParams()

    const RTV = useContext(RealtimeVisualization)
    let removeChangedSubscription = undefined
    const [formContent, setFormContent] = useState(undefined)

    useEffect(() => {
        if (RTV !== null && RTV.ampVizSdk !== null) {
            const options = {
                format: 'inline',
                depth: 'all'
            }

            RTV.ampVizSdk.form.get(options).then((model) => {
                setFormContent(model.content)
            })

            RTV.ampVizSdk.form.saved(() => {
                window.location.reload()
            })

            RTV.ampVizSdk.locale.changed(() => {
                window.location.reload()
            })

            removeChangedSubscription = RTV.ampVizSdk.form.changed((model) => {
                // handle form model change
                setFormContent(model.content)
            })
        }

        return () => {
            if (removeChangedSubscription != undefined) {
                removeChangedSubscription()
            }
        }
    }, [RTV.ampVizSdk])

    // Overwrite the context to perform vis from vse.

    const fetch = formContent ? undefined : {id: contentId}

    return (
        <Box data-testid="real-viz" layerStyle="page">
            <AmplienceContextProvider vse={vse}>
                <Seo
                    title="Home Page"
                    description="Commerce Cloud Retail React App"
                    keywords="Commerce Cloud, Retail React App, React Storefront"
                />

                <Box style={{padding: 20, marginBottom: 20, backgroundColor: "#fef4fd", border: "1px solid #fba9ed"}}>
                    <p><b>Hub Name:</b> {hubname}</p>
                    <p><b>VSE:</b> {vse}</p>
                    <p><b>Locale:</b> {locale}</p>
                    <p><b>Content ID:</b> {contentId}</p>
                </Box>

                <AmplienceWrapper content={formContent} fetch={fetch} type="SLOT" />
            </AmplienceContextProvider>
        </Box>
    )
}

AmpRtv.getTemplateName = () => 'ampRtv'
AmpRtv.propTypes = {
    recommendations: PropTypes.array,
    isLoading: PropTypes.bool
}

AmpRtv.getProps = async () => {}

export default AmpRtv
