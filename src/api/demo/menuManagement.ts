import request from '@/utils/request.ts'

export function getTree(params?: any) {
  return request({
    url: '/menuManagement/getTree',
    method: 'get',
    params,
  })
}

export function doEdit(data: any) {
  return request({
    url: '/menuManagement/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data: any) {
  return request({
    url: '/menuManagement/doDelete',
    method: 'post',
    data,
  })
}
