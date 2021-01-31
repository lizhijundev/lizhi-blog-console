<template>
  <div class="vab-keep-alive">
    <router-view v-slot="{ Component }">
      <transition mode="out-in" name="fade-transform">
        <!-- <keep-alive :include="cachedRoutes" :max="keepAliveMaxNum"> -->
        <!-- <component :is="Component" :key="key" /> -->
        <component :is="Component" />
        <!-- </keep-alive> -->
      </transition>
    </router-view>
  </div>
</template>

<script>
  /*  import { computed, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import { keepAliveMaxNum } from '@/config' */

  export default {
    name: 'VabKeepAlive',
    /* setup() {
      const store = useStore()
      const route = useRoute()
      const { ctx } = getCurrentInstance()

      const findParent = (node) => {
        if (node.type.name === 'VabAppMain') return ['VabAppMain']
        return [
          'VabKeepAlive',
          'BaseTransition',
          'RouterView',
          'KeepAlive',
        ].includes(node.type.name) || node.type.name.startsWith('El')
          ? findParent(node.parent)
          : [...findParent(node.parent), node.type.name]
      }

      let oldKey = null
      const dept = findParent(ctx._).length
      let parent = route.matched.map((item) => item.name)[dept - 1]

      const key = computed(() => {
        const matched = route.matched.map((item) => item.name)
        const tempKey = matched[dept]
        const key1 = tempKey
          ? dept === matched.length - 1
            ? tempKey +
              JSON.stringify(route.params) +
              JSON.stringify(route.query)
            : tempKey
          : oldKey
        const key2 =
          (dept > 1 && matched[dept - 1] === parent) || dept === 0 ? key1 : null
        oldKey = key2
        return key2
      })

      return {
        key,
        dept,
        keepAliveMaxNum,
        cachedRoutes: computed(() => store.getters['routes/cachedRoutes']),
      }
    }, */
  }
</script>
