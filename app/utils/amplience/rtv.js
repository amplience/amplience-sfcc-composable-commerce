const processHierarchy = (node, action) => {
    if (node.children) {
        for (let child of node.children) {
            processHierarchy(child, action)
        }
    }

    action(node)
}

export const applyRtvToHierarchy = (root, rtv, setter) => {
    let changed = false

    processHierarchy(root, (node) => {
        if (
            (node._meta.deliveryKey != null &&
                node._meta.deliveryKey === rtv.content._meta.deliveryKey) ||
            node._meta.deliveryId === rtv.content._meta.deliveryId
        ) {
            // Replace this node with the given item.
            Object.assign(node, rtv.content)
            changed = true
        }
    })

    if (changed) {
        setter({...root})
    }
}
