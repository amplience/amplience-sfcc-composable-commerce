import React from 'react'
import PropTypes from 'prop-types'
import {Box, Text, Heading, useMultiStyleConfig} from '@chakra-ui/react'
import Link from '../link'
import styled from '@emotion/styled'

const Contain = styled(Link)`
    &:hover {
        text-decoration: none;
        h2 {
            //text-decoration: underline;
        }
        > div {
            background: rgba(245, 245, 245, 0.9);
            border-color: #aaa;
        }
    }
`

const PageTile = ({page}) => {
    const styles = useMultiStyleConfig('ContentTile')
    return (
        <Contain to={'/' + page._meta.deliveryKey}>
            <Box {...styles.tile}>
                <Heading as={'h2'} {...styles.title} fontSize="lg">
                    {page.seo.title}
                </Heading>
                <Text {...styles.blurb} noOfLines={2}>
                    {page.seo.description}
                </Text>
            </Box>
        </Contain>
    )
}

PageTile.propTypes = {
    page: PropTypes.object
}

export default PageTile
