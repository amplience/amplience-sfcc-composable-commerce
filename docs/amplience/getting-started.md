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

### SFCC Access

If you have an existing SFCC Sandbox or instance, you can point the application to your SFCC environment. With your own SFCC box you'll be able to change information in Salesforce.

Also, if you have access to Salesforce Managed Runtime, you'll also be able to deploy and host your application. 
 
Instructions for pointing to your ODS and pushing/deploying to MRT:

 - [The main SFCC setup](../../README.md#get-started)
 - [Push and Deploy Bundles](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/pushing-and-deploying-bundles.html)

 Bear in mind that without access to Amplience Dynamic Media or Content Hub, the following limitations will apply:

 - `ASCC`'s main navigation is defined in Amplience and is mapped to the RefArchGlobal Storefront Catalog. Your storefront catalog and Category ID's will most likely differ from that Catalog. In this case, you'll want to goto `Admin > Site Import` in Business Manager and import the RefArchGlobal store in order to stand up a working `ASCC` application.
 - You will not be able to add new or edit existing Amplience content (including the main navigation)

### Full Access Mode

To get the full suite of capabilities out of `ASCC`, you'll want to point to your own SFCC sandbox/instance **and** your own Amplience Dynamic Media and Content Hub.

In addition to the base SFCC setup above, there are 4 main, multi-step paths to get `ASCC` working with your own SFCC Box.

- [SFCC configurations for Amplience](./sfcc-setup.md)  (to enable Amplience extensions and content personlisation that require OCAPI)
- [Loading Amplience Media and Content Data](./automation.md)
- [Amplience Hooks Cartridge](https://github.com/amplience/amplience-sfcc-hooksbridge) (for enabling Content Personalisation)

And finally, if you are deploying to MRT, you'll be able to Preview and enable Real-Time visualisation in any of those environments by updating your Preview and Visualisation URLs: 

* [Setting Preview URLs](https://amplience.com/docs/integration/contentpreviewapps.html)
* [Setting Content Type Visualisation URLs](https://amplience.com/docs/integration/visualizations.html)
