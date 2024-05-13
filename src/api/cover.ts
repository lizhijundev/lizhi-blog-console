import request from '@/utils/request'

/**
 * 获取文章分类列表
 */
export async function getCoverList(params: any) {
  return request({
    url: '/admin/cover/index',
    method: 'get',
    params,
  })
}

/**
 * 保存文章分类
 * @param data
 */
export async function saveCover(data: any) {
  return request({
    url: '/admin/cover/save',
    method: 'post',
    data,
  })
}
