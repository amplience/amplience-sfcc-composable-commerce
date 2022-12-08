import React, {useEffect, useRef, useState} from 'react'
import styled from '@emotion/styled'
import {Heading} from '@chakra-ui/layout'
import {useMultiStyleConfig, Link, useBreakpointValue} from '@chakra-ui/react'
import TrueAdaptiveImage from '../adaptive-image/TrueAdaptiveImage'
import PropTypes from 'prop-types'
import useResizeObserver from '@react-hook/resize-observer'

const Contain = styled(Link)`
    height: 100%;
    position: relative;
    margin: 0;
    display: block;
    &:hover img {
        filter: grayscale(70%) !important;
        opacity: 0.8;
    }
    &:hover .hover {
        opacity: 1 !important;
    }
    &:hover .text-pane {
        background: rgba(255, 255, 255, 0.9) !important;
    }
    @media (min-width: 1024px) and (max-width: 1200px) {
        .hover,
        .blend {
            padding: 9px !important;
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
    @media (max-width: 1024px) {
        .hover,
        .blend {
            padding: 4px !important;
        }
        .text-pane {
        {
            width: 85% !important;
            h2, p {
                font-size: 12px !important;
            }
        }
    }
    @media (max-width: 460px) {
        .text-pane {
        {
            width: 85% !important;
            h2 {
                font-size: 11px !important;
            }
            p {
                display: none;
            }
        }
    }
    span {
        text-decoration: underline;
        text-transform: uppercase;
        font-weight: bold;
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
    rows,
    gap
}) => {
    // eslint-disable-next-line prettier/prettier
    links ??= []

    const [imageLoading, setImageLoading] = useState(true)
    const imageRef = useRef()

    const [height, setHeight] = useState(400)
    const [width, setWidth] = useState(400)
    const [ratio, setRatio] = useState('1:1')
    const [columnState, setColumnState] = useState(1)
    const [rowsState, setRowState] = useState(1)
    const parentRef = useRef()

    const handleImageLoaded = () => {
        setImageLoading(false)
    }

    /* const gcd = (a, b) => {
        return b == 0 ? a : gcd(b, a % b)
    } */

    useEffect(() => {
        if (imageRef?.current?.complete) {
            setImageLoading(false)
        } else {
            setImageLoading(true)
        }
    }, [imageRef])

    //const h = parentRef.current?.clientHeight == 0 ? 400 : parentRef.current?.clientHeight
    //const w = parentRef.current?.clientWidth == 0 ? 400 : parentRef.current?.clientWidth

    const [h] = useState(
        parentRef.current?.clientHeight == 0 ? 400 : parentRef.current?.clientHeight
    )
    const [w] = useState(parentRef.current?.clientWidth == 0 ? 400 : parentRef.current?.clientWidth)

    useResizeObserver(parentRef, () => {
        //  setImageLoading(true)
        recalc()
    })

    const defaultColRow = useBreakpointValue({
        base: {
            cols: 1,
            rows: 1
        },
        md: {
            cols: 3,
            rows: 2
        },
        lg: {
            cols: 4,
            rows: 2
        },
        xl: {
            cols: 6,
            rows: 2
        }
    })

    const recalc = () => {
        let ratio

        if (cols && rows) {
            setColumnState(cols)
            setRowState(rows)
        } else {
            setColumnState(defaultColRow.cols)
            setRowState(defaultColRow.rows)
        }

        if (w && h) {
            //r = gcd(w, h)
            setWidth(Math.floor(w / columnState))
            setHeight(Math.floor(h / rowsState))
            //setHeight((rows * (w - gap * (cols - 1))) / cols + (rows - 1) * gap)
            console.log('height', height)
            ratio =
                columnState === rowsState
                    ? '1:1'
                    : (w / columnState) * columnState + ':' + (h / rowsState) * rowsState
            setRatio(ratio)
            //setImageLoading(true)
        }
    }

    const styles = useMultiStyleConfig('CardEnhanced', {
        blend: blend,
        color: color,
        tAlign: textAlignment,
        vAlign: verticalAlignment,
        linkPosition: linkPosition,
        height: height * rowsState
    })

    useEffect(() => {
        recalc()
    }, [cols, rows, gap])

    const img = image?.image

    const cardtransformations = {
        ...img?.image,
        upscale: true,
        strip: true,
        quality: 80,
        width: width * columnState,
        height: height * rowsState,
        aspectRatio: ratio,
        scaleMode: 'c',
        query: img?.query,
        scaleFit: 'poi',
        poi:
            img?.poi && img?.poi.x != -1 && img?.poi.y != -1
                ? {x: img?.poi.x, y: img?.poi.y}
                : {x: 0.5, y: 0.5}
    }

    const content = (
        <div className="tile-content">
            <div className="img-place">
                <TrueAdaptiveImage
                    style={{...styles.image, opacity: `${imageLoading ? 0 : 1}`}}
                    ref={imageRef}
                    onLoad={() => handleImageLoaded()}
                    image={img?.image}
                    transformations={cardtransformations}
                />
                <div
                    style={{
                        ...styles.loading,
                        opacity: `${imageLoading ? 1 : 0}`
                    }}
                ></div>
            </div>

            <div style={{...styles.tileText, opacity: `${imageLoading ? 0 : 1}`}} className="blend">
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
        </div>
    )

    return links[0] ? (
        <Contain
            ref={parentRef}
            sx={{height: 'auto'}}
            className={`amp-tile amp-tile-${index + 1}`}
            href={links[0]?.value}
        >
            {content}
        </Contain>
    ) : (
        <Contain ref={parentRef} sx={{height: 'auto'}} className={`amp-tile amp-tile-${index + 1}`}>
            {content}
        </Contain>
    )
}

CardEnhanced.displayName = 'Card Enhanced'
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
    cols: PropTypes.number,
    rows: PropTypes.number,
    gap: PropTypes.number,
    rest: PropTypes.object
}

export default CardEnhanced
