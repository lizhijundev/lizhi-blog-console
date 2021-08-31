import store from '@/store'
import { isArray } from '@/utils/validate'

/**
 * 是否可以访问目标权限元素
 * @param target 目标(路由|按钮)要求权限
 * @returns {boolean} 满足访问条件
 */
export function hasPermission(target) {
  if (store.getters['acl/admin']) return true
  if (isArray(target) && target.length > 0)
    return can(
      [...store.getters['acl/role'], ...store.getters['acl/permission']],
      {
        permission: target,
        mode: 'oneOf',
      }
    )
  const { role, permission, mode = 'oneOf' } = target
  let result = true
  if (role)
    result =
      result && can(store.getters['acl/role'], { permission: role, mode })
  if (result && permission)
    result = can(store.getters['acl/permission'], {
      permission,
      mode,
    })
  return result
}

/**
 * 检查是否满足权限
 * @param roleOrPermission 当前用户权限
 * @param target 目标(路由|按钮)要求权限
 * @returns {boolean} 满足访问条件
 */
function can(roleOrPermission, target) {
  let hasRole = false
  const { permission, mode } = target
  if (mode === 'allOf')
    hasRole = permission.every((item) => roleOrPermission.includes(item))
  if (mode === 'oneOf')
    hasRole = permission.some((item) => roleOrPermission.includes(item))
  if (mode === 'except')
    hasRole = !permission.some((item) => roleOrPermission.includes(item))
  return hasRole
}
