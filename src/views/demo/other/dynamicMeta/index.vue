<template>
  <div class="dynamic-meta-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>动态标题</span>
          </template>
          <el-button @click="handleMeta('DynamicMeta', { title: 'vab-demo' })">
            标题变更为 vab-demo
          </el-button>
          <el-button @click="handleMeta('DynamicMeta', { title: '动态Meta' })">
            还原为默认标题
          </el-button>
        </vab-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>动态徽章</span>
          </template>
          <el-button @click="handleBadge('DynamicMeta')">徽章+ 1</el-button>
          <el-button @click="resetBadge('DynamicMeta', { badge: '0' })">
            徽章清零
          </el-button>
          <el-button @click="resetBadge('DynamicMeta', { badge: false })">
            移除徽章
          </el-button>
        </vab-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>动态图标</span>
          </template>
          <el-popover
            popper-class="icon-selector-popper"
            trigger="hover"
            :width="292"
          >
            <template #reference>
              <el-button>
                <vab-icon :icon="icon" />
                修改图标
                <vab-icon icon="arrow-down-s-line" />
              </el-button>
            </template>
            <vab-icon-selector @handle-icon="handleIcon" />
          </el-popover>
        </vab-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>动态高亮菜单</span>
          </template>
          <el-button @click="handleActiveMenu('/other/notice')">
            修改高亮菜单至通知组件
          </el-button>
          <el-button @click="handleActiveMenu('/other/dynamicMeta')">
            还原默认高亮菜单
          </el-button>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { useTabsStore } from '@/store/modules/tabs'
  import { useRoutesStore } from '@/store/modules/routes'
  import getPageTitle from '@/utils/pageTitle'
  import VabIconSelector from '@/plugins/VabIconSelector'

  export default defineComponent({
    name: 'DynamicMeta',
    components: { VabIconSelector },
    setup() {
      const route = useRoute()

      const tabsStore = useTabsStore()
      const routesStore = useRoutesStore()

      const { changeTabsMeta } = tabsStore
      const { changeActiveMenu, changeMenuMeta } = routesStore

      const state = reactive({
        badge: 0,
        icon: route.meta.icon,
        defaultTitle: route.meta.title,
      })
      const handleBadge = (name) => {
        state.badge = state.badge + 1
        changeMenuMeta({
          name,
          meta: { badge: state.badge },
        })
      }
      const resetBadge = (name, meta) => {
        state.badge = 0
        changeMenuMeta({ name, meta })
      }
      const handleMeta = (name, meta) => {
        if (meta.title) document.title = getPageTitle(meta.title)
        changeMenuMeta({ name, meta })
        changeTabsMeta({ name, meta })
      }
      const handleIcon = (item) => {
        state.icon = item
        changeMenuMeta({ name: 'DynamicMeta', meta: { icon: item } })
        changeTabsMeta({ name: 'DynamicMeta', meta: { icon: item } })
      }
      const handleActiveMenu = (activeMenu) => {
        changeActiveMenu(activeMenu)
      }

      return {
        ...toRefs(state),
        handleBadge,
        resetBadge,
        handleMeta,
        handleIcon,
        handleActiveMenu,
      }
    },
  })
</script>

<style lang="scss" scoped>
  $base: '.dynamic-meta';
  #{$base}-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
