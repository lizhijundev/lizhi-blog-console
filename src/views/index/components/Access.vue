<template>
  <vab-card class="access" shadow="hover" skeleton>
    <template #header>
      <vab-icon icon="line-chart-line" />
      访问量
      <el-tag class="card-header-tag" type="success">日</el-tag>
    </template>
    <vab-chart
      :init-options="initOptions"
      :option="option"
      theme="vab-echarts-theme"
    />
    <div class="bottom">
      <span>
        日均访问量:
        <vab-count
          :decimals="countConfig.decimals"
          :duration="countConfig.duration"
          :end-val="countConfig.endVal"
          :prefix="countConfig.prefix"
          :separator="countConfig.separator"
          :start-val="countConfig.startVal"
          :suffix="countConfig.suffix"
        />
      </span>
    </div>
  </vab-card>
</template>

<script>
  import _ from 'lodash'
  import VabChart from '@/plugins/VabChart'
  import VabCount from '@/plugins/VabCount'
  import { useSettingsStore } from '@/store/modules/settings'

  export default defineComponent({
    components: {
      VabChart,
      VabCount,
    },
    setup() {
      const settingsStore = useSettingsStore()
      const { echartsGraphic1 } = storeToRefs(settingsStore)
      const state = reactive({
        timer: null,
        countConfig: {
          startVal: 0,
          endVal: _.random(20000, 60000),
          decimals: 0,
          prefix: '',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
        initOptions: {
          renderer: 'svg',
        },
        option: {
          tooltip: {
            trigger: 'axis',
            extraCssText: 'z-index:1',
          },
          grid: {
            top: '5%',
            left: '2%',
            right: '4%',
            bottom: '0%',
            containLabel: true,
          },
          xAxis: [
            {
              type: 'category',
              boundaryGap: false,
              data: [],
              axisTick: {
                alignWithLabel: true,
              },
            },
          ],
          yAxis: [
            {
              type: 'value',
            },
          ],
          series: [
            {
              name: '访问量',
              type: 'line',
              data: [],
              smooth: true,
              areaStyle: {},
              itemStyle: {
                borderRadius: [0, 5, 5, 0],
                color: new VabChart.graphic.LinearGradient(
                  0,
                  0,
                  1,
                  0,
                  echartsGraphic1.value.map((color, offset) => ({
                    color,
                    offset,
                  }))
                ),
              },
            },
          ],
        },
      })

      watch(
        () => echartsGraphic1.value,
        () => {
          state.option.series[0].itemStyle.color =
            new VabChart.graphic.LinearGradient(
              0,
              0,
              1,
              0,
              echartsGraphic1.value.map((color, offset) => ({
                color,
                offset,
              }))
            )
        }
      )

      onMounted(() => {
        const base = +new Date(2021, 1, 1)
        const oneDay = 24 * 3600 * 1000
        const date = []

        const data = [Math.random() * 1500]
        let now = new Date(base)

        const addData = (shift) => {
          now = [now.getFullYear(), now.getMonth() + 1, now.getDate()].join('/')
          date.push(now)
          data.push(_.random(20000, 60000))

          if (shift) {
            date.shift()
            data.shift()
          }
          now = new Date(+new Date(now) + oneDay)
          state.option.xAxis[0].data = []
          state.option.series[0].data = []
          state.option.xAxis[0].data = date
          state.option.series[0].data = data
        }

        for (let i = 1; i < 6; i++) {
          addData()
        }

        state.timer = setInterval(() => {
          addData(true)
        }, 5000)
      })

      onBeforeRouteLeave((to, from, next) => {
        clearInterval(state.timer)
        next()
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>
