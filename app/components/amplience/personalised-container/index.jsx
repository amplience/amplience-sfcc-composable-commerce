import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../wrapper'

const PersonalisedContainer = ({content, limit, ...props}) => {
    if (content) {
        if (limit) {
            content = content.slice(0, limit)
        }

        return content.map((contentItem, index) => (
            <AmplienceWrapper content={contentItem} key={index} {...props} />
        ))
    }

    return <></>
}

PersonalisedContainer.displayName = 'PersonalisedContainer'

PersonalisedContainer.propTypes = {
    content: PropTypes.array,
    limit: PropTypes.number
}

export default PersonalisedContainer
