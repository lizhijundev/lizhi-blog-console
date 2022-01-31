<template>
  <div class="date-time-picker-container">
    <vab-card shadow="hover">
      <template #header>
        <span>日期和时间点</span>
      </template>
      <el-date-picker
        v-model="value1"
        placeholder="选择日期时间"
        type="datetime"
      />
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>日期和时间范围</span>
      </template>
      <el-date-picker
        v-model="value2"
        end-placeholder="结束日期"
        range-separator="至"
        start-placeholder="开始日期"
        type="datetimerange"
      />
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>默认的起始与结束时刻</span>
      </template>
      <el-date-picker
        v-model="value3"
        :default-time="value2"
        end-placeholder="结束日期"
        start-placeholder="开始日期"
        type="datetimerange"
      />
    </vab-card>
  </div>
</template>

<script>
  export default defineComponent({
    name: 'DateTimePicker',
    setup() {
      const state = reactive({
        value1: '',
        value2: [
          new Date(2000, 10, 10, 10, 10),
          new Date(2000, 10, 11, 10, 10),
        ],
        value3: '',
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .date-time-picker-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
