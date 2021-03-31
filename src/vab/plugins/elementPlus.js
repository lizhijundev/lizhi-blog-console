import i18n from '@/i18n'
import ElementPlus from 'element-plus'
import '@/vab/styles/variables/element-variables.scss'
import 'element-plus/lib/theme-chalk/display.css'

export function setup(app) {
  app.use(ElementPlus, {
    size: 'small',
    i18n: i18n.global.t,
  })
}
