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

export const enrichCategory = (categories) => {
    return (node) => {
        if (node.includeSFCC) {
            // Search for the category in the SFCC root.
            const categoryId = categoryDKToId(node._meta.deliveryKey)
            const category = categories[categoryId] //getCategorySFCC(sfccRoot, categoryId)

            // If the category was found, generate category links for its children.
            if (category) {
                const newChildren = sfccToNav(category)
                if (newChildren.children) {
                    node.children = [...(node.children ?? []), ...newChildren.children]
                }
            }
        }
    }
}

export const enrichNavigation = (nav, categories) => {
    const enrichConfig = {...navEnrichConfig}

    enrichConfig[categorySchemaId] = {
        enrichFunc: enrichCategory(categories),
        ...enrichConfig[categorySchemaId]
    }

    processHierarchy(nav, enrichConfig)

    return nav
}

export const applyRtvToNav = (root, rtv, setter, categories) => {
    const enrichConfig = {...navEnrichConfig}

    enrichConfig[categorySchemaId] = {
        enrichFunc: enrichCategory(categories),
        ...enrichConfig[categorySchemaId]
    }

    applyRtvToHierarchy(root, rtv, setter, enrichConfig)
}
