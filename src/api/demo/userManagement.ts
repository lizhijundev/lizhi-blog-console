import request from '@/utils/request.ts'

export function getList(params?: any) {
  return request({
    url: '/userManagement/getList',
    method: 'get',
    params,
  })
}

export function doEdit(data: any) {
  return request({
    url: '/userManagement/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data: any) {
  return request({
    url: '/userManagement/doDelete',
    method: 'post',
    data,
  })
}
