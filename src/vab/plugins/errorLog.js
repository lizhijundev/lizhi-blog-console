import store from '@/store'
import { errorLog } from '@/config'
import { isArray } from '@/utils/validate'

export const checkNeed = () => {
  const errorLogArray = isArray(errorLog) ? [...errorLog] : [...[errorLog]]
  return errorLogArray.includes(process.env.NODE_ENV)
}

export function setup(app) {
  if (checkNeed()) {
    app.config.errorHandler = (err) => {
      // eslint-disable-next-line no-console
      console.error('vue-admin-beautiful错误拦截:', err)
      const url = window.location.href
      store.dispatch('errorLog/addErrorLog', { err, url }).then(() => {})
    }
  }
}
