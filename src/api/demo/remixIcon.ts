import request from '@/utils/request.ts'

export function getIconList(params?: any) {
  return request({
    url: '/remixIcon/getList',
    method: 'get',
    params,
  })
}
