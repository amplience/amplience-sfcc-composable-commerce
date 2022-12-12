import React, {useEffect, useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {Box, Link, Heading, Stack, useMultiStyleConfig, Skeleton} from '@chakra-ui/react'
import TrueAdaptiveImage from '../adaptive-image/TrueAdaptiveImage'
import styled from '@emotion/styled'

const Contain = styled('div')`
  height: 100%;
  position: relative;
  margin: 0;
  display: block;
  
  span {
    margin-top: 0 !important;
  }

  @media (min-width: 1024px) and (max-width: 1200px) {
    .hover,
    .blend {
      padding: 9px !important;
    }

    &:hover .text-pane {
      background: rgba(255, 255, 255, 0.9) !important;
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

    .text-pane { {
      width: 85% !important;

      h2, p {
        font-size: 12px !important;
      }
    }
    }

    @media (max-width: 460px) {
      .text-pane { {
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

const InGridHero = ({
    title,
    image,
    actions = [],
    textAlign = 'Left',
    justifyContent = 'Left',
    alignItems = 'Center',
    cols,
    rows,
    gap,
    ...props
}) => {
    const styles = useMultiStyleConfig('Hero', {variant: 'inGrid'})
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

    useEffect(() => {
        if (cols && rows) {
            const wid = Math.floor(parentRef.current?.clientWidth)
            const hei = Math.floor((parentRef.current?.clientWidth * rows) / cols)

            setRatio(cols + ':' + rows)

            setTransHeight(Math.floor(hei + gap * rows))
            setTransWidth(Math.floor(wid))
        }
    }, [cols, rows, gap, parentRef?.current?.clientWidth])

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
        <Contain>
            <Stack {...styles.stackContainer}>
                <Skeleton
                    isLoaded={!imageLoading}
                    sx={{width: '100%', height: transHeight}}
                    style={{
                        justifyContent: justifyContent.toLowerCase(),
                        alignItems: alignItems.toLowerCase(),
                        display: 'flex'
                    }}
                >
                    <Stack
                        className="text-pane"
                        style={{display: `${imageLoading ? 'none' : 'flex'}`}}
                        {...styles.textContainer}
                        textAlign={{base: 'center', md: textAlign.toLowerCase()}}
                        position={{base: 'absolute'}}
                    >
                        <Heading
                            as="h2"
                            fontSize={{base: 'md', md: '4xl', lg: '6xl'}}
                            maxWidth={{base: 'full'}}
                            {...styles.heading}
                        >
                            {title}
                        </Heading>
                        {actions.map(({label}, ind) => {
                            if (label) {
                                return <span key={ind}>{label}</span>
                            }
                            return null
                        })}
                    </Stack>
                    <div className="img-place">
                        <TrueAdaptiveImage
                            style={{...styles.image}}
                            ref={imageRef}
                            handleLoad={handleImageLoaded}
                            image={img?.image}
                            transformations={cardtransformations}
                        />
                    </div>
                </Skeleton>
            </Stack>
        </Contain>
    )

    return (
        <Box
            ref={parentRef}
            {...styles.container}
            sx={{width: '100%', height: transHeight}}
            {...props}
        >
            {actions[0]?.url ? <Link href={actions[0]?.url}>{content}</Link> : content}
        </Box>
    )
}

InGridHero.displayName = 'InGridHero'

InGridHero.propTypes = {
    /**
     * Hero component image
     */
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
    /**
     * Hero component main title
     */
    title: PropTypes.string,
    /**
     * Call to action component(s)
     */
    actions: PropTypes.arrayOf(
        PropTypes.shape({
            label: PropTypes.string,
            url: PropTypes.string
        })
    ),
    /**
     * Hero button label
     */
    label: PropTypes.string,
    /**
     * Hero button url
     */
    url: PropTypes.string,
    /**
     * Hero text alignment
     */
    textAlign: PropTypes.string,
    /**
     * Hero justify content
     */
    justifyContent: PropTypes.string,
    /**
     * Hero align items
     */
    alignItems: PropTypes.string,
    /**
     * Grid item props
     */
    cols: PropTypes.number,
    rows: PropTypes.number,
    gap: PropTypes.number
}

export default InGridHero
