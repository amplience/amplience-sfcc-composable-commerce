import React from 'react'
import AmplienceWrapper from '../wrapper'
import PersonalisedComponent from '../personalised-component'
import GridItemHero from '../hero/gridItemHero'
import {SimpleGrid, GridItem, useBreakpointValue} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const PersonalisedComponentGridItem = ({...props}) => {
    return <PersonalisedComponent limit="1" components={inGridComponents} {...props} />
}

const inGridComponents = {
    'https://sfcc.com/components/hero': GridItemHero,
    'https://sfcc.com/components/personalised-ingrid-component': PersonalisedComponentGridItem
}

const GridLock = ({cards, columns, gap}) => {
    const isMobile = useBreakpointValue({base: true, lg: false, xl: false, xxl: false, xxxl: false})

    return (
        <SimpleGrid
            columns={[columns.sm, columns.md, columns.lg, columns.xl]}
            spacingX={gap}
            spacingY={{base: gap, lg: gap}}
        >
            {cards.map((item, index) => {
                return (
                    <GridItem
                        key={index}
                        colEnd={{
                            base: `span 1`,
                            md: `span ${item.cols}`
                        }}
                        rowEnd={{
                            base: `span 1`,
                            md: `span ${item.rows}`
                        }}
                        display="flex"
                    >
                        <AmplienceWrapper
                            fetch={{id: item.content?.id}}
                            components={inGridComponents}
                            cols={isMobile ? 1 : item.cols}
                            rows={isMobile ? 1 : item.rows}
                            gap={16}
                            skeleton={{display: 'flex', flex: 1}}
                        ></AmplienceWrapper>
                    </GridItem>
                )
            })}
        </SimpleGrid>
    )
}

GridLock.displayName = 'GridLock'
GridLock.propTypes = {
    cards: PropTypes.array,
    columns: PropTypes.number,
    gap: PropTypes.number
}

export default GridLock
