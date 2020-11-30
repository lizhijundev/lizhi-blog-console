/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */

import { asyncRoutes, constantRoutes, resetRouter } from '@/router'
import { getRouterList } from '@/api/router'
import { convertRouter, filterRoutes } from '@/utils/routes'
import { authentication, rolesControl } from '@/config'
import { isArray } from '@/utils/validate'
import { ElMessage } from 'element-plus'

const state = () => ({
  routes: [],
  partialRoutes: [],
})
const getters = {
  routes: (state) => state.routes,
  partialRoutes: (state) => state.partialRoutes,
}
const mutations = {
  setRoutes(state, routes) {
    state.routes = routes
  },
  setPartialRoutes(state, routes) {
    state.partialRoutes = routes
  },
}
const actions = {
  /**
   * @description 多模式设置路由(默认前端路由,未使用模式可删除相应代码即可)
   * @param {*} { commit }
   * @param mode
   * @returns
   */
  async setRoutes({ commit }, mode = 'none') {
    // 默认前端路由
    let routes = [...asyncRoutes]
    // 设置游客路由关闭路由拦截(不需要可以删除)
    const control = mode === 'visit' ? false : rolesControl
    // 设置后端路由(不需要可以删除)
    if (authentication === 'all') {
      const { data } = await getRouterList()
      if (!isArray(data)) ElMessage.error('路由格式返回有误')
      if (data[data.length - 1].path !== '*')
        data.push({ path: '/*', redirect: '/404', hidden: true })
      routes = convertRouter(data)
    }
    // 根据权限和rolesControl过滤路由
    const finallyRoutes = filterRoutes([...constantRoutes, ...routes], control)
    // 设置菜单所需路由
    commit('setRoutes', finallyRoutes)
    // 根据可访问路由重置Vue Router
    await resetRouter(finallyRoutes)
  },
  /**
   * @description 画廊布局、综合布局设置路由
   * @param {*} { commit }
   * @param accessedRoutes 画廊布局、综合布局设置路由
   */
  setPartialRoutes({ commit }, accessedRoutes) {
    commit('setPartialRoutes', accessedRoutes)
  },
}
export default { state, getters, mutations, actions }
