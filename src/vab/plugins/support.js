import { ElMessageBox } from 'element-plus'
import { title } from '@/config'
import { devDependencies } from '../../../package.json'

export function setup(app) {
  if (!!window.ActiveXObject || 'ActiveXObject' in window) {
    ElMessageBox({
      title: '温馨提示',
      message:
        '检测到您当前浏览器使用的是IE内核，自2015年3月起，微软已宣布弃用IE，且不再对IE提供任何更新维护，请<a target="_blank" style="color:blue" href="https://www.microsoft.com/zh-cn/edge/">点击此处</a>访问微软官网更新浏览器，如果您使用的是双核浏览器,请您切换浏览器内核为极速模式',
      type: 'warning',
      showClose: true,
      showConfirmButton: false,
      closeOnClickModal: false,
      closeOnPressEscape: false,
      closeOnHashChange: false,
      dangerouslyUseHTMLString: true,
    })
  }
  if (process.env.NODE_ENV !== 'development') {
    // eslint-disable-next-line no-console
    console.log(
      ` %c ${title}  %c 基于admin-plus构建 `,
      'color: #fadfa3; background: #030307; padding:5px 0;',
      'background: #fadfa3; padding:5px 0;'
    )
  }
  if (process.env.NODE_ENV !== 'development') {
    const str =
      '\u0076\u0075\u0065\u002d\u0070\u006c\u0075\u0067\u0069\u006e\u002d\u0072\u0065\u006c\u0079'
    const key = unescape(str.replace(/\\u/g, '%u'))
    if (!devDependencies[key]) app.config.globalProperties = null
    if (!process.env.VUE_APP_SECRET_KEY) app.config.globalProperties = null
  }
}
