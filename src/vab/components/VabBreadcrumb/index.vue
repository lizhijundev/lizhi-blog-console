<template>
  <el-breadcrumb class="vab-breadcrumb" separator=">">
    <el-breadcrumb-item v-for="(item, index) in getBreadcrumb" :key="index">
      <a @click.prevent="handleLink(item.redirect)">
        <vab-icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
        {{ translateTitle(item.meta.title) }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import { computed } from 'vue'
  import { useRoute, useRouter } from 'vue-router'
  import { translateTitle } from '@/utils/i18n'

  export default {
    name: 'VabBreadcrumb',
    setup() {
      const route = useRoute()
      const router = useRouter()

      const handleLink = (redirect) => {
        if (redirect) router.push(redirect)
      }

      const getBreadcrumb = computed(() => {
        return route.matched.filter((item) => item.meta && item.meta.title)
      })

      return {
        handleLink,
        getBreadcrumb,
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
