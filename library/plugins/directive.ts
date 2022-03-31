import type { App, DirectiveBinding } from 'vue'
import { hasPermission } from '@/utils/permission'

export function setup(app: App<Element>) {
  /**
   * @description 自定义指令v-permissions
   */
  app.directive('permissions', {
    mounted(el, binding: DirectiveBinding) {
      const { value } = binding
      if (value)
        if (!hasPermission(value))
          el.parentNode && el.parentNode.removeChild(el)
    },
  })
}
