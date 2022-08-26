export const getImageUrl = ({defaultHost, endpoint, name} = {}) => {
    if (defaultHost && endpoint && name) {
        return `https://${defaultHost}/i/${endpoint}/${name}`
    }
    return ''
}
