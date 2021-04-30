import request from '@/utils/request'

export function refreshToken() {
  return request({
    url: '/refreshToken',
    method: 'get',
  })
}
