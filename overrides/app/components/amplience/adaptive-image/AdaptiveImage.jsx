import React, {createContext, forwardRef} from 'react'
import PropTypes from 'prop-types'
import {getImageTransformURL} from 'amplience-api-react'
import {Image} from '@chakra-ui/react'

export const AdaptiveImageContext = createContext(null)

const AdaptiveImage = (props) => {
    const {image, transformations, children, imageRef, ...other} = props

    if (!image) {
        return null
    }

    const defaultImageUrl = getImageTransformURL(image, transformations)

    return (
        <AdaptiveImageContext.Provider
            value={{
                image,
                transformations
            }}
        >
            <picture>
                {children}
                <Image
                    ref={imageRef}
                    src={defaultImageUrl}
                    fallbackSrc={`${defaultImageUrl}&w=1&qlt=1`}
                    {...other}
                />
            </picture>
        </AdaptiveImageContext.Provider>
    )
}

AdaptiveImage.displayName = 'AdaptiveImage'

AdaptiveImage.propTypes = {
    image: PropTypes.object,
    transformations: PropTypes.object,
    children: PropTypes.node,
    imageRef: PropTypes.object
}

// eslint-disable-next-line react/display-name
export default forwardRef((props, ref) => (
    <AdaptiveImage {...props} imageRef={ref}>
        {props.children}
    </AdaptiveImage>
))
