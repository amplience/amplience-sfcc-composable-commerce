export default {
    baseStyle: () => ({
        container: {
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            color: 'red',
            backgroundColor: 'var(--chakra-colors-gray-50)',
            padding: '5px',
            position: 'sticky',
            top: '0px',
            zIndex: '100'
        }
    }),
    parts: ['container']
}
