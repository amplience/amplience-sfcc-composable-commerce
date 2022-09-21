import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../wrapper'

const PersonalisedContainer = ({
                                   content,
                                   ...props
                               }) => {
    if (content) {
        return content.map((contentItem) => (<AmplienceWrapper content={contentItem} />))
    }

    return <></>
}

PersonalisedContainer.displayName = 'PersonalisedContainer'

PersonalisedContainer.propTypes = {
    content: PropTypes.array
}

export default PersonalisedContainer
