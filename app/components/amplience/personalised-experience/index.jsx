import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../wrapper'

const PersonalisedExperience = ({
    content,
    ...props
}) => {
    if (content) {
        return content.map((contentItem, index) => (
            <>
                <AmplienceWrapper
                    content={contentItem}
                    fecth={{id: contentItem.id}}
                    key={index}
                    {...props}
                />
            </>
        ))
    }

    return <></>
}

PersonalisedExperience.displayName = 'PersonalisedExperience'

PersonalisedExperience.propTypes = {
    content: PropTypes.array
}

export default PersonalisedExperience
