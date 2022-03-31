const WebpackBar = require('webpackbar')
const { name } = require('./config.js')

module.exports = {
  createWebpackBar: () => [
    new WebpackBar({
      name,
    }),
  ],
}
