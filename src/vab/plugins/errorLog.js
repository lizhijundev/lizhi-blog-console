import store from '@/store'
import { errorLog } from '@/config'
import { isArray, isString } from '@/utils/validate'

export function setup(app) {
  const needErrorLog = errorLog
  const checkNeed = () => {
    const env = process.env.NODE_ENV
    if (isString(needErrorLog)) {
      return env === needErrorLog
    }
    if (isArray(needErrorLog)) {
      return needErrorLog.includes(env)
    }
    return false
  }
  if (checkNeed()) {
    app.config.errorHandler = (err, vm, info) => {
      // eslint-disable-next-line no-console
      console.error('vue-admin-beautiful错误拦截:', err, vm, info)
      const url = window.location.href
      store
        .dispatch('errorLog/addErrorLog', { err, vm, info, url })
        .then(() => {})
    }
  }
}
