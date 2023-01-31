/* eslint-disable @typescript-eslint/no-unused-vars */

/**
 * @description vue.config.js全局配置
 */

const {
  baseURL,
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

const { resolve, relative } = require('path')
const { defineConfig } = require('@vue/cli-service')
const {
  createVuePlugin,
  createChainWebpack,
} = require('./library/build/index.ts')

const info = {
  ...pkg,
  lastBuildTime: dayjs().format('YYYY-MM-DD HH:mm:ss'),
}

process.env.VUE_APP_TITLE = title
process.env.VUE_APP_AUTHOR = pkg.author
process.env.VUE_APP_INFO = JSON.stringify(info)
process.env.VUE_APP_UPDATE_TIME = info.lastBuildTime
process.env.VUE_APP_GITHUB_USER_NAME = process.env.VUE_GITHUB_USER_NAME
process.env.VUE_APP_RANDOM = `${info.lastBuildTime}-${process.env.VUE_GITHUB_USER_NAME}`

module.exports = defineConfig({
  publicPath,
  assetsDir,
  outputDir,
  lintOnSave,
  transpileDependencies,
  devServer: {
    compress: true,
    client: {
      progress: false,
      overlay: {
        warnings: false,
        errors: true,
      },
    },
    hot: true,
    open: {
      target: [`http://localhost:${devPort}`],
    },
    port: devPort,
    setupMiddlewares: require('./mock'),
    // 注释掉的地方是前端配置代理访问后端的示例，如无特别需求，不建议使用！！！
    // baseURL必须为/xxx，而不是后端服务器，请先了解代理逻辑，再设置前端代理
    // ！！！一定要注意！！！
    // 1、这里配置了跨域及代理只针对开发环境生效
    // 2、不建议你在前端配置跨域，建议你后端配置Allow-Origin,Method,Headers，放行token字段，一步到位
    // 3、后端配置了跨域，就不需要前端再配置，会发生Origin冲突
    // 4、webpack5版本前端配置代理无法与mock同时使用，如果一定要用前端代理，需注释setupMiddlewares: require('./mock')
    // proxy: {
    //   [baseURL]: {
    //     target: `https://xxx.com`,
    //     ws: true,
    //     changeOrigin: true,
    //     pathRewrite: {
    //       ['^' + baseURL]: '',
    //     },
    //   },
    // },
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
      name: 'Vue Admin Better - Admin Plus',
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
          '/#': resolve(__dirname, 'types'),
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
    //为了防止忘记配置而造成项目无法打包，请保留以下提示
    if (process.env.NODE_ENV === 'production') {
      if (
        process['env'].VUE_GITHUB_USER_NAME == 'test' &&
        process['env'].VUE_APP_SECRET_KEY == 'preview'
      )
        console.log(
          '检测到您的用户名和key未配置，key在购买时通过邮件邀请函发放，请仔细阅读文档并进行配置'
        )
    }
    createChainWebpack(process.env.NODE_ENV, config)
  },
  runtimeCompiler: false,
  productionSourceMap: false,
  css: {
    sourceMap: false,
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
            return `@use "~@vab/styles/variables/variables.module.scss" as *;${content}`
          return content
        },
      },
    },
  },
})
