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
