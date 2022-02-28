<template>
  <div class="notice-container">
    <el-row :gutter="20">
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>成功提示</span>
          </template>
          <el-result
            icon="success"
            sub-title="请根据提示进行操作"
            title="成功提示"
          >
            <template #extra>
              <el-button type="primary">确认</el-button>
            </template>
          </el-result>
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>警告提示</span>
          </template>
          <el-result
            icon="warning"
            sub-title="请根据提示进行操作"
            title="警告提示"
          >
            <template #extra>
              <el-button type="primary">确认</el-button>
            </template>
          </el-result>
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>错误提示</span>
          </template>
          <el-result
            icon="error"
            sub-title="请根据提示进行操作"
            title="错误提示"
          >
            <template #extra>
              <el-button type="primary">确认</el-button>
            </template>
          </el-result>
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>信息提示</span>
          </template>
          <el-result
            icon="info"
            sub-title="请根据提示进行操作"
            title="信息提示"
          >
            <template #extra>
              <el-button type="primary">确认</el-button>
            </template>
          </el-result>
        </vab-card>
      </el-col>

      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>Alert 警告</span>
          </template>
          <el-alert show-icon title="成功提示的文案" type="success" />
          <el-alert show-icon title="消息提示的文案" type="info" />
          <el-alert show-icon title="警告提示的文案" type="warning" />
          <el-alert show-icon title="错误提示的文案" type="error" />
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>element-plus风格 Message 消息提示</span>
          </template>
          <el-button plain type="primary" @click="open1">消息</el-button>
          <el-button plain type="success" @click="open2">成功</el-button>
          <el-button plain type="warning" @click="open3">警告</el-button>
          <el-button plain type="danger" @click="open4">错误</el-button>
        </vab-card>
        <vab-card shadow="hover">
          <template #header>
            <span>hey-ui风格 消息提示</span>
          </template>
          <el-button plain type="primary" @click="open5">消息</el-button>
          <el-button plain type="success" @click="open6">成功</el-button>
          <el-button plain type="warning" @click="open7">警告</el-button>
          <el-button plain type="danger" @click="open8">错误</el-button>
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>Notification 消息提示</span>
          </template>
          <el-button plain type="info" @click="open9">消息</el-button>
          <el-button plain type="success" @click="open10">成功</el-button>
          <el-button plain type="warning" @click="open11">警告</el-button>
          <el-button plain type="danger" @click="open12">错误</el-button>
        </vab-card>
        <vab-card shadow="hover">
          <template #header>
            <span>Message Box消息提示</span>
          </template>
          <el-button plain type="primary" @click="open13">消息提示</el-button>
          <el-button plain type="primary" @click="open14">确认消息</el-button>
        </vab-card>
      </el-col>

      <el-col :lg="6" :md="12" :sm="24" :xl="6" :xs="24">
        <vab-card shadow="hover">
          <template #header>
            <span>更新提示</span>
          </template>
          <el-button plain @click="open15">更新提示</el-button>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  export default defineComponent({
    name: 'Notice',
    setup() {
      const $pub = inject('$pub')
      const $baseAlert = inject('$baseAlert')
      const $baseNotify = inject('$baseNotify')
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        vabUpdateRef: null,
        data: [],
        toggleIndex: 0,
      })
      const open1 = () => {
        $baseMessage('这是一条消息提示', 'info')
      }
      const open2 = () => {
        $baseMessage('恭喜你，这是一条成功消息', 'success')
      }
      const open3 = () => {
        $baseMessage('警告哦，这是一条警告消息', 'warning')
      }
      const open4 = () => {
        $baseMessage('错了哦，这是一条错误消息', 'error')
      }
      const open5 = () => {
        $baseMessage('这是一条消息提示', 'info', 'vab-hey-message-info')
      }
      const open6 = () => {
        $baseMessage(
          '恭喜你，这是一条成功消息',
          'success',
          'vab-hey-message-success'
        )
      }
      const open7 = () => {
        $baseMessage(
          '警告哦，这是一条警告消息',
          'warning',
          'vab-hey-message-warning'
        )
      }
      const open8 = () => {
        $baseMessage(
          '错了哦，这是一条错误消息',
          'error',
          'vab-hey-message-error'
        )
      }
      const open9 = () => {
        $baseNotify('这是一条消息的提示消息', '提示', 'info', 'bottom-right')
      }
      const open10 = () => {
        $baseNotify('这是一条成功的提示消息', '成功', 'success', 'bottom-right')
      }
      const open11 = () => {
        $baseNotify('这是一条警告的提示消息', '警告', 'warning', 'bottom-right')
      }
      const open12 = () => {
        $baseNotify('这是一条错误的提示消息', '错误', 'error', 'bottom-right')
      }
      const open13 = () => {
        $baseAlert('这是一条消息提示')
      }
      const open14 = () => {
        $baseAlert('这是一条确认消息')
      }
      const open15 = () => {
        $pub('vab-update')
      }

      return {
        ...toRefs(state),
        open1,
        open2,
        open3,
        open4,
        open5,
        open6,
        open7,
        open8,
        open9,
        open10,
        open11,
        open12,
        open13,
        open14,
        open15,
      }
    },
  })
</script>

<style lang="scss" scoped>
  $base: '.notice';
  #{$base}-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
