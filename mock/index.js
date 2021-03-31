const chokidar = require('chokidar')
const bodyParser = require('body-parser')
const chalk = require('chalk')
const path = require('path')
const { mock } = require('mockjs')
const { baseURL } = require('../src/config')
const mockDir = path.join(process.cwd(), 'mock')
const { handleMockArray } = require('./utils')

/**
 *
 * @param url
 * @param type
 * @param respond
 * @returns {{response(*=, *=): void, type: (*|string), url: RegExp}}
 */
const responseFake = (url, type, respond) => {
  return {
    url: new RegExp(`${baseURL}${url}`),
    type: type || 'get',
    response(req, res) {
      res.status(200)
      console.log(chalk.green(`\n> 请求地址：${req.path}`))
      if (JSON.stringify(req.body) !== '{}')
        console.log(
          chalk.green(`> 请求参数(body)：${JSON.stringify(req.body)}`)
        )
      if (JSON.stringify(req.query) !== '{}')
        console.log(
          chalk.green(`> 请求参数(query)：${JSON.stringify(req.query)}`)
        )
      res.json(mock(respond instanceof Function ? respond(req, res) : respond))
    },
  }
}

/**
 *
 * @param app
 * @returns {{mockStartIndex: number, mockRoutesLength: number}}
 */
const registerRoutes = (app) => {
  let mockLastIndex
  const mocks = []
  const mockArray = handleMockArray()
  mockArray.forEach((item) => {
    const obj = require(item)
    mocks.push(...obj)
  })
  const mocksForServer = mocks.map((route) =>
    responseFake(route.url, route.type, route.response)
  )
  const mockRoutesLength = Object.keys(mocksForServer).length
  for (const item of mocksForServer) {
    app[item.type](item.url, item.response)
    mockLastIndex = app._router.stack.length
  }
  return {
    mockRoutesLength,
    mockStartIndex: mockLastIndex - mockRoutesLength,
  }
}

/**
 *
 * @param app
 */
module.exports = (app) => {
  app.use(bodyParser.json())
  app.use(
    bodyParser.urlencoded({
      extended: true,
    })
  )
  const mockRoutes = registerRoutes(app)
  let mockRoutesLength = mockRoutes.mockRoutesLength
  let mockStartIndex = mockRoutes.mockStartIndex
  chokidar
    .watch(mockDir, {
      ignored: /vab-mock-server/,
      ignoreInitial: true,
    })
    .on('all', (event) => {
      if (event === 'change' || event === 'add') {
        try {
          app._router.stack.splice(mockStartIndex, mockRoutesLength)
          Object.keys(require.cache).forEach((item) => {
            if (item.includes(mockDir))
              delete require.cache[require.resolve(item)]
          })
          const mockRoutes = registerRoutes(app)
          mockRoutesLength = mockRoutes.mockRoutesLength
          mockStartIndex = mockRoutes.mockStartIndex
        } catch (error) {
          console.log(chalk.red(error))
        }
      }
    })
}
