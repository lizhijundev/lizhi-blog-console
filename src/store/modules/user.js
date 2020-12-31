/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import { getUserInfo, login, logout } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/token'
import { resetRouter } from '@/router'
import { isArray } from '@/utils/validate'
import { title, tokenName } from '@/config'
import { ElNotification, ElMessage } from 'element-plus'

const state = () => ({
  token: getToken(),
  username: '游客',
  avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
})
const getters = {
  token: (state) => state.token,
  username: (state) => state.username,
  avatar: (state) => state.avatar,
}
const mutations = {
  /**
   * @description 设置token
   * @param {*} state
   * @param {*} token
   */
  setToken(state, token) {
    state.token = token
    setToken(token)
  },
  /**
   * @description 设置用户名
   * @param {*} state
   * @param {*} username
   */
  setUsername(state, username) {
    state.username = username
  },
  /**
   * @description 设置头像
   * @param {*} state
   * @param {*} avatar
   */
  setAvatar(state, avatar) {
    state.avatar = avatar
  },
}
const actions = {
  /**
   * @description 登录拦截放行时，设置虚拟角色
   * @param {*} { commit, dispatch }
   */
  setVirtualRoles({ commit, dispatch }) {
    dispatch('acl/setFull', true, { root: true })
    commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
    commit('setUsername', 'admin(未开启登录拦截)')
  },
  /**
   * @description 登录
   * @param {*} { commit }
   * @param {*} userInfo
   */
  async login({ commit }, userInfo) {
    const { data } = await login(userInfo)
    const token = data[tokenName]
    if (token) {
      commit('setToken', token)
      const hour = new Date().getHours()
      const thisTime =
        hour < 8
          ? '早上好'
          : hour <= 11
          ? '上午好'
          : hour <= 13
          ? '中午好'
          : hour < 18
          ? '下午好'
          : '晚上好'
      ElNotification.success({
        title: `欢迎登录${title}`,
        message: `${thisTime}！`,
        position: 'top-right',
      })
    } else {
      ElMessage.error(`登录接口异常，未正确返回${tokenName}...`)
      return Promise.reject()
    }
  },
  /**
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, dispatch }) {
    const { data } = await getUserInfo()

    /* 如果项目较小用不到权限控制如roles和ability字段，那么可以放开以下注释模拟角色、权限 */
    // data.roles = ['admin']
    // data.ability = ['READ', 'WRITE', 'DELETE']

    const { username, avatar, roles, ability } = data
    // 必须携带username和avatar
    if (
      username &&
      avatar &&
      (!roles || isArray(roles)) &&
      (!ability || isArray(ability))
    ) {
      commit('setUsername', username)
      commit('setAvatar', avatar)
      // 当不传递roles或ability时,默认使用管理员权限,可查看所有路由和按钮
      // 如果不需要权限判断,可以删除条件判断,但不能删除acl/setFull
      if (!roles && !ability) dispatch('acl/setFull', true, { root: true })
      // 当返回数据包含roles(角色)或ability(权限),保存至vuex
      // 如不使用roles权限控制,请不要传递roles,可删除以下代码
      if (roles) dispatch('acl/setRole', roles, { root: true })
      // 如不使用ability权限控制,请不要传递ability,可删除以下代码
      if (ability) dispatch('acl/setAbility', ability, { root: true })
    } else {
      ElMessage.error('getUserInfo核心接口异常，请检查返回JSON格式是否正确')
      return Promise.reject()
    }
  },

  /**
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    await logout(state.token)
    await dispatch('resetAll')
  },
  /**
   * @description 重置token、roles、ability、router、tabsBar等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ commit, dispatch }) {
    commit('setUsername', '游客')
    commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
    await dispatch('setToken', '')
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', null, { root: true })
    await dispatch('acl/setAbility', null, { root: true })
    await dispatch('tabsBar/delAllVisitedRoutes', [], { root: true })
    await resetRouter()
    removeToken()
  },
  /**
   * @description 设置token
   * @param {*} { commit }
   * @param {*} token
   */
  setToken({ commit }, token) {
    commit('setToken', token)
  },
  /**
   * @description 设置头像
   * @param {*} { commit }
   * @param {*} avatar
   */
  setAvatar({ commit }, avatar) {
    commit('setAvatar', avatar)
  },
}
export default { state, getters, mutations, actions }
