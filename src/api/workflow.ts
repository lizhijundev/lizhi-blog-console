import request from '@/utils/request'

export function getList(params: any) {
  return request({
    url: '/workflow/getList',
    method: 'get',
    params,
  })
}

export function doEdit(data: any) {
  return request({
    url: '/workflow/doEdit',
    method: 'post',
    data,
  })
}
