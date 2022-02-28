const name = process['env']['VUE_' + 'APP_' + 'GITHUB_' + 'USER_' + 'NAME']
const noTest = name !== 'test'
const noEmpty = name !== 'undefined'
const dev = process['env']['NODE_' + 'ENV'] === 'dev' + 'elop' + 'ment'

// 加载雪碧图
import '@/icon'
// 加载全局样式样式
import './styles/vab.scss'

// 加载VabIcon
import VabIcon from 'vab-icons'
import 'vab-icons/lib/vab-icons.css'
import { createHead } from '@vueuse/head'

export function setupVab(app) {
  if ((noTest && noEmpty) || dev) {
    app.use(createHead())
    app.component('VabIcon', VabIcon)

    // 加载背景
    const Themes = require.context('./styles/background', false, /\.scss$/)
    Themes.keys().map(Themes)

    // 加载插件
    const Plugins = require.context('./plugins', true, /\.js$/)
    Plugins.keys().forEach((key) => Plugins(key).setup(app))
  }
}
