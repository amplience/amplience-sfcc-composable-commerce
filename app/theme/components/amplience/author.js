export default {
    baseStyle: {
        container: {
            display: 'flex',
            marginRight: ['10px', '20px'],
            alignItems: 'center',
            flexShrink: 2
        },
        image: {
            borderWidth: '2px',
            marginRight: ['10px', '20px']
        },
        info: {
            display: 'flex',
            flexDirection: 'column'
        },
        name: {
            color: 'white',
            fontWeight: '700',
            fontSize: '18px'
        },
        role: {
            color: 'white',
            fontSize: '14px'
        }
    },
    variants: {
        card: {
            container: {
                marginRight: 0
            },
            image: {
                marginRight: '10px',
                borderColor: 'blue.600'
            },
            name: {
                color: 'black'
            },
            role: {
                color: 'gray.800'
            }
        },
        extendedCard: {
            container: {
                display: 'flex',
                flexDirection: 'column',
                boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s',
                _hover: {
                    boxShadow: '0px 8px 8px rgba(0, 64, 128, 0.2)'
                }
            },
            info: {
                display: 'flex',
                flexDirection: 'column',
                margin: '10px 0'
            },
            infoBox: {
                fontSize: '14px'
            },
            name: {
                background:
                    'linear-gradient(90deg, rgb(9,9,121) 0%, rgb(6,85,171) 50%, rgb(0,212,255) 100%)',
                backgroundSize: '200%',
                backgroundPosition: '0% 0%',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                fontSize: 'xl',
                textAlign: 'left',
                marginBottom: '10px',
                transition: 'background-position 0.3s',

                _hover: {
                    backgroundPosition: '100% 100%'
                }
            },
            role: {
                color: 'gray.800'
            },
            description: {
                flex: 1,
                color: 'gray.700',
                fontWeight: '500'
            },
            body: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                padding: '10px',
                borderColor: 'gray.50'
            },
            resultsGrid: {
                columns: [1, 2, 3, 4],
                spacingX: [4, 6, 8, 8],
                spacingY: {base: 10, lg: 12},
                marginTop: 4,
                marginBottom: 10
            },
            pagination: {
                display: 'flex',
                justifyContent: 'flex-end',
                alignItems: 'center',
                gap: 4
            },
            pageSelect: {
                width: 'auto'
            }
        },
        horizontal: {
            container: {
                display: 'flex',
                flexDirection: {base: 'column', md: 'row'},
                boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1)',
                transition: 'box-shadow 0.3s',
                alignItems: {base: 'flex-start'},
                _hover: {
                    boxShadow: '0px 8px 8px rgba(0, 64, 128, 0.2)'
                },
                marginRight: 0,
            },
            info: {
                display: 'flex',
                flexDirection: 'column',
                margin: '10px 0'
            },
            name: {
                background:
                    'linear-gradient(90deg, rgb(9,9,121) 0%, rgb(6,85,171) 50%, rgb(0,212,255) 100%)',
                backgroundSize: '200%',
                backgroundPosition: '0% 0%',
                backgroundClip: 'text',
                textFillColor: 'transparent',
                fontSize: 'xl',
                textAlign: 'left',
                marginBottom: '10px',
                transition: 'background-position 0.3s',

                _hover: {
                    backgroundPosition: '100% 100%'
                }
            },
            role: {
                color: 'gray.800'
            },
            description: {
                flex: 1,
                color: 'gray.700',
                fontWeight: '500'
            },
            body: {
                display: 'flex',
                flexDirection: 'column',
                flex: 1,
                padding: '10px',
                borderColor: 'gray.50'
            },
            content: {
                width: {base: '100%', md: 'unset'}
            }
        }
    },
    parts: ['container', 'image', 'info', 'name', 'role', 'infoBox']
}
