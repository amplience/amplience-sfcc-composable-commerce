export const getImageUrl = ({defaultHost, endpoint, name} = {}) => {
    return `https://${defaultHost}/i/${endpoint}/${name}`
}
