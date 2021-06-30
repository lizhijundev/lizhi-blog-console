<template>
  <el-breadcrumb class="vab-breadcrumb" separator=">">
    <el-breadcrumb-item v-for="(item, index) in breadcrumbList" :key="index">
      <a @click.prevent="handleLink(item.redirect)">
        <vab-icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
        <span>{{ translateTitle(item.meta.title) }}</span>
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import { computed, ref, watchEffect } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { translateTitle } from '@/utils/i18n'

  export default {
    name: 'VabBreadcrumb',
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()

      const routes = computed(() => store.getters['routes/routes'])

      const breadcrumbList = ref([])

      const handleLink = (redirect) => {
        if (redirect) router.push(redirect)
      }

      const updateBreadcrumbList = (_routes) => {
        _routes.forEach((_route) => {
          if (_route.childrenPathList.indexOf(route.path) + 1) {
            breadcrumbList.value.push(_route)
            if (_route.children) updateBreadcrumbList(_route.children)
          }
        })
      }

      watchEffect(() => {
        breadcrumbList.value = []
        updateBreadcrumbList(routes.value)
        breadcrumbList.value = breadcrumbList.value.filter(
          (item) => item.meta && item.meta.title
        )
      })

      return {
        handleLink,
        breadcrumbList,
        translateTitle,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vab-breadcrumb {
    height: $base-nav-height;
    font-size: $base-font-size-default;
    line-height: $base-nav-height;

    :deep() {
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          a {
            font-weight: normal;
            color: #515a6e;
          }
        }

        &:last-child {
          .el-breadcrumb__inner {
            a {
              color: #999;
            }
          }
        }
      }
    }
  }
</style>
