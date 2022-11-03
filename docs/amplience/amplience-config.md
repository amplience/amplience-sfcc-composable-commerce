# Amplience Configuration

Main Amplience configuration parameters are stored in the config file `amplience/default.js`.

Example configuration file:

```js
module.exports = {
    default: {
        hub: 'sfcccompdev2'
    },
    envs: [
        {
            name: 'Live',
            hub: 'sfcccomposable',
            vse: 'xxxxxxx'
        },
        {
            name: 'UAT',
            hub: 'sfcccompuat',
            vse: 'yyyyyyy'
        }
    ],
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
        },
        {
            name: 'Live',
            default: false,
            url: 'https://ascc-production.mobify-storefront.com'
        },
        {
            name: 'UAT',
            default: false,
            url: 'https://ascc-uat.mobify-storefront.com'
        }
    ]
}

```

The `default.hub` property points to your Amplience account.

The `envs` array list all environments that will appear in the `Environments` toolbar panel.

The `visualisations` array list all environments that will be used by visualisation and preview. Automation process is using these to configure Hub Settings and all Content Types.
