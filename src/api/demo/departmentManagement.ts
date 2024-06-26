import request from '@/utils/request.ts'

export function getList(params?: any) {
  return request({
    url: '/departmentManagement/getList',
    method: 'get',
    params,
  })
}

export function doEdit(data: any) {
  return request({
    url: '/departmentManagement/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data: any) {
  return request({
    url: '/departmentManagement/doDelete',
    method: 'post',
    data,
  })
}
