<template>
  <router-view v-slot="{ Component }">
    <transition mode="out-in" name="fade-transform">
      <keep-alive :include="keepAliveNameList" :max="keepAliveMaxNum">
        <component :is="Component" :key="routerKey" />
      </keep-alive>
    </transition>
  </router-view>
</template>

<script>
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    nextTick,
    onBeforeMount,
    onUnmounted,
    ref,
    watchEffect,
  } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import { keepAliveMaxNum } from '@/config'
  import VabProgress from 'nprogress'

  export default defineComponent({
    name: 'VabRouterView',
    setup() {
      const store = useStore()
      const route = useRoute()

      const theme = computed(() => store.getters['settings/theme'])
      const visitedRoutes = computed(() => store.getters['tabs/visitedRoutes'])

      const { proxy } = getCurrentInstance()

      const routerKey = ref()
      const keepAliveNameList = ref()

      const updateKeepAliveNameList = (refreshRouteName = null) => {
        keepAliveNameList.value = [
          ...new Set(
            visitedRoutes.value
              .filter(
                (item) =>
                  !item.meta.noKeepAlive && item.name !== refreshRouteName
              )
              .flatMap((item) => item.matched)
          ),
        ]
      }

      // 更新KeepAlive缓存页面
      watchEffect(() => {
        routerKey.value = route.fullPath
        updateKeepAliveNameList()
      })

      onBeforeMount(() => {
        proxy.$sub('reload-router-view', () => {
          if (theme.value.showProgressBar) VabProgress.start()
          routerKey.value = null
          updateKeepAliveNameList(route.name)
          nextTick(() => {
            routerKey.value = route.fullPath
            updateKeepAliveNameList()
          })
          setTimeout(() => {
            if (theme.value.showProgressBar) VabProgress.done()
          }, 200)
        })
      })

      onUnmounted(() => {
        proxy.$unsub('reload-router-view')
      })

      return {
        routerKey,
        keepAliveMaxNum,
        keepAliveNameList,
      }
    },
  })
</script>
