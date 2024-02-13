import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../wrapper'

const LocalisedSlot = ({...props}) => {
    const content = props.content
    const meta = props._meta

    if (content) {
        return (
            <>
                {content.map((content, index) => {
                    return <AmplienceWrapper content={{...content, slot: meta}} key={index} />
                })}
            </>
        )
    } else {
        return <></>
    }
}

LocalisedSlot.displayName = 'Localised Slot'

LocalisedSlot.propTypes = {
    content: PropTypes.array,
    _meta: PropTypes.object
}

export default LocalisedSlot
