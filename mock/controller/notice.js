const List = [
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
    notice:
      'github开源地址：<a target="_blank" href="https://github.com/chuzhixin/vue-admin-better">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/0/15640_100.gif',
    notice:
      'Admin Pro：<a target="_blank" href="https://vue-admin-beautiful.com/admin-pro">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/9/15919_100.gif',
    notice:
      'Admin Plus：<a target="_blank" href="https://vue-admin-beautiful.com/admin-plus">点我</a>',
  },
]

module.exports = [
  {
    url: '/notice/getList',
    type: 'get',
    response: () => {
      return {
        code: 200,
        msg: 'success',
        data: { list: List, total: List.length },
      }
    },
  },
]
