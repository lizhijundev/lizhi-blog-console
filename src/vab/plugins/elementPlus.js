import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

export function setup(app) {
  app.use(ElementPlus, {
    size: 'small',
  })
}
