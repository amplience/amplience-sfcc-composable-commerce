import React, { useEffect, useState } from 'react'
// MUST BE REMOVED
import PropTypes from 'prop-types'

//Amplience Rendering Templates
// MUST BE REMOVED
import BasicTile from '../../basic-tile'
/* import CardEnhanced from '../CardEnhanced';
import GridLock from '../GridLock';
import Image from '../Image';
import SimpleBanner from '../SimpleBanner';
import SplitBlock from '../SplitBlock';
import Text from '../Text';
import ProductCarousel from '../ProductCarousel';
import ShoppableImage from '../ShoppableImage/ShoppableImage'; */

const componentsMapping = {
    // MUST BE REMOVED
    'examplemappingtobasictile': BasicTile
    /* 'https://amp-rsa.amplience.com/card-enhanced.json': CardEnhanced,
    'https://amp-rsa.amplience.com/grid-lock.json': GridLock,
    'https://amp-rsa.amplience.com/image.json': Image,
    'https://demostore.amplience.com/content/shoppable-image' : ShoppableImage,
    'https://amp-rsa.amplience.com/simple-banner.json': SimpleBanner,
    'https://amp-rsa.amplience.com/simple-localized-banner.json': SimpleBanner,
    'https://amp-rsa.amplience.com/splitBlock.json': SplitBlock,
    'https://amp-rsa.amplience.com/text.json': Text,
    'https://amp-rsa.amplience.com/sfcc-product-carousel.json': ProductCarousel */
}

const AmplienceWrapper = ({ content, components = componentsMapping }) => {
    const [publishedContent, setPublishedContent] = useState(undefined)

    var passedContent = publishedContent || content;
    //MUST BE REMOVED
        passedContent = {
            _meta:{
                schema: 'examplemappingtobasictile'
            },
            href: 'https://www.amplience.com',
            img: PropTypes.shape({
                src: 'https://cdn.media.amplience.net/i/sfcccomposable/hero',
                alt: 'some alt text'
            }).isRequired,
            title: 'this is a basic tile'
        }
    // END REMOVE
    const Component = components[passedContent?._meta?.schema];
    const children = Component ? <Component {...passedContent} /> : <>{JSON.stringify(passedContent)}</>;

    return children;
}

AmplienceWrapper.displayName = 'Amplience Wrapper Block'

export default AmplienceWrapper
