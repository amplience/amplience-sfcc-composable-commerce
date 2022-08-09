import React from 'react'
import PropTypes from 'prop-types'

//Amplience Rendering Templates
import ProductScroller from '../../product-scroller'

const tempMapProducts = (ids) => {
    return ids.map((id) => ({
        currency: 'GBP',
        image: {
            alt: 'Example Image',
            disBaseLink: 'https://i8.amplience.net/s/willow/082387',
            link: 'https://i8.amplience.net/s/willow/082387'
        },
        price: 50,
        name: 'Product ' + id,
        productName: 'Product ' + id,
        productId: id
    }))
}

const CuratedProductList = ({...props}) => {
    const mappedProducts = tempMapProducts(props.products)

    return <ProductScroller title={props.title} products={mappedProducts} />
}

CuratedProductList.displayName = 'Curated Product List'

CuratedProductList.propTypes = {
    title: PropTypes.string,
    products: PropTypes.array
}

export default CuratedProductList
