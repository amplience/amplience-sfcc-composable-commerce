import {categoryUrlBuilder} from '../url'

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

const processNav = (node, action) => {
    if (node.children) {
        for (let child of node.children) {
            processNav(child, action)
        }
    }

    action(node)
}

const getCategorySFCC = (node, id) => {
    if (node.id === id) {
        return node
    }

    const children = node.categories
    if (children) {
        for (let child of children) {
            const result = getCategorySFCC(child, id)

            if (result) {
                return result
            }
        }
    }

    return undefined
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

export const enrichNavigation = (nav, sfccRoot, targetLocale) => {
    processNav(nav, (node) => {
        if (node._meta.schema === categorySchemaId) {
            if (node.includeSFCC) {
                // Search for the category in the SFCC root.
                const categoryId = categoryDKToId(node._meta.deliveryKey)
                const category = getCategorySFCC(sfccRoot, categoryId)
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
            }
        } else if (node.common) {
            const ampTitleObj = node.common.title.values.find(({locale}) => locale === targetLocale)
            const ampTitle = ampTitleObj ? ampTitleObj.value : ''

            if (ampTitle) {
                node.common.title = ampTitle
            } else {
                const ampTitleObj = node.common.title.values.find(({locale}) => locale === 'en-US') //todo change to default
                node.common.title = ampTitleObj ? ampTitleObj.value : ''
            }
        }

        if (node.common && node.common.content) {
            const ampTitleObj = node.common.content.title.values.find(({locale}) => locale === targetLocale)
            const ampTitle = ampTitleObj ? ampTitleObj.value : ''

            if (ampTitle) {
                node.common.content.title = ampTitle
            } else {
                const ampTitleObj = node.common.content.title.values.find(({locale}) => locale === 'en-US')
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

        console.log(node)

    })

    return nav
}
