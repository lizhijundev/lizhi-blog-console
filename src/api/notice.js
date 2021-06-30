import request from '@/utils/request'

export function getList() {
  return request({
    url: '/notice/getList',
    method: 'get',
  })
}
