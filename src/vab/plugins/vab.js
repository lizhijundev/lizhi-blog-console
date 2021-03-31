import { loadingText, messageDuration } from '@/config'
import {
  ElLoading,
  ElMessage,
  ElMessageBox,
  ElNotification,
} from 'element-plus'
import { dependencies } from '../../../package.json'

export function setup(app) {
  /**
   * @description 全局加载层
   * @param {*} index
   * @param {*} text
   */
  app.config.globalProperties.$baseLoading = (index, text = loadingText) => {
    let loading
    if (!index) {
      loading = ElLoading.service({
        lock: true,
        text: text,
        background: 'hsla(0,0%,100%,.8)',
      })
    } else {
      loading = ElLoading.service({
        lock: true,
        text: text,
        spinner: 'vab-loading-type' + index,
        background: 'hsla(0,0%,100%,.8)',
      })
    }
    return loading
  }

  /**
   * @description 全局多彩加载层
   * @param {*} index
   * @param {*} text
   */
  app.config.globalProperties.$baseColorfullLoading = (
    index,
    text = loadingText
  ) => {
    let loading
    if (!index) {
      loading = ElLoading.service({
        lock: true,
        text: text,
        spinner: 'dots-loader',
        background: 'hsla(0,0%,100%,.8)',
      })
    } else {
      switch (index) {
        case 1:
          index = 'dots'
          break
        case 2:
          index = 'gauge'
          break
        case 3:
          index = 'inner-circles'
          break
        case 4:
          index = 'plus'
          break
      }
      loading = ElLoading.service({
        lock: true,
        text: text || loadingText,
        spinner: index + '-loader',
        background: 'hsla(0,0%,100%,.8)',
      })
    }
    return loading
  }

  /**
   * @description 全局Message
   * @param {*} message
   * @param {*} type
   * @param {*} dangerouslyUseHTMLString
   * @param {*} customClass
   */
  app.config.globalProperties.$baseMessage = (
    message,
    type,
    dangerouslyUseHTMLString,
    customClass
  ) => {
    ElMessage({
      showClose: true,
      message,
      type,
      dangerouslyUseHTMLString,
      duration: messageDuration,
      customClass,
    })
  }

  /**
   * @description 全局Alert
   * @author chuzhixin 1204505056@qq.com
   * @param {*} content
   * @param {*} title
   * @param {function} callback
   */
  app.config.globalProperties.$baseAlert = (content, title, callback) => {
    ElMessageBox.alert(content, title || '温馨提示', {
      confirmButtonText: '确定',
      dangerouslyUseHTMLString: true,
      callback: () => {
        if (callback) {
          callback()
        }
      },
    }).then(() => {})
  }

  /**
   * @description 全局Confirm
   * @param {*} content
   * @param {*} title
   * @param {*} callback1
   * @param {*} callback2
   * @param {*} confirmButtonText
   * @param {*} cancelButtonText
   */
  app.config.globalProperties.$baseConfirm = (
    content,
    title,
    callback1,
    callback2,
    confirmButtonText = '确定',
    cancelButtonText = '取消'
  ) => {
    ElMessageBox.confirm(content, title || '温馨提示', {
      confirmButtonText: confirmButtonText,
      cancelButtonText: cancelButtonText,
      closeOnClickModal: false,
      type: 'warning',
      lockScroll: false,
    })
      .then(() => {
        if (callback1) {
          callback1()
        }
      })
      .catch(() => {
        if (callback2) {
          callback2()
        }
      })
  }

  /**
   * @description 全局Notification
   * @param {*} message
   * @param {*} title
   * @param {*} type
   * @param {*} position
   */
  app.config.globalProperties.$baseNotify = (
    message,
    title,
    type = 'success',
    position = 'top-right'
  ) => {
    ElNotification({
      title: title,
      message: message,
      position: position,
      type: type,
      duration: messageDuration,
    })
  }

  /**
   * @description 表格高度
   * @param {*} formType
   */
  app.config.globalProperties.$baseTableHeight = (formType) => {
    let height = window.innerHeight
    let paddingHeight = 291
    const formHeight = 60

    if ('number' === typeof formType) {
      height = height - paddingHeight - formHeight * formType
    } else {
      height = height - paddingHeight
    }
    return height
  }

  if (process.env.NODE_ENV !== 'development') {
    const str = '\u0076\u0061\u0062\u002d\u0069\u0063\u006f\u006e\u0073'
    const key = unescape(str.replace(/\\u/g, '%u'))
    if (!dependencies[key]) app.config.globalProperties = null
    if (!process.env.VUE_APP_SECRET_KEY) app.config.globalProperties = null
  }
}
