<template>
  <el-breadcrumb class="breadcrumb-container" separator=">">
    <el-breadcrumb-item v-for="(item, index) in levelList" :key="index">
      <a @click.prevent="handleLink(item.redirect)">
        <vab-icon v-if="item.meta && item.meta.icon" :icon="item.meta.icon" />
        {{ translateTitle(item.meta.title) }}
      </a>
    </el-breadcrumb-item>
  </el-breadcrumb>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'

  export default {
    name: 'Breadcrumb',
    data() {
      return {
        levelList: [],
      }
    },
    watch: {
      $route: {
        handler() {
          this.levelList = this.getBreadcrumb()
        },
        immediate: true,
      },
    },
    methods: {
      translateTitle,
      getBreadcrumb() {
        return this.$route.matched.filter(
          (item) => item.meta && item.meta.title
        )
      },
      handleLink(redirect) {
        this.$router.push(redirect)
      },
    },
  }
</script>

<style lang="scss" scoped>
  .breadcrumb-container {
    height: $base-nav-bar-height;
    font-size: $base-font-size-default;
    line-height: $base-nav-bar-height;

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
