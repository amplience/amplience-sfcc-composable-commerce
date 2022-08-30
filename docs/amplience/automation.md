# Automation

In order to save manual entry to use this starting point we have included an automation directory with all the relevant content and media

##Media

Take the media from `amplience/media` and upload to your Amplience Content Hub and publish.

## Content import

Install the Amplience Dynamic Content CLI as can be found [here](https://github.com/amplience/dc-cli)

Configure the CLI to point to your account (you will need your Amplience hub ID, clientID and clientSecret)

You will need the following information from your Ampliene and SFCC account:
* Amplience Hub ID
* API details: Note the [Amplience Account](amplience-account.md) specifics which require admin and DAM-API access.
    * API Client ID
    * API Client Secret
* Repository IDs: which you can get from [here](https://amplience.com/docs/intro/repositorysettings.html)
    * Content
    * Slots
    * Site Components
* Mapping file path: optional file path to write mapping file, default `.amplience/imports/sfcc-<hubId>.json`
* Temporary directory path: optional temporary directory for all run files, default `amplience-sfcc/amplience-sfcc-${nanoid()}`
* SFCC credentials to create Product selector extension:
    * SFCC url
    * SFCC version
    * Auth URL
    * Auth client ID
    * Auth secret
    * Site ID

Run the following command replacing the variables with details from your Amplience account:

```
npm run import \
    --- --hubId <hubId> \
    --clientId <clientId> \
    --clientSecret <clientSecret> \
    --contentRepoId <contentRepoId> \
    --slotsRepoId <slotsRepoId> \
    --sitestructureRepoId <sitestructureRepoId> \
    --mapFile <mapFile> \
    --tempDir <tempDir> \
    --sfccUrl <sfccUrl> \
    --sfccVersion <sfccVersion> \
    --authClientId <authClientId> \
    --authSecret <authSecret> \
    --authUrl <authUrl> \
    --siteId <siteId>
```

## Hub clean

The script run will clean out the hub, delete or archive next items:
 - content type schemas
 - content types
 - content items and slots
 - folders
 - events and editions
 - webhooks
 - extensions
 - settings
 - default `.amplience/imports/sfcc-<hubId>.json` or specified mapFile

You will need the following information from your Amplience account:
* Amplience Hub ID
* API details: Note the [Amplience Account](amplience-account.md) specifics which require admin and DAM-API access.
  * API Client ID
  * API Client Secret
* mapFile path, if custom one was used during import (optional)

```
npm run clean \
    -- --hubId <hubId> \
    --clientId <clientId> \
    --clientSecret <clientSecret> \
    --mapFile <mapFilePath> 
```
