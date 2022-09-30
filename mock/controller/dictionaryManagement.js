module.exports = [
  {
    url: '/dictionaryManagement/getTree',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          total: 999,
          list: [
            {
              id: 'root',
              key: 'root',
              label: '全部字典',
              children: [
                {
                  id: '@id',
                  key: 'sex',
                  label: '性别',
                },
                {
                  id: '@id',
                  key: 'type',
                  label: '类型',
                },
              ],
            },
          ],
        },
      }
    },
  },
  {
    url: '/dictionaryManagement/getList',
    type: 'get',
    response: (config) => {
      const { key, parentKey } = config.query
      const list1 = [
        {
          parentKey: 'sex',
          id: '@id',
          lable: '性别',
          key: '1',
          value: '男',
        },
        {
          parentKey: 'sex',
          id: '@id',
          lable: '性别',
          key: '2',
          value: '女',
        },
      ]
      const list2 = [
        {
          parentKey: 'type',
          id: '@id',
          lable: '类型',
          key: '1',
          value: '新闻',
        },
        {
          parentKey: 'type',
          id: '@id',
          lable: '类型',
          key: '2',
          value: '知识',
        },
      ]
      if (parentKey) {
        return {
          code: 200,
          msg: 'success',
          data: {
            list: parentKey === 'sex' ? list1 : list2,
          },
        }
      }
      return {
        code: 200,
        msg: 'success',
        data: {
          list: !key || key === 'root' ? [] : key === 'sex' ? list1 : list2,
        },
      }
    },
  },
  {
    url: '/dictionaryManagement/doEdit',
    type: 'post',
    response: () => {
      return {
        code: 200,
        msg: '模拟保存成功',
      }
    },
  },
  {
    url: '/dictionaryManagement/doDelete',
    type: 'post',
    response: () => {
      return {
        code: 200,
        msg: '模拟删除成功',
      }
    },
  },
]
