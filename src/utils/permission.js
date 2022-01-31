import { isArray } from '@/utils/validate'
import { useAclStore } from '@/store/modules/acl'

/**
 * 是否可以访问目标权限元素
 * @param target 目标(路由|按钮)要求权限
 * @returns {boolean} 满足访问条件
 */
export function hasPermission(target) {
  const { getAdmin, getRole, getPermission } = useAclStore()
  if (getAdmin) return true
  if (isArray(target) && target.length > 0)
    return can([...getRole, ...getPermission], {
      permission: target,
      mode: 'oneOf',
    })
  const { role, permission, mode = 'oneOf' } = target
  return can([mode !== 'except'], {
    permission: [
      role ? can(getRole, { permission: role, mode }) : false,
      permission ? can(getPermission, { permission, mode }) : false,
    ],
    mode,
  })
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
    hasRole = !permission.every((item) => roleOrPermission.includes(item))
  return hasRole
}
