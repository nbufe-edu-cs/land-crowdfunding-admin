import request from './request'

export function listLands(index, pageSize, userId, status) {
    return request({
        url: '/land/list',
        method: 'get',
        params: {
            index: index,
            pageSize: pageSize,
            userId: userId,
            status: status
        }
    })
}

export function saveLand(land) {
    return request({
        url: '/land',
        method: 'post',
        data: land
    })
}

export function deleteLand(landId) {
    return request({
        url: '/land',
        method: 'delete',
        params: {
            landId: landId
        }
    })
}
