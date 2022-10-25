import React from 'react'
import PropTypes from 'prop-types'
import {Box, SimpleGrid, GridItem} from '@chakra-ui/react'

import useWishlist from '../../../hooks/use-wishlist'

// TO switch back to the OOTB Product Tile, comment out the next 2 lines and uncomment line 10
import AmplienceProductTile from '../../../components/amplience/product-tile'
import {Skeleton as ProductTileSkeleton} from '../../../components/amplience/product-tile'
//import ProductTile, {Skeleton as ProductTileSkeleton} from '../../components/product-tile'

import AmplienceWrapper from '../../../components/amplience/wrapper'

const ProductListing = ({
    isLoading,
    isMobile,
    rtvActive,
    productSearchResult,
    searchParams,
    inGridComponents,
    results,
    addItemToWishlist,
    removeItemFromWishlist
}) => {
    const wishlist = useWishlist()

    const indexStyle = {
        position: 'absolute',
        zIndex: '1',
        background: 'white',
        padding: '2px 9px',
        margin: '5px',
        borderRadius: '30px'
    }

    return (
        <SimpleGrid
            className="listComp"
            columns={[2, 2, 3, 3]}
            spacingX={4}
            spacingY={{base: 4, lg: 4}}
        >
            {isLoading || !productSearchResult
                ? new Array(searchParams.limit)
                      .fill(0)
                      .map((value, index) => <ProductTileSkeleton key={index} />)
                : results.map((item, index) => {
                      if (item.isAmplience) {
                          // Amplience content tile

                          return (
                              <GridItem
                                  key={index}
                                  colEnd={{
                                      base: `span 1`,
                                      md: `span ${item.cols}`
                                  }}
                                  rowEnd={{
                                      base: `span 1`,
                                      md: `span ${item.rows}`
                                  }}
                                  display="flex"
                              >
                                  {rtvActive && (
                                      <Box {...indexStyle}>{item.indices.join(', ')}</Box>
                                  )}
                                  <AmplienceWrapper
                                      fetch={{id: item.content?.id}}
                                      components={inGridComponents}
                                      cols={isMobile ? 1 : item.cols}
                                      rows={isMobile ? 1 : item.rows}
                                      gap={16}
                                      skeleton={{display: 'flex', flex: 1}}
                                  ></AmplienceWrapper>
                              </GridItem>
                          )
                      } else {
                          const productSearchItem = item
                          const productId = productSearchItem.productId
                          const isInWishlist = !!wishlist.findItemByProductId(productId)

                          return (
                              <AmplienceProductTile
                                  data-testid={`sf-product-tile-${productSearchItem.productId}`}
                                  key={productSearchItem.productId}
                                  product={productSearchItem}
                                  enableFavourite={true}
                                  isFavourite={isInWishlist}
                                  onFavouriteToggle={(isFavourite) => {
                                      const action = isFavourite
                                          ? addItemToWishlist
                                          : removeItemFromWishlist
                                      return action(productSearchItem)
                                  }}
                                  dynamicImageProps={{
                                      widths: ['50vw', '50vw', '20vw', '20vw', '25vw']
                                  }}
                              >
                                  {rtvActive && (
                                      <Box {...indexStyle}>{item.indices.join(', ')}</Box>
                                  )}
                              </AmplienceProductTile>
                          )
                      }
                  })}
        </SimpleGrid>
    )
}

ProductListing.propTypes = {
    isLoading: PropTypes.boolean,
    isMobile: PropTypes.boolean,
    rtvActive: PropTypes.boolean,
    productSearchResult: PropTypes.object,
    results: PropTypes.object,
    searchParams: PropTypes.object,
    inGridComponents: PropTypes.object,
    addItemToWishlist: PropTypes.func,
    removeItemFromWishlist: PropTypes.func
}

export default ProductListing
