/**
 * @description 异常捕获的状态拦截，请勿修改
 */

export const useErrorLogStore = defineStore('errorLog', {
  state: () => ({
    errorLogs: [],
  }),
  getters: {
    getErrorLogs: (state) => state.errorLogs,
  },
  actions: {
    addErrorLog(errorLog) {
      this.errorLogs.push(errorLog)
    },
    clearErrorLog() {
      this.errorLogs.splice(0)
    },
  },
})
