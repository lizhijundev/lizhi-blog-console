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
  import { useRoute, useRouter } from 'vue-router'

  export default {
    name: 'VabRefresh',
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const { proxy } = getCurrentInstance()
      const extra = computed(() => store.getters['settings/extra'])
      const theme = computed(() => store.getters['settings/theme'])
      const visitedRoutes = computed(() => store.getters['tabs/visitedRoutes'])

      const refreshRoute = () => {
        const currentRoute = { ...route }
        extra.value.refreshRoutePath = route.path
        const parentRouteName = route.matched
          .slice(0, -1)
          .map((item) => item.name)
          .join(',')
        const otherRoutes = visitedRoutes.value.filter((item) => {
          return item.name !== currentRoute.name
        })
        if (otherRoutes.length) {
          let transferRoute = otherRoutes.find(
            (_) => _.matched.slice(0, -1).join(',') === parentRouteName
          )
          if (!transferRoute) transferRoute = otherRoutes[0]
          extra.value.transferRouteName = currentRoute.name
          router.replace(transferRoute).then(() => {
            extra.value.transferRouteName = ''
            router.replace(currentRoute)
          })
        } else proxy.$pub('reload-router-view')
      }

      return {
        theme,
        refreshRoute,
      }
    },
  }
</script>
