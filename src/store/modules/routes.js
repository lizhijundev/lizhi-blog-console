/**
 * @description 路由拦截状态管理，目前两种模式：all模式与intelligence模式，其中partialRoutes是菜单暂未使用
 */
import { asyncRoutes, constantRoutes, resetRouter } from '@/router'
import { getRouterList } from '@/api/router'
import { convertRouter, filterRoutes } from '@/utils/routes'
import { authentication, rolesControl } from '@/config'
import { isArray } from '@/utils/validate'
import { gp } from '@vab'

const state = () => ({
  routes: [],
  activeName: '',
})
const getters = {
  routes: (state) => state.routes,
  activeName: (state) => state.activeName,
}
const mutations = {
  /**
   * @description 多模式设置路由
   * @param {*} state
   * @param {*} routes
   */
  setRoutes(state, routes) {
    state.routes = routes
  },
  /**
   * @description 修改Meta
   * @param {*} state
   * @param options
   */
  changeMenuMeta(state, options) {
    function handleRoutes(routes) {
      return routes.map((route) => {
        if (route.name === options.name) Object.assign(route.meta, options.meta)
        if (route.children && route.children.length)
          route.children = handleRoutes(route.children)
        return route
      })
    }

    state.routes = handleRoutes(state.routes)
  },
  /**
   * @description 修改 activeName
   * @param {*} state
   * @param activeName 当前激活菜单
   */
  changeActiveName(state, activeName) {
    state.activeName = activeName
  },
}
const actions = {
  /**
   * @description 多模式设置路由
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
      const {
        data: { list },
      } = await getRouterList()
      if (!isArray(list))
        gp.$baseMessage('路由格式返回有误！', 'error', 'vab-hey-message-error')
      if (list[list.length - 1].path !== '*')
        list.push({
          path: '/:pathMatch(.*)*',
          redirect: '/404',
          name: 'NotFound',
          meta: { hidden: true },
        })
      routes = convertRouter(list)
    }
    // 根据权限和rolesControl过滤路由
    const accessRoutes = filterRoutes([...constantRoutes, ...routes], control)
    // 设置菜单所需路由
    commit('setRoutes', JSON.parse(JSON.stringify(accessRoutes)))
    // 根据可访问路由重置Vue Router
    await resetRouter(accessRoutes)
  },
  /**
   * @description 修改Route Meta
   * @param {*} { commit }
   * @param options
   */
  changeMenuMeta({ commit }, options = {}) {
    commit('changeMenuMeta', options)
  },
  /**
   * @description 修改 activeName
   * @param {*} { commit }
   * @param activeName 当前激活菜单
   */
  changeActiveName({ commit }, activeName) {
    commit('changeActiveName', activeName)
  },
}
export default { state, getters, mutations, actions }
