const injector = require.resolve('./injector')

module.exports = {
  createSourceInjector: (config) => {
    config.module
      .rule('vue')
      .use('vue-filename-injector')
      .loader(injector)
      .after('vue-loader')
      .end()
  },
}
