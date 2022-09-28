import React from 'react'
import PropTypes from 'prop-types'
import AmplienceWrapper from '../wrapper'
import {Box} from '@chakra-ui/react'
import {useLocation} from 'react-router-dom'

export const indexStyle = {
    position: 'absolute',
    zIndex: '5',
    background: 'gray.50',
    padding: '5px',
    margin: '5px',
    borderRadius: '5px',
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
    const location = useLocation()
    const showInfo = (location.search && (location.search.includes('vse=') || location.search.includes('pagevse='))) || rtvActive;

    if (content) {
        if (limit) {
            content = content.slice(0, limit)
        }

        return content.map((contentItem, index) => (
            <>
                {showInfo && contentItem.match && (
                    <Box className={"matchInfo"} {...indexStyle}>
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
