<template>
  <div class="errorLog-container">
    <el-alert
      :closable="false"
      show-icon
      title="这里会在顶部navbar上模拟一个控制台错误日志"
      type="success"
    />
    <el-button type="primary" @click="handleError">
      点击模拟一个chuzhixinjiayou的错误
    </el-button>
    <error-test v-if="show" />
  </div>
</template>

<script>
  import ErrorTest from './components/ErrorTest'

  export default {
    name: 'ErrorLog',
    components: { ErrorTest },
    data() {
      return { show: false }
    },
    methods: {
      handleError() {
        if (process.env.NODE_ENV === 'production') {
          this.$baseMessage(
            '为了防止引起歧义，演示环境不允许模拟错误，请下载源码后体验此功能。',
            false,
            'vab-hey-message-error'
          )
          return false
        }
        this.show = true
      },
    },
  }
</script>
