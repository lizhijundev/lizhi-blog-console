import request from '@/utils/request.ts'

export function getList() {
  return request({
    url: '/router/getList',
    method: 'get',
  })
}
