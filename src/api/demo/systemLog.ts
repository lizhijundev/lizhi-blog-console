import request from '@/utils/request.ts'

export function getList(params?: any) {
  return request({
    url: '/systemLog/getList',
    method: 'get',
    params,
  })
}
