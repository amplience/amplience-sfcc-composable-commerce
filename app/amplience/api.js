import { ContentClient } from 'dc-delivery-sdk-js';


/*
Make a service to set VSE on it...
This should be where the VSE is checked generically.
Get from URL first - Store in storage
Get from storage
Clear functionality would need to be there too.
*/



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