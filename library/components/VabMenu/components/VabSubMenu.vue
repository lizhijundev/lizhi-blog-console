<script lang="ts" setup>
  import { translateTitle } from '@/utils/i18n'

  defineProps({
    itemOrMenu: {
      type: Object,
      default() {
        return null
      },
    },
  })
</script>

<template>
  <el-sub-menu :index="itemOrMenu.path" popper-append-to-body>
    <template #title>
      <vab-icon
        v-if="itemOrMenu.meta.icon"
        :icon="itemOrMenu.meta.icon"
        :is-custom-svg="itemOrMenu.meta.isCustomSvg"
        :title="translateTitle(itemOrMenu.meta.title)"
      />
      <span :title="translateTitle(itemOrMenu.meta.title)">
        {{ translateTitle(itemOrMenu.meta.title) }}
      </span>
    </template>
    <slot />
  </el-sub-menu>
</template>
