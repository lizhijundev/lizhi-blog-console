import { hasAccess } from '@/utils/hasAccess'

export function setup(app) {
  /**
   * @description 自定义指令v-permissions
   */
  app.directive('permissions', {
    mounted(el, binding) {
      let { value } = binding
      if (value) {
        if (!hasAccess(value)) {
          el.parentNode && el.parentNode.removeChild(el)
        }
      }
    },
  })
}
