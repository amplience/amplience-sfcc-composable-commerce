import React from 'react'
import PropTypes from 'prop-types'

//Amplience Rendering Templates
import AmplienceWrapper from '../Wrapper'

const flexibleListSlot = ({...props}) => {
    const content = props.content

    return (
        <>
            {content.map((content, index) => {
                return <AmplienceWrapper content={content} key={index} />
            })}
        </>
    )
}

flexibleListSlot.displayName = 'Flexible List Slot'

flexibleListSlot.propTypes = {
    content: PropTypes.array
}

export default flexibleListSlot
