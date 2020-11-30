<template>
  <el-menu-item :index="itemOrMenu.path" @click="handleLink">
    <vab-remix-icon
      v-if="itemOrMenu.meta && itemOrMenu.meta.remixIcon"
      :icon="itemOrMenu.meta.remixIcon"
      :is-custom-svg="itemOrMenu.meta.isCustomSvgIcon"
      :title="translateTitle(itemOrMenu.meta.title)"
      class="vab-remix-icon"
    />
    <span :title="translateTitle(itemOrMenu.meta.title)">
      {{ translateTitle(itemOrMenu.meta.title) }}
    </span>
    <el-tag
      v-if="itemOrMenu.meta && itemOrMenu.meta.badge"
      effect="dark"
      type="danger"
    >
      {{ itemOrMenu.meta.badge }}
    </el-tag>
    <span
      v-if="itemOrMenu.meta && itemOrMenu.meta.dot"
      class="vab-dot vab-dot-error"
    >
      <span></span>
    </span>
  </el-menu-item>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'
  import { isExternal } from '@/utils/validate'

  export default {
    name: 'MenuItem',
    props: {
      itemOrMenu: {
        type: Object,
        default() {
          return null
        },
      },
    },
    methods: {
      translateTitle,
      handleLink() {
        const routePath = this.itemOrMenu.path
        const target = this.itemOrMenu.meta.target
        if (target === '_blank') {
          if (isExternal(routePath)) window.open(routePath)
          else if (this.$route.fullPath !== routePath)
            window.open(routePath.href)
        } else {
          if (isExternal(routePath)) window.location.href = routePath
          else if (this.$route.fullPath !== routePath)
            this.$router.push(routePath)
        }
      },
    },
  }
</script>
<style lang="scss" scoped>
  :deep() {
    .el-tag {
      float: right;
      height: 16px;
      padding-right: 4px;
      padding-left: 4px;
      margin-top: calc((#{$base-menu-item-height} - 16px) / 2);
      line-height: 16px;
      border: 0;
    }
  }

  .vab-dot {
    float: right;
    margin-top: calc((#{$base-menu-item-height} - 6px) / 2 + 1px);
  }
</style>
