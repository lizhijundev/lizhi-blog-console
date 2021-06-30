const data = {
  description:
    '最近更新：1、全面拥抱vue3.0 composition api语法。2、重构多级路由缓存，性能翻倍提升。618狂欢节，全年最低价，<a href="http://vue-admin-beautiful.com/authorization/" target="_blank">点我购买</a>',
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
