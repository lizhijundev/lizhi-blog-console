const List = [
  /* {
    uuid: '@uuid',
    svg: 'https://gitee.com/chu1204505056/image/raw/master/logo/vdb.svg',
    title: 'vue-datav-beautiful-pro',
    price: '敬请期待',
    label: ['vue', 'element-ui', '数据大屏'],
    company: 'vdb',
    url: 'https://github.com/vue-datav-beautiful',
  }, */
  {
    uuid: '@uuid',
    svg: 'https://gitee.com/chu1204505056/image/raw/master/logo/vab.svg',
    title: 'vue-admin-beautiful',
    price: '免费',
    label: ['vue', 'element-ui', 'MIT协议'],
    company: 'vab',
    url: 'https://github.com/chuzhixin/vue-admin-beautiful',
  },
  {
    uuid: '@uuid',
    image: 'https://gitee.com/chu1204505056/image/raw/master/goods/uview.gif',
    title: 'uview',
    price: '免费',
    label: ['uniapp', '跨平台', '组件'],
    company: '言信网络',
    url: 'http://uviewui.com',
  },
  {
    uuid: '@uuid',
    title: 'form-generator',
    icon: 'newspaper-line',
    price: '免费',
    label: ['element-ui', '表单设计器'],
    company: 'form-generator',
    url: 'https://mrhj.gitee.io/form-generator',
  },
  {
    uuid: '@uuid',
    title: 'OPSLI',
    image: 'https://gitee.com/chu1204505056/image/raw/master/goods/OPSLI.png',
    price: '免费',
    label: ['spring-boot', 'vue-admin-beautiful'],
    company: 'OPSLI',
    url: 'http://demo.opsli.arcinbj.com/',
  },
  {
    uuid: '@uuid',
    title: 'artemis',
    icon: 'compass-2-line',
    price: '免费',
    label: ['spring-boot', 'vue-admin-beautiful'],
    company: '迈特云',
    url: 'https://cloud.mate.vip/',
  },
]

module.exports = [
  {
    url: '/goods/getList',
    type: 'get',
    response(config) {
      const { title, pageNo = 1, pageSize = 20 } = config.query
      const mockList = List.filter(
        (item) => !(title && item.title.indexOf(title) < 0)
      )
      const list = mockList.filter(
        (item, index) =>
          index < pageSize * pageNo && index >= pageSize * (pageNo - 1)
      )
      return {
        code: 200,
        msg: 'success',
        data: { list, ...{ total: mockList.length } },
      }
    },
  },
]
