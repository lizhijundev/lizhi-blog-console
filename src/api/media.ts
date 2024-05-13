import request from '@/utils/request'

/**
 * 获取素材列表
 */
export async function getMediaList(params: any) {
  return request({
    url: '/admin/media/index',
    method: 'get',
    params,
  })
}
