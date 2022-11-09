import React, {useRef, useState} from 'react'
import PropTypes from 'prop-types'
import {
    Box,
    Button,
    Heading,
    Drawer,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    DrawerHeader,
    DrawerBody,
    useDisclosure
} from '@chakra-ui/react'
import styled from '@emotion/styled'
import {useLayoutEffect} from 'react'
import useResizeObserver from '@react-hook/resize-observer'
import {getVideoUrl} from '../../../utils/amplience/image'
import {useEffect} from 'react'
import {useShoppableTooltip} from '../shoppable-image'
import Link from '../link'
import AmplienceWrapper from '../wrapper'
import {categoryUrlBuilder, productUrlBuilder} from '../../../utils/url'

const Contain = styled(Box)`
    .interactive {
        transition: border-width 0.3s;
        border: 0px solid white;
        cursor: pointer;
    }

    .interactive:hover {
        border-width: 3px;
    }

    a:focus {
        box-shadow: none !important;
    }

    a:focus .interactive {
        border-width: 3px;
    }
`

const pointLerp = (p1, p2, t) => {
    const fac = (t - p1.t) / (p2.t - p1.t)
    const inv = 1 - fac

    return {
        x: fac * p2.p.x + inv * p1.p.x,
        y: fac * p2.p.y + inv * p1.p.y
    }
}

const getHotspotPoint = (time, hotspot) => {
    // Determine the range which we're in on the hotspot timeline.
    const timeline = hotspot.timeline.points

    if (timeline.length == 0 || timeline[0].t > time) {
        return undefined
    }

    let previous = timeline[0]

    for (let i = 1; i < timeline.length; i++) {
        const point = timeline[i]

        if (point.t >= time) {
            if (previous.e) {
                return undefined
            } else {
                return pointLerp(previous, point, time)
            }
        }

        previous = point
    }

    if (previous.e && time > previous.t) {
        return undefined
    } else {
        return previous.p
    }
}

const getHotspotCta = (time, hotspot) => {
    // Find the latest cta position that is behind or equal to the current time.
    const timeline = hotspot.timeline.points

    for (let i = timeline.length - 1; i >= 0; i--) {
        const point = timeline[i]

        if (point.t <= time && point.cta && point.cta.x != null && point.cta.y != null) {
            return point.cta
        }
    }

    // If there is no timepoint behind or equal to the current time (invald state?), just return the midpoint.
    return {x: 0.5, y: 0.5}
}

const selectHQMediaSubset = (media) => {
    // Select the media entries with the highest bitrate for their given format.
    // TODO: select based on video player resolution?
    const formatMap = new Map()

    for (const item of media) {
        const format = `${item.format}/${item['video.codec']}`

        const best = formatMap.get(format)

        if (!best || Number(best.bitrate) < Number(item.bitrate)) {
            // If the bitrate is higher or this format hasn't been seen before, add it to the thing.
            formatMap.set(format, item)
        }
    }

    return Array.from(formatMap.values())
}

const formatToHtml = (format) => {
    if (format === 'mpeg4') {
        return 'mp4'
    }

    return format
}

const videoLoop = (token) => {
    if (token.active) {
        const time = token.video.currentTime + (token.playing ? token.offset : 0)
        if (token.playing || token.lastTime != time) {
            token.setTime(time)
            token.lastTime = time
        }

        requestAnimationFrame(() => videoLoop(token))
    }
}

const ShoppableVideoArrow = ({transform, width, ...props}) => {
    const style = {
        height: '20px',
        margin: '-10px 0px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'flex-end',
        transformOrigin: 'center left',
        transform,
        width: width + 'px',
        transition: 'opacity 0.2s'
    }

    const backgroundImage = `radial-gradient(circle, rgba(255,255,255,1) 36%, rgba(0,0,0,0.3) 40%, rgba(0,0,0,0.3) 60%, rgba(0,0,0,0) 64%);`
    const backgroundSize = `${(10 / width) * 100}%`

    const arrowBody = {
        position: 'absolute',
        width: width - 20 + 'px',
        marginRight: '8px',
        height: '8px',
        backgroundImage,
        backgroundSize
    }

    const arrowHead = {
        transform: 'rotate(45deg)',
        backgroundColor: 'white',
        backgroundClip: 'padding-box',
        width: '16px',
        height: '16px',
        margin: '-8px',
        borderRadius: '8px',
        border: '2px solid rgba(0, 0, 0, 0.3)'
    }

    return (
        <Box {...style} {...props}>
            <Box {...arrowBody} />
            <Box {...arrowHead} />
        </Box>
    )
}

const ShoppableVideoCta = ({target, selector, tooltips, scale}) => {
    const {isOpen, onOpen, onClose} = useDisclosure()
    const label = useShoppableTooltip(target, selector, tooltips)
    const sizeBias = 0.66

    const style = {
        transform: `scale(${(scale - 1) * sizeBias + 1})`,
        minWidth: 'unset',
        border: '2px solid white',
        backgroundColor: 'rgba(1, 118, 211, 0.75)',
        boxShadow: '2px 4px 8px rgb(0 0 0 / 20%)'
    }

    switch (selector) {
        case 'product': {
            return (
                <Button as={Link} to={productUrlBuilder({id: target})} {...style}>
                    {label}
                </Button>
            )
        }
        case 'category': {
            return (
                <Button as={Link} to={categoryUrlBuilder({id: target})} {...style}>
                    {label}
                </Button>
            )
        }
        case 'link': {
            let link
            if (/^https?:\/\/|^\/\//i.test(target)) {
                link = '$' + target
            } else {
                link = target
            }
            return (
                <Button as={Link} to={link} {...style}>
                    {label}
                </Button>
            )
        }
        case 'page':
            // TODO: get page name?
            return (
                <Button as={Link} to={'/' + target} {...style}>
                    {label}
                </Button>
            )
        case 'tooltip': {
            if (label) {
                return (
                    <Button as={Link} {...style}>
                        {label}
                    </Button>
                )
            }

            return <></>
        }
        case 'contentKey': {
            const matchTooltip = tooltips?.find((tooltip) => tooltip.key === target)

            return (
                <>
                    <Button
                        onClick={(evt) => {
                            onOpen()
                            evt.preventDefault()
                            return false
                        }}
                        {...style}
                    >
                        {label}
                    </Button>
                    <Drawer onClose={onClose} isOpen={isOpen} size="xl">
                        <DrawerOverlay />
                        <DrawerContent>
                            <DrawerBody>
                                <DrawerCloseButton />
                                {matchTooltip?.value && (
                                    <DrawerHeader>{matchTooltip?.value}</DrawerHeader>
                                )}
                                <AmplienceWrapper fetch={{key: target}}></AmplienceWrapper>
                            </DrawerBody>
                        </DrawerContent>
                    </Drawer>
                </>
            )
        }
        default:
            return <></>
    }
}

ShoppableVideoCta.displayName = 'ShoppableVideoCta'

ShoppableVideoCta.propTypes = {
    target: PropTypes.string,
    selector: PropTypes.string,
    tooltips: PropTypes.array,
    width: PropTypes.number
}

const ShoppableVideo = ({
    title,
    shoppableVideo,
    videoAltText,
    seoText,
    tooltips,
    width,
    height,
    rows,
    cols,
    gap,
    autoplay,
    ...props
}) => {
    const target = useRef(null)
    const videoRef = useRef(null)
    const [size, setSize] = useState()
    const [videoSize, setVideoSize] = useState()
    const [videoMedia, setVideoMedia] = useState()
    const [time, setTime] = useState(0)

    useLayoutEffect(() => {
        setSize(target.current.getBoundingClientRect())
    }, [target])

    useResizeObserver(target, (entry) => setSize(entry.contentRect))

    useEffect(() => {
        // Bind video events.
        const video = videoRef.current
        const videoToken = {active: true, video, playing: false, setTime, offset: 0}

        video.onplay = () => (videoToken.playing = true)
        video.onpause = () => (videoToken.playing = false)
        video.onended = () => (videoToken.playing = false)

        videoLoop(videoToken)

        return () => (videoToken.active = false)
    }, [videoRef, setTime])

    useEffect(async () => {
        let cancelled = false

        // Determine the image size.
        let response = await fetch(getVideoUrl(shoppableVideo.video) + '.json?metadata=true')

        if (cancelled) return

        let json = await response.json()

        if (cancelled) return

        const media = selectHQMediaSubset(json.media)

        setVideoMedia(media)
        setVideoSize({width: media[0].width, height: media[0].height})

        return () => {
            cancelled = true
        }
    }, [shoppableVideo.video])

    const sources = (videoMedia ?? []).map((item, i) => (
        <source src={item.src} type={`video/${formatToHtml(item.format)}`} key={i} />
    ))

    const elements = []

    const videoStyle = {
        position: 'absolute',
        display: 'none',
        maxWidth: 'initial'
    }

    if (size && videoSize) {
        const containerAspect = size.width / size.height
        const videoAspect = videoSize.width / videoSize.height

        videoStyle.display = 'block'

        const scaleToFit = true
        let imgSize

        // Scale to fit wants to scale the largest overflowing dimension down to fit within the canvas.

        const fitW = scaleToFit ^ (videoAspect < containerAspect)

        if (fitW) {
            imgSize = [size.width, size.width / videoAspect]
        } else {
            imgSize = [size.height * videoAspect, size.height]
        }

        videoStyle.width = `${imgSize[0]}px`
        videoStyle.height = `${imgSize[1]}px`

        let imgPosition = [(size.width - imgSize[0]) / 2, (size.height - imgSize[1]) / 2]

        const sX = (x) => x * imgSize[0]
        const sY = (y) => y * imgSize[1]
        const tX = (x) => x * imgSize[0] + imgPosition[0]
        const tY = (y) => y * imgSize[1] + imgPosition[1]

        const transformBounds = (bounds) => ({
            x: tX(bounds.x),
            y: tY(bounds.y),
            w: sX(bounds.w),
            h: sY(bounds.h)
        })

        videoStyle.transform = `translate(${imgPosition[0]}px, ${imgPosition[1]}px)`
        const minDim = Math.min(size.width, size.height)

        const ctaStyle = {
            display: 'flex',
            width: '0px',
            height: '0px',
            justifyContent: 'center',
            alignItems: 'center',
            transition: 'opacity 0.2s'
        }

        // Generate video elements. Inactive elements just opacity: 0

        let i = 0
        for (let hotspot of shoppableVideo.hotspots) {
            const point = getHotspotPoint(time, hotspot)
            const ctaPoint = getHotspotCta(time, hotspot)

            const ctaTransform =
                ctaPoint === undefined ? '' : `translate(${tX(ctaPoint.x)}px, ${tY(ctaPoint.y)}px)`

            const visibility = {
                pointerEvents: point === undefined ? 'none' : 'inherit',
                opacity: point === undefined ? 0 : 1
            }

            // Arrow (cta point to point)

            const vec = {
                x: point ? sX(point.x - ctaPoint.x) : 0,
                y: point ? sY(point.y - ctaPoint.y) : 0
            }

            const arrowWidth = Math.sqrt(vec.x * vec.x + vec.y * vec.y)
            const rotate = Math.atan2(vec.y, vec.x)

            const arrowTransform = ctaTransform + ` rotate(${rotate}rad)`

            elements.push(
                <ShoppableVideoArrow
                    key={i++}
                    transform={arrowTransform}
                    width={arrowWidth}
                    {...visibility}
                />
            )

            elements.push(
                <Box key={i++} transform={ctaTransform} {...ctaStyle} {...visibility}>
                    <ShoppableVideoCta {...hotspot} tooltips={tooltips} scale={size.width / 1000}></ShoppableVideoCta>
                </Box>
            )
        }
    }

    props.width = width ?? '100%'

    if (cols && rows && gap && size) {
        // Force the height to a fraction of the width (minus gap)
        props.height = (rows * (size.width - gap * (cols - 1))) / cols + (rows - 1) * gap + 'px'
    } else if (height) {
        props.height = height
    } else if (videoSize && size) {
        props.height = size.width * (videoSize.height / videoSize.width)
    }

    if (autoplay) {
        videoStyle.autoplay = 'autoplay'
        videoStyle.muted = true
        videoStyle.loop = true
    } else {
        videoStyle.controls = true
    }

    return (
        <Box overflow="hidden">
            {title && (
                <Heading
                    as="h2"
                    mt={4}
                    mb={4}
                    textAlign={'center'}
                    fontSize={{base: 'md', md: '3xl', lg: '4xl'}}
                >
                    {title}
                </Heading>
            )}
            <Contain {...props} ref={target} overflow="hidden" position="relative">
                <Box
                    as="video"
                    {...videoStyle}
                    alt={videoAltText}
                    objectFit="contain"
                    ref={videoRef}
                    playsInline
                >
                    {sources}
                </Box>
                {elements}
            </Contain>
        </Box>
    )
}

ShoppableVideo.displayName = 'ShoppableVideo'

ShoppableVideo.propTypes = {
    title: PropTypes.string,
    shoppableVideo: PropTypes.object,
    videoAltText: PropTypes.string,
    seoText: PropTypes.string,
    tooltips: PropTypes.array,
    width: PropTypes.number,
    height: PropTypes.number,
    rows: PropTypes.number,
    cols: PropTypes.number,
    gap: PropTypes.number
}

export default ShoppableVideo
