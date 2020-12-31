<template>
  <div class="app-main-container">
    <el-alert
      :closable="false"
      title="此版本基于vue3.0 + element-plus开发，部分组件暂不支持vue3.0，不代表最终效果仅用于演示，已购买PRO vue2.0（699）的用户可免费升级，此活动仅针对2021年2月28日前全款购买PRO（vue2.0）的用户"
      type="error"
    />
    <vab-keep-alive />
    <vab-footer />
  </div>
</template>

<script>
  export default {
    name: 'AppMain',
  }
</script>
