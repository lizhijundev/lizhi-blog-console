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
          <el-button @click="handleActiveName('Notice')">
            修改高亮菜单至通知组件
          </el-button>
          <el-button @click="handleActiveName('DynamicMeta')">
            还原默认高亮菜单
          </el-button>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { defineComponent, getCurrentInstance, reactive, toRefs } from 'vue'
  import { mapActions } from 'vuex'
  import getPageTitle from '@/utils/pageTitle'
  import VabIconSelector from '@/extra/VabIconSelector'

  export default defineComponent({
    name: 'DynamicMeta',
    components: { VabIconSelector },
    setup() {
      const { proxy } = getCurrentInstance()

      const state = reactive({
        badge: 0,
        icon: proxy.$route.meta.icon,
        defaultTitle: proxy.$route.meta.title,
      })
      const handleBadge = (name) => {
        state.badge = state.badge + 1
        proxy.changeMenuMeta({
          name,
          meta: { badge: state.badge },
        })
      }
      const resetBadge = (name, meta) => {
        state.badge = 0
        proxy.changeMenuMeta({ name, meta })
      }
      const handleMeta = (name, meta) => {
        if (meta.title) document.title = getPageTitle(meta.title)
        proxy.changeMenuMeta({ name, meta })
        proxy.changeTabsMeta({ name, meta })
      }
      const handleIcon = (item) => {
        state.icon = item
        proxy.changeMenuMeta({ name: 'DynamicMeta', meta: { icon: item } })
        proxy.changeTabsMeta({ name: 'DynamicMeta', meta: { icon: item } })
      }
      const handleActiveName = (activeMenu) => {
        proxy.changeActiveName(activeMenu)
      }

      return {
        ...toRefs(state),
        ...mapActions({
          changeActiveName: 'routes/changeActiveName',
          changeMenuMeta: 'routes/changeMenuMeta',
          changeTabsMeta: 'tabs/changeTabsMeta',
        }),
        handleBadge,
        resetBadge,
        handleMeta,
        handleIcon,
        handleActiveName,
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
