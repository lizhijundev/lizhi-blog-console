<template>
  <div class="input-container">
    <el-card shadow="hover">
      <template #header>
        <span>基础用法</span>
      </template>
      <el-input v-model="input1" placeholder="请输入内容" width="“200px”" />
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <span>禁用状态</span>
      </template>
      <el-input v-model="input2" :disabled="true" placeholder="请输入内容" />
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <span>可清空</span>
      </template>
      <el-input v-model="input3" clearable placeholder="请输入内容" />
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <span>密码框</span>
      </template>
      <el-input v-model="input4" placeholder="请输入内容" show-password />
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <span>带 icon 的输入框</span>
      </template>
      <el-input
        v-model="input5"
        placeholder="请选择日期"
        suffix-icon="el-icon-date"
      />
      <el-input
        v-model="input6"
        placeholder="请输入内容"
        prefix-icon="el-icon-search"
      />
    </el-card>
    <el-card shadow="hover">
      <template #header>
        <span>textaea</span>
      </template>
      <el-input
        v-model="textarea"
        placeholder="请输入内容"
        :rows="2"
        type="textarea"
      />
    </el-card>
  </div>
</template>

<script>
  export default {
    name: 'Input',
    data() {
      return {
        input1: '',
        input2: '',
        input3: '',
        input4: '',
        input5: '',
        input6: '',
        textarea: '',
      }
    },
  }
</script>

<style lang="scss" scoped>
  .input-container {
    padding: 0 !important;
    background: $base-color-background !important;

    :deep() {
      .el-input {
        width: 180px;
        &:first-child {
          margin-right: 10px;
        }
        & + .el-input {
          margin-right: 10px;
          margin-bottom: 10px;
          margin-left: 0;
        }
      }
    }
  }
</style>
