<script setup>
  import { useRoutesStore } from '@/store/modules/routes'
  import { translateTitle } from '@/utils/i18n'
  import { handleMatched } from '@/utils/routes'

  const route = useRoute()

  const routesStore = useRoutesStore()
  const { getRoutes: routes } = storeToRefs(routesStore)

  const breadcrumbList = computed(() =>
    handleMatched(routes.value, route.path).filter(
      (item) => !item.meta.breadcrumbHidden
    )
  )
  const handleTo = (path = '') => {
    return { path }
  }
</script>

<template>
  <el-breadcrumb class="vab-breadcrumb" separator=">">
    <el-breadcrumb-item
      v-for="(item, index) in breadcrumbList"
      :key="index"
      :to="handleTo(item.redirect)"
    >
      <vab-icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
      <span>{{ translateTitle(item.meta.title) }}</span>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<style lang="scss" scoped>
  .vab-breadcrumb {
    height: $base-nav-height;
    font-size: $base-font-size-default;
    line-height: $base-nav-height;

    :deep() {
      .el-breadcrumb__item {
        .el-breadcrumb__inner {
          font-weight: normal;
          color: #515a6e;
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
