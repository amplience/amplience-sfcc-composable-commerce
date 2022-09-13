import React, {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {Heading} from '@chakra-ui/layout'
import {useMultiStyleConfig, Link, Skeleton} from '@chakra-ui/react'
import TrueAdaptiveImage from '../adaptive-image/TrueAdaptiveImage'
import PropTypes from 'prop-types'

const Contain = styled(Link)`
    height: 100%;
    position: relative;
    margin: 0;
    display: block;
    .text-pane {
        background: rgba(255, 255, 255, 0.5);
    }
    &:hover img {
        filter: grayscale(70%) !important;
        opacity: 0.8;
    }
    &:hover .hover {
        opacity: 1 !important;
    }
    &:hover .text-pane {
        background: rgba(255, 255, 255, 0.8) !important;
    }
    span {
        text-decoration: underline;
        text-transform: uppercase;
        font-weight: bold;
    }
    @media (min-width: 768px) and (max-width: 1024px) {
        .hover,
        .blend {
            padding: 10px !important;
        }
        .text-pane {
            width: 100% !important;
        }
        .text-pane h2 {
            font-size: 16px !important;
        }
        .text-pane p {
            font-size: 12px !important;
        }
        .text-pane span {
            font-size: 12px !important;
        }
    }
    @media (min-width: 1024px) and (max-width: 1200px) {
        .hover,
        .blend {
            padding: 15px !important;
        }
        .text-pane {
            width: 80% !important;
        }
        .text-pane h2 {
            font-size: 18px !important;
        }
        .text-pane p {
            font-size: 14px !important;
        }
        .text-pane span {
            font-size: 12px !important;
        }
    }
    @media (max-width: 768px) {
        .text-pane {
        {
            background: rgba(255, 255, 255, 0.75) !important;
            p {
                display: none;
            }
        }
    }
`

const CardEnhanced = ({
    blend,
    color,
    image,
    index = 0,
    linkPosition,
    links,
    mainText,
    subText,
    textAlignment,
    verticalAlignment,
    cols,
    rows
}) => {
    links ??= []

    const styles = useMultiStyleConfig('CardEnhanced', {
        blend: blend,
        color: color,
        tAlign: textAlignment,
        vAlign: verticalAlignment,
        linkPosition: linkPosition
    })

    const [imageLoading, setImageLoading] = useState(true)
    const imageRef = useRef()

    const [height, setHeight] = useState(400)
    const [width, setWidth] = useState(400)
    const [ratio, setRatio] = useState('1:1')
    const parentRef = useRef()

    const handleImageLoaded = () => {
        setImageLoading(false)
        /*  if (onImageLoad instanceof Function) {
             //onImageLoad(index);
         } */
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
    if (cols == 3) {
        const gap = 16
        // Force the height to a fraction of the width (minus gap)
        compHeight = (rows * (w - gap * (cols - 1))) / 3 + (rows - 1) * gap + 'px'
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
            : {...img}

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

            <div style={{...styles.tileText, opacity: 1}} className="blend">
                <div style={{...styles.textCell}}>
                    <div className="text-pane" style={{...styles.textPane}}>
                        {mainText ? (
                            <Heading as="h2" size="md" style={{color: color}}>
                                {mainText}
                            </Heading>
                        ) : null}
                        {subText ? <p style={{...styles.p}}>{subText}</p> : null}
                        {links.map((link) => {
                            if (link.label) {
                                return (
                                    <span
                                        key={Math.random()
                                            .toString(36)
                                            .substr(2, 9)}
                                    >
                                        {link.label}
                                    </span>
                                )
                            } else {
                                return null
                            }
                        })}
                    </div>
                </div>
            </div>
            <div style={{...styles.tileText, opacity: 0}} className="hover">
                <div style={{...styles.textHoverCell}}>
                    <div className="text-pane" style={{...styles.textPane}}>
                        {mainText ? (
                            <Heading as="h2" size="md" style={{color: color}}>
                                {mainText}
                            </Heading>
                        ) : null}
                        {subText ? <p style={{...styles.p}}>{subText}</p> : null}
                        {links.map((link) => {
                            if (link.label) {
                                return (
                                    <span
                                        key={Math.random()
                                            .toString(36)
                                            .substr(2, 9)}
                                    >
                                        {link.label}
                                    </span>
                                )
                            } else {
                                return null
                            }
                        })}
                    </div>
                </div>
            </div>
        </>
    )

    return links[0] ? (
        <Skeleton isLoaded={!imageLoading} sx={{width: '100%', height: compHeight}}>
            <Contain
                ref={parentRef}
                className={`amp-tile amp-tile-${index + 1}`}
                href={links[0]?.value}
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

CardEnhanced.propTypes = {
    blend: PropTypes.string,
    color: PropTypes.string,
    component: PropTypes.string,
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
    index: PropTypes.number,
    linkPosition: PropTypes.string,
    links: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            type: PropTypes.string,
            value: PropTypes.string
        })
    ),
    mainText: PropTypes.string,
    subText: PropTypes.string,
    textAlignment: PropTypes.string,
    verticalAlignment: PropTypes.string,
    cols: PropTypes.string,
    rows: PropTypes.string,
    rest: PropTypes.object
}

export default CardEnhanced
