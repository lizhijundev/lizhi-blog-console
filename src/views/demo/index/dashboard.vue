<template>
  <div class="dashboard-container">
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <top-card
          background="blue"
          :count-config="countConfig1"
          icon="money-cny-circle-line"
          percentage="10%"
          title="总销量"
        />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <top-card
          background="white"
          icon="money-cny-box-line"
          percentage="44%"
          title="总成交"
        />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <top-card
          background="white"
          icon="user-search-line"
          percentage="30%"
          title="活跃用户"
        />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <top-card
          background="white"
          icon="passport-line"
          percentage="10%"
          title="订单"
        />
      </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xl="12" :xs="24">
        <trend />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <branch />
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <rank />
      </el-col>
      <el-col :lg="24" :md="24" :sm="24" :xl="24" :xs="24">
        <tabs />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import _ from 'lodash'
  import Trend from './components/Trend'
  import Branch from './components/Branch'
  import Rank from './components/Rank'
  import Tabs from './components/Tabs'
  import TopCard from './components/TopCard'

  export default defineComponent({
    name: 'Dashboard',
    components: { Trend, Branch, Rank, Tabs, TopCard },
    setup() {
      const state = reactive({
        countConfig1: {
          startVal: 0,
          endVal: _.random(1000, 20000),
          decimals: 2,
          prefix: '￥',
          suffix: '',
          separator: ',',
          duration: 8000,
        },
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .dashboard-container {
    padding: 0 !important;
    background: $base-color-background !important;

    :deep() {
      .el-card {
        height: 300px;

        [class*='-echart'] {
          width: 100%;
          height: 200px;
        }
      }
    }
  }
</style>
