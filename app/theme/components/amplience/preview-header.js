export default {
    baseStyle: () => ({
        slide: {
            zIndex: {base: 9999, lg: 1300}
        },
        previewIcon: {
            left: {base: '15px', lg: '10px'},
            top: {base: '51px', md: '60px', lg: '15px'},
            zIndex: 1300,
            position: 'fixed',
            boxShadow: 'lg',
            backgroundColor: '#e80d8c',
            color: '#fff',
            width: 5,
            cursor: 'pointer',

            _hover: {
                backgroundColor: '#ba0a71'
            },
            _focus: {
                boxShadow: 'outline'
            },
            _active: {}
        },
        container: {
            padding: '20px',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            justifyContent: 'space-between',
            alignItems: 'left',
            top: '0px',
            zIndex: 100
        },
        header: {
            textAlign: 'center',
            borderBottomWidth: '1px',
            padding: {base: '30px 0', lg: '5px 0'}
        },
        section: {
            borderTop: 'none',
            cursor: 'pointer',
        },
        sectionTitle: {
            fontSize: 'lg',
            margin: '20px 0',
            marginLeft: '20px',
            fontWeight: 'bold'
        },
        button: {
            background: 'gray.50',
            cursor: 'pointer',
            _hover: {

            }
        },
        pannel: {
            paddingInlineStart: 0,
            paddingInlineEnd: 0,
            padding: '0 20px 20px 20px',
        },
        box: {
            padding: '20px'
        }

    }),
    parts: ['container']
}
