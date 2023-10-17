import React from 'react'
import PropTypes from 'prop-types'
import AmplienceMarkdown from '../markdown'
import {Box} from '@chakra-ui/react'
import styled from '@emotion/styled'

const Contain = styled(Box)`
    .amp-rich-text h1 {
        font-size: 3rem;
        font-weight: 800;
        margin-bottom: 0.4em;
    }

    .amp-rich-text h2 {
        font-size: 2.25rem;
        font-weight: 700;
        margin-bottom: 0.4em;
    }

    .amp-rich-text h3 {
        font-size: 1.875rem;
        font-weight: 700;
        margin-bottom: 0.4em;
    }

    .amp-rich-text h4 {
        font-size: 1.5rem;
        font-weight: 700;
        margin-bottom: 0.4em;
    }

    .amp-rich-text h5 {
        font-size: 1.25rem;
        font-weight: 700;
        margin-bottom: 0.4em;
    }

    .amp-rich-text h6 {
        font-size: 0.8rem;
        font-weight: 700;
        margin-bottom: 0.6em;
    }

    .amp-rich-text > p {
        margin-block-end: 1em;
    }

    .amp-rich-text > p > img {
        margin: 0 auto;
    }

    .amp-rich-text img {
        max-height: 50vh;
    }

    .amp-rich-text a {
        color: #0176d3;
        font-weight: 600;
    }

    .amp-rich-text blockquote {
        border-left: 5px solid #c9c9c9;
        padding-inline-start: 1em;
        padding-top: 0.25em;
        padding-bottom: 0.25em;
        margin-inline-start: 1em;
        margin-block-end: 1em;
    }

    .amp-rich-text pre {
        margin-block-end: 1em;
    }

    .amp-rich-text ul {
        margin-inline-start: 1.5em;
        margin-block-end: 1em;
    }

    .amp-rich-text ol {
        margin-inline-start: 1.5em;
        margin-block-end: 1em;
    }
`

/**
 * Amplience Rich Text Component
 * Renders content authored by the Rich Text Extension.
 * Blocks of markdown text interspersed with content blocks.
 */
const AmplienceText = ({text}) => {
    return (
        <>
            <Contain>
                <Box mt={4} mb={4}>
                    <AmplienceMarkdown
                        content={text}
                        key={Math.random().toString(36).substr(2, 9)}
                        className="amp-rich-text"
                    />
                </Box>
            </Contain>
        </>
    )
}

AmplienceText.displayName = 'AmplienceText'

AmplienceText.propTypes = {
    /**
     * Text to display for the textual content
     */
    text: PropTypes.string
}

export default AmplienceText
