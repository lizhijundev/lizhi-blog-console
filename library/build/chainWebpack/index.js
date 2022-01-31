const { createGzip } = require('./gzip')
const { createBanner } = require('./banner')
const { createBuild7z } = require('./build7z')
const { createSvgSprite } = require('./svgSprite')
const { createOptimization } = require('./optimization')
const { createSourceInjector } = require('./sourceInjector')
const { createImageCompression } = require('./imageCompression')
const { build7z, buildGzip, imageCompression } = require('../../../src/config')

module.exports = {
  createChainWebpack: (env, config) => {
    config.resolve.symlinks(true)
    createBanner(config)
    createSvgSprite(config)
    if (env === 'production') {
      if (build7z) createBuild7z(config)
      if (buildGzip) createGzip(config)
      if (imageCompression) createImageCompression(config)
      createOptimization(config)
    }
    if (env === 'development') config.devtool('source-map')
    createSourceInjector(config)
  },
}
