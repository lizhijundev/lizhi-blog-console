const WebpackBar = require('webpackbar')
const { name } = require('../../../../package.json')

module.exports = {
  createWebpackBar: () => [
    new WebpackBar({
      name,
    }),
  ],
}
