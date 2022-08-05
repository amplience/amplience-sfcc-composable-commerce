# Automation

In order to save manual entry to use this starting point we have included an automation directory with all the relevant content and media

##Media

Take the media from `amplience/media` and upload to your Amplience Content Hub and publish.

## Content import

Install the Amplience Dynamic Content CLI as can be found [here](https://github.com/amplience/dc-cli)

Configure the CLI to point to your account (you will need your Amplience hub ID, clientID and clientSecret)

You will also need you repository ID’s (Content and Slots) which you can get from [here](https://amplience.com/docs/intro/repositorysettings.html)

Run the following command replacing the variables with details from your Amplience account:

```
npm run import \
    --- --hubId <hubId> \
    --clientId <clientId> \
    --clientSecret <clientSecret> \
    --contentRepoId <contentRepoId> \
    --slotsRepoId <slotsRepoId>
```