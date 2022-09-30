export default {
    baseStyle: () => ({
        previewIcon: {
            left: '10px',
            top: {base: '40px', lg: '10px'},
            zIndex: 9999,
            position: 'fixed',
            boxShadow: 'lg',
            backgroundColor: '#e80d8c',
            color: '#fff',
            width: 5,

            _hover: {
                backgroundColor: "#ba0a71"
            },
            _focus: {
                boxShadow: "outline"
            },
            _active: {}
        },
        container: {
            padding: '20px',
            marginBottom: '20px',
            border: '1px solid #fba9ed',
            display: 'flex',
            flexDirection: 'column',
            gap: '12px',
            justifyContent: 'space-between',
            alignItems: 'left',
            top: '0px',
            zIndex: '100'
        }
    }),
    parts: ['container']
}
