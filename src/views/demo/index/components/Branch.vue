<template>
  <vab-card class="branch" shadow="hover" skeleton>
    <template #header>
      <span>
        <vab-icon icon="donut-chart-fill" />
        分布
      </span>
    </template>
    <vab-chart
      class="branch-echart"
      :init-options="initOptions"
      :option="option"
      theme="vab-echarts-theme"
    />
  </vab-card>
</template>

<script>
  import VabChart from '@/plugins/VabChart'

  export default defineComponent({
    components: {
      VabChart,
    },
    data() {
      return {
        initOptions: {
          renderer: 'svg',
        },
        option: {
          tooltip: {
            trigger: 'item',
          },
          series: [
            {
              name: '访问来源',
              type: 'pie',
              radius: ['50%', '70%'],
              itemStyle: {
                borderRadius: 10,
                borderColor: '#fff',
                borderWidth: 2,
              },
              emphasis: {
                label: {
                  show: true,
                },
              },
              data: [
                { value: 1048, name: '搜索引擎' },
                { value: 735, name: '直接访问' },
                { value: 580, name: '邮件营销' },
                { value: 484, name: '联盟广告' },
                { value: 300, name: '视频广告' },
              ],
            },
          ],
        },
      }
    },
  })
</script>
