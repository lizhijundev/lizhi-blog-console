import pinia from '@/store'
import { useErrorLogStore } from '@/store/modules/errorLog'
import { errorLog } from '@/config'
import { isArray } from '@/utils/validate'

export const needErrorLog = () => {
  const errorLogArray = isArray(errorLog) ? [...errorLog] : [...[errorLog]]
  return errorLogArray.includes(process.env.NODE_ENV)
}

export const addErrorLog = (err) => {
  // eslint-disable-next-line no-console
  if (!err.isRequest) console.error('vue-admin-better错误拦截:', err)
  const url = window.location.href
  const { addErrorLog } = useErrorLogStore(pinia)
  addErrorLog({ err, url })
}

export function setup(app) {
  if (needErrorLog()) {
    app.config.errorHandler = addErrorLog
  }
}
