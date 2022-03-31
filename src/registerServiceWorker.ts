/* eslint-disable no-console */
import { register } from 'register-service-worker'
import { gp } from '@gp'

if (process.env.NODE_ENV === 'production') {
  register(`${process.env.BASE_URL}service-worker.js`, {
    ready() {
      console.log(
        'App is being served from cache by a service worker.\n' +
          'For more details, visit https://goo.gl/AFskqB'
      )
    },
    registered() {
      console.log('Service worker has been registered.')
    },
    cached() {
      console.log('Content has been cached for offline use.')
    },
    updatefound() {
      console.log('New content is downloading.')
      // gp.$baseNotify(
      //   '检测到新版本，正在下载中，请稍后...',
      //   '温馨提示',
      //   'info',
      //   'bottom-right',
      //   8000
      // )
    },
    updated() {
      console.log('New content is available; please refresh.')
      gp.$pub('vab-update')

      //如果是演示环境，更新后移除主题，用不到可删除
      if (
        document.domain === 'vue-admin-beautiful.com' ||
        document.domain === 'chu1204505056.gitee.io'
      )
        localStorage.removeItem('theme')
      // gp.$baseNotify(
      //   '更新版本完成，10S后刷新项目',
      //   '温馨提示',
      //   'success',
      //   'bottom-right',
      //   8000
      // )
      // setTimeout(() => {
      //   window.location.reload()
      // }, 10000)
    },
    offline() {
      console.log(
        'No internet connection found. App is running in offline mode.'
      )
    },
    error(error) {
      console.error('Error during service worker registration:', error)
    },
  })
}
