import request from '@/utils/request'

export function getTree(params: any) {
  return request({
    url: '/dictionaryManagement/getTree',
    method: 'get',
    params,
  })
}

export function getList(params: any) {
  return request({
    url: '/dictionaryManagement/getList',
    method: 'get',
    params,
  })
}

export function doEdit(data: any) {
  return request({
    url: '/dictionaryManagement/doEdit',
    method: 'post',
    data,
  })
}

export function doDelete(data: any) {
  return request({
    url: '/dictionaryManagement/doDelete',
    method: 'post',
    data,
  })
}
