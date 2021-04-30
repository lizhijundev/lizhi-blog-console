const { Random } = require('mockjs')

module.exports = [
  {
    url: '/refreshToken',
    type: 'get',
    response: (config) => {
      const authorization =
        config.headers.authorization || config.headers.Authorization
      let token = ''
      if (authorization.includes('admin-token'))
        token = `admin-token-${Random.guid()}`
      if (authorization.includes('editor-token'))
        token = `editor-token-${Random.guid()}`
      if (authorization.includes('test-token'))
        token = `test-token-${Random.guid()}`

      return {
        code: 402,
        msg: '模拟token无痛刷新成功',
        data: { token },
      }
    },
  },
]
