# Security Updates

In order to load content from Amplience, your application needs to allow the domains to load both content and media from Amplience.

In Composable Commerce Front end, this is in:

`app/ssr.js`

## What is needed?

Because Composable storefront will be loading both content and media from Amplience directly, we need to allow the application to load from these domains. This is content (JSON) and media (images / videos). Both of which can be published or unpublished and loaded from different domains

|Type|Published|Unpublished|
|:----|:----|:----|
|Content (JSON)|*.cdn.content.amplience.net|*.staging.bigcontent.io|
|Media (images & video)|cdn.media.amplience.net|*.staging.bigcontent.io|

Because Amplience visualisations are loaded via iFrame, we also need to tell you application to allow from the Amplience back office.

|Type|Value|
|:----|:----|
|iFrame (frame ancestors|*.amplience.net|

## What should my security policy look like?

If you have already changed your security policy, please be careful and add to rather than simply replacing.


```json
contentSecurityPolicy: {
    useDefaults: true,
    directives: {
        'img-src': [
            "'self'",
            '*.commercecloud.salesforce.com',
            'data:',
            '*.cdn.content.amplience.net',
            'cdn.media.amplience.net',
            '*.staging.bigcontent.io'
        ],
        'script-src': [
            "'self'",
            "'unsafe-eval'",
            'storage.googleapis.com',
            '*.cdn.content.amplience.net',
            'cdn.media.amplience.net',
            '*.staging.bigcontent.io'
        ],
        'default-src': ["'self'", "'unsafe-eval'", '*.cdn.content.amplience.net', 'cdn.media.amplience.net', '*.staging.bigcontent.io'],
        'frame-ancestors': ["'self'", '*.amplience.net'],
        // Do not upgrade insecure requests for local development
        'upgrade-insecure-requests': isRemote() ? [] : null
    }
}
```