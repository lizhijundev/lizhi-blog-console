const { createUnPlugin } = require('vue-unplugin')
const { createWebpackBar } = require('./webpackBar')
const { createDefinePlugin } = require('./definePlugin')
const { createProvidePlugin } = require('./providePlugin')
const { createMinChunkSizePlugin } = require('./minChunkSizePlugin')

const dev = process.env.NODE_ENV === 'development'
module.exports = {
  createVuePlugin: () => [
    ...createUnPlugin(),
    ...createWebpackBar(),
    ...createDefinePlugin(),
    ...createProvidePlugin(),
    ...(dev ? [] : createMinChunkSizePlugin()),
  ],
}
