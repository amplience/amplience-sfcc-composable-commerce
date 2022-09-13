# AmplienceWrapper Component

In terms of building components, you do not have to do anything different when making them ‘content enabled’ from Amplience. Components typically driven from ‘props’ and the key difference is that these props will be provided by Amplience content instead of hard coded into the applications.

In this application, we have provided an approach to make your live easier. Lets introduce the Amplience Wrapper Component

`app/components/amplience/wrapper/index.jsx`

This component makes it really easy for you to add content aware components to anywhere on your application. You simply put it onto a page and provide it with either:

* **fetch**: an id or key of the content you wish to load (Client Side)
* **content**: If you want to load you data and manipulate it elsewhere (ie in getProps) you can just pass in the content (Server Side)

Example of loading by ID:
```javascript
<AmplienceWrapper fetch={{id: '1234567'}}></AmplienceWrapper>
```

Example of loading by Key:
```javascript
<AmplienceWrapper fetch={{key: 'home/slot/top'}}></AmplienceWrapper>
```
Example of loading data elsewhere and loading passing into the component:

```javascript
const homeSlotTop = await (await fetchContent([{ key: 'home/slot/top' }]))
```
```javascript
<AmplienceWrapper content={homeSlotTop}></AmplienceWrapper>
```

Example of with custom props:
> Note this can be with any loading mechanism (key, id, content)
```javascript
<AmplienceWrapper fetch={{key: 'home/slot/top'}} myProp1='a' myProp2='b'></AmplienceWrapper>
```

Example of with a different component mapping:
```javascript
const menuComponents = {
    'https://sfcc.com/components/hero': NavigationHero
}
```
```javascript
<AmplienceWrapper content={content} components={menuComponents} />
```

The wrapper component itself makes life easier as it handles the loading of the data and mapping into which component to render dynamically.

## Overview of functionality:

* has a component mapping object
* Checks the content data and chooses which content to render based on the content model schema ID in Amplience
* draws the component passing in the props from Amplience
* If no component is found, renders the JSON for the component
* Ability to pass through custom props to send to child components

Supported components are imported:

```javascript
import Hero from '../../hero'
```

The component mapping matches the schema name to the component:

```javascript
const componentsMapping = {
    'https://sfcc.com/components/hero': Hero
}
```

If the data and schema has a match in the mapping it renders the component otherwise just JSON:

```javascript
const Component = components[fetchedContent?._meta?.schema]
return Component ? <Component {...fetchedContent} /> : <>{JSON.stringify(fetchedContent)}</>
```

## Additional thoughts:

Things to think about when building components:

* Props can be anything. But if you stick to probs being data then its easier to content manage without bespoke code
* Your components should not care about complexity. Just that they should draw from props
* If your content uses media, be sure to update to use the full Amplience Dynamic Media capabilities