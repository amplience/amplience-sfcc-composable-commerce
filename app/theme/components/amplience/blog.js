export default {
    baseStyle: {
        header: {
            display: 'flex',
            flexDirection: 'column',
            padding: '48px'
        },
        topInfo: {
            alignSelf: 'baseline',
            color: 'white',
            padding: '5px 10px',
            margin: '64px 0px 5px 0px',
            background: 'linear-gradient(90deg, rgba(9,9,121,0.88) 0%, rgba(6,85,171,0.88) 100%)'
        },
        title: {
            alignSelf: 'baseline',
            color: 'white',
            background:
                'linear-gradient(90deg, rgba(2,0,36,0.8870141806722689) 0%, rgba(9,9,121,0.6825323879551821) 100%)',
            padding: '10px'
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
            marginRight: '20px',
            alignItems: 'center'
        },
        authorImage: {
            borderWidth: '2px',
            marginRight: '20px'
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
            flexWrap: 'wrap'
        },
        tag: {
            display: 'inline-block',
            padding: '4px 8px',
            backgroundColor: 'blue.600',
            color: 'white',
            fontWeight: '600'
        },
        category: {
            display: 'inline-block',
            padding: '4px 8px',
            backgroundColor: 'purple.600',
            fontWeight: '600',
            color: 'white'
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            padding: '30px 20px 20px 20px',
            margin: '-30px 20px 0 20px',
            backgroundColor: 'white',
            gap: '6px'
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
