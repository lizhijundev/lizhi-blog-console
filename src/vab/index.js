// 加载雪碧图
import '@/icon'
// 加载全局样式样式
import './styles/vab.scss'

// 加载VabIcon
import VabIcon from 'vab-icons'
import 'vab-icons/lib/vab-icons.css'

export function setupVab(app) {
  app.component('VabIcon', VabIcon)

  // 加载主题
  const Themes = require.context('./styles/themes', false, /\.scss$/)
  Themes.keys().map(Themes)

  // 加载插件
  const Plugins = require.context('./plugins', true, /\.js$/)
  Plugins.keys().forEach((key) => Plugins(key).setup(app))

  // 加载组件
  const Components = require.context('.', true, /\.vue$/)
  Components.keys()
    .map(Components)
    .forEach((_) => {
      app.component(_.default.name, _.default)
    })
}
