/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
const sites = require('./sites.js')
const amplience = require('./amplience/default.js')
module.exports = {
    app: {
        url: {
            site: 'path',
            locale: 'path',
            showDefaults: true
        },
        defaultSite: 'RefArchGlobal',
        siteAliases: {
            RefArch: 'us',
            RefArchGlobal: 'global'
        },
        sites,
        amplience,
        commerceAPI: {
            proxyPath: `/mobify/proxy/api`,
            parameters: {
                clientId: 'a718e400-ecc2-4c9a-8428-ea5e165d323b',
                organizationId: 'f_ecom_zzfr_002',
                shortCode: 'kv7kzm78',
                siteId: 'RefArchGlobal'
            }
        },
        einsteinAPI: {
            host: 'https://api.cquotient.com',
            einsteinId: '1ea06c6e-c936-4324-bcf0-fada93f83bb1',
            // This differs from the siteId in commerceAPIConfig for testing purposes
            siteId: 'aaij-MobileFirst',
            isProduction: false
        }
    },
    externals: [],
    pageNotFoundURL: '/page-not-found',
    ssrEnabled: true,
    ssrOnly: ['ssr.js', 'ssr.js.map', 'node_modules/**/*.*'],
    ssrShared: [
        'static/ico/favicon.ico',
        'static/robots.txt',
        '**/*.js',
        '**/*.js.map',
        '**/*.json'
    ],
    ssrParameters: {
        ssrFunctionNodeVersion: '16.x',
        proxyConfigs: [
            {
                host: 'kv7kzm78.api.commercecloud.salesforce.com',
                path: 'api'
            },
            {
                host: 'zzfr-002.sandbox.us03.dx.commercecloud.salesforce.com',
                path: 'ocapi'
            }
        ]
    }
}
