/**
 * @description tabsBar标签页逻辑，如无必要请勿修改
 */
export const useTabsStore = defineStore('tabs', {
  state: () => ({
    visitedRoutes: [],
  }),
  getters: {
    getVisitedRoutes: (state) =>
      state.visitedRoutes.filter((route) => route.name !== 'Login'),
  },
  actions: {
    /**
     * @description 添加标签页
     * @param {*} route
     * @returns
     */
    addVisitedRoute(route) {
      const target = this.visitedRoutes.find((item) => item.path === route.path)
      if (target && !route.meta.dynamicNewTab) Object.assign(target, route)
      else if (!target) this.visitedRoutes.push(Object.assign({}, route))

      //应对极特殊情况：没有配置noClosable的情况，默认使当前tab不可关闭
      if (!this.visitedRoutes.find((route) => route.meta.noClosable))
        this.visitedRoutes[0].meta.noClosable = true
    },
    /**
     * @description 删除当前标签页
     * @param {*} path
     * @returns
     */
    delVisitedRoute(path) {
      this.visitedRoutes = this.visitedRoutes.filter(
        (route) => route.path !== path
      )
    },
    /**
     * @description 删除当前标签页以外其它全部标签页
     * @param {*} path
     * @returns
     */
    delOthersVisitedRoutes(path) {
      this.visitedRoutes = this.visitedRoutes.filter(
        (route) => route.meta.noClosable || route.path === path
      )
    },
    /**
     * @description 删除当前标签页左边全部标签页
     * @param {*} path
     * @returns
     */
    delLeftVisitedRoutes(path) {
      let found = false
      this.visitedRoutes = this.visitedRoutes.filter((route) => {
        if (route.path === path) found = true
        return route.meta.noClosable || found
      })
    },
    /**
     * @description 删除当前标签页右边全部标签页
     * @param {*} path
     * @returns
     */
    delRightVisitedRoutes(path) {
      let found = false
      this.visitedRoutes = this.visitedRoutes.filter((route) => {
        const close = found
        if (route.path === path) found = true
        return route.meta.noClosable || !close
      })
    },
    /**
     * @description 删除全部标签页
     * @returns
     */
    delAllVisitedRoutes() {
      this.visitedRoutes = this.visitedRoutes.filter(
        (route) => route.meta.noClosable
      )
    },
    /**
     * @description 修改 meta
     * @param options
     */
    changeTabsMeta(options) {
      function handleVisitedRoutes(visitedRoutes) {
        return visitedRoutes.map((route) => {
          if (route.name === options.name || route.meta.title === options.title)
            Object.assign(route.meta, options.meta)
          if (route.children && route.children.length)
            route.children = handleVisitedRoutes(route.children)
          return route
        })
      }
      this.visitedRoutes = handleVisitedRoutes(this.visitedRoutes)
    },
  },
})
