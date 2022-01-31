const { createUnPlugin } = require('./unplugin')
const { createWebpackBar } = require('./webpackBar')
const { createProvidePlugin } = require('./providePlugin')

module.exports = {
  createVuePlugin: () => [
    ...createUnPlugin(),
    ...createWebpackBar(),
    ...createProvidePlugin(),
  ],
}
