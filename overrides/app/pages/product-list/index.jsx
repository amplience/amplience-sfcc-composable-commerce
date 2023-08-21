/*
 * Copyright (c) 2022, Salesforce, Inc.
 * All rights reserved.
 * SPDX-License-Identifier: BSD-3-Clause
 * For full license text, see the LICENSE file in the repo root or https://opensource.org/licenses/BSD-3-Clause
 */

import React, {useEffect, useState, useMemo} from 'react'
import PropTypes from 'prop-types'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import {FormattedMessage, useIntl} from 'react-intl'
import {Helmet} from 'react-helmet'
import {useQuery} from '@tanstack/react-query'
import {
    useCategory,
    useCustomerId,
    useProductSearch,
    useShopperCustomersMutation
} from '@salesforce/commerce-sdk-react'
import {useServerContext} from '@salesforce/pwa-kit-react-sdk/ssr/universal/hooks'

// Components
import {
    Box,
    Flex,
    SimpleGrid,
    Grid,
    GridItem,
    Select,
    Text,
    FormControl,
    Stack,
    useDisclosure,
    Button,
    Modal,
    ModalHeader,
    ModalBody,
    ModalFooter,
    ModalContent,
    ModalCloseButton,
    ModalOverlay,
    Drawer,
    DrawerBody,
    DrawerHeader,
    DrawerOverlay,
    DrawerContent,
    DrawerCloseButton,
    Spacer,
    useBreakpointValue
} from '@salesforce/retail-react-app/app/components/shared/ui'

// Project Components
import Pagination from '@salesforce/retail-react-app/app/components/pagination'
/* import ProductTile, {
    Skeleton as ProductTileSkeleton
} from '@salesforce/retail-react-app/app/components/product-tile' */
import {HideOnDesktop} from '@salesforce/retail-react-app/app/components/responsive'
import Refinements from '@salesforce/retail-react-app/app/pages/product-list/partials/refinements'
import SelectedRefinements from '@salesforce/retail-react-app/app/pages/product-list/partials/selected-refinements'
import EmptySearchResults from '@salesforce/retail-react-app/app/pages/product-list/partials/empty-results'
import PageHeader from '@salesforce/retail-react-app/app/pages/product-list/partials/page-header'
import AbovePageHeader from '@salesforce/retail-react-app/app/pages/product-list/partials/above-page-header'

// Amplience Components
import AmplienceWrapper from '../../components/amplience/wrapper'
import AmplienceProductTile from '../../components/amplience/product-tile'
import { Skeleton as ProductTileSkeleton } from '../../components/amplience/product-tile'
import GridItemHero from '../../components/amplience/hero/gridItemHero'
import PersonalisedComponent from '../../components/amplience/personalised-component'
import _ from 'lodash'

import {personalisationChanged, useAmpRtv} from 'amplience-api-react'
import {useAmplienceApi} from 'amplience-api-react/dist/hooks/useAmplienceApi'

// Icons
import {FilterIcon, ChevronDownIcon} from '@salesforce/retail-react-app/app/components/icons'

// Hooks
import {
    useLimitUrls,
    usePageUrls,
    useSortUrls,
    useSearchParams
} from '@salesforce/retail-react-app/app/hooks'
import {useToast} from '@salesforce/retail-react-app/app/hooks/use-toast'
// import {parse as parseSearchParams} from '../../hooks/use-search-params'
import useEinstein from '@salesforce/retail-react-app/app/hooks/use-einstein'
import useMultiSite from '@salesforce/retail-react-app/app/hooks/use-multi-site'

// Others
import {HTTPNotFound, HTTPError} from '@salesforce/pwa-kit-react-sdk/ssr/universal/errors'

// Constants
import {
    DEFAULT_LIMIT_VALUES,
    API_ERROR_MESSAGE,
    MAX_CACHE_AGE,
    TOAST_ACTION_VIEW_WISHLIST,
    TOAST_MESSAGE_ADDED_TO_WISHLIST,
    TOAST_MESSAGE_REMOVED_FROM_WISHLIST,
    DEFAULT_SEARCH_PARAMS
} from '@salesforce/retail-react-app/app/constants'
import useNavigation from '@salesforce/retail-react-app/app/hooks/use-navigation'
import LoadingSpinner from '@salesforce/retail-react-app/app/components/loading-spinner'
import {useWishList} from '@salesforce/retail-react-app/app/hooks/use-wish-list'
import {isHydrated} from '@salesforce/retail-react-app/app/utils/utils'
import {buildUrlSet} from '@salesforce/retail-react-app/app/utils/url'

const PersonalisedComponentGridItem = ({...props}) => {
    return <PersonalisedComponent limit="1" components={inGridComponents} {...props} />
}

const inGridComponents = {
    'https://sfcc.com/components/hero': GridItemHero,
    'https://sfcc.com/components/personalised-ingrid-component': PersonalisedComponentGridItem
}

// NOTE: You can ignore certain refinements on a template level by updating the below
// list of ignored refinements.
const REFINEMENT_DISALLOW_LIST = ['c_isNew']

function getIdsForContent(item) {
    return {id: item.id}
}

const processSlots = (ampSlots, setValidationResult) => {
    if (ampSlots == null) {
        return ampSlots
    }

    ampSlots.sort((a, b) => a.position - b.position)

    // Validate slots to remove invalid overlaps.
    // Also flag an error when a page is 100% in-grid content.

    let removed = []
    let pageFilled = []
    let lastPage = 0
    let pageSlots = 0

    for (let i = 0; i < ampSlots.length; i++) {
        const slot = ampSlots[i]

        const pos = slot.position
        const size = (slot.rows || 1) * (slot.cols || 1)
        const end = pos + size

        for (let j = 0; j < i; j++) {
            const slot2 = ampSlots[j]

            const pos2 = slot2.position
            const size2 = (slot2.rows || 1) * (slot2.cols || 1)
            const end2 = pos2 + size2

            if (pos < end2 && end > pos) {
                // These two slots overlap, remove the later one and add an error.
                removed.push(`(${slot.position}:\xa0${slot.cols}x${slot.rows})`)
                ampSlots.splice(i--, 1)
                break
            }
        }

        let page = Math.floor(pos / DEFAULT_SEARCH_PARAMS.limit)

        if (page != lastPage) {
            lastPage = page
            pageSlots = 0
        }

        pageSlots += size
        if (pageSlots >= DEFAULT_SEARCH_PARAMS.limit) {
            pageFilled.push(page)
        }
    }

    if (removed.length > 0 || pageFilled.length > 0) {
        const messages = []

        if (removed.length > 0) {
            messages.push(`In-grid content at invalid positions: ${removed.join(', ')}`)
        }

        if (pageFilled.length > 0) {
            messages.push(
                `In-grid content is hidden on desktop b/c Page (${pageFilled.join(
                    ', '
                )}) is completely filled - move in-grid content or reduce sizes.`
            )
        }

        setValidationResult(messages.join('\n'))
    } else {
        setValidationResult(null)
    }

    return ampSlots
}

const calculatePageOffsets = (pageSize, totalCount, ampSlots, isMobile) => {
    // Amplience slots reduce the page size of sfcc content.
    const pages = []
    let processed = 0
    let offset = 0

    const pageNumber = (index) => {
        return Math.floor(index / pageSize)
    }

    const fillPages = (upTo) => {
        const uptoBasePage = pageNumber(upTo)

        while (pages.length <= uptoBasePage) {
            pages.push(pages.length * pageSize - offset)
        }

        processed = upTo
    }

    const skipContent = (size) => {
        // If this splits a page, create one.
        offset += size

        fillPages(processed)
    }

    if (ampSlots) {
        for (let i = 0; i < ampSlots.length; i++) {
            const slot = ampSlots[i]
            slot.rows = Number(slot.rows) || 1
            slot.cols = Number(slot.cols) || 1

            if (slot.position > totalCount + offset) {
                // Slots outside of the bounds of the shown products are not drawn.
                break
            }

            fillPages(slot.position)

            const size = isMobile ? 1 : slot.cols * slot.rows

            skipContent(size)
        }
    }

    fillPages(totalCount + offset)

    return pages
}

const generateIndices = (pos, rows, cols) => {
    const result = []
    const size = rows * cols
    for (let i = 0; i < size; i++) {
        result.push(pos + i)
    }

    return result
}

const enrichResults = (productSearchResults, pageSize, ampSlots, pages, isMobile) => {
    if (productSearchResults?.hits) {
        const offset = productSearchResults.offset
        const total = productSearchResults.total

        let pageId = pages.findIndex((pageIndex) => pageIndex > offset) - 1
        if (pageId == -2) {
            pageId = pages.length - 1
        }

        const pageBase = pageId * pageSize

        const sfccCount = (pages[pageId + 1] ?? total) - pages[pageId]
        const items = productSearchResults.hits.slice(0, sfccCount)

        let reservedSpaces = 0

        let lastIndex = 0
        let lastPos = pageBase

        const fillIndices = (to, toPos) => {
            for (let i = lastIndex; i < to; i++) {
                items[i].indices = [lastPos++]
            }

            lastIndex = Math.max(0, to + 1)
            lastPos = toPos
        }

        if (ampSlots) {
            for (let slot of ampSlots) {
                const pos = slot.position
                slot.rows = Number(slot.rows) || 1
                slot.cols = Number(slot.cols) || 1

                if (pos < pageBase) {
                    continue
                }

                if (pos >= pageBase + pageSize) {
                    break
                }

                // Place content up to the given slot.
                const size = isMobile ? 1 : Number(slot.rows) * Number(slot.cols)
                const index = pos - pageBase - reservedSpaces

                if (index > items.length) {
                    break
                }

                slot.isAmplience = true
                slot.indices = generateIndices(
                    pos,
                    isMobile ? 1 : slot.rows,
                    isMobile ? 1 : slot.cols
                )

                if (index <= items.length) {
                    items.splice(index, 0, slot)
                }

                fillIndices(index, pos + size)

                reservedSpaces += size - 1
            }
        }

        fillIndices(items.length, pageBase + pageSize)

        return items
    }

    return productSearchResults?.hits
}

/*
 * Generate a memoized list of page size urls influenced by inline amplience content.
 * Changing the page size will reset the offset to zero to simplify things.
 */
export const useAmpPageUrls = ({total = 0, limit, pageOffsets}) => {
    const location = useLocation()
    const [searchParams] = useSearchParams()
    const _limit = limit || searchParams.limit

    return useMemo(() => {
        return buildUrlSet(`${location.pathname}${location.search}`, 'offset', pageOffsets)
    }, [location.pathname, location.search, _limit, total, pageOffsets])
}

/*
 * This is a simple product listing page. It displays a paginated list
 * of product hit objects. Allowing for sorting and filtering based on the
 * allowable filters and sort refinements.
 */
const ProductList = (props) => {
    // Using destructuring to omit properties; we must rename `isLoading` because we use a different
    // `isLoading` later in this function.
    // eslint-disable-next-line react/prop-types, @typescript-eslint/no-unused-vars
    const {isLoading: _unusedIsLoading, staticContext, ...rest} = props
    const {isOpen, onOpen, onClose} = useDisclosure()
    const {formatMessage} = useIntl()
    const navigate = useNavigation()
    const history = useHistory()
    const params = useParams()
    const location = useLocation()
    const toast = useToast()
    const einstein = useEinstein()
    const {res} = useServerContext()
    const customerId = useCustomerId()
    const {site, locale} = useMultiSite()
    const [searchParams, {stringify: stringifySearchParams}] = useSearchParams()
    const ampContext = useAmplienceApi()

    /**************** Page State ****************/
    const [filtersLoading, setFiltersLoading] = useState(false)
    const [wishlistLoading, setWishlistLoading] = useState([])
    const [sortOpen, setSortOpen] = useState(false)

    const urlParams = new URLSearchParams(location.search)
    let searchQuery = urlParams.get('q')
    const isSearch = !!searchQuery

    if (params.categoryId) {
        searchParams._refine.push(`cgid=${params.categoryId}`)
    }

    /**************** Mutation Actions ****************/
    const {mutateAsync: createCustomerProductListItem} = useShopperCustomersMutation(
        'createCustomerProductListItem'
    )
    const {mutateAsync: deleteCustomerProductListItem} = useShopperCustomersMutation(
        'deleteCustomerProductListItem'
    )

    /**************** Query Actions ****************/
    const {
        isLoading,
        isRefetching,
        data: productSearchResult
    } = useProductSearch(
        {
            parameters: {
                ...searchParams,
                refine: searchParams._refine
            }
        },
        {
            keepPreviousData: true
        }
    )

    const {error, data: category} = useCategory(
        {
            parameters: {
                id: params.categoryId
            }
        },
        {
            enabled: !isSearch && !!params.categoryId
        }
    )

    // Apply disallow list to refinements.
    if (productSearchResult?.refinements) {
        productSearchResult.refinements = productSearchResult.refinements.filter(
            ({attributeId}) => !REFINEMENT_DISALLOW_LIST.includes(attributeId)
        )
    }

    /**************** Error Handling ****************/
    const errorStatus = error?.response?.status
    switch (errorStatus) {
        case undefined:
            // No Error.
            break
        case 404:
            throw new HTTPNotFound('Category Not Found.')
        default:
            throw new HTTPError(`HTTP Error ${errorStatus} occurred.`)
    }

    /**************** Response Handling ****************/
    if (res) {
        res.set('Cache-Control', `max-age=${MAX_CACHE_AGE}`)
    }

    // Reset scroll position when `isRefetching` becomes `true`.
    useEffect(() => {
        isRefetching && window.scrollTo(0, 0)
        setFiltersLoading(isRefetching)
    }, [isRefetching])

    /**************** Render Variables ****************/
    const basePath = `${location.pathname}${location.search}`
    const showNoResults = !isLoading && productSearchResult && !productSearchResult?.hits
    const {total, sortingOptions} = productSearchResult || {}
    const selectedSortingOptionLabel =
        sortingOptions?.find(
            (option) => option.id === productSearchResult?.selectedSortingOption
        ) ?? sortingOptions?.[0]

    // Get urls to be used for pagination, page size changes, and sorting.
    // Amplience re-calculates pageUrls below
    //const pageUrls = usePageUrls({total})
    const sortUrls = useSortUrls({options: sortingOptions})
    const limitUrls = useLimitUrls()

    /**************** Amplience States ****************/
    const [ampSlots, setAmpSlots] = useState()
    const [topContent, setTopContent] = useState([])
    const [bottomContent, setBottomContent] = useState([])
    const [validationResult, setValidationResult] = useState(null)
    const [rtvActive, setRtvActive] = useState(false)
    const [ampTopIds, setAmpTopIds] = useState()

    /**************** Amplience Query Functions **************/

    const getMainContent = ({queryKey}) => {
        const [mainContent, categoryId, locale] = queryKey

        return ampContext.client.fetchContent([{key: `category/${categoryId}`}], {locale: locale})
                .then((res) => res).then((res) => res)
    }

    const getTopContent = ({queryKey}) => {
        const [topcontent, ids, locale] = queryKey

        return ampContext.client.fetchContent(ids, {locale: locale})
                .then((res) => res).then((res) => res)
    }

    const ampCategoryQuery = useQuery(
        ['mainContent', params.categoryId, locale?.id],
        getMainContent,
        {
            enabled: !!params.categoryId
        }
    )

    const ampTopContentQuery = useQuery(
        ['topcontent', ampTopIds, locale?.id],
        getTopContent,
        {
            enabled: !!ampTopIds
        }
    )

    const isMobile = useBreakpointValue({base: true, lg: false, xl: false, xxl: false, xxxl: false})

    const pageOffsets = useMemo(() => {
        return calculatePageOffsets(searchParams.limit, total, ampSlots, isMobile)
    }, [searchParams.limit, total, ampSlots, isMobile])

    useEffect(() => {
        // Clear these IDs first
        setAmpTopIds()
        setBottomContent([])
        setTopContent([])
        setAmpSlots()
        
        const ampCategory = ampCategoryQuery.data?.pop()
        console.log('mainContent',ampCategory)
        //setInitContent(ampCategory)
        
        // set bottom content
        setBottomContent(ampCategory?.bottomContent || [])

        // get IDs for topContentQuery
        const rawTopContent = ampCategory?.topContent || []
        const newids = rawTopContent?.map(getIdsForContent)
        const ids = newids && newids.length ? newids : null
        setAmpTopIds(ids)

        // In-Grid content
        let ampSlots

        if (ampCategory && ampCategory?.type !== 'CONTENT_NOT_FOUND') {
            ampSlots = ampCategory?.gridItem ?? []
    
            ampSlots = processSlots(ampSlots, setValidationResult)
        }
        setAmpSlots(ampSlots)
    
    }, [ampCategoryQuery.data])

    const results = enrichResults(
        productSearchResult,
        searchParams.limit,
        ampSlots,
        pageOffsets,
        isMobile
    )

    useEffect(() => {
        if(ampTopContentQuery.data && ampTopContentQuery.fetchStatus == 'idle'){
            const ampTopContent = ampTopContentQuery.data
            setTopContent(ampTopContent)
            //console.log('topContent:', ampTopContent)
        }
    }, [ampTopContentQuery.isSuccess])

    const pageUrls = useAmpPageUrls({total, pageOffsets})

    useAmpRtv(
        async (model) => {
            setAmpSlots(processSlots(model.content?.gridItem, setValidationResult))

            const childContentPromise = async () => {
                if (!model.content.topContent) return []
                const topContentIDs = model.content?.topContent.map(getIdsForContent) || []
                if (topContentIDs && topContentIDs.length) {
                    const rtvTopContent = await ampContext.client.fetchContent(topContentIDs, {
                        locale: locale.id + ',*'
                    })
                    return rtvTopContent
                } else {
                    return []
                }
            }
            const dataForTopContent = await childContentPromise()
            setTopContent(dataForTopContent)
            setBottomContent(model.content.bottomContent)
            setRtvActive(true)
        },
        undefined,
        [ampSlots, bottomContent, topContent]
    )

    useEffect(() => {
        let dist = Infinity
        let pageId = 0

        for (let i = 0; i < pageOffsets.length; i++) {
            const myDist = Math.abs(pageOffsets[i] - searchParams.offset)

            if (myDist < dist) {
                dist = myDist
                pageId = i
            }
        }

        if (pageOffsets[pageId] !== searchParams.offset) {
            const searchParamsCopy = {...searchParams, offset: pageOffsets[pageId]}
            navigate(`/category/${params.categoryId}?${stringifySearchParams(searchParamsCopy)}`)
        }
    }, [isMobile, searchParams.offset])

    /**************** Action Handlers ****************/
    const {data: wishlist} = useWishList()
    const addItemToWishlist = async (product) => {
        setWishlistLoading([...wishlistLoading, product.productId])

        // TODO: This wishlist object is from an old API, we need to replace it with the new one.
        const listId = wishlist.id
        await createCustomerProductListItem(
            {
                parameters: {customerId, listId},
                body: {
                    quantity: 1,
                    public: false,
                    priority: 1,
                    type: 'product',
                    productId: product.productId
                }
            },
            {
                onError: () => {
                    toast({
                        title: formatMessage(API_ERROR_MESSAGE),
                        status: 'error'
                    })
                },
                onSuccess: () => {
                    toast({
                        title: formatMessage(TOAST_MESSAGE_ADDED_TO_WISHLIST, {quantity: 1}),
                        status: 'success',
                        action: (
                            // it would be better if we could use <Button as={Link}>
                            // but unfortunately the Link component is not compatible
                            // with Chakra Toast, since the ToastManager is rendered via portal
                            // and the toast doesn't have access to intl provider, which is a
                            // requirement of the Link component.
                            <Button variant="link" onClick={() => navigate('/account/wishlist')}>
                                {formatMessage(TOAST_ACTION_VIEW_WISHLIST)}
                            </Button>
                        )
                    })
                },
                onSettled: () => {
                    setWishlistLoading(wishlistLoading.filter((id) => id !== product.productId))
                }
            }
        )
    }

    const removeItemFromWishlist = async (product) => {
        setWishlistLoading([...wishlistLoading, product.productId])

        const listId = wishlist.id
        const itemId = wishlist.customerProductListItems.find(
            (i) => i.productId === product.productId
        ).id

        await deleteCustomerProductListItem(
            {
                body: {},
                parameters: {customerId, listId, itemId}
            },
            {
                onError: () => {
                    toast({
                        title: formatMessage(API_ERROR_MESSAGE),
                        status: 'error'
                    })
                },
                onSuccess: () => {
                    toast({
                        title: formatMessage(TOAST_MESSAGE_REMOVED_FROM_WISHLIST),
                        status: 'success'
                    })
                },
                onSettled: () => {
                    setWishlistLoading(wishlistLoading.filter((id) => id !== product.productId))
                }
            }
        )
    }

    // Toggles filter on and off
    const toggleFilter = (value, attributeId, selected, allowMultiple = true) => {
        const searchParamsCopy = {...searchParams}

        // Remove the `offset` search param if present.
        delete searchParamsCopy.offset

        // If we aren't allowing for multiple selections, simply clear any value set for the
        // attribute, and apply a new one if required.
        if (!allowMultiple) {
            const previousValue = searchParamsCopy.refine[attributeId]
            delete searchParamsCopy.refine[attributeId]

            // Note the loose comparison, for "string != number" checks.
            if (!selected && value.value != previousValue) {
                searchParamsCopy.refine[attributeId] = value.value
            }
        } else {
            // Get the attibute value as an array.
            let attributeValue = searchParamsCopy.refine[attributeId] || []

            // Ensure that the value is still converted into an array if it's a `string` or `number`.
            if (typeof attributeValue === 'string') {
                attributeValue = attributeValue.split('|')
            } else if (typeof attributeValue === 'number') {
                attributeValue = [attributeValue]
            }

            // Either set the value, or filter the value out.
            if (!selected) {
                attributeValue.push(value.value)
            } else {
                // Note the loose comparison, for "string != number" checks.
                attributeValue = attributeValue?.filter((v) => v != value.value)
            }

            // Update the attribute value in the new search params.
            searchParamsCopy.refine[attributeId] = attributeValue

            // If the update value is an empty array, remove the current attribute key.
            if (searchParamsCopy.refine[attributeId].length === 0) {
                delete searchParamsCopy.refine[attributeId]
            }
        }

        if (isSearch) {
            navigate(`/search?${stringifySearchParams(searchParamsCopy)}`)
        } else {
            navigate(`/category/${params.categoryId}?${stringifySearchParams(searchParamsCopy)}`)
        }
    }

    // Clears all filters
    const resetFilters = () => {
        const newSearchParams = {
            ...searchParams,
            refine: []
        }
        const newPath = isSearch
            ? `/search?${stringifySearchParams(newSearchParams)}`
            : `/category/${params.categoryId}?${stringifySearchParams(newSearchParams)}`

        navigate(newPath)
    }

    /**************** Einstein ****************/
    useEffect(() => {
        if (productSearchResult) {
            isSearch
                ? einstein.sendViewSearch(searchQuery, productSearchResult)
                : einstein.sendViewCategory(category, productSearchResult)
        }
    }, [productSearchResult])

    const indexStyle = {
        position: 'absolute',
        zIndex: '1',
        background: 'white',
        padding: '2px 9px',
        margin: '5px',
        borderRadius: '30px'
    }

    return (
        <Box
            className="sf-product-list-page"
            data-testid="sf-product-list-page"
            layerStyle="page"
            paddingTop={{base: 6, lg: 8}}
            {...rest}
        >
            <Helmet>
                <title>{category?.pageTitle}</title>
                <meta name="description" content={category?.pageDescription} />
                <meta name="keywords" content={category?.pageKeywords} />
            </Helmet>
            {showNoResults ? (
                <EmptySearchResults searchQuery={searchQuery} category={category} />
            ) : (
                <>
                    <AbovePageHeader />
                    {/* Header */}

                    {/* Amplience - Top Content SSR */}
                    {topContent &&
                        _.compact(topContent).map((content, ind) => (
                            <AmplienceWrapper key={ind} content={content}></AmplienceWrapper>
                        ))}

                    <Stack
                        display={{base: 'none', lg: 'flex'}}
                        direction="row"
                        justify="flex-start"
                        align="flex-start"
                        spacing={4}
                        marginBottom={6}
                    >
                        <Flex align="left" width="287px">
                            <PageHeader
                                searchQuery={searchQuery}
                                category={category}
                                productSearchResult={productSearchResult}
                                isLoading={isLoading}
                            />
                        </Flex>

                        <Box flex={1} paddingTop={'45px'}>
                            <SelectedRefinements
                                filters={productSearchResult?.refinements}
                                toggleFilter={toggleFilter}
                                handleReset={resetFilters}
                                selectedFilterValues={productSearchResult?.selectedRefinements}
                            />
                        </Box>
                        <Box paddingTop={'45px'}>
                            <Sort
                                sortUrls={sortUrls}
                                productSearchResult={productSearchResult}
                                basePath={basePath}
                            />
                        </Box>
                    </Stack>

                    <HideOnDesktop>
                        <Stack spacing={6}>
                            <PageHeader
                                searchQuery={searchQuery}
                                category={category}
                                productSearchResult={productSearchResult}
                                isLoading={isLoading}
                            />
                            <Stack
                                display={{base: 'flex', md: 'none'}}
                                direction="row"
                                justify="flex-start"
                                align="center"
                                spacing={1}
                                height={12}
                                borderColor="gray.100"
                            >
                                <Flex align="center">
                                    <Button
                                        fontSize="sm"
                                        colorScheme="black"
                                        variant="outline"
                                        marginRight={2}
                                        display="inline-flex"
                                        leftIcon={<FilterIcon boxSize={5} />}
                                        onClick={onOpen}
                                    >
                                        <FormattedMessage
                                            defaultMessage="Filter"
                                            id="product_list.button.filter"
                                        />
                                    </Button>
                                </Flex>
                                <Flex align="center">
                                    <Button
                                        maxWidth="245px"
                                        fontSize="sm"
                                        marginRight={2}
                                        colorScheme="black"
                                        variant="outline"
                                        display="inline-flex"
                                        rightIcon={<ChevronDownIcon boxSize={5} />}
                                        onClick={() => setSortOpen(true)}
                                    >
                                        {formatMessage(
                                            {
                                                id: 'product_list.button.sort_by',
                                                defaultMessage: 'Sort By: {sortOption}'
                                            },
                                            {
                                                sortOption: selectedSortingOptionLabel?.label
                                            }
                                        )}
                                    </Button>
                                </Flex>
                            </Stack>
                        </Stack>
                        <Box marginBottom={4}>
                            <SelectedRefinements
                                filters={productSearchResult?.refinements}
                                toggleFilter={toggleFilter}
                                handleReset={resetFilters}
                                selectedFilterValues={productSearchResult?.selectedRefinements}
                            />
                        </Box>
                    </HideOnDesktop>

                    {/* Body  */}
                    <Grid templateColumns={{base: '1fr', md: '280px 1fr'}} columnGap={6}>
                        <Stack display={{base: 'none', md: 'flex'}}>
                            <Refinements
                                isLoading={filtersLoading}
                                toggleFilter={toggleFilter}
                                filters={productSearchResult?.refinements}
                                selectedFilters={searchParams.refine}
                            />
                        </Stack>
                        <Box>
                            {validationResult && (
                                <Box
                                    transform="translate(0, -100%)"
                                    color="red"
                                    backgroundColor="white"
                                    padding="2px 8px"
                                    border="1px solid red"
                                    position="absolute"
                                    zIndex="2"
                                    maxW="100%"
                                >
                                    {validationResult}
                                </Box>
                            )}
                            <SimpleGrid
                                columns={[2, 2, 3, 3]}
                                spacingX={4}
                                spacingY={{base: 4, lg: 4}}
                            >
                                {isHydrated() && (isRefetching || !productSearchResult)
                                    ? new Array(searchParams.limit)
                                        .fill(0)
                                        .map((value, index) => (
                                            <ProductTileSkeleton key={index} />
                                        ))
                                    // Amplience results includes in-grid contents
                                    //: productSearchResult.hits.map((productSearchItem, index) => {
                                    : results?.map((item, index) => {
                                        if(item.isAmplience) {
                                            // Amplience content tile

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
                                                    {rtvActive && (
                                                        <Box {...indexStyle}>
                                                            {item.indices.join(', ')}
                                                        </Box>
                                                    )}
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
                                        }else{
                                            const productId = item.productId
                                            const isInWishlist =
                                                !!wishlist?.customerProductListItems?.find(
                                                    (item) => item.productId === productId
                                                )

                                            return (
                                                <AmplienceProductTile
                                                    data-testid={`sf-product-tile-${item.productId}`}
                                                    key={item.productId}
                                                    product={item}
                                                    enableFavourite={true}
                                                    isFavourite={isInWishlist}
                                                    onClick={() => {
                                                        if (searchQuery) {
                                                            einstein.sendClickSearch(
                                                                searchQuery,
                                                                item
                                                            )
                                                        } else if (category) {
                                                            einstein.sendClickCategory(
                                                                category,
                                                                item
                                                            )
                                                        }
                                                    }}
                                                    onFavouriteToggle={(isFavourite) => {
                                                        const action = isFavourite
                                                            ? addItemToWishlist
                                                            : removeItemFromWishlist
                                                        return action(item)
                                                    }}
                                                    dynamicImageProps={{
                                                        widths: [
                                                            '50vw',
                                                            '50vw',
                                                            '20vw',
                                                            '20vw',
                                                            '25vw'
                                                        ]
                                                    }}>
                                                        {rtvActive && (
                                                            <Box {...indexStyle}>
                                                                {item.indices.join(', ')}
                                                            </Box>
                                                        )}
                                                </AmplienceProductTile>
                                            )
                                        }
                                    })}
                            </SimpleGrid>
                            {/* Footer */}
                            <Flex
                                justifyContent={['center', 'center', 'flex-start']}
                                paddingTop={8}
                            >
                                <Pagination currentURL={basePath} urls={pageUrls} />

                                {/*
                            Our design doesn't call for a page size select. Show this element if you want
                            to add one to your design.
                        */}
                                <Select
                                    display="none"
                                    value={basePath}
                                    onChange={({target}) => {
                                        history.push(target.value)
                                    }}
                                >
                                    {limitUrls.map((href, index) => (
                                        <option key={href} value={href}>
                                            {DEFAULT_LIMIT_VALUES[index]}
                                        </option>
                                    ))}
                                </Select>
                            </Flex>
                        </Box>
                    </Grid>

                    <Spacer height={6} />
                    {/* Amplience - Bottom Content CSR */}
                    {ampCategoryQuery.isSuccess && bottomContent &&
                        _.compact(bottomContent).map((content, ind) => (
                            <AmplienceWrapper key={ind} fetch={{id: content.id}}></AmplienceWrapper>
                        ))}
                </>
            )}
            <Modal
                isOpen={isOpen}
                onClose={onClose}
                size="full"
                motionPreset="slideInBottom"
                scrollBehavior="inside"
            >
                <ModalOverlay />
                <ModalContent top={0} marginTop={0}>
                    <ModalHeader>
                        <Text fontWeight="bold" fontSize="2xl">
                            <FormattedMessage
                                defaultMessage="Filter"
                                id="product_list.modal.title.filter"
                            />
                        </Text>
                    </ModalHeader>
                    <ModalCloseButton />
                    <ModalBody py={4}>
                        {filtersLoading && <LoadingSpinner />}
                        <Refinements
                            toggleFilter={toggleFilter}
                            filters={productSearchResult?.refinements}
                            selectedFilters={productSearchResult?.selectedRefinements}
                        />
                    </ModalBody>

                    <ModalFooter
                        // justify="space-between"
                        display="block"
                        width="full"
                        borderTop="1px solid"
                        borderColor="gray.100"
                        paddingBottom={10}
                    >
                        <Stack>
                            <Button width="full" onClick={onClose}>
                                {formatMessage(
                                    {
                                        id: 'product_list.modal.button.view_items',
                                        defaultMessage: 'View {prroductCount} items'
                                    },
                                    {
                                        prroductCount: productSearchResult?.total
                                    }
                                )}
                            </Button>
                            <Button width="full" variant="outline" onClick={resetFilters}>
                                <FormattedMessage
                                    defaultMessage="Clear Filters"
                                    id="product_list.modal.button.clear_filters"
                                />
                            </Button>
                        </Stack>
                    </ModalFooter>
                </ModalContent>
            </Modal>
            <Drawer
                placement="bottom"
                isOpen={sortOpen}
                onClose={() => setSortOpen(false)}
                size="sm"
                motionPreset="slideInBottom"
                scrollBehavior="inside"
                isFullHeight={false}
                height="50%"
            >
                <DrawerOverlay />
                <DrawerContent marginTop={0}>
                    <DrawerHeader boxShadow="none">
                        <Text fontWeight="bold" fontSize="2xl">
                            <FormattedMessage
                                defaultMessage="Sort By"
                                id="product_list.drawer.title.sort_by"
                            />
                        </Text>
                    </DrawerHeader>
                    <DrawerCloseButton />
                    <DrawerBody>
                        {sortUrls.map((href, idx) => (
                            <Button
                                width="full"
                                onClick={() => {
                                    setSortOpen(false)
                                    history.push(href)
                                }}
                                fontSize={'md'}
                                key={idx}
                                marginTop={0}
                                variant="menu-link"
                            >
                                <Text
                                    as={
                                        selectedSortingOptionLabel?.label ===
                                            productSearchResult?.sortingOptions[idx]?.label && 'u'
                                    }
                                >
                                    {productSearchResult?.sortingOptions[idx]?.label}
                                </Text>
                            </Button>
                        ))}
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </Box>
    )
}

ProductList.getTemplateName = () => 'product-list'

ProductList.propTypes = {
    onAddToWishlistClick: PropTypes.func,
    onRemoveWishlistClick: PropTypes.func,
    category: PropTypes.object
}

export default ProductList

const Sort = ({sortUrls, productSearchResult, basePath, ...otherProps}) => {
    const intl = useIntl()
    const history = useHistory()

    return (
        <FormControl data-testid="sf-product-list-sort" id="page_sort" width="auto" {...otherProps}>
            <Select
                value={basePath.replace(/(offset)=(\d+)/i, '$1=0')}
                onChange={({target}) => {
                    history.push(target.value)
                }}
                height={11}
                width="240px"
            >
                {sortUrls.map((href, index) => (
                    <option key={href} value={href}>
                        {intl.formatMessage(
                            {
                                id: 'product_list.select.sort_by',
                                defaultMessage: 'Sort By: {sortOption}'
                            },
                            {
                                sortOption: productSearchResult?.sortingOptions[index]?.label
                            }
                        )}
                    </option>
                ))}
            </Select>
        </FormControl>
    )
}

Sort.propTypes = {
    sortUrls: PropTypes.array,
    productSearchResult: PropTypes.object,
    basePath: PropTypes.string
}
