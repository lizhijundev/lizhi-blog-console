import request from '@/utils/request.ts'

export function getList() {
  return request({
    url: '/notice/getList',
    method: 'get',
  })
}
