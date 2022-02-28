const { createUnPlugin } = require('./unplugin')
const { createWebpackBar } = require('./webpackBar')
const { createDefinePlugin } = require('./definePlugin')
const { createProvidePlugin } = require('./providePlugin')

module.exports = {
  createVuePlugin: () => [
    ...createUnPlugin(),
    ...createWebpackBar(),
    ...createDefinePlugin(),
    ...createProvidePlugin(),
  ],
}
