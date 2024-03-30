import request from '@/utils/request.ts'

export function getPublicKey() {
  return request({
    url: '/publicKey',
    method: 'get',
  })
}
