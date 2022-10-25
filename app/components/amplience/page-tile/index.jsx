import React from 'react'
import PropTypes from 'prop-types'
import {Box, Link, Text} from '@chakra-ui/react'

const PageTile = ({page}) => {
    return (
        <Box>
            <Link href={'page/' + page._meta.deliveryKey}>
                <Text fontSize="lg">{page.seo.title.values[0].value}</Text>
            </Link>
            <Text noOfLines={2}>{page.seo.description.values[0].value}</Text>
        </Box>
    )
}

PageTile.propTypes = {
    page: PropTypes.object
}

export default PageTile
