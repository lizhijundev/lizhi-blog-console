<template>
  <div class="button-container">
    <vab-card shadow="hover">
      <template #header><span>基础用法</span></template>
      <el-button>默认按钮</el-button>
      <el-button type="primary">主要按钮</el-button>
      <el-button type="success">成功按钮</el-button>
      <el-button type="info">信息按钮</el-button>
      <el-button type="warning">警告按钮</el-button>
      <el-button type="danger">危险按钮</el-button>
      <el-button plain>朴素按钮</el-button>
      <el-button plain type="primary">主要按钮</el-button>
      <el-button plain type="success">成功按钮</el-button>
      <el-button plain type="info">信息按钮</el-button>
      <el-button plain type="warning">警告按钮</el-button>
      <el-button plain type="danger">危险按钮</el-button>
      <el-button round>圆角按钮</el-button>
      <el-button round type="primary">主要按钮</el-button>
      <el-button round type="success">成功按钮</el-button>
      <el-button round type="info">信息按钮</el-button>
      <el-button round type="warning">警告按钮</el-button>
      <el-button round type="danger">危险按钮</el-button>
      <el-button circle :icon="Search" />
      <el-button circle :icon="Edit" type="primary" />
      <el-button circle :icon="Check" type="success" />
      <el-button circle :icon="Message" type="info" />
      <el-button circle :icon="Star" type="warning" />
      <el-button circle :icon="Delete" type="danger" />
    </vab-card>

    <vab-card shadow="hover">
      <template #header>
        <span>禁用状态</span>
      </template>
      <el-button disabled>默认按钮</el-button>
      <el-button disabled type="primary">主要按钮</el-button>
      <el-button disabled type="success">成功按钮</el-button>
      <el-button disabled type="info">信息按钮</el-button>
      <el-button disabled type="warning">警告按钮</el-button>
      <el-button disabled type="danger">危险按钮</el-button>
      <el-button disabled plain>朴素按钮</el-button>
      <el-button disabled plain type="primary">主要按钮</el-button>
      <el-button disabled plain type="success">成功按钮</el-button>
      <el-button disabled plain type="info">信息按钮</el-button>
      <el-button disabled plain type="warning">警告按钮</el-button>
      <el-button disabled plain type="danger">危险按钮</el-button>
    </vab-card>

    <vab-card shadow="hover">
      <template #header>
        <span>文字按钮</span>
      </template>
      <el-button text type="primary">文字按钮</el-button>
      <el-button disabled text>文字按钮</el-button>
    </vab-card>

    <vab-card shadow="hover">
      <template #header>
        <span>element内置图标按钮</span>
      </template>
      <el-button :icon="Edit" type="primary" />
      <el-button :icon="Share" type="primary" />
      <el-button :icon="Delete" type="primary" />
      <el-button :icon="Search" type="primary">搜索</el-button>
      <el-button type="primary">
        上传
        <el-icon class="el-icon--right"><Upload /></el-icon>
      </el-button>
    </vab-card>

    <vab-card shadow="hover">
      <template #header>
        <span>自定义图标按钮</span>
      </template>
      <el-button type="primary">
        <vab-icon icon="24-hours-line" />
      </el-button>
      <el-button type="primary">
        <vab-icon icon="4k-line" />
      </el-button>
      <el-button type="primary">
        <vab-icon icon="a-b" />
      </el-button>
      <el-button type="primary">
        <vab-icon icon="account-box-line" />
        用户名
      </el-button>
    </vab-card>

    <vab-card shadow="hover">
      <template #header>
        <span>按钮组</span>
      </template>
      <el-button-group style="margin-right: 10px">
        <el-button :icon="ArrowLeft" type="primary">上一页</el-button>
        <el-button type="primary">
          下一页
          <el-icon class="el-icon--right"><ArrowRight /></el-icon>
        </el-button>
      </el-button-group>
      <el-button-group>
        <el-button :icon="Edit" type="primary" />
        <el-button :icon="Share" type="primary" />
        <el-button :icon="Delete" type="primary" />
      </el-button-group>
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>加载中</span>
      </template>
      <el-button :loading="true" type="primary">加载中</el-button>
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>不同尺寸</span>
      </template>
      <el-button>默认按钮</el-button>
      <el-button size="small">小型按钮</el-button>
      <el-button round>默认按钮</el-button>
      <el-button round size="small">小型按钮</el-button>
    </vab-card>
  </div>
</template>

<script>
  import {
    ArrowLeft,
    ArrowRight,
    Check,
    Delete,
    Edit,
    Message,
    Search,
    Share,
    Star,
    Upload,
  } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'Button',
    components: { ArrowRight, Upload },
    setup() {
      return {
        Search,
        Edit,
        Check,
        Message,
        Star,
        Delete,
        ArrowLeft,
        Share,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .button-container {
    padding: 0 !important;
    background: $base-color-background !important;

    :deep() {
      .el-card__body {
        padding-bottom: 10px;
        .el-button {
          margin: 0 10px 10px 10px;
        }
      }

      .el-button-group {
        .el-button {
          margin-right: 0;
        }
      }
    }
  }
</style>
