import React from 'react'
import PropTypes from 'prop-types'
import Author from '../author'
import Link from '../../link'
import Button from '../button'
import {Box, Heading, Image, Text, useMultiStyleConfig} from '@chakra-ui/react'
import useLocale from '../../../hooks/use-locale'



/**
 * Button component cound be used anywhere
 */
const BlogCard = ({item, ...otherProps}) => {
    const locale = useLocale()
    const siteLocale = locale.id.toLowerCase()
    const content = item
    const styles = useMultiStyleConfig('BlogCard')

    /// the URL should be the delivery key
    const linkurl = `/${content.deliveryKey}`
    const imageurl = `${content.image}&sm=aspect&aspect=350:233&w=688`
    const description = content.description != '' ? content.description : content.seo.description

    return (
        <Box {...styles.container} {...otherProps}>
            <Link to={linkurl} {...styles.content}>
                {content.image && (
                    <Image
                        fit={'cover'}
                        align={'center'}
                        width={'100%'}
                        height={'233'}
                        src={imageurl}
                        alt={content.name}
                    />
                )}
                <Box {...styles.body}>
                    {content.seo?.title && (
                        <Heading as="h2" {...styles.heading}>
                            {content.seo.title}
                        </Heading>
                    )}
                    {description && <Text {...styles.description}>{description}</Text>}
                </Box>
            </Link>
            <Box {...styles.actions}>
                <Author content={content.author} variant="card" {...styles.author} />

                <Box {...styles.bottom}>
                    <Text {...styles.readTime}>
                        {new Date(content.date).toLocaleDateString(siteLocale, { weekday: 'long', year: 'numeric', month: 'long', day: '2-digit' })} | {content.readtime} Min
                    </Text>
                    {content.deliveryKey && (
                        <Button url={linkurl} target="_self" label="View" {...styles.button} />
                    )}
                </Box>
            </Box>
        </Box>
    )
}

BlogCard.displayName = 'BlogCard'

BlogCard.propTypes = {
    item: PropTypes.object
}

export default BlogCard
