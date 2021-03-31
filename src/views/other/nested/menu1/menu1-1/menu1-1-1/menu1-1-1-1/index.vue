<template>
  <div class="menu1-1-1-1-box">
    <el-alert :closable="false" title="多级路由 1-1-1-1" type="success">
      <el-input v-model="value" />
    </el-alert>
  </div>
</template>

<script>
  export default {
    name: 'Menu1111',
    data() {
      return {
        value: '',
      }
    },
  }
</script>

<style lang="scss" scoped>
  [class*='-container'] {
    padding: 15px;
    background: $base-color-white;
  }
</style>
