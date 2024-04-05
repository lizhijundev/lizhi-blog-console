import request from '@/utils/request'

export async function getAdminRuleList(params: any) {
  return request({
    url: '/admin_rule/index',
    method: 'get',
    params,
  })
}

export async function getAdminRuleTree() {
  return request({
    url: '/admin_rule/getRuleTree',
    method: 'get',
  })
}
export async function saveAdminRule(data: any) {
  return request({
    url: '/admin_rule/save',
    method: 'post',
    data,
  })
}
