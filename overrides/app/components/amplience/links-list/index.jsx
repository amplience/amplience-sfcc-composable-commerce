import React from 'react'
import PropTypes from 'prop-types'
import {Box, List, ListItem, Heading, HStack, useMultiStyleConfig} from '@chakra-ui/react'
import Link from '../link'

const LinksList = ({
    links = [],
    heading = '',
    variant,
    color,
    onLinkClick,
    headingLinkRef,
    ...otherProps
}) => {
    const styles = useMultiStyleConfig('LinksList', {variant})
    return (
        <Box {...styles.container} {...(color ? {color: color} : {})} {...otherProps}>
            {heading &&
                (heading.href && heading.href !== '$' ? (
                    <Link
                        to={heading.href}
                        onClick={onLinkClick}
                        ref={headingLinkRef}
                        {...styles.headingLink}
                    >
                        <Heading {...styles.heading} {...(heading.styles ? heading.styles : {})}>
                            {heading.text}
                        </Heading>
                    </Link>
                ) : (
                    <Heading {...styles.heading}>{heading.text ?? heading}</Heading>
                ))}

            {links && (
                <List spacing={5} {...styles.list}>
                    {variant === 'horizontal' ? (
                        <HStack>
                            {links.map((link, i) => (
                                <ListItem key={i} {...styles.listItem} sx={styles.listItemSx}>
                                    {link.href && link.href !== '$' ? (
                                        <Link
                                            to={link.href}
                                            onClick={onLinkClick}
                                            {...(link.styles ? link.styles : {})}
                                        >
                                            {link.text}
                                        </Link>
                                    ) : (
                                        <Heading {...styles.footerHeading}>{link?.text}</Heading>
                                    )}
                                </ListItem>
                            ))}
                        </HStack>
                    ) : (
                        links.map((link, i) => (
                            <ListItem key={i}>
                                {link.href && link.href !== '$' ? (
                                    <Link
                                        to={link.href}
                                        onClick={onLinkClick}
                                        {...(link.styles ? link.styles : {})}
                                    >
                                        {link.text}
                                    </Link>
                                ) : (
                                    <Heading {...styles.footerHeading}>{link?.text}</Heading>
                                )}
                            </ListItem>
                        ))
                    )}
                </List>
            )}
        </Box>
    )
}

LinksList.propTypes = {
    links: PropTypes.arrayOf(
        PropTypes.shape({
            href: PropTypes.string,
            text: PropTypes.string
        })
    ).isRequired,
    heading: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    variant: PropTypes.oneOf(['vertical', 'horizontal']),
    color: PropTypes.string,
    onLinkClick: PropTypes.func,
    headingLinkRef: PropTypes.object
}

export default LinksList
