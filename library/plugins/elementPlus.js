// https://github.com/element-plus/element-plus/issues/4855
// 自动导入bug，修复后删除library/build/vuePlugins/unplugin/index.js下importStyle
// 并删除本文件
import 'element-plus/dist/index.css'
import 'element-plus/theme-chalk/display.css'

export function setup() {}
