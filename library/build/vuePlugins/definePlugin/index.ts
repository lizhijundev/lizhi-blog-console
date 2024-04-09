// @ts-ignore
const Webpack = require('webpack')

module.exports = {
  createDefinePlugin: () => [
    new Webpack.DefinePlugin({
      __APP_INFO__: process.env.VUE_APP_INFO,
      __VUE_PROD_HYDRATION_MISMATCH_DETAILS__: JSON.stringify(
        process.env.NODE_ENV === 'development'
      ),
    }),
  ],
}
