import React from 'react'
import Hero from './index'

const GridItemHero = (props) => {
    return <Hero {...props} variant={'inGrid'}/>
}

GridItemHero.displayName = 'GridItemHero'

export default GridItemHero
