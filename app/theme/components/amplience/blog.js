export default {
    baseStyle: {
        container: {
            display: 'flex',
            flexDirection: 'column'
        },
        header: {
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'center',
            marginX: ['-1rem', '-1rem', '0']
        },
        headerContainer: {
            display: 'flex',
            flexDirection: 'column',
            flex: '1024px',
            maxWidth: 'min(100%, 1024px)',
            padding: ['48px 20px', '48px 20px', '48px']
        },
        topInfo: {
            alignSelf: 'baseline',
            color: 'white',
            padding: '5px 10px',
            margin: '64px 0px 5px 0px',
            background: 'linear-gradient(90deg, rgba(9,9,121,0.88) 0%, rgba(6,85,171,0.88) 100%)',
            fontSize: ['sm', 'sm', 'md']
        },
        title: {
            alignSelf: 'baseline',
            color: 'white',
            background:
                'linear-gradient(90deg, rgba(2,0,36,0.8870141806722689) 0%, rgba(9,9,121,0.6825323879551821) 100%)',
            padding: '10px',
            minHeight: '1.2em',
            boxSizing: 'content-box'
        },
        infoBlock: {
            display: 'flex',
            alignItems: 'center',
            marginTop: '26px',
            padding: '10px',
            borderRadius: '100px 0 0 100px',
            background:
                'linear-gradient(90deg, rgba(2,0,36,0.8870141806722689) 0%, rgba(9,9,121,0.6825323879551821) 61%, rgba(0,212,255,0) 93%)'
        },
        author: {
            display: 'flex',
            marginRight: ['10px', '20px'],
            alignItems: 'center',
            flexShrink: 2
        },
        authorImage: {
            borderWidth: '2px',
            marginRight: ['10px', '20px']
        },
        authorInfo: {
            display: 'flex',
            flexDirection: 'column'
        },
        authorName: {
            color: 'white',
            fontWeight: '700',
            fontSize: '18px'
        },
        authorRole: {
            color: 'white',
            fontSize: '14px'
        },
        tags: {
            display: 'flex',
            gap: '8px 16px',
            flexWrap: 'wrap',
            flex: 1
        },
        tag: {
            display: 'inline-block',
            padding: '4px 10px',
            backgroundColor: 'blue.600',
            color: 'white',
            fontWeight: '600',
            fontSize: ['sm', 'sm', 'md'],
            borderRadius: 10
        },
        category: {
            display: 'inline-block',
            padding: '4px 10px',
            backgroundColor: 'purple.600',
            fontWeight: '600',
            color: 'white',
            fontSize: ['sm', 'sm', 'md'],
            borderRadius: 10
        },
        content: {
            display: 'flex',
            alignSelf: 'center',
            flexDirection: 'column',
            padding: '30px 20px 20px 20px',
            margin: ['-30px 0 0 0', '-30px 0 0 0', '-30px 20px 0 20px'],
            backgroundColor: 'white',
            gap: '6px',
            width: 'min(calc(100% - 40px), 1024px)'
        }
    },
    sizes: {
        sm: {
            header: {
                marginLeft: '-1rem',
                marginRight: '-1rem',
                padding: '0'
            }
        }
    },
    parts: [
        'header',
        'title',
        'infoBlock',
        'author',
        'authorImage',
        'authorInfo',
        'authorName',
        'authorRole',
        'tags',
        'tag',
        'category',
        'content'
    ]
}
