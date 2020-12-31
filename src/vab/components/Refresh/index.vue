<template>
  <vab-icon
    v-if="theme.showRefresh"
    icon="refresh-line"
    @click="refreshRoute"
  />
</template>

<script>
  import { nextTick } from 'vue'
  import { mapActions, mapGetters } from 'vuex'

  export default {
    name: 'Refresh',
    data() {
      return {
        thirdRouteName: '',
      }
    },
    computed: {
      ...mapGetters({
        theme: 'settings/theme',
        visitedRoutes: 'tabsBar/visitedRoutes',
      }),
    },
    watch: {
      visitedRoutes: {
        handler() {
          this.handleCachedRoutes()
        },
        deep: true,
      },
    },
    methods: {
      ...mapActions({
        setCachedRoutes: 'routes/setCachedRoutes',
      }),
      refreshRoute() {
        const route = this.$route
        this.thirdRouteName = route.path
        const secondRouteName =
          route.matched[
            route.matched.length >= 2 ? route.matched.length - 2 : 0
          ].name
        let secondRoute = this.visitedRoutes.find((item) => {
          return (
            item.name !== route.name &&
            item.matched[
              item.matched.length >= 2 ? item.matched.length - 2 : 0
            ] === secondRouteName
          )
        })
        if (!secondRoute) secondRoute = { path: '/redirect' }
        this.handleCachedRoutes()
        nextTick(() => {
          this.$router.replace(secondRoute).then(() => {
            this.thirdRouteName = ''
            this.$router.replace(route).then(() => {
              this.handleCachedRoutes()
            })
          })
        })
      },
      handleCachedRoutes() {
        this.setCachedRoutes([
          ...new Set(
            this.visitedRoutes
              .filter(
                (item) =>
                  !item.meta.noKeepAlive && item.path !== this.thirdRouteName
              )
              .flatMap((item) => item.matched)
          ),
        ])
      },
    },
  }
</script>
