# Navigation

## Context
Navigation by the default Salesforce Composable Commerce FE (PWA Kit) is driven by 2 methods:
1. Hard coded items in the front end code
2. By product catalog categories via the API

Other types of navigation (for example footer links) are purely hard coded both for mobile and desktop menus.

In this example, we show how Amplience can be used to put control in the hands of business teams to manage any type of navigation. This involves:

* Any type of navigation. Examples for both header and footer
* Drawing mobile / desktop versions from the same data source
* Being able to define what type of navigation entry you like
* Uses content types to manage different node types in navigation. See [here](./amplience-components-list.md)
* Seamlessly link to a category for a navigation item
* Localised content and values for each item

## Amplience specifics

This example uses the [Amplience Hierarchies](https://amplience.com/docs/development/hierarchies/readme.html) and the [Amplience Filter API](https://amplience.com/docs/development/contentdelivery/filterapiintro.html#introducing-the-filter-api) to manage the navigation content for both the Main navigation and the footer navigation.

The root of each navigation item has its own [delivery key](https://amplience.com/docs/development/delivery-keys/readme.html) so that the FE application knows consistently what to call.

See `app/components/_app/index.jsx` for how the hierarchy information is fetched and passed to components to render.

For the desktop we use the `AmplienceListMenu` component passing in the properties and for the footer we use use the `DrawerMenu` component.

> Note: Where we have changed the default SFCC Composable Commerce FE components to render from data, you will find them in `app/components/amplience`. We have also kept the originals in `app/components` if it is useful to refer to them or use them in other areas of the application.

## Removing nodes from navigation

### Content nodes
Content nodes are:
* Content Page
* Internal
* External
* Group

For each of these, you need to follow the steps from [here](https://amplience.com/docs/development/hierarchies/usinghierarchies.html#removingnode)

### Category nodes
Each Category node has a delivery key `Navigation Key`. This needs to be removed and saved before following the process [here](https://amplience.com/docs/development/hierarchies/usinghierarchies.html#removingnode)



## Limitations

### Maximum items per level
You can currently only put a maximum of 12 items at any hierachy level. For example, 12 Level 1 menu items.
[Docs](https://amplience.com/docs/development/limits.html#filterapi)
> Note: This limit will be resolved in a future release.

### Time based preview
All content can be previewed in time. However all hierarchy content is not currently supported by the filter API in a time based context.
[Docs](https://amplience.com/docs/development/contentdelivery/filterandsort.html#virtualstaging)
Therefore, the application will always render the 'latest saved version' of any hierarchy content when previewing through time. (ie, the [scheduling](https://amplience.com/docs/planning/readme.html) tab.


### Scheduling: Visualisation
When scheduling nodes in an Event, you can visualise your nodes by selecting the individual content items.
Currently, this visualisation will not render the full Category pages. Just the latest version of the navigation.

The JSON Visualisor will also not return any content

### Scheduling: Visualisation of localised nodes
As per above, you cannot currently visualise locale changes in the production tab








