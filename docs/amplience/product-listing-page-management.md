# Product Listing Page (PLP) management

Blurb about what the PLP is

## Key differences

### Default from SFCC Composable
The out of the box SFCC Composable Storefront from Salesforce does not allow any confiiguration for a PLP by the user. It is fixed to display a list of products and related facets by a product category.

![SFCC PLP Default)](./media/PLP_-_default-from-sfcc-composable.png)

### With Amplience

Amplience allows you to manage content for your PLP in a number of ways:
* Top Content - Choose a list of content / slots to display at the top of your PLP
* Bottom Content - Choose a list of content / slots to display a the bottom of your PLP
* In Grid Content - Choose content to display in the product grid. You can define the size in columns and rows as well as the order

![Amplience PLP management)](./media/PLP_-_amplience-management.png)

## Global Architecture choices

### Content references
As the same content is used to draw the navigation, we wanted to ensure that we don't over populate the data to draw any pages. Therefore any content in the category page node is provided as a **content-reference** instead of a **content-link** to ensure that the payload is as small as possible but the application knows what content to fetch.

[More information about content links and references](https://amplience.com/docs/integration/choosers.html#linksandreferences)

### Fetching content references
Where we have multiple content references to fetch Server Side, we combine them into a multiple fetch. So instead of 12 references having 12 calls we combine them into one.

[More information about multi-fetch API](https://amplience.com/docs/development/contentdelivery/readme.html#multipleitems)