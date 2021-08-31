import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/router/getList',
    method: 'get',
    params,
  })
}
