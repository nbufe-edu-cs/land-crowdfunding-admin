import request from './request'

export function listLands(index, pageSize, userId, status) {
    return request({
        url: '/land/manage/list',
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
        url: '/land/manage',
        method: 'post',
        data: land
    })
}

export function deleteLand(landId) {
    return request({
        url: '/land/manage',
        method: 'delete',
        params: {
            landId: landId
        }
    })
}

export function searchLand(index, pageSize, landName) {
    return request({
        url: '/land/manage/search',
        method: 'post',
        params: {
            index: index,
            pageSize: pageSize,
            landName: landName
        }
    })
}

export function updateLandStatus(landId, status) {
    return request({
        url: '/land/manage/status',
        method: 'post',
        params: {
            landId: landId,
            status: status
        }
    })
}

