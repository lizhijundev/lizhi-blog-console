const { mock } = require('mockjs')
const List = []
const count = 50
for (let i = 0; i < count; i++) {
  List.push(
    mock({
      uuid: '@uuid',
      id: '@id',
      taskName: '@account(1, 2)',
      'status|1': [0, 1],
      'account|1': ['admin', 'editor', 'test'],
      'executeResult|1': [
        '登录成功',
        '登录成功',
        '登录失败',
        '接口异常',
        'dos攻击',
      ],
      ip: '@ip',
      datetime: '@datetime',
    })
  )
}

module.exports = [
  {
    url: '/taskManagement/getList',
    type: 'get',
    response: (config) => {
      const { account, pageNo = 1, pageSize = 20 } = config.query
      const mockList = List.filter(
        (item) => !(account && item.account.indexOf(account) < 0)
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
