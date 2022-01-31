<template>
  <component
    :is="menuComponent"
    v-if="item.meta && !item.meta.hidden"
    :item-or-menu="item"
  >
    <template v-if="item.children && item.children.length">
      <el-scrollbar
        v-if="
          (layout === 'horizontal' && item.children.length > 18) ||
          (layout !== 'horizontal' && collapse && item.children.length > 18)
        "
        class="vab-menu-children-height"
      >
        <vab-menu
          v-for="route in item.children"
          :key="route.path"
          :item="route"
        />
      </el-scrollbar>
      <template v-else>
        <vab-menu
          v-for="route in item.children"
          :key="route.path"
          :item="route"
        />
      </template>
    </template>
  </component>
</template>

<script>
  import { useSettingsStore } from '@/store/modules/settings'

  const imports = require.context('./components', true, /\.vue$/)
  const Components = {}
  imports.keys().forEach((key) => {
    Components[key.replace(/(\/|\.|vue)/g, '')] = imports(key).default
  })

  export default defineComponent({
    name: 'VabMenu',
    components: Components,
    props: {
      item: {
        type: Object,
        required: true,
      },
      layout: {
        type: String,
        default: '',
      },
    },
    setup(props) {
      const settingsStore = useSettingsStore()
      const { collapse } = storeToRefs(settingsStore)

      const menuComponent = computed(() =>
        props.item.children &&
        props.item.children.some((_route) => {
          return _route.meta && _route.meta.hidden !== true
        })
          ? 'VabSubMenu'
          : 'VabMenuItem'
      )

      return {
        collapse,
        menuComponent,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .vab-menu-children-height {
    height: 60vh !important;
    overflow-y: auto;

    &::-webkit-scrollbar {
      width: 0px;
      height: 0px;
    }
  }
</style>

<!--由于element-plus
bug使用popper-append-to-body=false会导致多级路由无法显示，故所有菜单必须生成至body下，样式必须放到body下-->
<style lang="scss">
  .el-popper.is-light {
    border: 0 !important;
  }
</style>
