<template>
  <div class="menu1-1-box">
    <el-alert :closable="false" title="多级路由 1-1" type="success">
      <vab-keep-alive />
    </el-alert>
  </div>
</template>

<script>
  export default {
    name: 'Menu11',
  }
</script>

<style lang="scss" scoped>
  [class*='-container'] {
    padding: 15px;
    background: $base-color-white;
  }
</style>
