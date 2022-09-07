import React from 'react'
import PropTypes from 'prop-types'
import Link from '../../link'
import {Avatar, Box, useMultiStyleConfig} from '@chakra-ui/react'

import {getImageUrl} from '../../../utils/amplience/image'

/**
 * Button component cound be used anywhere
 */
const Author = ({content, setAuthor, variant, ...otherProps}) => {
    const styles = useMultiStyleConfig('Author', {variant})

    const authorUrl = `/blog?author=${encodeURIComponent(content.name)}`
    const authorImage =
        (typeof content.image === 'string' ? content.image : getImageUrl(content.image)) + '?w=100'

    return (
        <Box {...styles.container} {...otherProps}>
            <Link to={authorUrl} onClick={() => setAuthor(content.name)}>
                <Avatar name={content.name} src={authorImage} size="md" {...styles.image}></Avatar>
            </Link>
            <Box {...styles.info}>
                <Link to={authorUrl} onClick={() => setAuthor(content.name)} {...styles.name}>
                    {content.name}
                </Link>
                <Box {...styles.role}>{content.role}</Box>
            </Box>
        </Box>
    )
}

Author.displayName = 'Author'

Author.propTypes = {
    content: PropTypes.object,
    variant: PropTypes.oneOf(['card'])
}

export default Author
