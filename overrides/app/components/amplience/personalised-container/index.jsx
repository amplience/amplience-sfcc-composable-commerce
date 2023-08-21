import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../wrapper'

export const indexStyle = {
    position: 'absolute',
    zIndex: '5',
    background: 'rgba(200, 200, 200, 0.6)',
    fontSize: '12px',
    padding: '5px',
    margin: '5px',
    borderRadius: '5px',
    maxWidth: 300
}

const PersonalisedContainer = ({
    content,
    components,
    limit,
    defaultContent,
    maxNumberMatches,
    variants,
    ...props
}) => {
    if (content) {
        if (limit) {
            content = content.slice(0, limit)
        }

        return content.map((contentItem, index) => (
            <AmplienceWrapper
                content={contentItem}
                components={components}
                key={index}
                {...props}
            />
        ))
    }

    return <></>
}

PersonalisedContainer.displayName = 'PersonalisedContainer'

PersonalisedContainer.propTypes = {
    content: PropTypes.array,
    components: PropTypes.object,
    limit: PropTypes.number,
    // These are not used, but content does contain it.
    defaultContent: PropTypes.array,
    maxNumberMatches: PropTypes.number,
    variants: PropTypes.array
}

export default PersonalisedContainer
