const { createVuePlugin } = require('./build/vuePlugins')
const { createChainWebpack } = require('./build/chainWebpack')

module.exports = {
  createVuePlugin,
  createChainWebpack,
}
