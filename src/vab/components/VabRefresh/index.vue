<template>
  <vab-icon
    v-if="theme.showRefresh"
    icon="refresh-line"
    @click="refreshRoute"
  />
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'

  export default {
    name: 'VabRefresh',
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const extra = computed(() => store.getters['routes/extra'])
      const theme = computed(() => store.getters['settings/theme'])
      const visitedRoutes = computed(() => store.getters['tabs/visitedRoutes'])

      const refreshRoute = () => {
        const currentRoute = route.fullPath
        extra.value.refreshRoutePath = route.path
        const secondRouteName =
          route.matched[
            route.matched.length >= 2 ? route.matched.length - 2 : 0
          ].name
        const secondRoute = visitedRoutes.value.find((item) => {
          return (
            item.name !== route.name &&
            item.matched[
              item.matched.length >= 2 ? item.matched.length - 2 : 0
            ] === secondRouteName
          )
        })
        router
          .replace(secondRoute ? secondRoute : { path: '/redirect' })
          .then(() => {
            extra.value.refreshRoutePath = ''
            router.replace(currentRoute)
          })
      }

      return {
        theme,
        refreshRoute,
      }
    },
  }
</script>
