<template>
  <div class="slider-container">
    <vab-card shadow="hover">
      <template #header>
        <span>基础用法</span>
      </template>
      <span class="demonstration">默认</span>
      <el-slider v-model="value1" />
      <span class="demonstration">自定义初始值</span>
      <el-slider v-model="value2" />
      <span class="demonstration">隐藏 Tooltip</span>
      <el-slider v-model="value3" :show-tooltip="false" />
      <span class="demonstration">格式化 Tooltip</span>
      <el-slider v-model="value4" :format-tooltip="formatTooltip" />
      <span class="demonstration">禁用</span>
      <el-slider v-model="value5" disabled />
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>离散值</span>
      </template>
      <span class="demonstration">不显示间断点</span>
      <el-slider v-model="value6" :step="10" />
      <span class="demonstration">显示间断点</span>
      <el-slider v-model="value6" show-stops :step="10" />
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>带有输入框</span>
      </template>
      <el-slider v-model="value7" show-input />
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>范围选择</span>
      </template>
      <el-slider v-model="value8" :max="10" range show-stops />
    </vab-card>
    <!-- <vab-card shadow="hover">
      <template #header>
        <span>竖向模式</span>
      </template>
      <el-slider v-model="value9" height="200px" vertical />
    </vab-card> -->
  </div>
</template>

<script>
  export default defineComponent({
    name: 'Slider',
    setup() {
      const state = reactive({
        value1: 0,
        value2: 50,
        value3: 36,
        value4: 48,
        value5: 42,
        value6: 0,
        value7: 0,
        value8: [4, 8],
        value9: 0,
      })

      const formatTooltip = (val) => {
        return val / 100
      }

      return {
        ...toRefs(state),
        formatTooltip,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .slider-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
