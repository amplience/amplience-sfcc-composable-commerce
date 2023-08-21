import React from 'react'
import PropTypes from 'prop-types'
import {Text, Button, Stack, Box} from '@salesforce/retail-react-app/app/components/shared/ui'

const Suggestions = ({suggestions, closeAndNavigate}) => {
    if (!suggestions) {
        return null
    }
    return (
        <Stack spacing={0} data-testid="sf-suggestion">
            <Box mx={'-16px'}>
                {suggestions.map((suggestion, idx) => (
                    <Button
                        width="full"
                        onMouseDown={() => closeAndNavigate(suggestion.link)}
                        fontSize={'md'}
                        key={idx}
                        marginTop={0}
                        height={'30px'}
                        variant="menu-link"
                    >
                        <Text
                            fontWeight="400"
                            dangerouslySetInnerHTML={{__html: suggestion.name}}
                        />
                        {suggestion.parentCategoryName && (
                            <Text ml={4} fontSize={'xs'} textStyle={'italic'}>
                                (&gt; {suggestion.parentCategoryName})
                            </Text>
                        )}
                    </Button>
                ))}
            </Box>
        </Stack>
    )
}

Suggestions.propTypes = {
    suggestions: PropTypes.array,
    closeAndNavigate: PropTypes.func
}

export default Suggestions
