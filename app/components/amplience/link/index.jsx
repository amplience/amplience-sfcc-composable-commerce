
import React from 'react'
import PropTypes from 'prop-types'
import {Link as ChakraLink} from '@chakra-ui/react'
import {Link as SPALink, NavLink as NavSPALink, useLocation} from 'react-router-dom'
import {buildPathWithUrlConfig} from '../../../utils/url'
import useSite from '../../../hooks/use-site'
import useLocale from '../../../hooks/use-locale'
const QUERY_PARAMS = ['pagevse', 'vse'];

const enrichWithQuery = (to, queryParams, location) => {
    const url = new URL('', `http://localhost/${location.search}`)
    const newUrl = new URL(to, 'http://localhost')

    queryParams.map((key) => {
        const value = url.searchParams.get(key);
        value && newUrl.searchParams.set(key, value)
    })

    return `${newUrl.pathname}${newUrl.search}`;
}

const AmplienceLink = React.forwardRef(({href, to, queryParams = QUERY_PARAMS, useNavLink = false, ...props}, ref) => {
    const _href = to || href
    const site = useSite()
    const locale = useLocale()
    const location = useLocation()

    const isExternal = _href.length > 0 && _href[0] === '$'

    if (isExternal) {
        if (props.to) {
            delete props.to
        }
        if (props.as) {
            delete props.as
        }
        props.href = _href.substring(1)
        props.isExternal = true
    } else {
        if (props.href) {
            delete props.href
        }

        // if alias is not defined, use site id
        const updatedHref = isExternal
            ? _href.substring(1)
            : buildPathWithUrlConfig(_href, {
                locale: locale.alias || locale.id,
                site: site.alias || site.id
            })

        props.to = _href === '/' ? '/' : updatedHref
        props.as = useNavLink ? NavSPALink : SPALink
    }

    props.to = enrichWithQuery(props.to, queryParams, location)

    return <ChakraLink {...(useNavLink && {exact: true})} {...props} ref={ref} />
})

AmplienceLink.displayName = 'AmplienceLink'

AmplienceLink.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    useNavLink: PropTypes.bool,
    as: PropTypes.object
}

export default React.memo(AmplienceLink)