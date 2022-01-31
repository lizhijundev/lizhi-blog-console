<template>
  <div class="switch-container">
    <vab-card shadow="hover">
      <template #header>
        <span>基础用法</span>
      </template>
      <el-switch
        v-model="value"
        active-color="#13ce66"
        inactive-color="#ff4949"
      />
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>文字描述</span>
      </template>
      <el-switch
        v-model="value1"
        active-text="按月付费"
        inactive-text="按年付费"
      />
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>禁用状态</span>
      </template>
      <el-switch v-model="value2" disabled style="margin-right: 10px" />
      <el-switch v-model="value3" disabled />
    </vab-card>
  </div>
</template>

<script>
  export default defineComponent({
    name: 'Switch',
    setup() {
      const state = reactive({
        value: true,
        value1: true,
        value2: true,
        value3: false,
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .switch-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
