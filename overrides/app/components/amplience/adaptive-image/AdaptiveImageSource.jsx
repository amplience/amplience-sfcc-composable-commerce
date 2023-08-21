import React, {useContext} from 'react'
import PropTypes from 'prop-types'
import {getImageTransformURL} from 'amplience-api-react'
import {AdaptiveImageContext} from './AdaptiveImage'

/* interface Props extends React.DetailedHTMLProps<React.SourceHTMLAttributes<HTMLSourceElement>, HTMLSourceElement> {
    transformations?: ImageTransformations;
} */

const AdaptiveImageSource = (props) => {
    const {transformations, ...other} = props

    const {image, rootTransformations} = useContext(AdaptiveImageContext) || {}

    if (!image) {
        return null
    }

    const imageUrl = getImageTransformURL(image, transformations)
    let t2 = transformations
    //t2.width = t2.width * 2;
    //t2.height = t2.height * 2;
    //TODO, fix this
    const imageUrl2x = getImageTransformURL(image, t2)

    //console.log(t2);

    return <source srcSet={`${imageUrl} 1x, ${imageUrl2x} 2x`} src={imageUrl} {...other} />
}

AdaptiveImageSource.displayName = 'AdaptiveImageSource'

AdaptiveImageSource.propTypes = {
    transformations: PropTypes.object
}

export default AdaptiveImageSource
