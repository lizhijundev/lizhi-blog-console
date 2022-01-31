const Icons = require('unplugin-icons/webpack')
const AutoImport = require('unplugin-auto-import/webpack')
const Components = require('unplugin-vue-components/webpack')
const { ElementPlusResolver } = require('unplugin-vue-components/resolvers')

module.exports = {
  createUnPlugin: () => [
    Icons(),
    AutoImport({
      imports: ['vue', 'pinia', 'vue-i18n', 'vue-router', '@vueuse/core'],
      resolvers: [ElementPlusResolver({ importStyle: false })],
      dts: 'library/build/vuePlugins/unplugin/auto-imports.d.ts',
    }),
    Components({
      dirs: ['library/components'],
      resolvers: [ElementPlusResolver()],
      dts: 'library/build/vuePlugins/unplugin/components.d.ts',
    }),
  ],
}
