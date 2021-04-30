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
            width="292"
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
  import { mapActions } from 'vuex'
  import getPageTitle from '@/utils/pageTitle'
  import VabIconSelector from '@/extra/VabIconSelector'

  export default {
    name: 'DynamicMeta',
    components: { VabIconSelector },
    data() {
      return {
        badge: 0,
        icon: this.$route.meta.icon,
        defaultTitle: this.$route.meta.title,
      }
    },
    methods: {
      ...mapActions({
        changeMenuMeta: 'routes/changeMenuMeta',
        changeTabsMeta: 'tabs/changeTabsMeta',
      }),
      handleBadge(name) {
        const badge = this.badge + 1
        this.badge = badge
        this.changeMenuMeta({
          name,
          meta: { badge },
        })
      },
      resetBadge(name, meta) {
        this.badge = 0
        this.changeMenuMeta({ name, meta })
      },
      handleMeta(name, meta) {
        if (meta.title) document.title = getPageTitle(meta.title)
        this.changeMenuMeta({ name, meta })
        this.changeTabsMeta({ name, meta })
      },
      handleIcon(item) {
        this.icon = item
        this.changeMenuMeta({ name: 'DynamicMeta', meta: { icon: item } })
        this.changeTabsMeta({ name: 'DynamicMeta', meta: { icon: item } })
      },
    },
  }
</script>
