const List = [
  {
    uuid: '@uuid',
    icon: 'dashboard-2-line',
    title: 'Dash' + 'board Pro',
    price: 'Admin Pro + Admin Plus 1299版' + '本赠品',
    label: ['敬请期待', '人工智能', '科技风'],
    company: 'vdp',
    url: 'https://vue-admin-bea' + 'utiful.com/dashboard-pro',
    description: 'Admin Pro + Adm' + 'in Plus 1299版本赠品',
  },
  {
    uuid: '@uuid',
    image:
      'https://p3-armor.byteimg.com/tos-cn-i-49unhts6dw/dfdba' +
      '5317c0c20ce20e64fac8' +
      '03d52bc.svg~tplv-49unhts6dw-image.image',
    title: 'vue-admin-arco',
    price: '免费',
    label: ['vue3', 'arco-design', 'MIT协议'],
    company: 'vab',
    url: 'https://github.com/chuzhixin/vue-admin-arco',
    description:
      '在字节跳动' +
      'arco-desi' +
      'gn-pro-vue基础上修改的' +
      'vue3版本，仅供学' +
      '习参考',
  },
  {
    uuid: '@uuid',
    svg:
      'https://fastly.jsdelivr.net/gh/' +
      'chuzh' +
      'ixin/image' +
      '/logo/vab.svg',
    title: 'vue-admin-better',
    price: '免费',
    label: ['vue', 'element-ui', 'MIT协议'],
    company: 'vab',
    url: 'https://github.com/chuzhixin/vue-admin-better',
    description: '绝佳的开源、' + '企业级、' + '中后台前端框架',
  },
  {
    uuid: '@uuid',
    svg:
      'https://fastly.jsdelivr.net/gh/' +
      'chuzh' +
      'ixin/image' +
      '/logo/vdb.svg',
    title: 'vue-datav-beautiful-pro',
    price: 'Admin Pro + Adm' + 'in Plus 1299版本赠品',
    label: ['数据大屏'],
    company: 'vdb',
    url: 'https://github.com/vue-' + 'datav-beautiful',
    description: '立志做' + '国内最好' + '的数据大屏应用',
  },
  {
    uuid: '@uuid',
    image:
      'https://fastly.jsdelivr.net/gh/' +
      'chuzh' +
      'ixin/image' +
      '/goods/uview.gif',
    title: 'uview',
    price: '免费',
    label: ['uniapp', '跨平台', '组件'],
    company: '言信网络',
    url: 'http://uviewui.com',
    description:
      '跨 7 端移动端框架，全面的组件和便' + '捷的工具会让您信手拈来，如鱼得水',
  },
  {
    uuid: '@uuid',
    title: 'form-generator',
    icon: 'newspaper-line',
    price: '免费',
    label: ['element-ui', '表单设计器'],
    company: 'form-generator',
    url: 'https://mrhj.gitee.io/form-generator',
    description: 'Element UI表单设' + '计及代码生成器',
  },
  {
    uuid: '@uuid',
    title: 'OPSLI',
    image:
      'https://fastly.jsdelivr.net/gh/' +
      'chuzh' +
      'ixin/image' +
      '/goods/OPSLI.png',
    price: '免费',
    label: ['spring-boot', 'vue-admin-better'],
    company: 'OPSLI',
    url: 'https://www.op' + 'sli.com',
    description: 'vue-admin-better开源' + '版结合spring boot的最佳实践',
  },
  {
    uuid: '@uuid',
    title: 'WangEditor',
    image: 'https://www.wangedi' + 'tor.com/image/logo.png',
    price: '免费',
    label: ['富文本编辑器'],
    company: 'WangEditor',
    url: 'https://www.wangeditor.com/v5/',
    description: '绝佳' + '的富文本' + '编辑器组件，感谢巨人',
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
