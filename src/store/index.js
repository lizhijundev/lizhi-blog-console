/**
 * @description 导入所有 pinia 模块，请勿修改。
 */
import { createPinia } from 'pinia'

const pinia = createPinia()

export function setupStore(app) {
  app.use(pinia)
}

export default pinia
