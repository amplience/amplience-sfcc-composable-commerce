import React, {useEffect, useState} from 'react'
import PropTypes from 'prop-types'
import {useCommerceAPI} from '../../../commerce-api/contexts'
import {handleAsyncError} from '../../../commerce-api/utils'
import ProductScroller from '../../product-scroller'

/*
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
*/

const tempMapProductIDs = () => {
    return ['74974310M', '78916783M', '25604455M', '25585429M', '69309284M']
}

const selectImage = (product) => {
    const groups = product.imageGroups
    if (groups == null || groups.length === 0) {
        return {}
    }

    const desiredViewType = 'large'
    const desiredGroup = groups.find((group) => group.viewType === desiredViewType) ?? groups[0]

    return desiredGroup.images[0]
}

const CuratedProductList = ({...props}) => {
    const api = useCommerceAPI()
    const [products, setProducts] = useState([])
    const [isLoading, setIsLoading] = useState(true)

    useEffect(
        handleAsyncError(async () => {
            const response = await api.shopperProducts.getProducts({
                parameters: {ids: tempMapProductIDs(props.products).join(',')}
            })

            const products = response.data.map((product) => ({
                ...product,
                productId: product.id,
                image: selectImage(product)
            }))

            setProducts(products)
            setIsLoading(false)
        }),
        [api, props.products]
    )

    //const mappedProducts = tempMapProducts(props.products)

    return <ProductScroller title={props.title} products={products} isLoading={isLoading} />
}

CuratedProductList.displayName = 'Curated Product List'

CuratedProductList.propTypes = {
    title: PropTypes.string,
    products: PropTypes.array
}

export default CuratedProductList
