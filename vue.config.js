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
const pkg = require('./package.json')
const rely = require('vue-plugin-rely')
const { resolve, relative } = require('path')
const { defineConfig } = require('@vue/cli-service')
const { createVuePlugin, createChainWebpack } = require('./library')

const info = {
  ...pkg,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

process.env.VUE_APP_RELY = rely
process.env.VUE_APP_TITLE = title
process.env.VUE_APP_AUTHOR = pkg.author
process.env.VUE_APP_INFO = JSON.stringify(info)
process.env.VUE_APP_UPDATE_TIME = info.lastBuildTime
process.env.VUE_APP_GITHUB_USER_NAME = process.env.VUE_GITHUB_USER_NAME
process.env.VUE_APP_RANDOM = `${dayjs()}-${process.env.VUE_GITHUB_USER_NAME}`

module.exports = defineConfig({
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    client: {
      progress: true,
      overlay: {
        warnings: true,
        errors: true,
      },
    },
    host: 'localhost',
    hot: true,
    open: true,
    port: devPort,
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
    setupMiddlewares: require('./mock'),
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
        fallback: {
          fs: false,
          path: require.resolve('path-browserify'),
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
    sourceMap: true,
    extract:
      process.env.NODE_ENV === 'production'
        ? {
            ignoreOrder: true,
          }
        : false,
    loaderOptions: {
      sass: {
        sassOptions: { outputStyle: 'expanded' },
        additionalData(content, { rootContext, resourcePath }) {
          const relativePath = relative(rootContext, resourcePath)
          if (
            relativePath.replace(/\\/g, '/') !==
            'library/styles/variables/variables.module.scss'
          )
            return (
              '@use "sass:math";@import "~@vab/styles/variables/variables.module.scss";' +
              content
            )
          return content
        },
      },
    },
  },
})
