import {categoryUrlBuilder} from '../url'
import {EnrichConfig, EnrichConfigMap, processHierarchy} from './enrich'
import {applyRtvToHierarchy} from './rtv'

const categorySchemaId = 'https://sfcc.com/site/navigation/category'

const categoryDKToId = (deliveryKey) => {
    const categoryPrefix = 'category/'

    if (deliveryKey == null || !deliveryKey.startsWith(categoryPrefix)) {
        throw new Error(`Invalid category delivery key: ${deliveryKey}`)
    }

    return deliveryKey.substring(categoryPrefix.length)
}

const contentPageLinkBuilder = (link) => {
    // Delivery key appears in the reference due to our enrich method.
    if (!link.contentpage?.deliveryKey) {
        return '#'
    }

    return '/page/' + link.contentpage.deliveryKey
}

const externalLinkBuilder = (link, forRelative) => {
    return forRelative ? '$' + link.externalUrl : link.externalUrl
}

const internalLinkBuilder = (link) => {
    return link.internalUrl
}

const categoryLinkBuilder = (link) => {
    return categoryUrlBuilder({id: categoryDKToId(link._meta.deliveryKey)})
}

const noLinkBuilder = (link) => {
    return '#'
}

const handlers = {
    'https://sfcc.com/site/navigation/external': externalLinkBuilder,
    'https://sfcc.com/site/navigation/internal': internalLinkBuilder,
    'https://sfcc.com/site/navigation/content-page': contentPageLinkBuilder,
    'https://sfcc.com/site/navigation/category': categoryLinkBuilder,
    'https://sfcc.com/site/navigation/group': noLinkBuilder
}

export const getLinkUrl = (link, forRelative = true) => {
    // Links can be one of a few content items.

    const builder = handlers[link._meta.schema]

    return builder == null ? '' : builder(link, forRelative)
}

const navCommonVisible = (item) => item.common.visible
const navCommonOrder = (item) => item.common.priority

const enrichTitle = (targetLocale) => (node) => {
    if (typeof node.common.title === 'object')
    {
        const ampTitleObj = node.common.title.values.find(({locale}) => locale === targetLocale)
        node.common.title = ampTitleObj ? ampTitleObj.value : ''
    }

    if (node.common && node.common.content) {
        const ampTitleObj = node.common.content.title.values.find(
            ({locale}) => locale === targetLocale
        )
        const ampTitle = ampTitleObj ? ampTitleObj.value : ''

        if (ampTitle) {
            node.common.content.title = ampTitle
        } else {
            const ampTitleObj = node.common.content.title.values.find(
                ({locale}) => locale === 'en-US'
            )
            node.common.content.title = ampTitleObj ? ampTitleObj.value : ''
        }

        node.common.content.actions = node.common.content.actions.map((el) => {
            const ampTitleObj = el.label.values.find(({locale}) => locale === targetLocale)
            const ampTitle = ampTitleObj ? ampTitleObj.value : ''

            if (ampTitle) {
                el.label = ampTitle
            } else {
                const ampTitleObj = el.label.values.find(({locale}) => locale === 'en-US')
                el.label = ampTitleObj ? ampTitleObj.value : ''
            }

            return el
        })
    }
}

const navCommonEnrich: EnrichConfig = {
    visibleFunc: navCommonVisible,
    orderFunc: navCommonOrder
}

const navEnrichConfig: EnrichConfigMap = {
    'https://sfcc.com/site/navigation/external': navCommonEnrich,
    'https://sfcc.com/site/navigation/internal': navCommonEnrich,
    'https://sfcc.com/site/navigation/content-page': navCommonEnrich,
    'https://sfcc.com/site/navigation/category': navCommonEnrich,
    'https://sfcc.com/site/navigation/group': navCommonEnrich
}

const sfccToNav = (node) => {
    const children = node.categories
        ? node.categories.map((category) => sfccToNav(category))
        : undefined

    return {
        _meta: {
            schema: categorySchemaId,
            deliveryKey: `category/${node.id}`
        },
        common: {
            title: node.name,
            visible: true
        },
        includeSFCC: false,
        children
    }
}

export const enrichCategory = (categories, targetLocale) => {
    return (node) => {
        if (node.includeSFCC) {
            // Search for the category in the SFCC root.
            const categoryId = categoryDKToId(node._meta.deliveryKey)
            const category = categories[categoryId]
            const sfccTitle = category.name
            const ampTitleObj = node.common.title.values.find(({locale}) => locale === targetLocale)
            const ampTitle = ampTitleObj ? ampTitleObj.value : ''

            if (ampTitle) {
                node.common.title = ampTitle
            } else if (sfccTitle) {
                node.common.title = sfccTitle
            } else {
                const ampTitleObj = node.common.title.values.find(({locale}) => locale === 'en-US') //todo change to default
                node.common.title = ampTitleObj ? ampTitleObj.value : ''
            }

            // If the category was found, generate category links for its children.
            if (category) {
                const newChildren = sfccToNav(category)
                if (newChildren.children) {
                    node.children = [...(node.children ?? []), ...newChildren.children]
                }
            }
        } else if (node.common) {
            enrichTitle(targetLocale)(node)
        }
    }
}

const getNavEnrichConfig = (categories, locale) => {
    const enrichConfig = {...navEnrichConfig}

    for (let key of Object.keys(enrichConfig)) {
        enrichConfig[key] = {
            enrichFunc:
                key === categorySchemaId ? enrichCategory(categories, locale) : enrichTitle(locale),
            ...enrichConfig[key]
        }
    }

    return enrichConfig
}

export const enrichNavigation = (nav, categories, locale) => {
    const enrichConfig = getNavEnrichConfig(categories, locale)

    processHierarchy(nav, enrichConfig)

    return nav
}

export const applyRtvToNav = (root, rtv, setter, categories, locale) => {
    const enrichConfig = getNavEnrichConfig(categories, locale)

    applyRtvToHierarchy(root, rtv, setter, enrichConfig)
}
