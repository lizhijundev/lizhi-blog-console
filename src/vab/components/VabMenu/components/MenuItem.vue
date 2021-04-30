<template>
  <el-menu-item :index="itemOrMenu.fullPath" @click="handleLink">
    <vab-icon
      v-if="itemOrMenu.meta && itemOrMenu.meta.icon"
      :icon="itemOrMenu.meta.icon"
      :is-custom-svg="itemOrMenu.meta.isCustomSvg"
      :title="translateTitle(itemOrMenu.meta.title)"
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
      <span />
    </span>
  </el-menu-item>
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { isExternal } from '@/utils/validate'
  import { translateTitle } from '@/utils/i18n'
  import { isHashRouterMode } from '@/config'

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
    setup(props) {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const device = computed(() => store.getters['settings/device'])
      const foldSideBar = () => store.dispatch('settings/foldSideBar')

      const handleLink = () => {
        const routePath = props.itemOrMenu.path
        const target = props.itemOrMenu.meta.target
        if (target === '_blank') {
          if (isExternal(routePath)) window.open(routePath)
          else if (route.fullPath !== routePath)
            isHashRouterMode
              ? window.open('/#' + routePath)
              : window.open(routePath)
        } else {
          if (isExternal(routePath)) window.location.href = routePath
          else if (route.fullPath !== routePath) {
            if (device.value === 'mobile') foldSideBar()
            router.push(props.itemOrMenu.fullPath)
          }
        }
      }

      return {
        handleLink,
        translateTitle,
      }
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
      margin-top: ($base-menu-item-height - 16) / 2;
      line-height: 16px;
      border: 0;
    }
  }

  .vab-dot {
    float: right;
    margin-top: ($base-menu-item-height - 6) / 2 + 1;
  }
</style>
