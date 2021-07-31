const data = {
  description:
    '最近更新：1、累计完成6种布局、7种主题。建党百年惊喜福利，买一得二，<a href="http://vue-admin-beautiful.com/authorization/" target="_blank">点我购买</a>',
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
