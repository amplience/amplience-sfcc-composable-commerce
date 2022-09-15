# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.5.0](https://github.com/amplience/amplience-sfcc-composable-commerce/compare/v1.4.0...v1.5.0) (2022-09-15)


### Features

* add validation for slot positions ([147a000](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/147a0001ed359080875ccdf36382937c3135f5e5))
* **automation:** add hero schema to be used in ingrid content ([d983044](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/d9830446097bcb6b57387f99a43b0431adcbe272))
* **hero:** add ingrid responsive hero ([4ea3817](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/4ea3817ae4b48c75d86ec85d997deed3c88aeb31))
* **hero:** ingrid hero style fixes ([f72fbe1](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/f72fbe156446ae95aa4eb7a7f05fe2d1c85a6dda))
* show in-grid indices in rtv mode ([d012665](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/d012665dda865de62ae04ea0fa7288431efd46aa))


### Bug Fixes

* add fixed sizing for card at all times ([6033177](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/60331776148989b52d0e48570b04fc274a23715c))
* fix a few issues with the in-grid hero ([1a91907](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1a919070470a99d7dc2a9127c9ea43eafba00d35))
* fix crash when content is placed at the end of a product list ([5b46050](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/5b46050d02712dff33d2815450263188047455ba))
* fix crash when invalid overlaps are present ([1209585](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1209585614c515a318e153660b9e2aa077749a8b))
* fix deleting only in-grid item ([e64feaa](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/e64feaa81f8dffba8aa70fdbba7961b9c7569913))
* Force grid item for hero to always be full width. Other params can be as per configuration ([30bf443](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/30bf443b4048919893ede9bfe92aefa29c5c357d))
* improve styling for validation errors ([6bf1b8e](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/6bf1b8ef2783458060f2f716451a9052a50eb900))

## [1.4.0](https://github.com/amplience/amplience-sfcc-composable-commerce/compare/v1.3.0...v1.4.0) (2022-09-13)


The main feature in this release is the ability to manage your Product Listing Page (PLP) experience with Amplience. In order to showcase this we have:

### Updated the ‘Category' hierarchy node with 3 main updates:
- Top Content - Choose a list of content / slots to display at the top of your PLP
- Bottom Content - Choose a list of content / slots to display a the bottom of your PLP
- In Grid Content - Choose content to display in the product grid. You can define the size in columns and rows as well as the order

### New Component - Card enhanced. This is used to showcase content in the grid.
- New extension - Di Transform: [amplience/dc-extension-di-transform](https://github.com/amplience/dc-extension-di-transform) 
- New Partial definition to easily re-use the extension above

### Application updates - Updated product-list component load and render the capabilities above

### Automation - Import automates example content managing all features above for both the Womens and Mens category pages

### Other nice things:

- Updated automation to work with v0.16.0 of @amplience/dc-cli which supports concurrent publish queues to speed up automation.
- Amplience Wrapper now accepts and passes down additional props to child components.
- Examples of Amplience Wrapper with component mapping overrides so the same component can have different renders depending on the use case.
- Updated to Amplience Hero component with additional options for layout and full width.
- New Partial definition for anyComponentAnd Slot

### What to do:
New packages are included as well as new automation capabilities for speed. Please run npm i / npm install for this release.

### Automation:
Depending on your current version of this project which you can find in your package.json, following the documentation found here and your version below: [automation.md](https://github.com/amplience/amplience-sfcc-composable-commerce/blob/main/docs/amplience/automation.md) 

**Note: Please ensure you upload all media from /amplience-automation/media/ before running any import.**

### >= V1.2.0
If you are on 1.2.X upwards of this project. You do not need to clean before importing

### < V1.2.0
You will need to clean before importing.


## [1.3.0](https://github.com/amplience/amplience-sfcc-composable-commerce/compare/v1.2.0...v1.3.0) (2022-09-08)


### Now points to new default SFCC box which supports localisation as default which removes limitations from previous release in docs:
- api: kv7kzm78.api.commercecloud.salesforce.com
- ocapi: zzrf-001.sandbox.us03.dx.commercecloud.salesforce.com
### Main code changes:
- Update from useSite to useMultiSite
- Make use of buildURL function in useMultiSite hook
- Changed useLocale as separate hook to locale from useMultiSite hook

## [1.2.0](https://github.com/amplience/amplience-sfcc-composable-commerce/compare/v1.1.0...v1.2.0) (2022-08-26)

This release focuses on Managing Navigation on the SFCC Composable Commerce FE from Amplience. This is done by using the Amplience Hierarchy capabilities and filterAPI to retrieve the navigation. We have provided 2 examples of hierarchies to show the power:

1. The main site navigation
2. The footer navigation links

### Automation: 

- Support for cleaning up folders
- new parameters for import to support ecommToolkit extension:  `sitestructureRepoId`, `authUrl`
- New automation Content for navigation

### Extensions:

- New: Ecomm Toolkit extension - allows to browse and select categories.
- Docs: [amplience/dc-extension-ecomm-toolkit](https://github.com/amplience/dc-extension-ecomm-toolkit) 

### Capabilities:

**Navigation**

- Header
- Footer

**New Navigation Content Types:**

- Root
- Category
- Content Page
- Group
- External
- Internal

### Documentation:

- Components list
- Navigation updates
- Automation updates
- Demo Storefront example
- SFCC Configuration instructions

### Misc:

- Style fixes
- Bug Fixes
- code refactor

### Suggested path of upgrade:

This change has fundamental differences in schemas & code. We would recommend that you use the automation commands to clean and then re-import into your hub

## [1.1.0](https://github.com/amplience/amplience-sfcc-composable-commerce/compare/v1.0.0...v1.1.0) (2022-08-16)

### Latest version of the Amplience Composable Storefront V1.1.0

**New Extensions**

- Product Selector Extension – ([amplience/dc-extension-product-selector](https://github.com/amplience/dc-extension-product-selector) )
- JSON Editor Extension on all content types ([Content editor extension- JSON viewer · Amplience Documentation Hub](https://amplience.com/docs/development/content-editor-extension-example.html) )
- JSON real time viz – ([amplience/dc-visualization-delivery-preview](https://github.com/amplience/dc-visualization-delivery-preview) )

**New Components**

- Product Selector – Curated SFCC products in carousel
- Content Page
- SEO (Partial) – used in content page
- All-definitions (Partial) - used in Content Page and Slot to stop re-entering of same schemas in enums

**New Automation Updates**

- Clean command
- Import command updated to have SFCC credentials for product selector to work
- Implemented force to save on multiple user input on commands
- Implemented temp folder for automation and mapping file argument

**FE improvements**

- Added default image to have Amplience Logo
- Amplience FAQ example page in the footer
- Minor fixes for components crashing with certain data 

**Admin tasks**

- NPM Vulnerability fixes
- Moved components and docs into good structures whilst keeping originals for reference
- Moved re-usable elements into partials.
- Moved Real Time Viz code into ‘Amplience’ Folder

----

## v2.0.0 (May 16, 2022)

- Update translation docs [#570](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/570)
- Fixed loading correct amount of skeletons [#576] (https://github.com/SalesforceCommerceCloud/pwa-kit/pull/576)
- Remove manifest path [#582](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/582)
- Fix Verbose ShellJS Command [#588](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/588)
- Drop node 12 support for [#589](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/589)
- Multi-site, Fix the case when no site aliases is set [#551](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/551)
- Fix invalid refresh token [#528](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/528)
- Add valid token check before using refresh token on login [#533](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/533)
- Fix localization scripts to output to the correct default locale [#539](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/539)
- Merge guest cart and registered cart [#540](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/540)
- Move retail react app jest setup out from pwa-kit-dev [#545](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/545)
- Remove legacy remote proxy, which allowed remote environments to use proxy configs in package.json [#425](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/425)
- Rename 'pwa' directory into 'template-retail-react-app' [#485](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/485)
- Optimize visibility-off.svg [#512](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/512)
- Support Multi-site implementation using dynamic config [#469](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/469)
- Service worker loading for dev server [#464](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/464)
- Environment Specific Configuration Support [#477](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/447)

## v1.5.0 (Mar 17, 2022)

- Support storing authentication tokens in cookie [#429](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/429)
- Make sure the forgot-password modal also shows up in the checkout flow [#373](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/373)
- On Windows, the locale selector dropdown in the footer now showing all of the options properly [#381](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/381)
- Import cross-fetch to make OCAPI client isomorphic [#382](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/382)
- Multi-site implementation for Retail React App [#391](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/391)

## v1.4.0 (Jan 27, 2022)

- Do not send HSTS header during local development [#288](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/288)
- Add constants for `<meta>` tags `theme-color` and `apple-mobile-web-app-title` [#287](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/287)
- Upgrade to React 17 [#278](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/278)
- Import preliminary translations [#324](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/324)
- Remove old dependencies that are no longer used [#317](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/317)

## v1.3.0 (Jan 06, 2022)

- Remove Einstein from home page [#208](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/208)
- Add git2gus config to allow git2gus integration [210](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/210)
- Set common HTTP security headers [#263](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/263)
- Add message ids to all the translated text, so they provide context for the translators [#239](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/239) [#207](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/207) [#195](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/195)
- Minor translation fixes [260](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/260) [#252](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/252)
- Provide Url Customization for the Retail React App [#228](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/228/files)
- Add an image component to allow for easier-implementation of responsive images [#186](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/186)
- Add shop Products section with products from the Catalog [#216](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/216)
- Remove `upgrade-insecure-requests` for local development [#270](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/270)
- Fix the missing out-of-stock message on mobile screens [#231](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/231)
- Fix order summary prices on the check out page misaligned on mobile [#233](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/233)
- Skip irrelevant jobs on CI on forked PR [#237](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/237) [#240](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/240)
- Add webpack plugin [#255](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/255)
- Combine config files [#256](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/256)
- Improve unsupported locale error message [#225](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/225)
- Add github template [#226](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/226)
- Fix shipping method description overflows the price section [#232](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/232)
- Fix show applied promotion codes case sensitive issue [#224](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/224)
- Fix section subtitle incorrect prop warning [#282](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/282)

## v1.2.0 (Nov 18, 2021)

- Simplify homepage for Retail React App [#201](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/201)
- Ensure `cookieId` value is sent always for Einstein recommendations [#179](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/179)
- Remove `x-powered-by` HTTP response header [#165](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/165)
- For search engine crawlers, add `hreflang` links to the current page's html [#137](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/137)
- Use the preferred currency when switching locales. [#105](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/105)
- Integrate wishlist with einstein recommended products. [#131](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/131)
- When adding a new locale, minimize configuring the locale selector UI by having a list of commonly-used locales [#175](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/175)
- Enable adding wishlist item to the cart. [#158](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/158)
- Rename CartItemVariant to ItemVariantProvider [#155](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/155)
- Enabling pseudo locale now affects only the loading of the translation messages. The rest of the app still knows about English and the other locales. [#177](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/177)
- Allow individual Commerce API calls to pass in a different locale/currency and override the global value. [#177](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/177)
- Fix regression with loading the correct translation file [#193](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/193)
- Upgrade `chakra-ui/react` to `^1.7.1` version. [#204](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/204)
- Rename the `extract-messages` and `compile-messages` commands to `extract-default-translations` and `compile-translations` [#160](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/160)
- Enable favourite icons on product tiles for guest users [#173](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/173)
- Fix Missing Locale Param for Commerce API Calls [#174](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/174)
- Add cache control header to product details page [#172](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/172)
- Clear SLAS tokens when OID is changed [#178](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/178)

## v1.1.0 (Sep 27, 2021)

- Fix wishlist bugs and provide better hooks for wishlist features. [#64](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/64)
- Lazy load Popover component. [#134](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/134)
- Fix pseudo local command to use `en-XB`. [#101](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/101)
- Ensure generated projects ship with a working .gitignore file. [#95](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/95)
- Remove eslint rule which check for Salesforce copyright. [#104](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/104)
- Improve error page design. [#74](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/74)
- Localize cart and checkout messages. [#106](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/106)
- Add default cache control header to home page. [#103](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/103)
- Security - `inquirer` package upgrade. [#121](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/121)
- New quantity picker. [#102](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/102)

## v1.0.0 (Sep 08, 2021)

- PWA Kit General Availability and open source. 🎉

# PWA Kit Changelog

## v2.2.0 (Aug 25, 2022)
- Update zzrf-001 url [#694](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/694)
- Optimize Server-side performance [#667](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/667)
- Remove references to session bridging [#684](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/684)

## v2.1.0 (Jul 05, 2022)
- Update translations [#643](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/643)
- Update translations [#653](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/653)
- Add bundlesize test back into CI [#652](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/652)
- Fix UI bug on notifications badge [#620](https://github.com/SalesforceCommerceCloud/pwa-kit/pull/620)
