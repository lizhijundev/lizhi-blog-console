import request from '@/utils/request'

export async function getAdminRuleList() {
  return request({
    url: '/admin_rule/index',
    method: 'get',
  })
}

export async function getAdminRuleTree() {
  return request({
    url: '/admin_rule/get_rule_tree',
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
