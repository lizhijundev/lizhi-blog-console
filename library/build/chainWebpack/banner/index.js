const Webpack = require('webpack')
const { webpackBanner } = require('./config')

module.exports = {
  createBanner: (config) => {
    config
      .plugin('banner')
      .use(Webpack.BannerPlugin, [
        `${webpackBanner}${process.env.VUE_APP_UPDATE_TIME}`,
      ])
  },
}
