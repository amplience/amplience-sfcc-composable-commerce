module.exports = {
    default: {
        hub: 'sfcccompdev2'
    },
    /*envs: [
        {
            name: 'Live',
            hub: 'sfcccomposable',
            vse: '1pqebtas9axy7zeeiy96389op.staging.bigcontent.io'
        },
        {
            name: 'UAT',
            hub: 'sfcccompuat',
            vse: 'e7ssecddcjvq1470dg00ennz9.staging.bigcontent.io'
        }
    ],*/
    visualisations: [
        {
            name: 'Localhost',
            default: true,
            url: 'http://localhost:3000'
        },
        {
            name: 'Development 2',
            default: false,
            url: 'https://ascc-development-2.mobify-storefront.com'
        } /*,
        {
            name: 'Live',
            default: false,
            url: 'https://ascc-production.mobify-storefront.com'
        },
        {
            name: 'UAT',
            default: false,
            url: 'https://ascc-uat.mobify-storefront.com'
        } */
    ]
}
