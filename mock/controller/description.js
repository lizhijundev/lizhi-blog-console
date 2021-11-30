const data = {
  description:
    '最近更新：1、重磅更新：主题配置功能背景配置。2、累计完成6种布局、7种主题。3、重构RBAC角色权限、菜单管理、角色管理。4、支持https环境下网站更新提醒。建党百年惊喜福利，买一得二，<a href="https://vue-admin-beautiful.com/authorization/" target="_blank">点我购买</a>',
}

module.exports = [
  {
    url: '/description/getList',
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data,
      }
    },
  },
]
