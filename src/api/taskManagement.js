import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/taskManagement/getList',
    method: 'get',
    params,
  })
}
