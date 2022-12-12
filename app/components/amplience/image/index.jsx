import React, {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {useMultiStyleConfig, Skeleton, useBreakpointValue} from '@chakra-ui/react'
import TrueAdaptiveImage from '../adaptive-image/TrueAdaptiveImage'
import PropTypes from 'prop-types'
import {getLinkUrlEnum} from '../../../utils/amplience/link'
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

const Image = ({image, index = 0, links, cols, rows, gap}) => {
    links ??= []

    const styles = useMultiStyleConfig('Image', {})

    const [imageLoading, setImageLoading] = useState(true)
    const imageRef = useRef()
    const parentRef = useRef()

    const [ratio, setRatio] = useState('1:1')
    const [transHeight, setTransHeight] = useState(400)
    const [transWidth, setTransWidth] = useState(400)

    const handleImageLoaded = () => {
        setImageLoading(false)
    }

    useEffect(() => {
        if (imageRef?.current?.complete) {
            setImageLoading(false)
        } else {
            setImageLoading(true)
        }
    }, [imageRef?.current?.complete])

    const [parentHeight, setH] = useState(
        parentRef.current?.clientHeight == 0 ? 400 : parentRef.current?.clientHeight
    )
    const [parentWidth, setW] = useState(
        parentRef.current?.clientWidth == 0 ? 400 : parentRef.current?.clientWidth
    )

    const defaultAspect = useBreakpointValue({
        base: {
            w: 1,
            h: 1
        },
        md: {
            w: 3,
            h: 2
        },
        lg: {
            w: 4,
            h: 2
        },
        xl: {
            w: 5,
            h: 2
        }
    })

    useEffect(() => {
        if (cols && rows) {
            const wid = Math.floor(parentRef.current?.clientWidth)
            const hei = Math.floor((parentRef.current?.clientWidth * rows) / cols)

            setRatio(cols + ':' + rows)

            setTransHeight(Math.floor(hei + gap * rows))
            setTransWidth(Math.floor(wid))
        }
    }, [cols, rows, gap, parentRef?.current?.clientWidth])

    useEffect(() => {
        // Don't do any of this if cols/rows have been sent down from above!
        if (!cols && !rows) {
            setH(parentRef.current?.clientHeight)
            setW(parentRef.current?.clientWidth)

            if (parentWidth && parentHeight) {
                // Set height based on known parentWIdth and defaultAspectRatio
                const setH = Math.floor(
                    (parentRef.current?.clientWidth * defaultAspect.h) / defaultAspect.w
                )
                setRatio(defaultAspect.w + ':' + defaultAspect.h)

                setTransHeight(Math.floor(setH))
                setTransWidth(Math.floor(parentRef.current?.clientWidth))
            }
        }
    }, [defaultAspect.w, defaultAspect.h])

    const img = image?.image
    const [cardtransformations, setTransforms] = useState({
        ...img?.image,
        upscale: true,
        strip: true,
        quality: 80,
        width: transWidth,
        height: transHeight,
        aspectRatio: ratio,
        scaleMode: 'c',
        query: img?.query,
        scaleFit: 'poi',
        poi:
            img?.poi && img?.poi.x != -1 && img?.poi.y != -1
                ? {x: img?.poi.x, y: img?.poi.y}
                : {x: 0.5, y: 0.5}
    })

    useEffect(() => {
        setTransforms({
            ...img?.image,
            upscale: true,
            strip: true,
            quality: 80,
            width: transWidth,
            height: transHeight,
            aspectRatio: ratio,
            scaleMode: 'c',
            query: img?.query,
            scaleFit: 'poi',
            poi:
                img?.poi && img?.poi.x != -1 && img?.poi.y != -1
                    ? {x: img?.poi.x, y: img?.poi.y}
                    : {x: 0.5, y: 0.5}
        })
    }, [transHeight, transWidth])

    const content = (
        <div className="img-place">
            <TrueAdaptiveImage
                style={{...styles.image}}
                ref={imageRef}
                handleLoad={handleImageLoaded}
                image={img?.image}
                transformations={cardtransformations}
            />
        </div>
    )

    return links[0] && links[0].value ? (
        <Skeleton isLoaded={!imageLoading} sx={{width: '100%', height: transHeight}}>
            <Contain
                ref={parentRef}
                className={`amp-tile amp-tile-${index + 1}`}
                to={getLinkUrlEnum(links[0])}
            >
                {content}
            </Contain>
        </Skeleton>
    ) : (
        <Skeleton isLoaded={!imageLoading} sx={{width: '100%', height: transHeight}}>
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
    index: PropTypes.number,
    rest: PropTypes.object
}

export default Image
