const webpack = require('webpack')

module.exports = {
  createMinChunkSizePlugin: () => [
    new webpack.optimize.MinChunkSizePlugin({
      minChunkSize: 1024 * 300,
    }),
  ],
}
