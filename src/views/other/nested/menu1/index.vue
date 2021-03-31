<template>
  <div class="menu1-container">
    <el-alert :closable="false" title="多级路由 1" type="success">
      <vab-keep-alive />
    </el-alert>
  </div>
</template>

<script>
  export default {
    name: 'Menu1',
  }
</script>

<style lang="scss" scoped>
  :deep() {
    .el-alert {
      padding: $base-padding;
      margin: 0 !important;
    }
  }
</style>
