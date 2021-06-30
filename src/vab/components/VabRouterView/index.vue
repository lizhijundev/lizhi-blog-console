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

  export default {
    name: 'VabRouterView',
    setup() {
      const store = useStore()
      const route = useRoute()

      const visitedRoutes = computed(() => store.getters['tabs/visitedRoutes'])

      const { proxy } = getCurrentInstance()

      const routerKey = ref(null)
      const keepAliveNameList = ref([])

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
          routerKey.value = null
          updateKeepAliveNameList(route.name)
          nextTick(() => {
            routerKey.value = route.fullPath
            updateKeepAliveNameList()
          })
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
  }
</script>
