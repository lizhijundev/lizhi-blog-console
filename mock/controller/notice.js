const data = [
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img//8/15918_100.gif',
    notice:
      'Vab Admin Plus（vue3.0）体验地址（不代表最终效果，2021年2月28日前全款购买pro的用户可免费升级）：<a target="_blank" href="http://chu1204505056.gitee.io/admin-plus?hmsr=noticeAd&hmpl=&hmcu=&hmkw=&hmci=">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
    notice:
      '官方QQ群1：972435319、官方QQ群2：1139183756，购买PRO请在演示地址首页付款人民币699元，完成付款后联系QQ 1204505056 即可',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
    notice:
      'vue3.0 + element-plus 体验地址：<a target="_blank" href="http://chu1204505056.gitee.io/vue-admin-beautiful-element-plus?hmsr=noticeAd&hmpl=&hmcu=&hmkw=&hmci=">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
    notice:
      'vue3.0 + antdv 体验地址：<a target="_blank" href="http://chu1204505056.gitee.io/vue-admin-beautiful-antdv?hmsr=noticeAd&hmpl=&hmcu=&hmkw=&hmci=">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/8/15918_100.gif',
    notice:
      'github开源地址：<a target="_blank" href="https://github.com/chuzhixin/vue-admin-beautiful">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/0/15640_100.gif',
    notice:
      '开源中国地址：<a target="_blank" href="https://www.oschina.net/p/vue-admin-beautiful">点我</a>',
  },
  {
    email: '@email',
    image: 'https://i.gtimg.cn/club/item/face/img/9/15919_100.gif',
    notice:
      "gitee开源地址：<a target='_blank' href='https://gitee.com/chu1204505056/vue-admin-beautiful?_from=gitee_search'>点我</a>",
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
        data,
      }
    },
  },
]
