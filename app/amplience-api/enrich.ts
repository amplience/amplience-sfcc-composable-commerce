const referenceTypes = [
    'http://bigcontent.io/cms/schema/v1/core#/definitions/content-link',
    'http://bigcontent.io/cms/schema/v1/core#/definitions/content-reference'
]

export interface EnrichTarget {
    index: string | number;

    item: any;
    parent: any;
}

export interface EnrichStrategy {
    trigger: (content: any) => boolean;
    enrich: (content: EnrichTarget[]) => Promise<void>;
}

export const isPersonalized = (item: any): boolean => {
    return (
        Object.keys(item).length === 3 &&
        Array.isArray(item.defaultContent) &&
        typeof item.defaultContent === 'number' &&
        Array.isArray(item.variants)
    )
}

export const isContentReference = (item: any): boolean => {
    return (
        item._meta &&
        referenceTypes.indexOf(item._meta.schema) !== -1 &&
        typeof item.contentType === 'string' &&
        typeof item.id === 'string'
    )
}

export const getEnrichTargets = (
    item: any,
    enrichStrategies: EnrichStrategy[],
    enrichTargets: EnrichTarget[][],
    parent?: any,
    index?: string | number
) => {
    if (Array.isArray(item)) {
        item.forEach((contained, i) => {
            getEnrichTargets(contained, enrichStrategies, enrichTargets, item, i)
        })
    } else if (item != null && typeof item === 'object') {
        const allPropertyNames = Object.getOwnPropertyNames(item)
        // Does this object match the pattern expected for enrich?

        for (let i = 0; i < enrichStrategies.length; i++) {
            if (enrichStrategies[i].trigger(item) && index != null) {
                enrichTargets[i].push({
                    parent,
                    index,
                    item
                })
            }
        }

        allPropertyNames.forEach((propName) => {
            const prop = item[propName]
            if (typeof prop === 'object') {
                getEnrichTargets(prop, enrichStrategies, enrichTargets, item, propName)
            }
        })
    }
}

export const enrichContent = async (item: any, enrichStrategies: EnrichStrategy[]) => {
    const targets: EnrichTarget[][] = []
    for (let i = 0; i < enrichStrategies.length; i++) {
        targets.push([])
    }

    await getEnrichTargets(item, enrichStrategies, targets)

    for (let i = 0; i < enrichStrategies.length; i++) {
        const group = targets[i]
        if (group.length > 0) {
            await enrichStrategies[i].enrich(group)
        }
    }
}
