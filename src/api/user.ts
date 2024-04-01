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
    url: '/passport/unlockScreen',
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
    url: '/passport/updateAccount',
    method: 'post',
    data,
  })
}
// 更新用户密码
export function updatePwd(data: any) {
  return request({
    url: '/passport/updatePwd',
    method: 'post',
    data,
  })
}

export function getOtpConfig() {
  return request({
    url: '/passport/getOtpConfig',
    method: 'get',
  })
}

// openOtp
export function openAdminOtp(data: any) {
  return request({
    url: '/passport/openOtp',
    method: 'post',
    data,
  })
}

// openOtp
export function closeAdminOtp() {
  return request({
    url: '/passport/closeOtp',
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
    url: '/passport/getLoginLog',
    method: 'get',
    params: params,
  })
}
