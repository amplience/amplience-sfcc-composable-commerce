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


## Personalised Container

- Default Content: (this is a content link and can be a list of any content)
- Content Variations: Each variation can be assigned to one or many customer groups. Each variation also has a list of content. This list is a reference so content for a variation is only fetched if there is a matching variation.

