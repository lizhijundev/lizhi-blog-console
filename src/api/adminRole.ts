import request from '@/utils/request'

export async function getAdminRoleList(params: any) {
  return request({
    url: '/admin/admin_role/index',
    method: 'get',
    params,
  })
}

export async function getAdminAllRoleList() {
  return request({
    url: '/admin/admin_role/role_all',
    method: 'get',
  })
}

export async function saveAdminRole(data: any) {
  return request({
    url: '/admin/admin_role/save',
    method: 'post',
    data,
  })
}
