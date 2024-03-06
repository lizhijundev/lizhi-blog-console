<template>
  <el-col :lg="8" :md="12" :sm="24" :xl="6" :xs="24">
    <vab-card shadow="hover" skeleton>
      <template #header>
        <span>{{ title }}</span>
      </template>
      <vab-chart
        :init-options="initOptions"
        :option="option"
        theme="vab-echarts-theme"
      />
    </vab-card>
  </el-col>
</template>

<script>
  import VabChart from '@/plugins/VabChart'

  export default defineComponent({
    name: 'VabChartGauge',
    components: {
      VabChart,
    },
    props: {
      title: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        initOptions: {
          renderer: 'svg',
        },
        option: {
          grid: {
            top: 20,
            right: 20,
            bottom: 20,
            left: 20,
          },
          tooltip: {
            formatter: '{a} <br/>{b} : {c}%',
          },
          series: {
            name: 'Pressure',
            type: 'gauge',
            radius: '100%',
            progress: {
              show: true,
            },
            detail: {
              formatter: '{value}',
              valueAnimation: true,
              fontSize: 14,
              offsetCenter: [0, '70%'],
            },
            data: [
              {
                value: 50,
                name: 'SCORE',
              },
            ],
          },
        },
      }
    },
  })
</script>
