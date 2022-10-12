import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../wrapper'
import AmplienceMarkdown from '../markdown'
import {Box, Heading} from '@chakra-ui/react'

import {getImageUrl} from '../../../utils/amplience/image'

/**
 * Amplience Rich Text Component
 * Renders content authored by the Rich Text Extension.
 * Blocks of markdown text interspersed with content blocks.
 */
const AmplienceRichText = ({header, content}) => {
    return (
        <>
            <Box>
                {
                    header &&
                    <Heading pb="8" as="h2">
                        {header}
                    </Heading>
                }
                {content?.richText?.map((item, index) => {
                    switch (item.type) {
                        case 'markdown':
                            return (
                                <AmplienceMarkdown
                                    content={item.data}
                                    key={index}
                                    className="amp-rich-text"
                                />
                            )
                        case 'dc-content-link':
                            return <AmplienceWrapper content={item.data} key={index} />
                        case 'dc-image-link': {
                            let src = ''
                            let alt = ''
                            if (item.data) {
                                src = getImageUrl(item.data)
                                alt = item.data.alt
                            }

                            return (
                                <img
                                    src={src}
                                    alt={alt}
                                    key={index}
                                    style={{
                                        maxHeight: '50vh',
                                        margin: '0 auto',
                                        marginBlockEnd: '1em'
                                    }}
                                ></img>
                            )
                        }
                    }
                })}
            </Box>
        </>
    )
}

AmplienceRichText.displayName = 'AmplienceRichText'

AmplienceRichText.propTypes = {
    /**
     * Rich Text Content
     */
    content: PropTypes.array
}

export default AmplienceRichText
