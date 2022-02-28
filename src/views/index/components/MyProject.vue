<template>
  <vab-card shadow="hover">
    <template #header>
      <vab-icon icon="github-line" />
      开源项目
      <el-tag class="card-header-tag">爱我别走</el-tag>
    </template>
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in list"
        :key="index"
        :lg="12"
        :md="12"
        :sm="24"
        :xl="12"
        :xs="24"
      >
        <vab-colorful-card
          :color-from="item.colorFrom"
          :color-to="item.colorTo"
          :icon="item.icon"
          shadow="hover"
          :title="item.title"
          @click="handleOpenWindow(item.url)"
        >
          <div class="project-card-description">{{ item.description }}</div>
        </vab-colorful-card>
      </el-col>
    </el-row>
  </vab-card>
</template>

<script>
  export default defineComponent({
    setup() {
      const list = [
        {
          title: 'vue-admin-better',
          description: '一款' + '绝佳的' + '中后台前端开发管理框架',
          colorFrom: 'var(--el-color-primary)',
          colorTo: 'var(--el-color-transition)',
          icon: 'vuejs-line',
          url:
            'https://github.com/chuzhixin/' +
            'vue-admin-better/' +
            'tree/master',
        },
        {
          title: 'vue-admin-better-antdv(vue3.x)',
          description:
            '一款' +
            '基于vue3.x + ant-design-vue的' +
            '绝佳' +
            '的中后台前端' +
            '开发管理框架',
          colorFrom: 'var(--el-color-transition)',
          colorTo: 'var(--el-color-primary)',
          icon: 'dashboard-line',
          url:
            'https://github.com/chuzhixin/' +
            'vue-admin-better/tree/vue3.0-antdv',
        },
        {
          title: 'vue-admin' + '-arco(vue3.x)',
          description:
            '一款' +
            '基于vue3.x + vite + ts + arco-' +
            'design-pro-vue' +
            '修改的前端框架',
          colorFrom: 'var(--el-color-primary)',
          colorTo: 'var(--el-color-transition)',
          icon: 'dashboard-line',
          url: 'https://github.com/' + 'chuzhixin' + '/vue-admin-arco',
        },
      ]

      const handleOpenWindow = (url) => {
        window.open(url)
      }

      return {
        list,
        handleOpenWindow,
      }
    },
  })
</script>

<style lang="scss" scoped>
  :deep() {
    .el-card__body {
      padding-bottom: 0 !important;
    }
  }

  .project-card {
    &-description {
      width: calc(100% - 100px);
      margin-right: 45px;
      font-size: 12px;
      font-weight: normal;
      line-height: 20px;
      color: #fff;
    }
  }
</style>
