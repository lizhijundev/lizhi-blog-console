import request from '@/utils/request'

export function getList(params: any) {
  return request({
    url: '/table/getList',
    method: 'get',
    params,
  })
}

export function doEdit(data: any) {
  return request({
    url: '/table/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data: any) {
  return request({
    url: '/table/doDelete',
    method: 'post',
    data,
  })
}
