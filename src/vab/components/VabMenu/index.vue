<template>
  <component :is="menuComponent" v-if="!item.hidden" :item-or-menu="itemOrMenu">
    <template v-if="item.children && item.children.length">
      <el-scrollbar
        v-if="
          (layout === 'horizontal' && item.children.length > 18) ||
          (layout !== 'horizontal' && collapse && item.children.length > 18)
        "
        style="height: 86vh"
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
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  export default {
    name: 'VabMenu',
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
      const store = useStore()
      const collapse = computed(() => store.getters['settings/collapse'])

      const handleChildren = (children = []) => {
        if (!children) return []
        return children.filter((item) => {
          return item.hidden !== true
        })
      }

      const showChildren = handleChildren(props.item.children)
      const itemOrMenu = computed(() => {
        return showChildren.length === 1 && props.item.alwaysShow !== true
          ? props.item.children[0]
          : props.item
      })
      const menuComponent = computed(() => {
        return showChildren.length > 1 && props.item.alwaysShow !== true
          ? 'Submenu'
          : 'MenuItem'
      })

      return {
        collapse,
        itemOrMenu,
        menuComponent,
      }
    },
  }
</script>
