module.exports = {
    default: {
        hub: 'sfcccomposable'
    },
    envs: [
        /*
        {
            name: 'Environment 1',
            hub: 'environment01',
            vse: '{{Your VSE URL for Environment 1}}'
        },
         {
            name: 'Environment 1',
            hub: 'environment01',
            vse: '{{Your VSE URL for Environment 2}}'
        }
        */
    ],
    visualisations: [
        {
            name: 'Localhost',
            default: true,
            url: 'http://localhost:3000'
        },
        {
            name: 'Amplience Live',
            default: false,
            url: 'https://ascc-production.mobify-storefront.com/'
        }
        /*,
        {
            name: 'UAT',
            default: false,
            url: 'https://ascc-uat.mobify-storefront.com'
        }
        */
    ]
}
