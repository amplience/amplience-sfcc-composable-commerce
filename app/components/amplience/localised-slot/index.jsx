import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../wrapper'

const LocalisedSlot = ({...props}) => {
    const content = props.content
    const meta = props._meta

    if (content) {
        return (
            <>
                {
                    content.map((value, index) => {
                        return (
                            <AmplienceWrapper content={value} key={index} />
                        )
                    })
                }
            </>
        )
    } else {
        return <></>
    }
}

LocalisedSlot.displayName = 'Localised Slot'

LocalisedSlot.propTypes = {
    content: PropTypes.array
}

export default LocalisedSlot
