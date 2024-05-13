import request from '@/utils/request'

export async function uploadFile(data: any) {
  return request({
    url: '/admin/upload/upload',
    method: 'post',
    data,
  })
}
