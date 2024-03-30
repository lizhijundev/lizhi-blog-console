import request from '@/utils/request.ts'

export function getList(params?: any) {
  return request({
    url: '/goods/getList',
    method: 'get',
    params,
  })
}
