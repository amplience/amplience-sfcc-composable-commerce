## Getting Started

This documentation will show you how to use the Amplience Salesforce Composable Commerce app (`ASCC`), as well as the different ways it can be used, i.e., with or without an Amplience account ***and/or*** SFCC instance of your own.

As Amplience is a headless CMS, all configuration can be in the Composable Commerce Front end without changes to the core Salesforce B2C Commerce platform.

It also shows that you can simply manage any existing components with Amplience

First of all:

```
$ git clone git@github.com:amplience/amplience-sfcc-composable-commerce.git
$ npm i
```

Once you've cloned the app, there are several ways to view and/or use it. 

### "Preview" mode

When you clone the repo and run it locally 'out of the box', it points to a public instance of SFCC and a public instance of Amplience Dynamic Media and Content Hubs. This means you do not need access to an SFCC instance or an Amplience account.

As this mode is inteded as a way to quickly view the running app and start becoming familiar with the code, there are several key limitations:
- limited localisation based on how the public SFCC instance is configured
- content personalisation limited to logged out and logged in users
- view only (no content editing/scheduling/preview, etc.)

### Full Access Mode
To get the full suite of capabilities out of `ASCC`, you'll want to point to your own SFCC sandbox/instance **and** your own Amplience Dynamic Media and Content Hub.

There are 3 main, multi-step paths to get `ASCC` working with your own SFCC Box.

- [The main SFCC setup](../../README.md#get-started)  (Localisation, app config files, SLAS)
- [SFCC configurations for Amplience](./sfcc-setup.md) specifically (to enable Amplience extensions and content personlisation that require OCAPI)
- [Loading Image Media and Content](./automation.md)


### SFCC Only Access Mode

## Functionality

* Rendering Published Content
* Visualising content edits in real time
* Looking at future scheduled content and slots
* Automation of into an Amplience account



## Pre-requisites

### Option 2: Access to SFCC and Composable Commerce Front-End
***TODO: ^ what does "Composable Commerce Front-End" refer to here? ^*** The code that is public anyway? MRT? 

Allows you to change information in Salesforce, deploy and host your application. But not see any
***TODO: ^ Not see any... what? ^^***

As option 1, but you may want to change the following to have options to point your deployed environment. These are:

***TODO: elaborate  ^ here, developers will need more context***

* Preview URL: [docs](https://amplience.com/docs/integration/contentpreviewapps.html)
* Content Type Visualisation URLs: [docs](https://amplience.com/docs/integration/visualizations.html) 

### Option 3: Access to Amplience

Allows you to change content, add new content models, visualize, schedule, preview content.

As option 1, but you will need to:

* Update the Amplience Hub name in the `config/amplience/default.js` to use your specific Amplience hub
* Follow the guide / automated to put in schemas / content to your account