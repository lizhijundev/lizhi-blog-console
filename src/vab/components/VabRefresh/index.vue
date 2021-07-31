<template>
  <vab-icon
    v-if="theme.showRefresh"
    icon="refresh-line"
    @click="refreshRoute"
  />
</template>

<script>
  import { computed, defineComponent, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'VabRefresh',
    setup() {
      const store = useStore()

      const theme = computed(() => store.getters['settings/theme'])

      const { proxy } = getCurrentInstance()

      const refreshRoute = () => {
        proxy.$pub('reload-router-view')
      }

      return {
        theme,
        refreshRoute,
      }
    },
  })
</script>
