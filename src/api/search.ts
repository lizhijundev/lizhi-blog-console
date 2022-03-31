import request from '@/utils/request'

export function getList() {
  return request({
    url: '/search/getList',
    method: 'get',
  })
}
