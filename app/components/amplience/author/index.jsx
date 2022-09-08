import React from 'react'
import PropTypes from 'prop-types'
import Link from '../link'
import {Avatar, Box, useMultiStyleConfig} from '@chakra-ui/react'

import {getImageUrl} from '../../../utils/amplience/image'

/**
 * Author component could be used anywhere
 */
const Author = ({content, variant, ...otherProps}) => {
    const styles = useMultiStyleConfig('Author', {variant})

    const authorUrl = `/${content.deliveryKey || content._meta.deliveryKey}`
    const authorImage =
        (typeof content.image === 'string' ? content.image : getImageUrl(content.image)) + '?w=100'

    return (
        <Box {...styles.container} {...otherProps}>
            <Link to={authorUrl}>
                <Avatar name={content.name} src={authorImage} size="md" {...styles.image}></Avatar>
            </Link>
            <Box {...styles.info}>
                <Link to={authorUrl} {...styles.name}>
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
