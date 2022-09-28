# Personalisation

Salesforce B2C Commerce has some powerful capabilties for personalisation. Typically this uses **Customer Groups**. Customers can be assigned to one or many static customer groups as well as dynamic customer groups.

In a headless storefront we can use the same concepts but there are architectural differences as Salesforce is no longer responsible for delivering content and experiences onto the page.

## Headless roles

In a headless storefront, teams are no longer required to work with a rigid structure for personalisation.

### Salesforce:
Is the single source of truth for customers and customer groups. It is both the administration interface for defining these and the rules and the API source to list customer groups for selection, authenticate a user and which customer groups they are assigned to.

### Amplience:
Amplience acts as the place where teams curate and manage personalised experiences. They need attribute variations to customer groups in their content.

### Composable Storefront (FE):
The front end is where the the API's are called from Amplience and Salesforce in order to display the right content variations to the customer.

## Authoring - Listing customer groups for selection
In order to list customer groups for a user to select, we need to get a list of available customer groups from Salesforce via the Open Commerce API.

Endpoint: `/customer_groups`

Documentation: [CustomerGroups resource (Data API)](https://documentation.b2c.commercecloud.salesforce.com/DOC2/index.jsp?topic=%2Fcom.demandware.dochelp%2Fcontent%2Fb2c_commerce%2Ftopics%2Fcustomers%2Fb2c_creating_a_customer_group.html)

![Customer Groups Call)](./media/personalisation_customer-groups-authoring.png)

The eComm Toolkit Extension calls the customer groups enpoint to retrieve the list for user selection.

The selected customer groups are then stored in the content so they they can be used, filtered, referenced for decision making.

```json
"segment": [
    "Everyone",
    "genY",
    "genZ"
]
```


## Personalised Containers

Personalised container types have a few mandatory fields which define what content is selected for a given user.

- Default Content: This is a content link and can be a list of any content. This content is displayed when no matches are made.
- Max Number of Matches: Defines the maximum number of matched content items that can be displayed. Content items past the limit (in order of variation appearance) will be silently removed.
- Content Variations: Each variation can be assigned to one or many customer groups. Each variation also has a list of content. This list can be a reference so content for a variation is only fetched if it matches the current user. Result content is ordered by their variant's order of appearance.

## Technical Behaviour

When content is fetched, it is scanned using a generalized "enrich" method that looks for certain patterns, then runs handlers to enrich that data. The combination of pattern and handler is called an "Enrich Strategy", and one is enabled by default for personalised content.

This enrich strategy searches for the appearance of personalised containers, and then either filters existing content or fetches it based on the groups currently assigned to the content client. This content then replaces the `content` property of the container, so that it can be rendered directly. The matching variants are also placed into `variants` with their content embedded, if you wish to see all matching variants separately.

Because this runs on any fetch, it can be used seamlessly for fetches on the server and client side, and the content will be available without triggering any extra reflows. Our implementation of Real-Time Visualization also runs the default enrich methods, so personalised content is updated in real time as you change it in the content form.
