import App from './App.vue'
import store from './store'
import router from './router'
import { createApp } from 'vue'
import { setupVab } from '@/vab'

/**
 * @description 正式环境默认使用mock，正式项目记得注释后再打包
 */
if (process.env.NODE_ENV === 'production') {
  const { mockXHR } = require('@/utils/static')
  mockXHR()
}

const app = createApp(App)

setupVab(app)
app.use(store)
app.use(router)
app.mount('#vue-admin-beautiful-pro')
