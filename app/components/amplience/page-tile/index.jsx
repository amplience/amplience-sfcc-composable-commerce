import React from 'react'
import PropTypes from 'prop-types'
import {Box, Text} from '@chakra-ui/react'
import Link from '../link'

const PageTile = ({page}) => {
    return (
        <Box>
            <Link to={'/' + page._meta.deliveryKey}>
                <Text fontSize="lg">{page.seo.title}</Text>
            </Link>
            <Text noOfLines={2}>{page.seo.description}</Text>
        </Box>
    )
}

PageTile.propTypes = {
    page: PropTypes.object
}

export default PageTile
