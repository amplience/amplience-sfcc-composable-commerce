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
        }
    },
    parts: ['container', 'image', 'info', 'name', 'role']
}
