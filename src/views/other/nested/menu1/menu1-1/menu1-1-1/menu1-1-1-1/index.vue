<template>
  <div class="menu1-1-1-1-container">
    <el-alert :closable="false" title="多级路由 1-1-1-1" type="success">
      <el-input v-model="value" />
    </el-alert>
  </div>
</template>

<script>
  export default defineComponent({
    name: 'Menu1111',
    setup() {
      const value = ref('')

      return {
        value,
      }
    },
  })
</script>
