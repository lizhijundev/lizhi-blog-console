<template>
  <vab-icon
    v-if="theme.showRefresh"
    icon="refresh-line"
    @click="refreshRoute"
  />
</template>

<script>
  import { computed, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'
  import VabProgress from 'nprogress'

  export default {
    name: 'VabRefresh',
    setup() {
      const store = useStore()

      const theme = computed(() => store.getters['settings/theme'])

      const { proxy } = getCurrentInstance()

      const refreshRoute = () => {
        if (theme.value.showProgressBar) VabProgress.start()
        proxy.$pub('reload-router-view')
        setTimeout(() => {
          if (theme.value.showProgressBar) VabProgress.done()
        }, 200)
      }

      return {
        theme,
        refreshRoute,
      }
    },
  }
</script>
