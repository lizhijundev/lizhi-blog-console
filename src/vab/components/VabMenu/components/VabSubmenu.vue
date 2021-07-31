<template>
  <div v-if="itemOrMenu.meta && itemOrMenu.meta.levelHidden">
    <template v-for="route in itemOrMenu.children" :key="route.path">
      <vab-menu :item="route" />
    </template>
  </div>
  <el-submenu v-else :index="itemOrMenu.path" popper-append-to-body>
    <template #title>
      <vab-icon
        v-if="itemOrMenu.meta && itemOrMenu.meta.icon"
        :icon="itemOrMenu.meta.icon"
        :is-custom-svg="itemOrMenu.meta.isCustomSvg"
        :title="translateTitle(itemOrMenu.meta.title)"
      />
      <span :title="translateTitle(itemOrMenu.meta.title)">
        {{ translateTitle(itemOrMenu.meta.title) }}
      </span>
    </template>
    <slot />
  </el-submenu>
</template>

<script>
  import { defineComponent } from 'vue'
  import { translateTitle } from '@/utils/i18n'

  export default defineComponent({
    name: 'VabSubmenu',
    props: {
      itemOrMenu: {
        type: Object,
        default() {
          return null
        },
      },
    },
    setup() {
      return {
        translateTitle,
      }
    },
  })
</script>
