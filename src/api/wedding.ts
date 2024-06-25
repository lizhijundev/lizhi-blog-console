import request from '@/utils/request'

/**
 * 获取日历列表
 */
export async function getWeddingMessageList(params: any) {
  return request({
    url: '/admin/wedding/messages',
    method: 'get',
    params,
  })
}

/**
 * 获取日历列表
 */
export async function getWeddingInviteData() {
  return request({
    url: '/admin/wedding/invite_num',
    method: 'get'
  })
}
