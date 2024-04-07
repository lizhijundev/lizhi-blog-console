import request from '@/utils/request'

export async function getAdminRoleList(params: any) {
  return request({
    url: '/admin_role/index',
    method: 'get',
    params,
  })
}

export async function getAdminAllRoleList() {
  return request({
    url: '/admin_role/roleAll',
    method: 'get',
  })
}

export async function saveAdminRole(data: any) {
  return request({
    url: '/admin_role/save',
    method: 'post',
    data,
  })
}
