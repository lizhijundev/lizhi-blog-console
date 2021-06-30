<template>
  <div class="dynamic-meta-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <el-card shadow="hover">
          <template #header>
            <span>动态标题</span>
          </template>
          <el-button @click="handleMeta('DynamicMeta', { title: 'vab-demo' })">
            标题变更为 vab-demo
          </el-button>
          <el-button @click="handleMeta('DynamicMeta', { title: '动态Meta' })">
            还原为默认标题
          </el-button>
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <el-card shadow="hover">
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
        </el-card>
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <el-card shadow="hover">
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
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import getPageTitle from '@/utils/pageTitle'
  import VabIconSelector from '@/extra/VabIconSelector'
  import { getCurrentInstance, reactive, toRefs } from 'vue'
  import { mapActions } from 'vuex'

  export default {
    name: 'DynamicMeta',
    components: { VabIconSelector },
    setup() {
      const { proxy } = getCurrentInstance()

      const state = reactive({
        badge: 0,
        icon: proxy.$route.meta.icon,
        defaultTitle: proxy.$route.meta.title,
      })

      function handleBadge(name) {
        state.badge = state.badge + 1
        proxy.changeMenuMeta({
          name,
          meta: { badge: state.badge },
        })
      }
      function resetBadge(name, meta) {
        state.badge = 0
        proxy.changeMenuMeta({ name, meta })
      }
      function handleMeta(name, meta) {
        if (meta.title) document.title = getPageTitle(meta.title)
        proxy.changeMenuMeta({ name, meta })
        proxy.changeTabsMeta({ name, meta })
      }
      function handleIcon(item) {
        state.icon = item
        proxy.changeMenuMeta({ name: 'DynamicMeta', meta: { icon: item } })
        proxy.changeTabsMeta({ name: 'DynamicMeta', meta: { icon: item } })
      }

      return {
        ...toRefs(state),
        ...mapActions({
          changeMenuMeta: 'routes/changeMenuMeta',
          changeTabsMeta: 'tabs/changeTabsMeta',
        }),
        handleBadge,
        resetBadge,
        handleMeta,
        handleIcon,
      }
    },
  }
</script>

<style lang="scss" scoped>
  $base: '.dynamic-meta';
  #{$base}-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
