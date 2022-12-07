import React, {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {Heading} from '@chakra-ui/layout'
import {useMultiStyleConfig, Skeleton} from '@chakra-ui/react'
import TrueAdaptiveImage from '../adaptive-image/TrueAdaptiveImage'
import PropTypes from 'prop-types'
import { getLinkUrlEnum } from '../../../utils/amplience/link'
import Link from '../link'

const Contain = styled(Link)`
    height: 100%;
    position: relative;
    margin: 0;
    display: block;
    &:hover img {
        filter: grayscale(70%) !important;
        opacity: 0.8;
    }
`

const Image = ({
    image,
    index = 0,
    links,
    cols,
    rows,
    gap
}) => {
    links ??= []

    const styles = useMultiStyleConfig('Image', {
    })

    const [imageLoading, setImageLoading] = useState(true)
    const imageRef = useRef()

    const [height, setHeight] = useState(400)
    const [width, setWidth] = useState(400)
    const [ratio, setRatio] = useState('1:1')
    const parentRef = useRef()

    const handleImageLoaded = () => {
        setImageLoading(false)
    }

    const gcd = (a, b) => {
        return b == 0 ? a : gcd(b, a % b)
    }

    useEffect(() => {
        if (imageRef?.current?.complete && imageLoading) {
            setImageLoading(false)
        }
    }, [imageRef?.current?.complete])

    const h = parentRef.current?.clientHeight == 0 ? 400 : parentRef.current?.clientHeight
    const w = parentRef.current?.clientWidth == 0 ? 400 : parentRef.current?.clientWidth

    let compHeight = 'auto'
    if (cols && rows && gap) {
        // Force the height to a fraction of the width (minus gap)
        compHeight = (rows * (w - gap * (cols - 1))) / cols + (rows - 1) * gap + 'px'
    }

    useEffect(() => {
        let r, ratio

        if (w && h) {
            r = gcd(w, h)
            setWidth(Math.floor(w / cols))
            setHeight(Math.floor(h / rows))
            ratio =
                cols === rows ? w / r + ':' + h / r : (w / cols) * cols + ':' + (h / rows) * rows
            setRatio(ratio)
            setImageLoading(true)
        }
    }, [w, h, cols, rows])

    const img = image?.image

    const cardtransformations =
        cols && rows && img?.poi
            ? {
                  ...img?.image,
                  upscale: true,
                  strip: true,
                  quality: 80,
                  width: width * cols,
                  height: height * rows,
                  aspectRatio: ratio,
                  scaleMode: 'c',
                  query: img?.query,
                  scaleFit: img?.poi && img?.poi.x != -1 && img?.poi.y != -1 ? 'poi' : undefined,
                  poi:
                      img?.poi && img?.poi.x != -1 && img?.poi.y != -1
                          ? {x: img?.poi.x, y: img?.poi.y}
                          : undefined
              }
            : {
                  ...img,
                  width: 1200,
                  quality: 80,
                  upscale: false
              }

    const content = (
        <>
            <div className="img-place" style={{display: `${imageLoading ? 'none' : 'block'}`}}>
                <TrueAdaptiveImage
                    style={{...styles.image}}
                    ref={imageRef}
                    onLoad={() => handleImageLoaded()}
                    image={img?.image}
                    transformations={cardtransformations}
                />
            </div>
        </>
    )

    return links[0] && links[0].value ? (
        <Skeleton isLoaded={!imageLoading} sx={{width: '100%', height: compHeight}}>
            <Contain
                ref={parentRef}
                className={`amp-tile amp-tile-${index + 1}`}
                to={getLinkUrlEnum(links[0])}
            >
                {content}
            </Contain>
        </Skeleton>
    ) : (
        <Skeleton isLoaded={!imageLoading} sx={{width: '100%', height: compHeight}}>
            <Contain ref={parentRef} className={`amp-tile amp-tile-${index + 1}`}>
                {content}
            </Contain>
        </Skeleton>
    )
}

Image.displayName = 'Image'
Image.propTypes = {
    image: PropTypes.shape({
        disablePoiAspectRatio: PropTypes.bool,
        imageAltText: PropTypes.string,
        seoText: PropTypes.string,
        _meta: PropTypes.shape({
            schema: PropTypes.string
        }),
        image: PropTypes.shape({
            aspectLock: PropTypes.string,
            bri: PropTypes.number,
            crop: PropTypes.arrayOf(PropTypes.number),
            fliph: PropTypes.bool,
            flipv: PropTypes.bool,
            hue: PropTypes.number,
            query: PropTypes.string,
            image: PropTypes.shape({
                defaultHost: PropTypes.string,
                endpoint: PropTypes.string,
                id: PropTypes.string,
                name: PropTypes.string,
                _meta: PropTypes.shape({
                    schema: PropTypes.string
                })
            }),
            poi: PropTypes.shape({
                x: PropTypes.number,
                y: PropTypes.number
            }),
            rot: PropTypes.number,
            sat: PropTypes.number
        })
    }),
    links: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            type: PropTypes.string,
            value: PropTypes.string
        })
    ),
    cols: PropTypes.number,
    rows: PropTypes.number,
    gap: PropTypes.number,
    rest: PropTypes.object
}

export default Image
