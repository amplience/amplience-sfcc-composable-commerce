# Stylitics Components

![Stylitics Components](./media/stylitics-main.png)

Uses the [Amplience Stylitics Integration (See link for full documentation)](https://github.com/amplience/dc-integration-stylitics) to render Stylitics widgets as a component. Stylitics and Amplience are a great fit for our creating automated shoppable experience using the great capabilities of Stylitics to increase AOV and basket size.

## Key implementation areas:
* Sample product set that can be used when selecting products (see [documentation](https://github.com/amplience/dc-integration-middleware/blob/main/docs/vendor/commerce/rest.md))
* All of the components for available Stylitics Widgets and implementation

## Key Demonstration areas:
* Configuring Stylitics as a component like any other to place in your experience (content, slots)
* Use of Stylitics In Grid for category pages (note: Rendering is by the Stylitics widgets. Would recommend full width placements)
* Personalisation examples like any other content
* Shoppable Video examples (load Stylitics widgets in a sidebar)
* Product Page content

## Customising for your implementation
This automation points to a sample Stylitics data set and account. If you are using in your own implementation as a sample and wanted to change anything, full detail can be found here: 

https://github.com/amplience/dc-integration-stylitics/blob/main/docs/automation.md#customisations--implementation

Files can be found in `/amplience-automation/automation-files`

## Automation specifics
We would recommend that you update upload and overwrite any media in your content hub before this release. Automation documentation can be seen [here](./automation.md#media)


> Note: Stylitics do not currently have any demo data sets for the SFCC default catalog, so we have implemented a product selector that points to a demo data set. This means that any links are as per Stylitics demo data. This may change in future releases 
