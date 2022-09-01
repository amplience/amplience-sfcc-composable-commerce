import React, {useEffect, useLayoutEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {Box} from '@chakra-ui/react'

import {getImageUrl} from '../../../utils/amplience/image'
import useResizeObserver from '@react-hook/resize-observer'

/**
 * Amplience Point of Interest Background Image
 * A container that automatically fits a background image based on a point of interest.
 */
const AmpliencePOIBackgroundImage = ({image, alt, children, ...otherProps}) => {
    const target = useRef(null)
    const [size, setSize] = useState()
    const [imageSize, setImageSize] = useState()

    useLayoutEffect(() => {
        setSize(target.current.getBoundingClientRect())
    }, [target])

    useResizeObserver(target, (entry) => setSize(entry.contentRect))

    useEffect(async () => {
        let cancelled = false

        setSize(undefined)

        // Determine the image size.
        let response = await fetch(getImageUrl(image.image) + '.json')

        if (cancelled) return

        let json = await response.json()

        if (cancelled) return

        setImageSize({width: json.width, height: json.height})

        return () => {
            cancelled = true
        }
    }, [image])

    let poi = image.poi.x == -1 ? {x: 0.5, y: 0.5} : {...image.poi}

    poi.x = Math.min(1, Math.max(0, (poi.x - 0.5) * 2 + 0.5))
    poi.y = Math.min(1, Math.max(0, (poi.y - 0.5) * 2 + 0.5))

    let backgroundPosition = `${poi.x * 100}% ${poi.y * 100}%`
    let backgroundSize = 'cover'

    if (size && imageSize && image.poi.x != -1) {
        const containerAspect = size.width / size.height
        const imageAspect = imageSize.width / imageSize.height

        // Constrain a different axis depending on which aspect is greater.

        if (imageAspect > containerAspect) {
            // Image is wider than container, so overflows in x axis.
            // Height is constrained to container size.

            const imageWidth = imageAspect
            const containerWidth = containerAspect
            const movablePct = (imageWidth - containerWidth) / imageWidth
            const halfImagePct = containerWidth / 2 / imageWidth

            const xOffset =
                Math.min(1, Math.max(0, (image.poi.x - halfImagePct) / movablePct)) * 100

            backgroundPosition = `${xOffset}% 50%`
        } else {
            // Image is taller than container, so overflows in y axis.
            // Width is constrained to container size.

            const imageHeight = 1 / imageAspect
            const containerHeight = 1 / containerAspect
            const movablePct = (imageHeight - containerHeight) / imageHeight
            const halfImagePct = containerHeight / 2 / imageHeight

            const yOffset =
                Math.min(1, Math.max(0, (image.poi.y - halfImagePct) / movablePct)) * 100

            backgroundPosition = `50% ${yOffset}%`
        }
    }

    const style = {
        backgroundImage: `url(${getImageUrl(image.image)})`,
        backgroundPosition,
        backgroundSize
    }

    return (
        <Box role="img" aria-label={alt} style={style} ref={target} {...otherProps}>
            {children}
        </Box>
    )
}

AmpliencePOIBackgroundImage.displayName = 'AmpliencePOIBackgroundImage'

AmpliencePOIBackgroundImage.propTypes = {
    /**
     * Amplience image
     */
    image: PropTypes.object,
    /**
     * Alt Text
     */
    alt: PropTypes.string,
    /**
     * Child content
     */
    children: PropTypes.node
}

export default AmpliencePOIBackgroundImage
