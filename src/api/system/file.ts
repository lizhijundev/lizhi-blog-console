import request from '@/utils/request'

export async function uploadFile(data: any) {
  return request({
    url: '/admin/upload/upload',
    method: 'post',
    data,
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  })
}

export async function deleteCos(file_path: string) {
  return request({
    url: '/admin/upload/delete_cos',
    method: 'post',
    data: {
      file_path,
    },
  })
}
