// @ts-nocheck
import { isExternal, isPassword, isNumber } from '@/utils/validate'

/**
 * @description 判读是否为外链
 * @param path
 * @returns {boolean}
 */
describe('Utils:isExternal', () => {
  it('isExternal', () => {
    expect(isExternal('https://baidu.com')).toBe(true)
    expect(isExternal('baidu.com')).toBe(false)
  })
})

/**
 * @description 校验密码是否小于6位
 * @param value
 * @returns {boolean}
 */
describe('Utils:isPassword', () => {
  it('isPassword', () => {
    expect(isPassword('123456')).toBe(true)
    expect(isPassword('12345')).toBe(false)
  })
})

/**
 * @description 判断是否为数字
 * @param value
 * @returns {boolean}
 */

describe('Utils:isNumber', () => {
  it('isNumber', () => {
    expect(isNumber('123456')).toBe(true)
    expect(isNumber('abcd')).toBe(false)
  })
})
