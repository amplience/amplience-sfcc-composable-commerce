export default {
    baseStyle: (props) => ({
        container: {
            marginBottom: {base: 0, md: 10},
            position: {lg: 'relative'}
        },
        stackContainer: {
            align: 'center',
            spacing: {base: 8, md: 10},
            paddingTop: {base: 12, md: 10},
            paddingBottom: {base: 6, md: 10},
            direction: {base: 'column', lg: 'row'}
        },
        textContainer: {
            flex: 1,
            spacing: {base: 5, md: 8},
            textAlign: {base: 'center'},
            alignItems: {base: 'center', lg: 'unset'},
            backgroundColor: {base: "rgba(255,255,255,0.5)"},
            margin: {base: 8}

        },
        imageContainer: {
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
            width: 'full',
            paddingTop: {base: 4, lg: 0}
        }
    }),
    variants: {
        full: (props) => ({
            textContainer: {
                flex: 1,
                spacing: {base: 5, md: 8},
                zIndex: 2,
                position: 'absolute',
                padding: 8,
                textAlign: {base: 'center'},
                alignItems: {base: 'center', lg: 'unset'}
            },
            imageContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                width: 'full',
                marginInlineStart: '0 !important'
            }
        }),
        inGrid: (props) => ({
            textContainer: {
                flex: 1,
                spacing: {base: 5, md: 8},
                zIndex: 2,
                padding: 2,
                textAlign: {base: 'center'},
                alignItems: {base: 'center', lg: 'unset'}
            },
            container: {
                marginBottom: 0
            },
            heading: {
                fontSize: {base: 'md', md: 'xl'}
            },
            stackContainer: {
                paddingTop: 0,
                paddingBottom: 0
            },
            imageContainer: {
                flex: 1,
                justifyContent: 'center',
                alignItems: 'center',
                position: 'relative',
                width: 'full',
                marginInlineStart: '0 !important',
                marginTop: '0 !important',
                paddingTop: '0 !important',
            }
        })
    },
    parts: ['container', 'stackContainer', 'imageContainer', 'textContainer']
}
