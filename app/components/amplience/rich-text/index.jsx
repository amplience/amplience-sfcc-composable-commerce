import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../wrapper'
import AmplienceMarkdown from '../markdown'

import {getImageUrl} from '../../../utils/amplience/image'

/**
 * Amplience Rich Text Component
 * Renders content authored by the Rich Text Extension.
 * Blocks of markdown text interspersed with content blocks.
 */
const AmplienceRichText = ({content}) => {
    return content.map((item, index) => {
        switch (item.type) {
            case 'markdown':
                return <AmplienceMarkdown content={item.data} key={index} />
            case 'dc-content-link':
                return <AmplienceWrapper fetch={{id: item.data.id}} key={index} />
            case 'dc-image-link': {
                let src = ''
                let alt = ''
                if (item.data) {
                    src = getImageUrl(item.data)
                    alt = item.data.alt
                }

                return <img src={src} alt={alt}></img>
            }
        }
    })
}

AmplienceRichText.displayName = 'AmplienceRichText'

AmplienceRichText.propTypes = {
    /**
     * Rich Text Content
     */
    content: PropTypes.object
}

export default AmplienceRichText
