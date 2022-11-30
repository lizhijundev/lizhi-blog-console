<template>
  <div class="custom-svg-container">
    <!-- 具体如何自定义查看文档，文档搜索vab-icon可看到用法 -->
    <el-alert
      :closable="false"
      show-icon
      title="自定义图标演示"
      type="success"
    />
    <el-row :gutter="15">
      <el-col :lg="2" :md="3" :sm="8" :xl="2" :xs="6">
        <vab-card shadow="hover">
          <vab-icon icon="vab" is-custom-svg />
        </vab-card>
      </el-col>
      <el-col :lg="2" :md="3" :sm="8" :xl="2" :xs="6">
        <vab-card shadow="hover">
          <vab-icon icon="vuejs-fill" is-custom-svg />
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
  export default defineComponent({
    name: 'CustomSvg',
    setup() {
      return {}
    },
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  .custom-svg-container {
    :deep() {
      .el-card__body {
        position: relative;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        min-height: 60px;
        max-height: 60px;
        padding: #{math.div($base-padding, 1.4)};
        cursor: pointer;

        i {
          font-size: 28px;
          color: var(--el-color-grey);
          text-align: center;
          pointer-events: none;
          cursor: pointer;
          transition: $base-transition;
        }
      }
    }
  }
</style>
