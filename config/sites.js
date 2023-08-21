/*
 * Copyright (c) 2023, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

// Provide the sites for your app. Each site includes site id, and its localization configuration.
// You can also provide aliases for your locale. They will be used in place of your locale id when generating paths across the app
module.exports = [
    {
        id: 'RefArch',
        l10n: {
            supportedCurrencies: ['USD'],
            defaultCurrency: 'USD',
            defaultLocale: 'en-US',
            supportedLocales: [
                {
                    id: 'en-US',
                    preferredCurrency: 'USD'
                },
                {
                    id: 'fr-FR',
                    preferredCurrency: 'EUR'
                },
                {
                    id: 'de-DE',
                    preferredCurrency: 'EUR'
                },
                {
                    id: 'es-ES',
                    preferredCurrency: 'EUR'
                },
                {
                    id: 'it-IT',
                    preferredCurrency: 'EUR'
                }
            ]
        }
    },
    {
        id: 'RefArchGlobal',
        l10n: {
            supportedCurrencies: ['USD', 'EUR'],
            defaultCurrency: 'USD',
            supportedLocales: [
                {
                    id: 'en-US',
                    preferredCurrency: 'USD'
                },
                {
                    id: 'de-DE',
                    preferredCurrency: 'EUR'
                },
                {
                    id: 'es-ES',
                    preferredCurrency: 'EUR'
                },
                {
                    id: 'fr-FR',
                    preferredCurrency: 'EUR'
                },
                {
                    id: 'it-IT',
                    preferredCurrency: 'EUR'
                }
            ],
            defaultLocale: 'en-US'
        }
    }
]
