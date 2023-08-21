/*
 * Copyright (c) 2023, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React from 'react'
import loadable from '@loadable/component'
import {getConfig} from '@salesforce/pwa-kit-runtime/utils/ssr-config'

// Components
import {Skeleton} from '@salesforce/retail-react-app/app/components/shared/ui'
import {configureRoutes} from '@salesforce/retail-react-app/app/utils/routes-utils'
import {routes as _routes} from '@salesforce/retail-react-app/app/routes'

const fallback = <Skeleton height="75vh" width="100%" />

// Create your pages here and add them to the routes array
// Use loadable to split code into smaller js chunks
const Home = loadable(() => import('./pages/home'), {fallback})
const MyNewRoute = loadable(() => import('./pages/my-new-route'))

//Amplience Pages
const RealtimeVisualization = loadable(() => import('./pages/realtime-visualization'))
const ContentPage = loadable(() => import('./pages/page'))
const SearchList = loadable(() => import('./pages/search-list'))
const Developers = loadable(() => import('./pages/developers'), {fallback})
const AmpProductDetail = loadable(() => import('./pages/product-detail'), {fallback})
const AmpProductList = loadable(() => import('./pages/product-list'), {fallback})

const routes = [
    {
        path: '/',
        component: Home,
        exact: true
    },
    {
        path: '/my-new-route',
        component: MyNewRoute
    },
    {
        path: '/product/:productId',
        component: AmpProductDetail
    },
    {
        path: '/pdp/content/:productId', // For PDP visualisation
        component: AmpProductDetail
    },
    {
        path: '/search',
        component: SearchList
    },
    {
        path: '/category/:categoryId',
        component: AmpProductList
    },
    {
        path: '/visualization',
        component: RealtimeVisualization,
        exact: false
    },
    {
        path: '/page/:pageId',
        component: ContentPage
    },
    {
        path: '/developers',
        component: Developers
    },
    ..._routes
]

export default () => {
    const config = getConfig()
    return configureRoutes(routes, config, {
        ignoredRoutes: ['/callback', '*']
    })
}
