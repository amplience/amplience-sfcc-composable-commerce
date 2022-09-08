import React from 'react'
import PropTypes from 'prop-types'
import Author from '../author'
import Link from '../link'
import {Box, Image, Text, useMultiStyleConfig} from '@chakra-ui/react'
import {getImageUrl} from '../../../utils/amplience/image'
import AmplienceMarkdown from '../markdown'

const AuthorCard = ({item, variant = 'extendedCard', ...otherProps}) => {
    const content = item
    const styles = useMultiStyleConfig('Author', {variant})
    const url = getImageUrl(content.image)

    /// the URL should be the delivery key
    const linkUrl = `/${content._meta.deliveryKey}`
    const imageUrl = `${url}?sm=aspect&aspect=350:233&w=688`

    return (
        <Box {...styles.container} {...otherProps}>
            <Link to={linkUrl} {...styles.content}>
                {content.image && (
                    <Image
                        fit={'cover'}
                        align={'center'}
                        width={'100%'}
                        height={'233'}
                        src={imageUrl}
                        alt={content.name}
                    />
                )}
            </Link>
            <Box {...styles.body}>
                <Box {...styles.infoBox}>
                    <Link to={linkUrl} {...styles.name}>
                        {content.name}
                    </Link>
                    <Box {...styles.role}>{content.role}</Box>
                </Box>
                <Box {...styles.info}>
                    {content.about && <AmplienceMarkdown {...styles.description} content={content.about} />}
                </Box>
            </Box>
        </Box>
    )
}

AuthorCard.displayName = 'AuthorCard'

AuthorCard.propTypes = {
    item: PropTypes.object
}

export default AuthorCard
