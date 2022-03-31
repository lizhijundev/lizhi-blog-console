<script lang="ts" setup>
  import { useSettingsStore } from '@/store/modules/settings'

  const $pub: any = inject('$pub')

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)

  const handleOpenTheme = () => {
    $pub('theme')
  }
</script>

<template>
  <span v-if="theme.showTheme">
    <vab-icon icon="brush-2-line" @click="handleOpenTheme" />
  </span>
</template>
