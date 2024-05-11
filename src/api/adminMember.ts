import request from '@/utils/request'

export async function getAdminMemberList(params: any) {
  return request({
    url: '/admin/admin_member/index',
    method: 'get',
    params,
  })
}

export async function saveAdminMember(data: any) {
  return request({
    url: '/admin/admin_member/save',
    method: 'post',
    data,
  })
}

export async function resetAdminMemberPassword(admin_id: number, password: string, confirm_password: string) {
  return request({
    url: '/admin/admin_member/reset_password',
    method: 'post',
    data: {
      admin_id,
      password,
      password2: confirm_password,
    },
  })
}

export async function deleteAdminMember(admin_id: number) {
  return request({
    url: '/admin/admin_member/delete',
    method: 'get',
    params: {
      admin_id,
    },
  })
}
