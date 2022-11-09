export const getImageUrl = ({defaultHost, endpoint, name} = {}) => {
    if (defaultHost && endpoint && name) {
        return `https://${defaultHost}/i/${endpoint}/${name}`
    }
    return ''
}

export const getVideoUrl = ({defaultHost, endpoint, name} = {}) => {
    if (defaultHost && endpoint && name) {
        return `https://${defaultHost}/v/${endpoint}/${name}`
    }
    return ''
}
