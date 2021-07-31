import store from '@/store'
import { errorLog } from '@/config'
import { isArray } from '@/utils/validate'

export const needErrorLog = () => {
  const errorLogArray = isArray(errorLog) ? [...errorLog] : [...[errorLog]]
  return errorLogArray.includes(process.env.NODE_ENV)
}

export const addErrorLog = (err) => {
  // eslint-disable-next-line no-console
  if (!err.isRequest) console.error('vue-admin-beautiful错误拦截:', err)
  const url = window.location.href
  store.dispatch('errorLog/addErrorLog', { err, url }).then(() => {})
}

export function setup(app) {
  if (needErrorLog()) {
    app.config.errorHandler = addErrorLog
  }
}
