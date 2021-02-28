<template>
  <div class="vab-app-main">
    <el-alert
      :closable="false"
      title="此版本基于vue3.0 + element-plus beta版开发，2020年1月25日，所有布局已完成vue3.0 Composition API重构，不代表最终效果"
      type="error"
    />
    <section>
      <transition mode="out-in" name="fade-transform">
        <vab-keep-alive v-if="routerView" />
      </transition>
    </section>
    <vab-footer />
  </div>
</template>

<script>
  import { computed, nextTick, ref, watchEffect } from 'vue'
  import { useStore } from 'vuex'
  import VabProgress from 'nprogress'
  import emitter from '@/vab/plugins/emitter'

  export default {
    name: 'VabAppMain',
    setup() {
      const store = useStore()
      const routerView = ref(true)
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

      emitter.$on('reload-router-view', () => {
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
