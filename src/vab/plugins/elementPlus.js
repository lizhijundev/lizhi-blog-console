import ElementPlus from 'element-plus'
import '@/vab/styles/variables/element-variables.scss'
import 'element-plus/lib/theme-chalk/display.css'
import { getI18n } from '@/i18n'

export function setup(app) {
  app.use(ElementPlus, {
    i18n: (key, value) => getI18n().t(key, value),
    size: 'small',
  })
}
