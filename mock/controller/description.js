const data = {
  description:
    '最近更新：1、重构自定义表格组件自定义列拖拽及全屏功能。2、角色权限组件添加token无痛刷新功能',
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
