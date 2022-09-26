import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../wrapper'
import {Box} from '@chakra-ui/react'

export const indexStyle = {
    position: 'absolute',
    zIndex: '1',
    background: 'white',
    padding: '2px 9px',
    margin: '20px 5px',
    borderRadius: '30px'
}

const PersonalisedContainer = ({
                                   content,
                                   components,
                                   limit,
                                   defaultContent,
                                   maxNumberMatches,
                                   variants,
                                   rtvActive,
                                   ...props
                               }) => {

    if (content) {
        if (limit) {
            content = content.slice(0, limit)
        }

        return content.map((contentItem, index) => (
            <>
                {rtvActive && contentItem.match && (
                    <Box {...indexStyle}>
                        {contentItem.match}
                    </Box>
                )}
                <AmplienceWrapper
                    content={contentItem}
                    components={components}
                    key={index}
                    {...props}
                />
            </>
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
