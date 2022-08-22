// Provide the sites for your app. Each site includes site id, and its localization configuration.
// You can also provide aliases for your locale. They will be used in place of your locale id when generating paths across the app
module.exports = [
    {
        id: 'RefArchGlobal',
        l10n: {
            supportedCurrencies: ['USD'],
            defaultCurrency: 'USD',
            defaultLocale: 'en-US',
            supportedLocales: [
                {
                    id: 'en-US',
                    //alias: 'uk',
                    preferredCurrency: 'USD'
                },
                {
                    id: 'fr-FR',
                    //alias: 'uk',
                    preferredCurrency: 'EUR'
                },
                {
                    id: 'de-DE',
                    //alias: 'uk',
                    preferredCurrency: 'EUR'
                },
                {
                    id: 'es-ES',
                    //alias: 'uk',
                    preferredCurrency: 'EUR'
                },
                {
                    id: 'it-IT',
                    //alias: 'uk',
                    preferredCurrency: 'EUR'
                }
            ]
        }
    }
]
