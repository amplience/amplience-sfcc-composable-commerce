# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

## [1.4.0](https://github.com/amplience/amplience-sfcc-composable-commerce/compare/v1.3.0...v1.4.0) (2022-09-13)


### Features

* add skeleton support to amplience wrapper ([0da44c7](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/0da44c78078f3e2c4f9fb4bd3642b49748f13a40))
* allow rtv to reload on filter change ([062eb9f](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/062eb9f229952bbb729efbeb66f4944b1038eac2))
* amplience product list page ([ebfc43d](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/ebfc43d67a455bb9cd72b8d8741482d4ce73b305))
* Automation for card-enhanced ([b376a91](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/b376a913082202d66e3ed871a191b8846d982031))
* Automation for WIP In grid item, schemas, types, icon and card ([a3d634e](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/a3d634e61c6e1801c8bab87cba31bfd06248f112))
* **automation:** add hero automation ([fe7c374](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/fe7c3741942512a2fab6046a803e16f79b8e26d4))
* fallback to default components ([73ead8e](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/73ead8e35dfa19d42eaa986ae6daf82cbe418935))
* Grid Item Hero render ([9ead12b](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/9ead12b3681128655986c4ddf72fd8105a49ff10))
* **in-grid:** allow using hero in grid ([f23090f](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/f23090f4113a273120d60324c8e229d681fe3fb4))
* initial version of in-grid content ([266556e](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/266556e84534240b4a668730bf0338f0378e41a7))
* Localised values for diimage SEO ([cc08253](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/cc082533dc0d804ef3ed760d5f4a8bfd092472bb))
* new Hero render for In Grid Item ([fb59437](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/fb594373b7aaa741bf9bc4c656da5f5178de768f))
* start working adaptive image into it ([73632f6](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/73632f611340536d413bb697913befd8c9712e58))
* use batch publish for automation ([1fcaa7c](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1fcaa7c88196bd22e3299275264d5f27cf97569b))
* WIP for Top and Bottom Content: https://ampliencedev.atlassian.net/browse/NOVADEV-648 ([cec2c80](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/cec2c80fc62f8236df675ff236f87a44af9c7c76))


### Bug Fixes

* **amplience-api:** max batch size 12 ([07dd2ad](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/07dd2ade1644764a843d819aaa9d1a62e92ddc8e))
* bound in-grid content to show only when products are present ([bb85111](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/bb851114bd706a3f2ed1f2e8ff8da40072b87e9c))
* checking if mobile ([15be6bf](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/15be6bfc5a396b09fa86ba23f58ad2509967089c))
* converting to numbers ([a06f37a](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/a06f37abe4106f049e2edc100f91405c359bce43))
* Correct content in hierarchy ([8ff608a](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/8ff608a5edfe7ac3d9667f555895b79c5fa91cd8))
* default 1 when undefined cols or rows ([41d6745](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/41d6745b3bdf29b358c25fac4eb2a91fed52c67c))
* fix card initial state ([2cfe51d](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/2cfe51d6aa5f3a43a9ecda069ee0e92f83f76af6))
* fix card sizing at cols = 3 ([3fd5bc6](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/3fd5bc6504ee4a07caae865fbab5f8757e7c78ea))
* fix categories without slots ([ec33039](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/ec33039b64f1e24d77179b92b5b4928d7f6c87f3))
* fix duplicating grid content ([d54ca3a](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/d54ca3abcd1a9b9c9f988122a280996d67fee2ae))
* fix error with row/col passing, proptypes ([248a84e](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/248a84ea26983d838c872de056639c387c7daf63))
* fix page count with in-grid content ([68d8eb6](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/68d8eb61b5a5d91db6eb4edf8e75b35fdc306dfb))
* fix pagination ([a5d9831](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/a5d983144ed785140d494dccfda08d7005df4cea))
* fix product count across pages ([19a3915](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/19a3915be342bf2f5082d25515a0f07a35771f02))
* fix product-list ampSlots not updating ([efbfa2c](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/efbfa2c7042b920930c1679ec2d88e45b2802d11))
* fix some things with the enhanced card ([27c4a74](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/27c4a7434a6aab44a2b47be51d78565ce61f7edc))
* force card back to loading state when resizing ([da680a1](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/da680a165bd028d5b8fee87fba17a0eee427f822))
* force ordering on ampSlots ([1b5b553](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1b5b553d97d2dd0d4a56c77c5f7cd88bc42b2653))
* Hero mobile view heading ([c4cecb5](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/c4cecb5e3b5f3f035d3b9179835ad78e949fd08c))
* **hero:** fix mobile direction ([fdc526d](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/fdc526db1ee97fbd116d1117139c45c2e9576310))
* **hero:** fix mobile positioning ([4fe9b74](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/4fe9b74c6e570fc3af41486764d7c3cde69a8b5d))
* **hero:** fix positioning styles ([88ddb59](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/88ddb59b35825d5e0428f781a43dd8f0db0a996f))
* image data now mapped correctly so scaleFir and poi are set correctly when they are present ([c1057d0](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/c1057d097a9b14d6ceec976db8ba83dd186c25e1))
* improve size calculation ([c48b070](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/c48b070f76bf6c24fb8da9478b100f630e506584))
* less opaque & less text on mobile ([df44f29](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/df44f2907e63fe44e5dea5be3f0f7ea824b60672))
* localized home page ([5c0fb70](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/5c0fb70cd760c4bca5af016b08a9fe34c6656c4e))
* mobile css in card ([96375af](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/96375af9a97d52a0445350939662fbbf7edd6fa1))
* mobile css updates ([2e99f2b](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/2e99f2bf34f57e17041a45df98f3b090361b2f12))
* more mobile ([da30122](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/da30122db7ef0d2584083e13b2c62e1ab84975ab))
* NOVADEV-650 ([342da10](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/342da10e30ffedf0a455845d29c77fcdf4d3bf40))
* NOVADEV-650 ([20ba1cf](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/20ba1cfad51f8572a30ed27125f18bfed988bc33))
* NOVADEV-650 ([0c21697](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/0c2169775901430462ef31e4dd9cecd0648e7383))
* NOVADEV-650 ([ece32b6](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/ece32b6b712e0ff6020aa5eabe8bfd54e3994633))
* package depencies ([a33e0b8](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/a33e0b83cb73ca94ef864fa134c796211a2447da))
* poi fixed ([c4e64ad](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/c4e64adc656ad5125be7c92c2b8616f8d2b49994))
* props vs variables ([ef169ae](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/ef169aee11368c4063670a15d45a54a1d553c95c))
* recalcuate image when rows/cols change ([9a90d1a](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/9a90d1af854913566c589347562a1f474cd872b2))
* removed double content ([9178e3d](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/9178e3dc31dd1add51bc4911ff888720872e66c7))
* reverted fix ([459b1f0](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/459b1f056df279e85e509dd680e1160f62178e52))
* Right content in automation ([4604022](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/4604022ec5cb86210ec7037a363f464e50ec71fc))
* smaller text for sm mobile ([728cba4](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/728cba4bd87a3c928832a326427366b61f7c028c))
* Typo in example import ([9b0942a](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/9b0942a94a82e861ed22ee7f092c49f11cc297bd))
* Typo in schema ([b72f3a8](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/b72f3a848aaaaabd1e9df0a97078c04995f78e7f))
* updated types ([9007c68](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/9007c68b3be814bd263c122c9f181873a7e43772))
* use desktop layout for ssr default ([39d045b](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/39d045b8aa5585a3166bc671b1bc326f834886d4))

## [1.3.0](https://github.com/amplience/amplience-sfcc-composable-commerce/compare/v1.2.0...v1.3.0) (2022-09-08)


### Features

* merged PWA Kit 2.2.0 ([fde8e42](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/fde8e427c5528371dc3be43ea6a72b77ffa65ae2))

## [1.2.0](https://github.com/amplience/amplience-sfcc-composable-commerce/compare/v1.1.0...v1.2.0) (2022-08-26)


### Features

* add field to populate nav children from sfcc ([1ab6dfb](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1ab6dfbe58dc6b497ee05c9deda21d6679bf0c3e))
* add footer nav support ([b1c8e12](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/b1c8e122f2390760684135cd9538df44cef374e9))
* add other link types ([a2b8e9a](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/a2b8e9abd082297c48623d1a3088c6ce5005aafc))
* add page vse support ([89a43fe](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/89a43fe8e03050521d5167fd5386305a322785da))
* add support for overriding sfcc categories ([ce7c759](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/ce7c75949deba042e6df78b699a48612a1123135))
* added content to partial ([02517bd](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/02517bd04bc3a3f124fadc9bb1cdb1226222d765))
* added desktop large device (1280) ([818d6cf](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/818d6cf6115e60a49a1fdabad237541e13f66f4f))
* added ecomm toolkit and extra sfcc params ([6453bda](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/6453bdad8ee9e21f1f1129aa3aa4880da38692da))
* cards for nav nodes ([b6a7280](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/b6a72809234942745e65459152daacb789e454c5))
* display full page in viz for root and cat ([b412100](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/b41210012970a417c52ca22d62882fa3aa1b145f))
* experimental nav realtime vis ([97d8206](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/97d82064e6410115366f0963cc5cb81625a078d7))
* **hierarchies:** add active flag to mark archived items as inactive ([76182a2](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/76182a2a6608a77de214c2a240d1c4a328566b4c))
* more length for seo fields ([d24d486](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/d24d486a74884c8aa818ae0f2c0663f586eb8149))
* **navigation:** ability to merge Amplience & Commerce Categories ([bc276c4](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/bc276c4ec92e6d42f54d2e4b405bc6afe1d1cd9c))
* **navigation:** add an extra level 2nd link if top level has a link (mobile) ([b215c9c](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/b215c9cf06693d61dab0a7b335c98454c08029f8))
* **navigation:** add automation schemas and types files ([64c32fe](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/64c32fe9504c0de979657c9ffe19a7152ede5b1b))
* **navigation:** allow using content in navigation ([7c7f7da](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/7c7f7daadb1eceeb3546ab7920a692fae1a47416))
* **navigation:** fetch header and footer navigation in parallel ([185b59f](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/185b59f0623b273249d044c5323f030abb9af955))
* **navigation:** render amplience mobile navigation ([1ef10ed](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1ef10eddbcc398dfab95177d3d04f2f4207c0610))
* **navigation:** render amplience mobile navigation with links from footer and menu icon ([1f9391e](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1f9391e163b757554fec3f98355ff9cfc4a2dc13))
* **navigation:** sort by priority after replace category ([b41ff79](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/b41ff79e9d28f0af195fa8978d90c889dfa505c3))
* **navigation:** use default localized values from SFCC for categories navigation ([6ec6348](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/6ec6348bc94027cb4e7981b0fbeb1d10ab75dea2))
* no link builder ([e23ddf6](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/e23ddf6dec2ef78860d61122e7f74e74c2f1db13))
* removed sfcc api token (computed) ([4c03ac6](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/4c03ac6174ad4d20cb3e56c5e1ac5cd3a14ec379))
* rewritten nav, support for amplience links ([32395eb](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/32395eb89ac523386c741d8bcfa318439faaf49f))
* updated schemas for navigation group ([e6e4830](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/e6e483078fb90d7790d9d62f733064c921572d43))
* updated style ([e004716](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/e004716c8d8bfc50811c5a2e3e9c745683d8d53e))
* Updated visualisations to support Real Time Viz and multiple previews ([df16548](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/df16548925011cdd34cc512ea4734f6c13d09a84))
* use `main-nav` content item, fix listmenu deepest links ([4e4a71f](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/4e4a71f3fd26d59cd4a27cb1aa3260ad3c44f0ab))
* visible/order in rtv, fetch child content ([c73559b](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/c73559b607c9047b1b9630281d08e307669b29ac))
* wip navigation from amplience hierarchy ([bfff803](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/bfff803484355566458a5ba44472ae4cdd361e3b))
* wip navigation from amplience hierarchy ([f04cbf4](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/f04cbf4e76af773d3a6535fc46ec109c70efd03e))
* wip vis for nav, not really working great ([df4b678](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/df4b6785eae72db78e65fa9318377600c0377180))


### Bug Fixes

* add delivery key enrich method and use for hierarchy ([12d7e44](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/12d7e44b2ba63ce691c507a4ebf0959c7291f86a))
* add missing sortby ([0453e8d](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/0453e8d75926b31f335c1c73cf0b4b0e3db1a7f3))
* add missing sortby ([3a15fc7](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/3a15fc713259815410321fd286a0fa6f6b06898d))
* added category to nodes ([6778dce](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/6778dce62bb7c95fff6e75b40d254655f83ca6b6))
* added pointer for non link item ([ec362f7](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/ec362f72b4a6ac43c9125ac4b699f37df3bfe891))
* allow passing depth and format to fetchContent ([8acefdb](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/8acefdb75ae20cd8f8e9edbb11ca779fabe57f79))
* **button:** not show button if there is no label or no url ([5da776d](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/5da776dc4ffa9a95a2a472982e1ff9daa3d7f2a5))
* change ./node_modules/.bin/dc-cli to npx dc-cli ([ae47df4](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/ae47df41fcdfe82b4c29df76bd59c4d14f20c8fe))
* change footer headers into actual groups ([535552f](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/535552f0285e9ebcb8aa80a3fd064321d6508663))
* check double slashes at the beginning only ([d20984a](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/d20984aef99eac2fa3cad1e5ee7691ed984aa64e))
* clean was hanging, waiting on a setTimeout from amplience-rest-client ([15217d2](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/15217d2a9b8b303818a3790e6e1009d0b2194b8d))
* default config ([09345ba](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/09345bad38a93183e20e22f0a98c8ae99a359782))
* duplicate code ([748e2d7](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/748e2d759c1859846591e8bd4bdab9da0cc4497c))
* **enrichReferenceDeliveryKeys:** fix when content reference is used multiple times ([2ed7e61](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/2ed7e61064efe09856b355957fa271794990a192))
* fetch locale for nav ([9fc4dd2](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/9fc4dd238c0e31ebb16ff995ff0a103e3aa06899))
* fix broken rtv on items with no delivery key ([c713afd](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/c713afdbdac650bde8cfccc4fe94f2b83ff3629b))
* fix button validation + linting ([9d5e6e2](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/9d5e6e2b53e789bc7f5d84ce8a5e51e22d4cbfc6))
* fix default locale for fetch ([b6a25b9](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/b6a25b93247f12e12322d31541bcbdc8b2a524d7))
* fix duplication when updating category nav item ([eb15a93](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/eb15a93572d6387c9d01f61fded520dafe2d5dd1))
* fix enrichLocale when input is null ([82c59f8](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/82c59f8dc472761e84a1a60b3d0ebfeae0af2162))
* fix visualization without vse ([280a027](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/280a027e38146887e05b484602ed2c2af601096d))
* fix: updated viz and routes for viz and page ([7e63f3e](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/7e63f3eb779cf526d88c08265bff40a3c302c2dc))
* footer component should handle having no children ([7798223](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/7798223aac14bbdc84ede210faef0ab1f33ad191))
* get back headers ([8eefd00](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/8eefd0042a44fb0f962433737f2d3776b0e0e42d))
* group nav items no longer generate links ([02f14de](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/02f14dee50ac287bb6b6cccea72bbdf2382421ad))
* locale enrich again ([c5cf994](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/c5cf99468c017734c7c330fa58cfbe110e67d985))
* **locale:** show locale in debug box ([aff1118](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/aff111895cbba39719b8c6f8c8252cda8af36152))
* move category link id to delivery key ([a70cc49](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/a70cc493b0dd2e84fed9d19fa3ae4d3117e95bea))
* **navigation:** filter visibility of items after override categories ([753e572](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/753e5721102a62bf45532ceb0b37f755bd6b1277))
* **navigation:** fix category title override ([778e554](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/778e554e5286a7e87a77ae57c7b2c550f2ac2102))
* **navigation:** fix localizations titles when overwrites from SFCC exist ([a619204](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/a619204d9485b0e696dc92025b454b59f78b539d))
* **navigation:** fix navigation when no icon ([1bb2901](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1bb290105d20e72c558bedf6b0d6822e2fb65315))
* **navigation:** show not clickable headings when no url in navigation ([838ebbe](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/838ebbe976decd4997e1438f10a3330ea3479b3e))
* **navigation:** update getting localized value for navigation content ([b7ef511](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/b7ef5113b0ad7b17085e74a9603845f5981fb540))
* **navigation:** use default sfcc category title when no Amplience in override ([81e7e29](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/81e7e29cd184013a83bff50029e9448b8227426e))
* no query object when clicking menus ([64b47af](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/64b47af9409964712ee082551b4a63c5302d4f5a))
* node.children can be undefined ([e82808e](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/e82808e6d0e19f08b0ffc98533845eb22d10e238))
* novadev-581 ([279a1a9](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/279a1a98648b4557355579a11247c960fb2c35a2))
* novadev-581 ([3be3e1e](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/3be3e1e0d1d09ddb0418d1c25ece1d0248d7e95d))
* partial schema id, updated import ([09f1335](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/09f1335b714e3aa51e340431fa8fba15c491aa33))
* previous config ([639de35](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/639de35382a51e6391d7ae16b313b6a78bf1ad2d))
* previous config ([e74d46b](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/e74d46b5da61207e39e5c38d78938360d306c1d7))
* properly enrich child elements in rtv ([a14fd59](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/a14fd592b9be1357548c7303b88613a52591583c))
* publish slots if needed ([c32c791](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/c32c79146629df9146248f1c6076f392a6932dc8))
* redirect urls with %2f ([ad75d3b](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/ad75d3bb54557471bd97a6de56960fb23c7466e6))
* remove setTimeout from amplience-rest-client ([ca4fd86](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/ca4fd8649425218668c14705865cd8b91f45984b))
* remove time machine for hierarchy fetch ([1f3fbd7](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1f3fbd7c7095eec3915b1662874a55935952cc60))
* removed active filter ([1dd7395](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1dd7395a46aa72805e243a4431be35e328c17c62))
* removed content page ([3ae7aae](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/3ae7aae8147e450ab341544230317136d7a257b7))
* removed import ([7f90456](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/7f9045689c92139664a3bc6f976464f208b57254))
* removed required key to be able to archive ([10fdf19](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/10fdf192b5592043e20c9a352eaea3e5c27b11c2))
* rte for locale ([46dc4b2](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/46dc4b25a874ce2a06ac6c95f742c0f265c3181b))
* style warnings ([e803721](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/e803721fdd7576b9966e61c5979556d08189336d))
* support '/' in delivery key urls for viz ([21e190a](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/21e190a2a2825797a9fd592c1649eecc3ee58d6c))
* two commas ([c6d8705](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/c6d87056c0b173d7d86616a250e6e551c58b0f16))
* typo ([cfe86a4](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/cfe86a4fddb1447f04a0dd6a219fe77e9c8028ff))
* Typo Schema ([27adb0e](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/27adb0e337ff509569151627a23b829e661ad5c4))
* unpack external url for navigation ([3fa54a7](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/3fa54a7f64900f26bee79d8dd3f15647ccccd658))
* updated automation for nav and reorg ([1771ce6](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1771ce69a473332f4ecc50bc761a3433c000dfec))
* updated viz ([a6305c8](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/a6305c8a856bcac4082e72edd39edd337f05e93c))
* updated viz and routes for viz and page ([12f5167](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/12f516727b8ac4114d22167bfd5bed85a8b62de2))
* updated viz url for proper translation in DC ([d65ce8f](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/d65ce8f48eb84fa3707b3198c5710e84e22eacc7))
* use category/ prefix for category delivery keys ([a3f5c95](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/a3f5c95566ef29617bee7158f747a5f5da2bad7d))
* use footer-nav instead of test-footer-nav ([152fab0](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/152fab052ea4891dbd0f96f14446e2127f168b05))
* using photo card ([98eb7db](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/98eb7dbd9969b444a62f9223988f9a8fc3b79ef8))

## [1.1.0](https://github.com/amplience/amplience-sfcc-composable-commerce/compare/v1.0.0...v1.1.0) (2022-08-16)


### Features

* Added all-definitions partial to draw content in a re-usable way ([d3ef956](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/d3ef956b5bff965d1dc7d34337b123a16d01363d))
* **clean:** create a clean hub script to delete/archive content types, schemas, content items, events/editions, extensions, webhooks, update settings ([26a3ab4](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/26a3ab4f8aa93ea4b33ada587f40c15f2c7c37de))
* Updated icons related to content types ([ea141d3](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/ea141d394980afdcc376aa92f3dba79cd0c747e2))


### Bug Fixes

* check if content is defined ([896437a](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/896437a0c6e9b47e9bb14e5b39cf6d294e4ea805))
* handle empty fields and reload rtv on save ([1d71488](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/1d71488502c6d73f33956b4341d4181d00a19394))
* title and content can be empty ([869c2e0](https://github.com/amplience/amplience-sfcc-composable-commerce/commit/869c2e0d5ed8cc1750cdf4f89c320958b9694023))

### Bug Fixes

- Various instances of hard-coded text have been replaced with translatable messages (see [Translations](#translations)).
- Recommended Products tiles now show localized product names, rather than using the default locale.

### Translations

- Updated text for many fields
- Added `checkout.message.generic_error`
- Added `wishlist_primary_action.button.add_to_cart`
- Added `wishlist_primary_action.button.select_options`
- Added `global.link.added_to_wishlist.view_wishlist`
- Added `credit_card_fields.tool_tip.security_code.american_express`
- Changed `credit_card_fields.tool_tip.security_code` from a template that accepts values to a static string
- Changed `home.description.contact_our_staff` to `home.description.here_to_help`
- Changed `home.description.get_you_to_the_right_place` to `home.description.here_to_help_line_2`
- Combined `product_list.info.removed_from_wishlist` and `recommended_products.info.removed_from_wishlist` into `global.info.removed_from_wishlist`
- Combined `cart.info.added_to_wishlist`, `product_detail.info.added_to_wishlist`, `product_list.info.added_to_wishlist`, and `recommended_products.info.added_to_wishlist` into `global.info.added_to_wishlist`

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