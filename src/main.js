import App from './App.vue'
import { setupVab } from '@vab/setup'
import { setupStore } from '@/store'
import { setupRouter } from '@/router'
import { createHead } from '@vueuse/head'

/**
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
import { baseURL, pwa } from './config'
import { isExternal } from '@/utils/validate'

const app = createApp(App)

const head = createHead()
app.use(head)

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

if (pwa) require('./registerServiceWorker')

setupVab(app)
setupStore(app)
setupRouter(app)
  .isReady()
  .then(() => app.mount('#app'))
