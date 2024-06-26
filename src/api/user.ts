import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA } from '@/config'

export async function login(data: any) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request({
    url: '/admin/passport/login',
    method: 'post',
    data,
  })
}
export async function loginByOtp(data: any) {
  return request({
    url: '/admin/passport/login_by_otp',
    method: 'post',
    data,
  })
}

export async function unlockScreen(data: any) {
  return request({
    url: '/admin/passport/unlock_screen',
    method: 'post',
    data,
  })
}

export async function socialLogin(data: any) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request({
    url: '/admin/socialLogin',
    method: 'post',
    data,
  })
}

export function getUserInfo() {
  return request({
    url: '/admin/passport/info',
    method: 'get',
  })
}

// 更新用户基本信息
export function updateAccount(data: any) {
  return request({
    url: '/admin/passport/update_account',
    method: 'post',
    data,
  })
}
// 更新用户密码
export function updatePwd(data: any) {
  return request({
    url: '/admin/passport/update_pwd',
    method: 'post',
    data,
  })
}

export function getOtpConfig() {
  return request({
    url: '/admin/passport/get_otp_config',
    method: 'get',
  })
}

// openOtp
export function openAdminOtp(data: any) {
  return request({
    url: '/admin/passport/open_otp',
    method: 'post',
    data,
  })
}

// openOtp
export function closeAdminOtp() {
  return request({
    url: '/admin/passport/close_otp',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/admin/passport/logout',
    method: 'get',
  })
}

export function getLoginLog(params: any) {
  return request({
    url: '/admin/passport/get_login_log',
    method: 'get',
    params: params,
  })
}

export function getRouterList() {
  return request({
    url: '/admin/passport/get_router_list',
    method: 'get',
  })
}
