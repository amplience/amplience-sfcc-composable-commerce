/*
 * Copyright (c) 2021, salesforce.com, inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */
import React from 'react'
import PropTypes from 'prop-types'
import {Link as ChakraLink} from '@chakra-ui/react'
import {Link as SPALink, NavLink as NavSPALink} from 'react-router-dom'
import {buildPathWithUrlConfig} from '../../utils/url'
import useSite from '../../hooks/use-site'
import useLocale from '../../hooks/use-locale'

const Link = React.forwardRef(({href, to, useNavLink = false, ...props}, ref) => {
    const _href = to || href
    const site = useSite()
    const locale = useLocale()

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

    return <ChakraLink {...(useNavLink && {exact: true})} {...props} ref={ref} />
})

Link.displayName = 'Link'

Link.propTypes = {
    href: PropTypes.string,
    to: PropTypes.string,
    useNavLink: PropTypes.bool,
    as: PropTypes.object
}

export default React.memo(Link)
