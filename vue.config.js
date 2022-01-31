/**
 * @description vue.config.js全局配置
 */
const {
  title,
  devPort,
  assetsDir,
  outputDir,
  lintOnSave,
  publicPath,
  transpileDependencies,
} = require('./src/config')
const dayjs = require('dayjs')
const rely = require('vue-plugin-rely')
const { resolve, relative } = require('path')
const { version, author } = require('./package.json')
const { createVuePlugin, createChainWebpack } = require('./library')

const dateTime = dayjs().format('YYYY-M-D HH:mm:ss')
process.env.VUE_APP_TITLE = title
process.env.VUE_APP_AUTHOR = author
process.env.VUE_APP_RANDOM = `${dayjs()}-${process.env.VUE_GITHUB_USER_NAME}`
process.env.VUE_APP_UPDATE_TIME = dateTime
process.env.VUE_APP_VERSION = version
process.env.VUE_APP_RELY = rely
process.env.VUE_APP_GITHUB_USER_NAME = process.env.VUE_GITHUB_USER_NAME

module.exports = {
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    hot: true,
    port: devPort,
    open: true,
    noInfo: false,
    overlay: {
      warnings: true,
      errors: true,
    },
    // 注释掉的地方是前端配置代理访问后端的示例
    // baseURL必须为/xxx，而不是后端服务器，请先了解代理逻辑，再设置前端代理
    // ！！！一定要注意！！！
    // 1.这里配置了跨域及代理只针对开发环境生效
    // 2.不建议你在前端配置跨域，建议你后端配置Allow-Origin,Method,Headers，放行token字段，一步到位
    // 3.后端配置了跨域，就不需要前端再配置，会发生Origin冲突
    // proxy: {
    //   [baseURL]: {
    //     target: `http://你的后端接口地址`,
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + baseURL]: '',
    //     },
    //   },
    // },
    after: require('./mock'),
  },
  pwa: {
    workboxOptions: {
      skipWaiting: true,
      clientsClaim: true,
    },
    themeColor: '#ffffff',
    msTileColor: '#ffffff',
    appleMobileWebAppCapable: 'yes',
    appleMobileWebAppStatusBarStyle: 'black',
    manifestOptions: {
      name: 'Vue Admin Beautiful - Admin Plus',
      short_name: 'Admin Plus',
      background_color: '#ffffff',
    },
  },
  configureWebpack() {
    return {
      resolve: {
        alias: {
          '~': resolve(__dirname, '.'),
          '@': resolve(__dirname, 'src'),
          '@vab': resolve(__dirname, 'library'),
          '@gp': resolve('library/plugins/vab'),
          'vue-i18n': 'vue-i18n/dist/vue-i18n.cjs.js',
        },
      },
      plugins: createVuePlugin(),
      performance: {
        hints: false,
      },
    }
  },
  chainWebpack(config) {
    createChainWebpack(process.env.NODE_ENV, config)
  },
  runtimeCompiler: true,
  productionSourceMap: false,
  css: {
    requireModuleExtension: true,
    sourceMap: true,
    loaderOptions: {
      sass: {
        sassOptions: { outputStyle: 'expanded' },
        additionalData(content, { rootContext, resourcePath }) {
          const relativePath = relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !==
            'library/styles/variables/variables.scss'
          )
            return (
              '@use "sass:math";@import "~@vab/styles/variables/variables.scss";' +
              content
            )
          return content
        },
      },
    },
  },
}
