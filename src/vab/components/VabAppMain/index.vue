<template>
  <div class="vab-app-main">
    <section>
      <transition mode="out-in" name="fade-transform">
        <vab-keep-alive v-if="routerView" />
      </transition>
    </section>
    <vab-footer />
  </div>
</template>

<script>
  import { ref, computed, nextTick, watchEffect, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'
  import VabProgress from 'nprogress'

  export default {
    name: 'VabAppMain',
    setup() {
      const store = useStore()
      const routerView = ref(true)
      const { proxy } = getCurrentInstance()
      const theme = computed(() => store.getters['settings/theme'])
      const extra = computed(() => store.getters['settings/extra'])
      const visitedRoutes = computed(() => store.getters['tabs/visitedRoutes'])
      const setCachedRoutes = (cachedRoutes) =>
        store.dispatch('routes/setCachedRoutes', cachedRoutes)

      // 更新KeepAlive缓存页面
      watchEffect(() => {
        setCachedRoutes([
          ...new Set(
            visitedRoutes.value
              .filter(
                (item) =>
                  !item.meta.noKeepAlive &&
                  item.name !== extra.value.transferRouteName
              )
              .flatMap((item) => item.matched)
          ),
        ])
      })

      proxy.$sub('reload-router-view', () => {
        routerView.value = false
        if (theme.value.showProgressBar) VabProgress.start()
        nextTick(() => {
          routerView.value = true
          setTimeout(() => {
            if (theme.value.showProgressBar) VabProgress.done()
          }, 200)
        })
      })

      return {
        routerView,
      }
    },
  }
</script>
