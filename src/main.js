import App from './App.vue'
import { createApp } from 'vue'
import { setupVab } from '@/vab'
import { setupI18n } from './i18n'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'

const app = createApp(App)

/**
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
import { baseURL } from './config'
import { isExternal } from '@/utils/validate'
if (process.env.NODE_ENV === 'production' && !isExternal(baseURL)) {
  const { mockXHR } = require('@/utils/static')
  mockXHR()
}
/**
 * @description 生产环境启用组件初始化，编译，渲染和补丁性能跟踪。仅在开发模式和支持 Performance.mark API的浏览器中工作。
 */
if (process.env.NODE_ENV === 'development') {
  app.config.performance = true
}

setupVab(app)
setupI18n(app)
setupStore(app)
setupRouter(app)
  .isReady()
  .then(() => app.mount('#admin-plus'))
