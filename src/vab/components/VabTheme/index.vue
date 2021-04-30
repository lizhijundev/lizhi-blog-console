<template>
  <span v-if="theme.showTheme">
    <vab-icon icon="brush-2-line" @click="handleOpenTheme" />
  </span>
</template>

<script>
  import { computed, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'
  import { translateTitle } from '@/utils/i18n'

  export default {
    name: 'VabTheme',
    setup() {
      const store = useStore()
      const { proxy } = getCurrentInstance()

      const handleOpenTheme = () => {
        proxy.$pub('theme')
      }

      return {
        translateTitle,
        theme: computed(() => store.getters['settings/theme']),
        handleOpenTheme,
      }
    },
  }
</script>
