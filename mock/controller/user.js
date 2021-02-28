const { Random } = require('mockjs')
const tokens = {
  admin: `admin-token-${Random.guid()}`,
  editor: `editor-token-${Random.guid()}`,
  test: `test-token-${Random.guid()}`,
}

module.exports = [
  {
    url: '/publicKey',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: {
          mockServer: true,
          publicKey:
            'MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQDBT2vr+dhZElF73FJ6xiP181txKWUSNLPQQlid6DUJhGAOZblluafIdLmnUyKE8mMHhT3R+Ib3ssZcJku6Hn72yHYj/qPkCGFv0eFo7G+GJfDIUeDyalBN0QsuiE/XzPHJBuJDfRArOiWvH0BXOv5kpeXSXM8yTt5Na1jAYSiQ/wIDAQAB',
        },
      }
    },
  },
  {
    url: '/login',
    type: 'post',
    response(config) {
      const { username } = config.body
      const token = tokens[username]
      if (!token)
        return {
          code: 500,
          msg: '帐户或密码不正确',
        }
      return {
        code: 200,
        msg: 'success',
        data: { token },
      }
    },
  },
  {
    url: '/socialLogin',
    type: 'post',
    response(config) {
      const { code } = config.body
      if (!code)
        return {
          code: 500,
          msg: '未成功获取Token',
        }

      return {
        code: 200,
        msg: 'success',
        data: { token: tokens['admin'] },
      }
    },
  },
  {
    url: '/register',
    type: 'post',
    response() {
      return {
        code: 200,
        msg: '模拟注册成功',
      }
    },
  },
  {
    url: '/userInfo',
    type: 'get',
    response(config) {
      const authorization =
        config.headers.authorization || config.headers.Authorization
      let roles = ['admin']
      let ability = ['READ']
      let username = 'admin'
      if (authorization.includes('admin-token')) {
        roles = ['admin']
        ability = ['READ', 'WRITE', 'DELETE']
        username = 'admin'
      }
      if (authorization.includes('editor-token')) {
        roles = ['editor']
        ability = ['READ', 'WRITE']
        username = 'editor'
      }
      if (authorization.includes('test-token')) {
        roles = ['admin', 'editor']
        ability = ['READ']
        username = 'test'
      }
      return {
        code: 200,
        msg: 'success',
        data: {
          roles,
          ability,
          username,
          avatar: 'https://i.gtimg.cn/club/item/face/img/2/16022_100.gif',
        },
      }
    },
  },
  {
    url: '/logout',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
      }
    },
  },
]
