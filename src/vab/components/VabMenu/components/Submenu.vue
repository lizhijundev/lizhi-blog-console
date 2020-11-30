<template>
  <el-submenu
    ref="subMenu"
    :index="itemOrMenu.path"
    :popper-append-to-body="false"
  >
    <template v-slot:title>
      <vab-remix-icon
        v-if="itemOrMenu.meta && itemOrMenu.meta.remixIcon"
        :icon="itemOrMenu.meta.remixIcon"
        :is-custom-svg="itemOrMenu.meta.isCustomSvgIcon"
        :title="translateTitle(itemOrMenu.meta.title)"
        class="vab-remix-icon"
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
    methods: {
      translateTitle,
    },
  }
</script>
