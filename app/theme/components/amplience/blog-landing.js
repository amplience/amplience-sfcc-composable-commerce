export default {
    baseStyle: () => ({
        filters: {
            columns: [1, 1, 3],
            spacingX: 4,
            spacingY: 4,
            width: '100%'
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
    }),
    parts: ['resultsGrid']
}
