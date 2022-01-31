<template>
  <div class="calendar-container">
    <el-calendar ref="calendar">
      <template #header="{ date }">
        <span>
          {{ date }}
          {{ solar2lunar(dayjs(calendar.date).format('YYYY-MM-DD')).gzYear }}年
          {{ solar2lunar(dayjs(calendar.date).format('YYYY-MM-DD')).gzMonth }}月
        </span>
        <el-button-group>
          <el-button @click="selectDate('prev-year')">上一年</el-button>
          <el-button @click="selectDate('prev-month')">上一月</el-button>
          <el-button @click="selectDate('today')">今天</el-button>
          <el-button @click="selectDate('next-month')">下一月</el-button>
          <el-button @click="selectDate('next-year')">下一年</el-button>
        </el-button-group>
      </template>
      <template #dateCell="{ data }">
        <h3>{{ solar2lunar(data.day).cDay }}</h3>
        <h5>
          {{ solar2lunar(data.day).IDayCn }}
          <span>
            {{ solar2lunar(data.day).gzDay }}
            {{ solar2lunar(data.day).astro }}
          </span>
        </h5>
      </template>
    </el-calendar>
  </div>
</template>

<script>
  import dayjs from 'dayjs'
  import { solar2lunar } from '@/plugins/VabCalendar'

  export default defineComponent({
    name: 'Calendar',
    setup() {
      const state = reactive({
        calendar: '',
      })
      const selectDate = (val) => {
        state.calendar.selectDate(val)
      }

      return {
        ...toRefs(state),
        dayjs,
        selectDate,
        solar2lunar,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .calendar-container {
    :deep() {
      .el-calendar {
        &-day {
          h5 {
            span {
              float: right;
              font-size: $base-font-size-small;
              font-weight: normal;
            }
          }
        }
      }
    }
  }
</style>
