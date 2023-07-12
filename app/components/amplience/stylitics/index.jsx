/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {createRef, useEffect} from 'react'
import PropTypes from 'prop-types'
import {Heading} from '@chakra-ui/react'

const styliticsViewMapping = {
    classic: {
        script: 'https://web-assets.stylitics.com/v3-classic/latest/classic.release.js',
        name: 'StyliticsClassicWidget'
    },
    hotspots: {
        script: 'https://web-assets.stylitics.com/v3-hotspots/latest/hotspots.release.js',
        name: 'StyliticsHotspotsWidget'
    },
    moodboard: {
        script: 'https://web-assets.stylitics.com/v3-moodboard/latest/moodboard.release.js',
        name: 'StyliticsMoodboardWidget'
    },
    gallery: {
        script: 'https://web-assets.stylitics.com/v3-gallery/latest/gallery.release.js',
        name: 'StyliticsGalleryWidget'
    },
    mainAndDetail: {
        script: 'https://web-assets.stylitics.com/v3-main-and-detail/latest/main-and-detail.release.js',
        name: 'StyliticsMainAndDetailWidget'
    }
}

function ensureViewLoaded(view, onLoad) {
    if (view.loaded) {
        onLoad()
    } else if (view.loadMethods == null) {
        view.loadMethods = [onLoad]

        var styliticsScript = document.createElement('script')
        styliticsScript.onload = function () {
            view.loaded = true

            for (const method of view.loadMethods) {
                method()
            }
        }
        styliticsScript.src = view.script
        document.head.appendChild(styliticsScript)
    } else {
        view.loadMethods.push(onLoad)
    }
}

const Stylitics = ({header, ...props}) => {
    const container = createRef()
    useEffect(() => {
        if (!window || !container.current) {
            return
        }

        let target = container.current

        let widgetInstance
        let active = true

        window.__Debug__ = true

        ensureViewLoaded(styliticsViewMapping[props.view || 'classic'], () => {
            if (!active) return

            const {
                StyliticsClassicWidget,
                StyliticsHotspotsWidget,
                StyliticsMoodboardWidget,
                StyliticsGalleryWidget,
                StyliticsMainAndDetailWidget
            } = window

            const config = props

            config.api = {
                item_number: props.sku || null,
                max: props.api?.max || 6,
                min: props.api?.min || 3
            }

            const styliticsAccount = props.account

            const viewSelector = props.view || 'classic'

            switch (viewSelector) {
                case 'classic':
                    if (props.classic?.display) {
                        config.display = {...config.display, ...props.classic.display}
                    }
                    config.navigation = props.classic?.navigation
                    config.text = props.classic?.text
                    widgetInstance = new StyliticsClassicWidget(styliticsAccount, target, config)
                    break
                case 'hotspots':
                    if (props.hotspots?.display) {
                        config.display = {...config.display, ...props.hotspots.display}
                    }
                    config.text = props.hotspots?.text
                    if (config?.display?.hotspotsOverlayOrder) {
                        config.display.hotspotsOverlayOrder =
                            config.display.hotspotsOverlayOrder.map((item) => {
                                return item.split(',')
                            })
                    }
                    widgetInstance = new StyliticsHotspotsWidget(styliticsAccount, target, config)
                    break
                case 'moodboard':
                    if (props.moodboard?.display) {
                        config.display = {...config.display, ...props.moodboard.display}
                    }
                    config.navigation = props.moodboard?.navigation
                    config.text = props.moodboard?.text
                    widgetInstance = new StyliticsMoodboardWidget(styliticsAccount, target, config)
                    break
                case 'gallery':
                    if (props.gallery?.display) {
                        config.display = {...config.display, ...props.gallery.display}
                    }
                    if (props.gallery?.api) {
                        config.api = {...config.display, ...props.gallery.api}
                    }
                    config.navigation = props.gallery?.navigation
                    config.text = props.gallery?.text
                    widgetInstance = new StyliticsGalleryWidget(styliticsAccount, target, config)
                    break
                case 'mainAndDetail':
                    if (props.mainAndDetail?.display) {
                        config.display = {...config.display, ...props.mainAndDetail.display}
                    }
                    widgetInstance = new StyliticsMainAndDetailWidget(
                        styliticsAccount,
                        target,
                        config
                    )
                    break
                default:
                    if (props.classic?.display) {
                        config.display = {...config.display, ...props.classic.display}
                    }
                    config.navigation = props.classic?.navigation
                    config.text = props.classic?.text
                    widgetInstance = new StyliticsClassicWidget(styliticsAccount, target, config)
                    break
            }

            widgetInstance.start()
        })

        return () => {
            active = false

            if (target) {
                target.innerHTML = ''
            }

            if (widgetInstance) {
                widgetInstance.destroy()
            }
        }
    }, [
        container,
        props.view,
        props.sku,
        props.api,
        props.display,
        props.price,
        props.classic,
        props.moodboard,
        props.gallery,
        props.hotspots,
        props.mainAndDetail
    ])

    return (
        <div>
            {header && <Heading as="h2">{header}</Heading>}
            <div ref={container} className="stylitics"></div>
        </div>
    )
}

Stylitics.displayName = 'Stylitics'

Stylitics.propTypes = {
    header: PropTypes.string,
    view: PropTypes.string,
    api: PropTypes.object,
    display: PropTypes.object,
    price: PropTypes.object,
    classic: PropTypes.object,
    hotspots: PropTypes.object,
    moodboard: PropTypes.object,
    gallery: PropTypes.object,
    mainAndDetail: PropTypes.object,
    account: PropTypes.string,
    sku: PropTypes.string
}

export default Stylitics
