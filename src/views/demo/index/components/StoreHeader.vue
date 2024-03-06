<template>
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
</template>

<script>
  export default defineComponent({
    setup() {
      const list = [
        {
          title: '学习必备',
          description: '查看更多 >>>',
          colorFrom: '#1890ffb3',
          colorTo: '#1890ff',
          icon: 'mac-line',
          url: 'https://vue-admin-beautiful.com/' + 'authorization',
        },
        {
          title: '分享讨论',
          description: '查看更多 >>> ',
          colorFrom: '#1bea7ab3',
          colorTo: '#1bea7a',
          icon: 'chat-heart-line',
          url: 'https://vue-admin-beautiful.com/' + 'authorization',
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
    .vab-colorful-card {
      .el-card__header {
        font-size: 24px;
      }

      i {
        top: 25px;
        transform: none;
      }
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
