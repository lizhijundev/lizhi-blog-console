<template>
  <div class="time-picker-container">
    <vab-card shadow="hover">
      <template #header>
        <span>固定时间点</span>
      </template>
      <el-time-select
        v-model="value"
        end="18:30"
        placeholder="选择时间"
        start="08:30"
        step="00:15"
      />
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>固定时间范围</span>
      </template>
      <el-time-select
        v-model="startTime"
        end="18:30"
        placeholder="开始时间"
        start="08:30"
        step="00:15"
        style="margin-right: 10px"
      />
      <el-time-select
        v-model="endTime"
        end="18:30"
        :min-time="startTime"
        placeholder="结束时间"
        start="08:30"
        step="00:15"
      />
    </vab-card>

    <vab-card shadow="hover">
      <template #header>
        <span>任意时间点</span>
      </template>
      <el-time-picker
        v-model="value1"
        :disabled-hours="disabledHours"
        :disabled-minutes="disabledMinutes"
        :disabled-seconds="disabledSeconds"
        placeholder="任意时间点"
      />
    </vab-card>
  </div>
</template>

<script>
  export default defineComponent({
    name: 'Timepicker',
    setup() {
      const state = reactive({
        value: '',
        value1: new Date(2016, 9, 10, 18, 40),
        startTime: '',
        endTime: '',
      })
      const makeRange = (start, end) => {
        const result = []
        for (let i = start; i <= end; i++) {
          result.push(i)
        }
        return result
      }

      const disabledHours = () => {
        return makeRange(0, 16).concat(makeRange(19, 23))
      }
      const disabledMinutes = (hour) => {
        if (hour === 17) {
          return makeRange(0, 29)
        }
        if (hour === 18) {
          return makeRange(31, 59)
        }
      }
      const disabledSeconds = (hour, minute) => {
        if (hour === 18 && minute === 30) {
          return makeRange(1, 59)
        }
      }

      return {
        ...toRefs(state),
        disabledHours,
        disabledMinutes,
        disabledSeconds,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .time-picker-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
