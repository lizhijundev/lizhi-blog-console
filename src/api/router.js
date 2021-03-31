import request from '@/utils/request'

export function getRouterList(params) {
  return request({
    url: '/router/getList',
    method: 'get',
    params,
  })
}
