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

export function logout() {
  return request({
    url: '/passport/logout',
    method: 'get',
  })
}
