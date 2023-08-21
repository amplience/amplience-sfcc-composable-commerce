/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import {extendTheme} from '@salesforce/retail-react-app/app/components/shared/ui'

// Foundational style overrides
import styles from './foundations/styles'
import colors from './foundations/colors'
import gradients from '@salesforce/retail-react-app/app/theme/foundations/gradients'
import sizes from '@salesforce/retail-react-app/app/theme/foundations/sizes'
import space from '@salesforce/retail-react-app/app/theme/foundations/space'
import layerStyles from '@salesforce/retail-react-app/app/theme/foundations/layerStyles'
import shadows from '@salesforce/retail-react-app/app/theme/foundations/shadows'

// Base component style overrides
import Alert from '@salesforce/retail-react-app/app/theme/components/base/alert'
import Accordion from '@salesforce/retail-react-app/app/theme/components/base/accordion'
import Badge from '@salesforce/retail-react-app/app/theme/components/base/badge'
import Button from '@salesforce/retail-react-app/app/theme/components/base/button'
import Checkbox from '@salesforce/retail-react-app/app/theme/components/base/checkbox'
import Container from '@salesforce/retail-react-app/app/theme/components/base/container'
import Drawer from '@salesforce/retail-react-app/app/theme/components/base/drawer'
import FormLabel from '@salesforce/retail-react-app/app/theme/components/base/formLabel'
import Icon from '@salesforce/retail-react-app/app/theme/components/base/icon'
import Input from '@salesforce/retail-react-app/app/theme/components/base/input'
import Modal from '@salesforce/retail-react-app/app/theme/components/base/modal'
import Radio from '@salesforce/retail-react-app/app/theme/components/base/radio'
import Select from '@salesforce/retail-react-app/app/theme/components/base/select'
import Skeleton from '@salesforce/retail-react-app/app/theme/components/base/skeleton'
import Tooltip from '@salesforce/retail-react-app/app/theme/components/base/tooltip'
import Popover from '@salesforce/retail-react-app/app/theme/components/base/popover'

// Project Component style overrides
import App from '@salesforce/retail-react-app/app/theme/components/project/_app'
import Breadcrumb from '@salesforce/retail-react-app/app/theme/components/project/breadcrumb'
import Header from '@salesforce/retail-react-app/app/theme/components/project/header'
import ListMenu from '@salesforce/retail-react-app/app/theme/components/project/list-menu'
import Footer from '@salesforce/retail-react-app/app/theme/components/project/footer'
import CheckoutFooter from '@salesforce/retail-react-app/app/theme/components/project/checkout-footer'
import LinksList from '@salesforce/retail-react-app/app/theme/components/project/links-list'
import DrawerMenu from '@salesforce/retail-react-app/app/theme/components/project/drawer-menu'
import NestedAccordion from '@salesforce/retail-react-app/app/theme/components/project/nested-accordion'
import LocaleSelector from '@salesforce/retail-react-app/app/theme/components/project/locale-selector'
import OfflineBanner from '@salesforce/retail-react-app/app/theme/components/project/offline-banner'
import Pagination from '@salesforce/retail-react-app/app/theme/components/project/pagination'
import ProductTile from '@salesforce/retail-react-app/app/theme/components/project/product-tile'
import SocialIcons from '@salesforce/retail-react-app/app/theme/components/project/social-icons'
import SwatchGroup from '@salesforce/retail-react-app/app/theme/components/project/swatch-group'
import ImageGallery from '@salesforce/retail-react-app/app/theme/components/project/image-gallery'

// Amplience Components
import PreviewHeader from './components/amplience/preview-header'
import AmplienceHeader from './components/amplience/header'
import CardEnhanced from './components/amplience/card-enhanced'
import Image from './components/amplience/image'
import GridLock from './components/amplience/grid-lock'
import Hero from './components/amplience/hero'
import AmplienceProductTile from './components/amplience/product-tile'
import ContentTile from './components/amplience/content-tile'
import ShoppableVideo from './components/amplience/shoppable-video'
import Brightcove from './components/amplience/brightcove'

// Please refer to the Chakra-Ui theme customization docs found
// here https://chakra-ui.com/docs/theming/customize-theme to learn
// more about extending and overriding themes for your project.
export const overrides = {
    styles,
    layerStyles,
    colors,
    sizes,
    space,
    gradients,
    shadows,
    components: {
        // base components
        Accordion,
        Alert,
        Badge,
        Button,
        Checkbox,
        Container,
        Drawer,
        FormLabel,
        Icon,
        Input,
        Modal,
        Popover,
        Radio,
        Select,
        Skeleton,
        Tooltip,

        // project components
        App,
        Breadcrumb,
        Header,
        Footer,
        CheckoutFooter,
        LinksList,
        ListMenu,
        DrawerMenu,
        NestedAccordion,
        LocaleSelector,
        OfflineBanner,
        SocialIcons,
        Pagination,
        ProductTile,
        SwatchGroup,
        ImageGallery,

        // amplience components
        PreviewHeader,
        AmplienceHeader,
        AmplienceListMenu: ListMenu,
        CardEnhanced,
        Image,
        GridLock,
        Hero,
        AmplienceProductTile,
        ContentTile,
        ShoppableVideo,
        Brightcove
    }
}

export default extendTheme(overrides)
