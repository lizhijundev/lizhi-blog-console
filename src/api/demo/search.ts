import request from '@/utils/request.ts'

export function getList() {
  return request({
    url: '/search/getList',
    method: 'get',
  })
}
