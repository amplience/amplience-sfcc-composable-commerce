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
    }
]
