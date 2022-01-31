<template>
  <div class="link-container">
    <vab-card shadow="hover">
      <template #header>
        <span>基础用法</span>
      </template>
      <el-link href="https://element.eleme.io" target="_blank">
        默认链接
      </el-link>
      <el-link type="primary">主要链接</el-link>
      <el-link type="success">成功链接</el-link>
      <el-link type="warning">警告链接</el-link>
      <el-link type="danger">危险链接</el-link>
      <el-link type="info">信息链接</el-link>
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>禁用状态</span>
      </template>
      <el-link disabled>默认链接</el-link>
      <el-link disabled type="primary">主要链接</el-link>
      <el-link disabled type="success">成功链接</el-link>
      <el-link disabled type="warning">警告链接</el-link>
      <el-link disabled type="danger">危险链接</el-link>
      <el-link disabled type="info">信息链接</el-link>
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>下划线</span>
      </template>
      <el-link :underline="false">无下划线</el-link>
      <el-link>有下划线</el-link>
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>图标</span>
      </template>
      <el-link :icon="Edit">编辑</el-link>
    </vab-card>
  </div>
</template>

<script>
  import { Edit } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'Link',
    setup() {
      return {
        Edit,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .link-container {
    padding: 0 !important;
    background: $base-color-background !important;

    :deep() {
      .el-link {
        margin-bottom: 10px;

        &:first-child {
          margin-right: 10px;
        }

        & + .el-link {
          margin-right: 10px;
          margin-left: 0;
        }
      }
    }
  }
</style>
