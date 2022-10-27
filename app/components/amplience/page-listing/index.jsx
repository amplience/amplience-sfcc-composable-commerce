import React from 'react'
import PropTypes from 'prop-types'
import {SimpleGrid, Skeleton} from '@chakra-ui/react'
import PageTile from '../page-tile'

const PageListing = ({pages}) => {
    console.log('pages', pages)
    return (
        <SimpleGrid columns={[2, 2, 3, 3]} spacingX={4} spacingY={{base: 12, lg: 16}}>
            {!pages
                ? new Array(3).fill(0).map((value, index) => <Skeleton key={index} />)
                : pages.map((page) => {
                      return <PageTile key={page.content._meta.deliveryId} page={page.content} />
                  })}
        </SimpleGrid>
    )
}

PageListing.propTypes = {
    pages: PropTypes.array
}

export default PageListing