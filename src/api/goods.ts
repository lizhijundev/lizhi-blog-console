import request from '@/utils/request'

export function getList(params: any) {
  return request({
    url: '/goods/getList',
    method: 'get',
    params,
  })
}
