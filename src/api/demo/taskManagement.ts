import request from '@/utils/request.ts'

export function getList(params?: any) {
  return request({
    url: '/taskManagement/getList',
    method: 'get',
    params,
  })
}
