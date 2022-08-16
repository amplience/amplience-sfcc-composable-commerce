import React from 'react'
import PropTypes from 'prop-types'
import ListMenu from '../../list-menu'

const convertToSfcc = (node) => {
    return {
        name: node.common ? node.common.title : '',
        id: node.externalUrl,
        categories: node.children.map((child) => convertToSfcc(child))
    }
}

const AmplienceListMenu = ({root, maxColumns}) => {
    // Currently rewrite into what SFCC component expects.
    // Since we want to do more with the links, should implement a custom menu eventually.

    const newRoot = convertToSfcc(root)

    return <ListMenu root={newRoot} maxColumns={maxColumns} />
}

AmplienceListMenu.displayName = 'Amplience List Menu'

AmplienceListMenu.propTypes = {
    /**
     * Amplience content hierarchy of navigation items.
     */
    root: PropTypes.object,
    /**
     * The maximum number of columns that we want to use per row in the menu.
     */
    maxColumns: PropTypes.number
}

export default AmplienceListMenu
