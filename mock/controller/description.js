const data = {
  description:
    '最近更新：1、重构绿荫草场主题，大幅样式提升渲染速度。 2、添加工作流组件。3、优化动态路径参数组件。4、Plus已支持表格拖拽排序',
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
