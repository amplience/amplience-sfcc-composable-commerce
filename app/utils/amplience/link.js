const contentPageLinkBuilder = (link) => {
    if (!link.contentpage?._meta?.deliveryKey) {
        return '#'
    }

    return '/page/' + link.contentpage._meta.deliveryKey
}

const externalLinkBuilder = (link, forRelative) => {
    return forRelative ? '$' + link.externalUrl : link.externalUrl
}

const handlers = {
    'https://sfcc.com/site/navigation/external': externalLinkBuilder,
    'https://sfcc.com/site/navigation/content-page': contentPageLinkBuilder
}

export const getLinkUrl = (link, forRelative = true) => {
    // Links can be one of a few content items.

    const builder = handlers[link._meta.schema]

    return builder == null ? '' : builder(link, forRelative)
}
