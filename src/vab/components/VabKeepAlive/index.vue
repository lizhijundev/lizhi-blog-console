<template>
  <div class="vab-keep-alive">
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" name="fade-transform">
        <keep-alive :include="cachedRoutes" :max="keepAliveMaxNum">
          <component :is="Component" :key="route.fullPath" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { keepAliveMaxNum } from '@/config'

  export default {
    name: 'VabKeepAlive',
    setup() {
      const store = useStore()

      return {
        keepAliveMaxNum,
        cachedRoutes: computed(() => store.getters['routes/cachedRoutes']),
      }
    },
  }
</script>
