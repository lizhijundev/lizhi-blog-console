<template>
  <span v-if="theme.showTheme">
    <vab-icon icon="brush-2-line" @click="handleOpenTheme" />
    <vab-theme-setting />
  </span>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { translateTitle } from '@/utils/i18n'
  import emitter from '@/vab/plugins/emitter'

  export default {
    name: 'Theme',
    setup() {
      const store = useStore()

      const handleOpenTheme = () => {
        emitter.$emit('theme')
      }

      return {
        translateTitle,
        theme: computed(() => store.getters['settings/theme']),
        handleOpenTheme,
      }
    },
  }
</script>
