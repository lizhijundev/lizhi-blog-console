import request from '@/utils/request'
import { encryptedData } from '@/utils/encrypt'
import { loginRSA } from '@/config'

export async function login(data: any) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request({
    url: '/passport/login',
    method: 'post',
    data,
  })
}
export async function loginByOtp(data: any) {
  return request({
    url: '/passport/login_by_otp',
    method: 'post',
    data,
  })
}

export async function unlockScreen(data: any) {
  return request({
    url: '/passport/unlock_screen',
    method: 'post',
    data,
  })
}

export async function socialLogin(data: any) {
  if (loginRSA) {
    data = await encryptedData(data)
  }
  return request({
    url: '/socialLogin',
    method: 'post',
    data,
  })
}

export function getUserInfo() {
  return request({
    url: '/passport/info',
    method: 'get',
  })
}

// 更新用户基本信息
export function updateAccount(data: any) {
  return request({
    url: '/passport/update_account',
    method: 'post',
    data,
  })
}
// 更新用户密码
export function updatePwd(data: any) {
  return request({
    url: '/passport/update_pwd',
    method: 'post',
    data,
  })
}

export function getOtpConfig() {
  return request({
    url: '/passport/get_otp_config',
    method: 'get',
  })
}

// openOtp
export function openAdminOtp(data: any) {
  return request({
    url: '/passport/open_otp',
    method: 'post',
    data,
  })
}

// openOtp
export function closeAdminOtp() {
  return request({
    url: '/passport/close_otp',
    method: 'get',
  })
}

export function logout() {
  return request({
    url: '/passport/logout',
    method: 'get',
  })
}

export function getLoginLog(params: any) {
  return request({
    url: '/passport/get_login_log',
    method: 'get',
    params: params,
  })
}

export function getRouterList() {
  return request({
    url: '/passport/get_router_list',
    method: 'get',
  })
}
