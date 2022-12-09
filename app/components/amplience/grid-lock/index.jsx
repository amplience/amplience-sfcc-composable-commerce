import React from 'react'
import AmplienceWrapper from '../wrapper'
import PersonalisedComponent from '../personalised-component'
import GridItemHero from '../hero/gridItemHero'
import {SimpleGrid, GridItem, useBreakpointValue, Text, Center} from '@chakra-ui/react'
import PropTypes from 'prop-types'

const PersonalisedComponentGridItem = ({...props}) => {
    return <PersonalisedComponent limit="1" components={inGridComponents} {...props} />
}

const inGridComponents = {
    'https://sfcc.com/components/hero': GridItemHero,
    'https://sfcc.com/components/personalised-ingrid-component': PersonalisedComponentGridItem
}

const GridLock = ({title, subtitle, cards, breakpointColumns, gap}) => {
    let bp = useBreakpointValue(breakpointColumns)
    let columnIndex = breakpointColumns.indexOf(bp)
    cards.sort((a, b) => a.position[columnIndex] - b.position[columnIndex])

    return (
        <>
            {title && (
                <Center>
                    <Text fontSize={'3xl'} fontWeight="bold">
                        {title}
                    </Text>
                </Center>
            )}
            {subtitle && (
                <Center mb={4}>
                    <Text fontSize={'xl'}>{subtitle}</Text>
                </Center>
            )}
            <SimpleGrid columns={breakpointColumns} spacing={gap + 'px'} mb={4}>
                {cards.map((item, index) => {
                    return (
                        <GridItem
                            key={index}
                            colEnd={`span ${item.cols[columnIndex]}`}
                            rowEnd={`span ${item.rows[columnIndex]}`}
                            display="flex"
                        >
                            <AmplienceWrapper
                                fetch={{id: item.content?.id}}
                                components={inGridComponents}
                                cols={item.cols[columnIndex]}
                                rows={item.rows[columnIndex]}
                                gap={gap}
                                skeleton={{display: 'flex', flex: 1}}
                            ></AmplienceWrapper>
                        </GridItem>
                    )
                })}
            </SimpleGrid>
        </>
    )
}

GridLock.displayName = 'GridLock'
GridLock.propTypes = {
    title: PropTypes.string,
    subtitle: PropTypes.string,
    cards: PropTypes.array,
    breakpointColumns: PropTypes.array,
    gap: PropTypes.number
}

export default GridLock
