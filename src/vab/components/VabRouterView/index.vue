<template>
  <div>
    <router-view v-slot="{ Component, route }">
      <transition mode="out-in" name="fade-transform">
        <keep-alive :include="cachedRoutes" :max="keepAliveMaxNum">
          <component :is="Component" :key="handleKey(Component, route)" />
        </keep-alive>
      </transition>
    </router-view>
  </div>
</template>

<script>
  import { computed, getCurrentInstance } from 'vue'
  import { useStore } from 'vuex'
  import { keepAliveMaxNum } from '@/config'

  export default {
    name: 'VabRouterView',
    setup() {
      const store = useStore()
      const { proxy } = getCurrentInstance()

      const findParent = (node) => {
        if (node.type.name === 'VabAppMain') return ['VabAppMain']
        return [
          'VabRouterView',
          'Transition',
          'BaseTransition',
          'KeepAlive',
          'RouterView',
        ].includes(node.type.name) || node.type.name.startsWith('El')
          ? findParent(node.parent)
          : [...findParent(node.parent), node.type.name]
      }

      const dept = findParent(proxy._).length

      let keyValue = null
      const handleKey = (_c, _route) => {
        const _matchedNames = _route.matched.map((item) => item.name)
        // 该路由作为中间路由[1级-最后1级前一级]使用的Key
        const _parentNamesKey = _matchedNames.slice(0, dept + 1).join(',')
        // 当前路由为一级路由 或 多级路由父组件相同的情况下, 更新key, 其他情况保持不变
        keyValue =
          dept === _matchedNames.length - 1
            ? _c.type.name +
              JSON.stringify(_route.query) +
              JSON.stringify(_route.params)
            : _parentNamesKey
        return keyValue
      }

      return {
        handleKey,
        keepAliveMaxNum,
        cachedRoutes: computed(() => store.getters['routes/cachedRoutes']),
      }
    },
  }
</script>
