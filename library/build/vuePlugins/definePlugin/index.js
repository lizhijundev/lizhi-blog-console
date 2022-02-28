const webpack = require('webpack')

module.exports = {
  createDefinePlugin: () => [
    new webpack.DefinePlugin({
      __APP_INFO__: process.env.VUE_APP_INFO,
    }),
  ],
}
