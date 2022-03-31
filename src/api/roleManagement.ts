import request from '@/utils/request'

export function getList(params: any) {
  return request({
    url: '/roleManagement/getList',
    method: 'get',
    params,
  })
}

export function doEdit(data: any) {
  return request({
    url: '/roleManagement/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data: any) {
  return request({
    url: '/roleManagement/doDelete',
    method: 'post',
    data,
  })
}
