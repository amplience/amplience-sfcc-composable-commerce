import { ContentClient } from 'dc-delivery-sdk-js';
import { app } from '../../config/default';

/*
Make a service to set VSE on it...
This should be where the VSE is checked generically.
Get from URL first - Store in storage
Get from storage
Clear functionality would need to be there too.
*/

const client: ContentClient = new ContentClient({ hubName: app.amplience.hub });
export type IdOrKey = { id: string } | { key: string }
async function fetchContent(args: IdOrKey[], locale = 'en-US') {
    let responses = await (await client.getContentItems(args, {locale})).responses
    return responses.map(response => {
        if ('content' in response) {
            return response.content
        }
        return response.error
    })
}
export default fetchContent;