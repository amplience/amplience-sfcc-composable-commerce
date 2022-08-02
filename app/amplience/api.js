import { ContentClient } from 'dc-delivery-sdk-js';



async function fetchContent(id) {

    const client = new ContentClient({
        hubName: 'nmrsaalphatest',
    });

    console.log(id)

    client
    .getContentItemById(id)
    .then((content) => {
        console.log(content.body);
    })
    .catch((error) => {
        console.log('content not found', error);
    });
}


export default fetchContent;