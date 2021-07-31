/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import { getUserInfo, login, logout, socialLogin } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/token'
import { resetRouter } from '@/router'
import { isArray, isString } from '@/utils/validate'
import { title, tokenName } from '@/config'
import { gp } from '@vab'

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
    const {
      data: { [tokenName]: token },
    } = await login(userInfo)
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
      gp.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      const err = `登录接口异常，未正确返回${tokenName}...`
      gp.$baseMessage(err, 'error', 'vab-hey-message-error')
      throw err
    }
  },
  /**
   * @description 第三方登录
   * @param {*} {}
   * @param {*} tokenData
   */
  async socialLogin({ commit }, tokenData) {
    const {
      data: { [tokenName]: token },
    } = await socialLogin(tokenData)
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
      gp.$baseNotify(`欢迎登录${title}`, `${thisTime}！`)
    } else {
      const err = `login核心接口异常，请检查返回JSON格式是否正确，是否正确返回${tokenName}...`
      gp.$baseMessage(err, 'error', 'vab-hey-message-error')
      throw err
    }
  },
  /**
   * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
   * @param {*} { commit, dispatch, state }
   * @returns
   */
  async getUserInfo({ commit, dispatch }) {
    const {
      data: { username, avatar, roles, ability },
    } = await getUserInfo()
    /**
     * 检验返回数据是否正常，无对应参数，将使用默认用户名,头像,Roles和Ability
     * username {String}
     * avatar {String}
     * roles {List}
     * ability {List}
     */
    if (
      (username && !isString(username)) ||
      (avatar && !isString(avatar)) ||
      (roles && !isArray(roles)) ||
      (ability && !isArray(ability))
    ) {
      const err = 'getUserInfo核心接口异常，请检查返回JSON格式是否正确'
      gp.$baseMessage(err, 'error', 'vab-hey-message-error')
      throw err
    } else {
      // 如不使用username用户名,可删除以下代码
      if (username) commit('setUsername', username)
      // 如不使用avatar头像,可删除以下代码
      if (avatar) commit('setAvatar', avatar)
      // 如不使用roles权限控制,可删除以下代码
      if (roles) dispatch('acl/setRole', roles, { root: true })
      // 如不使用ability权限控制,可删除以下代码
      if (ability) dispatch('acl/setAbility', ability, { root: true })
    }
  },
  /**
   * @description 退出登录
   * @param {*} { dispatch }
   */
  async logout({ dispatch }) {
    await logout()
    await dispatch('resetAll')
  },
  /**
   * @description 重置token、roles、ability、router、tabsBar等
   * @param {*} { commit, dispatch }
   */
  async resetAll({ commit, dispatch }) {
    commit('setUsername', '游客')
    commit('setAvatar', 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif')
    commit('routes/setRoutes', [], { root: true })
    await dispatch('setToken', '')
    await dispatch('acl/setFull', false, { root: true })
    await dispatch('acl/setRole', [], { root: true })
    await dispatch('acl/setAbility', [], { root: true })
    await dispatch('tabs/delAllVisitedRoutes', null, { root: true })
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
