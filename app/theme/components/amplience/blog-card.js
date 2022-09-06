export default {
    baseStyle: () => ({
        container: {
            display: 'flex',
            flexDirection: 'column',
            boxShadow: '0px 5px 5px rgba(0, 0, 0, 0.1)',
            transition: 'box-shadow 0.3s',
            _hover: {
                boxShadow: '0px 8px 8px rgba(0, 64, 128, 0.2)'
            }
        },
        content: {
            display: 'flex',
            flexDirection: 'column',
            _hover: {
                textDecoration: 'none'
            },
            flex: 1
        },
        body: {
            display: 'flex',
            flexDirection: 'column',
            flex: 1,
            padding: '10px',
            borderColor: 'gray.50'
        },
        heading: {
            background:
                'linear-gradient(90deg, rgb(9,9,121) 0%, rgb(6,85,171) 50%, rgb(0,212,255) 100%)',
            backgroundSize: '200%',
            backgroundPosition: '0% 0%',
            backgroundClip: 'text',
            textFillColor: 'transparent',
            fontSize: 'xl',
            textAlign: 'left',
            marginBottom: '8px',
            transition: 'background-position 0.3s',

            _hover: {
                backgroundPosition: '100% 100%'
            }
        },
        description: {
            flex: 1,
            color: 'gray.700',
            fontWeight: '600'
        },
        tags: {
            display: 'flex',
            flexDirection: 'row-reverse',
            flexWrap: 'wrap-reverse',
            marginTop: '15px',
            gap: '6px 8px'
        },
        tag: {
            size: 'sm',
            color: 'blue.600'
        },
        category: {
            size: 'sm',
            color: 'purple.600'
        },
        bottom: {
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
        },
        readTime: {
            flex: 1,
            color: 'blue.500',
            textAlign: 'right',
            fontSize: 'sm',
            fontWeight: '400'
        },
        button: {
            alignSelf: 'flex-end',
            width: 'auto',
            paddingX: 4
        },
        author: {
            marginBottom: 4
        },
        actions: {
            padding: '10px',
            backgroundColor: 'gray.50',
            border: '1px solid white'
        }
    }),
    parts: [
        'container',
        'content',
        'body',
        'heading',
        'description',
        'tags',
        'tag',
        'category',
        'bottom',
        'readTime',
        'button',
        'author',
        'actions'
    ]
}
