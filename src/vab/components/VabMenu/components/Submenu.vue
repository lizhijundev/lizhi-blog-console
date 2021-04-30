<template>
  <el-submenu ref="subMenu" :index="itemOrMenu.fullPath" popper-append-to-body>
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
  import { translateTitle } from '@/utils/i18n'

  export default {
    name: 'Submenu',
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
  }
</script>
