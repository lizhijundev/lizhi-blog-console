<template>
  <div class="vab-app-main">
    <el-alert
      :closable="false"
      title="此版本基于vue3.0 + element-plus beta版开发，2020年1月25日，所有布局已完成vue3.0 Composition API重构，不代表最终效果，已购买PRO vue2.0（699）的用户可免费升级，此活动仅针对2021年2月28日前全款购买PRO（vue2.0）的用户，正式版请访问https://chu1204505056.gitee.io/admin-pro查看演示效果"
      type="error"
    />
    <section>
      <vab-keep-alive />
    </section>
    <vab-footer />
  </div>
</template>

<script>
  import { computed, watchEffect } from 'vue'
  import { useStore } from 'vuex'

  export default {
    name: 'VabAppMain',
    setup() {
      const store = useStore()
      const extra = computed(() => store.getters['routes/extra'])
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
                  item.path !== extra.value.refreshRoutePath
              )
              .flatMap((item) => item.matched)
          ),
        ])
      })
    },
  }
</script>
