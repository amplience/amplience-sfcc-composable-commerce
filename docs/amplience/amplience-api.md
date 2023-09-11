# Amplience API
In order for any area of the application to be able to request content from Amplience we have put all API methods into series of services found in `/app/amplience-api/`.

These service use the [Amplience delivery SDK]( https://github.com/amplience/dc-delivery-sdk-js ) to connect and return content, and our own wrapper called the `AmplienceAPI` to provide helper methods for fetching content, hierarchies and more.

## Dependency

The package.json should have a dependency for the Amplience DC Delivery SDK:

```
"dc-delivery-sdk-js": "^0.11"
```

## Initialisation

In order for the Amplience SDK to understand which hub to connect to, we need to instantiate the client with the hub name. This is driven from your configuration: `config/amplience/default.js`.

```
module.exports =
{
    default: {
        hub: 'sfcccomposable'
    },
    //...
}
```

Where this is the Amplience hub to connect to. Other configuration in here is generally for the toolbar, used when visualizing or previewing content.

Also follow the Composable Commerce pattern of importing this directly into the default configuration: `config/default.js`.

```
const amplience = require('./amplience/default.js')
```

And then in the app add an attribute for `amplience`:

```js
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
                clientId: 'c9c45bfd-0ed3-4aa2-9971-40f88962b836',
                organizationId: 'f_ecom_zzrf_001',
                shortCode: '8o7m175y',
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
        ssrFunctionNodeVersion: '18.x',
        proxyConfigs: [
            {
                host: 'kv7kzm78.api.commercecloud.salesforce.com',
                path: 'api'
            },
            {
                host: 'zzrf-001.dx.commercecloud.salesforce.com',
                path: 'ocapi'
            }
        ]
    }
}
```

Now that we have our configuration, we can set up a API service used to fetch content from Amplience. For this we have places a file in `app/amplience/api.ts`.

This imports both the configuration and the `dc-delivery-sdk`:

```js
import { ContentClient } from 'dc-delivery-sdk-js';
import { app } from '../../config/default';
```

And uses that to instantiate the client:

```js
const client: ContentClient = new ContentClient({ hubName: app.amplience.default.hub });
```

We then have a fetch content function which allows us to:

* Fetch content by ID
* Fetch content by key
* Fetch multiple content by id or key

Our content fetching in this project is rather complex, supporting default arguments and automatically enriching personalised content. Here is a simplified version:
```ts
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

## Filter API

The hierarchy fetch methods obtain the root content item, then use the Filter API to fetch child content for each level in the hierarchy. They are then placed in a `children` property for each level. This is done by filtering by the parent ID:
```js
const result = await this.hierarchyClient
    .filterByParentId(id)
    .sortBy('default', 'ASC')
    .request({
        format: 'inlined',
        depth: 'all'
    })
```

The content page search method obtains a list of all active pages from the Filter API, and then selects the pages that match the input search query. This is done by a similar request, followed by a filtering method we provide to return only the matching pages:

```js
const result = await this.client
    .filterByContentType('https://sfcc.com/site/pages/content-page')
    .filterBy("/active", true)
    .request({locale: locale + ',*'})
```

## Enrich
It's possible for our AmplienceAPI class to automatcally enrich content as it is fetched. The two ways that this is currently used is for personalisation, and fetching delivery keys for content references in the navigation hierarchy. These are defined as "enrich strategies".

```ts
export interface EnrichStrategy {
    trigger: (content: any) => boolean;
    enrich: (content: EnrichTarget[]) => Promise<void>;
}
```

The `trigger` is a method that checks any given object in the content, and returns true if the enrich strategy should be performed.
The `enrich` async method does the actual modification of the object, and is performed in batch after the content is fully scanned. A list of `EnrichTargets` are provided, which contain the item itself, the parent, and the index used to access it from the parent.

These strategies are provided to the `enrichContent(item, strategies)` method, which scans a given content item for matches of the strategy and enriches them in bulk. The default strategies (just personalisation for now) are called via `defaultEnrich` in the API class on any regular fetch, and this is also called externally to enrich any content provided by real-time visualiation.

Generally you will want to attempt to find and batch requests like we are doing here, as it will reduce the time spent waiting for API results, and the number of individual requests. This isn't the only way to do this, so feel free to use the APIs in the way that makes most sense within your requirements.

### Personalisation
By default, fetched content will be enriched with the "enrichVariantsStrategy", which detects personalised content (via the `enrichType` property equalling `PERSONALISED`), selects relevant variants to activate based on the active groups and fetches them in batch. Groups are set on the `AmplienceAPI` object when it is initialized using the `setGroups` method.

See [the personalisation page](/docs/amplience/personalisation.md#technical-behaviour) for more information.