import React from 'react'
import PropTypes from 'prop-types'
import {Link as ChakraLink} from '@chakra-ui/react'
import {Link as SPALink, NavLink as NavSPALink, useLocation} from 'react-router-dom'
import {getSites, getUrlConfig, getDefaultSite} from '@salesforce/retail-react-app/app/utils/site-utils'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'
//import useLocale from '@salesforce/retail-react-app/app/hooks/use-locale'
import {keepVse, buildPathWithUrlConfig} from 'amplience-api-react'

const AmplienceLink = React.forwardRef(({href, to, useNavLink = false, ...props}, ref) => {
    const _href = to || href
    const {site, locale, buildUrl} = useMultiSite()
    //const locale = useLocale()
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

        const urlConfig = getUrlConfig()
        const sites = getSites()
        const defaultSite = getDefaultSite()

        // if alias is not defined, use site id
        const updatedHref = isExternal
            ? _href.substring(1)
            : buildPathWithUrlConfig(_href, {
                  locale: locale.alias || locale.id,
                  site: site.alias || site.id
              }, urlConfig, sites, defaultSite)

        props.to = _href === '/' ? '/' : updatedHref
        props.as = useNavLink ? NavSPALink : SPALink
    }

    props.to = keepVse(location.search, props.to)

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
