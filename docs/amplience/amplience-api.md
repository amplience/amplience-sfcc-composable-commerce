# Amplience API
In order for any area of the application to be able to request content from Amplience we have put all API methods into a service found in:

`amplience/api.js`

This service uses the [Amplience delivery SDK]( https://github.com/amplience/dc-delivery-sdk-js ) to connect and return content.

## Dependency

The package.json should have a dependency for the Amplience DC Delivery SDK.

`"dc-delivery-sdk-js": "^0.11",`

## Initialisation

In order for the Amplience SDK to understand which hub to connect to, we need to instantiate the client with the hub name. This is driven from your configuration: `config/amplience/default.js`.
```
module.exports =
{
    hub: 'sfcccomposable'
}
```
Where this is the Amplience hub to connect to.

Also follow the Composable Commerce pattern of importing this directly into the default configuration: `config/default.js.`

```
const amplience = require('./amplience/default.js')
```

And then in the app add an attribute for amplience:

```
module.exports = {
    app: {
        // Customize how your 'site' and 'locale' are displayed in the url.
        url: {
            // Determine where the siteRef is located. Valid values include 'path|query_param|none'. Defaults to: 'none'
            // site: 'none',
            // Determine where the localeRef is located. Valid values include 'path|query_param|none'. Defaults to: 'none'
            locale: 'none',
            // This boolean value dictates whether or not default site or locale values are shown in the url. Defaults to: false
            // showDefaults: true
        },
        // The default site for your app. This value will be used when a siteRef could not be determined from the url
        defaultSite: 'RefArch',
        // Provide aliases for your sites. These will be used in place of your site id when generating paths throughout the application.
        // siteAliases: {
        //     RefArch: 'us'
        // },
        // The sites for your app, which is imported from sites.js
        sites,
        // Amplience Config
        amplience,
        // Commerce api config
        commerceAPI: {
            proxyPath: `/mobify/proxy/api`,
            parameters: {
                clientId: '1d763261-6522-4913-9d52-5d947d3b94c4',
                organizationId: 'f_ecom_zzte_053',
                shortCode: 'kv7kzm78',
                siteId: 'RefArch'
            }
        },
        // Einstein api config
        einsteinAPI: {
            proxyPath: `/mobify/proxy/einstein`,
            einsteinId: '1ea06c6e-c936-4324-bcf0-fada93f83bb1',
            siteId: 'aaij-MobileFirst'
        }
    },
    // This list contains server-side only libraries that you don't want to be compiled by webpack
    externals: [],
    // Page not found url for your app
    pageNotFoundURL: '/page-not-found',
    // Enables or disables building the files necessary for server-side rendering.
    ssrEnabled: true,
    // This list determines which files are available exclusively to the server-side rendering system 
    // and are not available through the /mobify/bundle/ path.
    ssrOnly: ['ssr.js', 'ssr.js.map', 'node_modules/**/*.*'],
    // This list determines which files are available to the server-side rendering system 
    // and available through the /mobify/bundle/ path.
    ssrShared: [
        'static/ico/favicon.ico',
        'static/robots.txt',
        '**/*.js',
        '**/*.js.map',
        '**/*.json'
    ],
    // Additional parameters that configure Express app behavior.
    ssrParameters: {
        ssrFunctionNodeVersion: '14.x',
        proxyConfigs: [
            {
                host: 'kv7kzm78.api.commercecloud.salesforce.com',
                path: 'api'
            },
            {
                host: 'zzte-053.sandbox.us02.dx.commercecloud.salesforce.com',
                path: 'ocapi'
            },
            {
                host: 'api.cquotient.com',
                path: 'einstein'
            }
        ]
    }
}
```


Now that we have our configuration, we can set up a API service used to fetch content from Amplience. For this we have places a file in: app/amplience/api.ts

This imports both the configuration and the dc-delivery-sdk:

```
import { ContentClient } from 'dc-delivery-sdk-js';
import { app } from '../../config/default';
```

And uses that to instantiate the client:

```
const client: ContentClient = new ContentClient({ hubName: app.amplience.hub });
```

We then have a fetch content function which allows us to:

* Fetch content by ID
* Fetch content by key
* Fetch multiple content by id or key


```
 async fetchContent(args: IdOrKey[], locale = 'en-US') {
        await this.clientReady

        let responses = await (await this.client.getContentItems(args, {locale})).responses
        return responses.map((response) => {
            if ('content' in response) {
                return response.content
            }
            return response.error
        })
    }
```


Any component / service can call fetch content and use the response in their components in a re-usable manner.