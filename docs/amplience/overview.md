# Overview

> Version: 0.1

> Author: Amplience

> Date: 08/08/2022

## Purpose

This documentation will show you step by step how to use Amplience in the Salesforce Composable Commerce Front End. As Amplience is a headless CMS, all configuration can be in the Composable Commerce Front end without changes to the core Salesforce B2C Commerce platform.

It also shows that you can simply manage any existing components with Amplience

## Functionality

* Rendering Published Content
* Visualising content edits in real time
* Looking at future scheduled content and slots
* Automation of into an Amplience account

## Github

A version already Amplience enabled can be found [here](https://github.com/amplience/amplience-sfcc-composable-commerce ): 

This contains the app code and also automation to populate an Amplience account.

## Localization enablement

If using your own SFCC sandbox, you will have to have localisation enabled:

To enable localization in PWA Kit there are 3 steps:

1. configure locales on your SFCC sandbox: [Salesforce Commerce Cloud Infocenter](https://documentation.b2c.commercecloud.salesforce.com/DOC2/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fadmin%2Fb2c_configuring_site_locales.html)

2. In `config/default.js`, set `url.locale` to a valid value [(Configuration Files | B2C Commerce PWA Kit and Managed Runtime | Salesforce Developers)](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/configuration-options.html#url-formatting)

3. configure `config/sites.js` to support multiple locales that match the locales you setup in BM [(Multiple Sites | B2C Commerce PWA Kit and Managed Runtime | Salesforce Developers)](https://developer.salesforce.com/docs/commerce/pwa-kit-managed-runtime/guide/multiple-sites.html)

## Pre-requisites

### Option 1: No Amplience / SFCC logins

Allows you to see published content on one of our dedicated Amplience DC Hubs, patterns and code

Just need to install and run Salesforce Composable Commerce Front-End

### Option 2: Access to SFCC and Composable Commerce Front-End

Allows you to change information in Salesforce, deploy and host your application. But not see any

As option 1, but you may want to change the following to have options to point your deployed environment. These are:

* Preview URL: [docs](https://amplience.com/docs/integration/contentpreviewapps.html)
* Content Type Visualisation URLs: [docs](https://amplience.com/docs/integration/visualizations.html) 

### Option 3: Access to Amplience

Allows you to change content, add new content models, visualize, schedule, preview content.

As option 1, but you will need to:

* Update the Amplience Hub name in the `config/amplience/default.js` to use your specific Amplience hub
* Follow the guide / automated to put in schemas / content to your account


### Option 4: Access to Amplience, SFCC and Composable Commerce Front End
Combination of Options 2 & 3.