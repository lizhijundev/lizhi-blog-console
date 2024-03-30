/**
 * @description 登录、获取用户信息、退出登录、清除token逻辑，不建议修改
 */
import { useAclStore } from './acl'
import { useTabsStore } from './tabs'
import { useRoutesStore } from './routes'
import { useSettingsStore } from './settings'
import { UserModuleType } from '/#/store'
import { getUserInfo, login, logout, socialLogin } from '@/api/user'
import { getToken, removeToken, setToken } from '@/utils/token'
import { resetRouter } from '@/router'
import { isArray, isNumber, isString } from "@/utils/validate";
import { tokenName } from '@/config'
import { gp } from '@gp'
import { transApp } from "@/i18n";

export const useUserStore = defineStore('user', {
  state: (): UserModuleType => ({
    token: getToken() as string,
    admin_id: 0,
    nickname: '游客',
    username: '游客',
    avatar: '/img/avatar.png',
  }),
  getters: {
    getToken: (state) => state.token,
    getUsername: (state) => state.username,
    getAvatar: (state) => state.avatar,
    getAdminId: (state) => state.admin_id,
    getNickname: (state) => state.nickname,
  },
  actions: {
    /**
     * @description 设置token
     * @param {*} token
     */
    setToken(token: string) {
      this.token = token
      setToken(token)
    },
    /**
     * @description 设置用户名
     * @param {*} username
     */
    setUsername(username: string) {
      this.username = username
    },
    /**
     * @description 设置用户id
     * @param {*} admin_id
     */
    setAdminId(admin_id: number) {
      this.admin_id = admin_id
    },
    /**
     * @description 设置昵称
     * @param {*} nickname
     */
    setNickname(nickname: string) {
      this.nickname = nickname
    },
    /**
     * @description 设置头像
     * @param {*} avatar
     */
    setAvatar(avatar: string) {
      this.avatar = avatar
    },
    /**
     * @description 登录拦截放行时，设置虚拟角色
     */
    setVirtualRoles() {
      const aclStore = useAclStore()
      aclStore.setFull(true)
      this.setUsername('admin(未开启登录拦截)')
      this.setAvatar('/img/avatar.png')
    },
    /**
     * @description 设置token并发送提醒
     * @param {string} token 更新令牌
     * @param {string} tokenName 令牌名称
     */
    afterLogin(token: string, tokenName: string) {
      // const settingsStore = useSettingsStore()
      // {title: settingsStore.title}
      if (token) {
        this.setToken(token)
        const hour = new Date().getHours()
        const thisTime =
          hour < 8
            ? transApp('layout.global.welcome.morning')
            : hour <= 11
              ? transApp('layout.global.welcome.forenoon')
              : hour <= 13
                ? transApp('layout.global.welcome.afternoon')
                : hour < 18
                  ? transApp('layout.global.welcome.evening')
                  : transApp('layout.global.welcome.night')
        gp.$baseNotify(transApp('layout.global.welcome.back'), `${thisTime}！`)
      } else {
        const err = `登录接口异常，未正确返回${tokenName}...`
        gp.$baseMessage(err, 'error', 'vab-hey-message-error')
        throw err
      }
    },
    /**
     * @description 登录
     * @param {*} userInfo
     */
    async login(userInfo: any) {
      const {
        data: { [tokenName]: token },
      } = await login(userInfo)
      this.afterLogin(token, tokenName)
    },
    /**
     * @description 第三方登录
     * @param {*} tokenData
     */
    async socialLogin(tokenData: any) {
      const {
        data: { [tokenName]: token },
      } = await socialLogin(tokenData)
      this.afterLogin(token, tokenName)
    },
    /**
     * @description 获取用户信息接口 这个接口非常非常重要，如果没有明确底层前逻辑禁止修改此方法，错误的修改可能造成整个框架无法正常使用
     * @returns
     */
    async getUserInfo() {
      const {
        data: { admin_id, username, nickname, avatar, roles, permissions },
      } = await getUserInfo()
      /**
       * 检验返回数据是否正常，无对应参数，将使用默认用户名,头像,Roles和Permissions
       * username {String}
       * avatar {String}
       * roles {List}
       * ability {List}
       */
      if (
        (admin_id && !isNumber(admin_id)) ||
        (username && !isString(username)) ||
        (nickname && !isString(nickname)) ||
        (avatar && !isString(avatar)) ||
        (roles && !isArray(roles)) ||
        (permissions && !isArray(permissions))
      ) {
        const err = 'getUserInfo核心接口异常，请检查返回JSON格式是否正确'
        gp.$baseMessage(err, 'error', 'vab-hey-message-error')
        throw err
      } else {
        const aclStore = useAclStore()
        // 如不使用username用户名,可删除以下代码
        if (username) this.setUsername(username)
        // 如不使用nickname昵称,可删除以下代码
        if (nickname) this.setNickname(nickname)
        // 如不使用admin_id,可删除以下代码
        if (admin_id) this.setAdminId(admin_id)
        // 如不使用avatar头像,可删除以下代码
        if (avatar) this.setAvatar(avatar)
        // 如不使用roles权限控制,可删除以下代码
        if (roles) aclStore.setRole(roles)
        // 如不使用permissions权限控制,可删除以下代码
        if (permissions) aclStore.setPermission(permissions)
      }
    },
    /**
     * @description 退出登录
     */
    async logout() {
      await logout()
      await this.resetAll()
      // 解决横向布局退出登录显示不全的bug
      location.reload()
    },
    /**
     * @description 重置token、roles、permission、router、tabsBar等
     */
    async resetAll() {
      this.setToken('')
      this.setUsername('游客')
      this.setAvatar('/img/avatar.png')

      const aclStore = useAclStore()
      const routesStore = useRoutesStore()
      const tabsStore = useTabsStore()
      aclStore.setPermission([])
      aclStore.setFull(false)
      aclStore.setRole([])
      tabsStore.delAllVisitedRoutes()
      routesStore.clearRoutes()
      await resetRouter()
      removeToken()
    },
  },
})
