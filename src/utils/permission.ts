import { useAclStore } from '@/store/modules/acl'

/**
 * 是否可以访问目标权限元素
 * @param targetRoleOrPermission 目标(路由|按钮)要求权限
 * @returns {boolean} 满足访问条件
 */
export function hasPermission(targetRoleOrPermission: string[] | GuardType) {
  const { getAdmin, getRole, getPermission } = useAclStore()
  if (getAdmin) return true
  if (Array.isArray(targetRoleOrPermission)) {
    return can([...getRole, ...getPermission], {
      permission: targetRoleOrPermission,
      mode: 'oneOf',
    })
  } else {
    const {
      role = [],
      permission = [],
      mode = 'oneOf',
    } = targetRoleOrPermission
    return can([mode !== 'except'], {
      permission: [
        can(getRole, { permission: role, mode }),
        can(getPermission, { permission, mode }),
      ],
      mode,
    })
  }
}

/**
 * 检查是否满足权限
 * @param roleOrPermission 当前用户权限
 * @param target 目标(路由|按钮)要求权限
 * @returns {boolean} 满足访问条件
 */
function can(roleOrPermission: (string | boolean)[], target: CanType): boolean {
  let hasRole = false
  const { permission = [], mode = 'oneOf' } = target
  if (mode === 'allOf')
    hasRole = permission.every((item: string | boolean) =>
      roleOrPermission.includes(item)
    )
  if (mode === 'oneOf')
    hasRole = permission.some((item: string | boolean) =>
      roleOrPermission.includes(item)
    )
  if (mode === 'except')
    hasRole = !permission.every((item: string | boolean) =>
      roleOrPermission.includes(item)
    )
  return hasRole
}
