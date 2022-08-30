import React from 'react'
import PropTypes from 'prop-types'

const md = require('markdown-it')('commonmark', {html: true, breaks: true})

/**
 * Amplience Markdown Component
 * Renders markdown as HTML.
 */
const AmplienceMarkdown = ({content}) => {
    const html = md.render(content ?? '')

    return <div dangerouslySetInnerHTML={{__html: html}}></div>
}

AmplienceMarkdown.displayName = 'AmplienceMarkdown'

AmplienceMarkdown.propTypes = {
    /**
     * Markdown Content
     */
    content: PropTypes.string
}

export default AmplienceMarkdown
