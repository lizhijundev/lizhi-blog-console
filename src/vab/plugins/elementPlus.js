import ElementPlus from 'element-plus'
import 'element-plus/packages/theme-chalk/src/index.scss'

export function setup(app) {
  app.use(ElementPlus, {
    size: 'small',
  })
}
