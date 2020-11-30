import ElementPlus from 'element-plus'
import 'element-plus/lib/theme-chalk/index.css'

export function setup(app) {
  app.use(ElementPlus, { size: 'small' })
}
