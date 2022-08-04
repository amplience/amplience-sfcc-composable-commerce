import React, {useEffect, useState} from 'react'

//Amplience Rendering Templates
import AmplienceWrapper from '../Wrapper'

const flexibleListSlot = ({...props}) => {

    const content = props.content;

    return (
        <>
            { 
                content.map(content => {
                    return <AmplienceWrapper content={content} />;
                })
            }
        </>
    );
}

flexibleListSlot.displayName = "Flexible List Slot"

flexibleListSlot.propTypes = {
    content: {}
}

export default flexibleListSlot
