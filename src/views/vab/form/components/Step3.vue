<template>
  <div>
    <div class="pay-top-content">
      <vab-icon class="pay-success" icon="checkbox-circle-line" />
      <p>支付成功</p>
    </div>
    <el-form
      ref="formRef"
      class="pay-bottom"
      label-width="100px"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="付款账户">
        {{ infoData.payAccount }}
      </el-form-item>
      <el-form-item label="收款账户">
        {{ infoData.gatheringAccount }}
      </el-form-item>
      <el-form-item label="收款人姓名">
        {{ infoData.gatheringName }}
      </el-form-item>
      <el-form-item label="转账金额">
        <strong>￥{{ infoData.price }}元</strong>
      </el-form-item>
    </el-form>
    <div class="pay-button-group">
      <el-button type="primary" @click="handlePrev">再转一笔</el-button>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
    name: 'Step3',
    props: {
      infoData: {
        type: Object,
        default: () => {
          return {}
        },
      },
    },
    emits: ['change-step'],
    setup(props, { emit }) {
      const state = reactive({
        formRef: null,
        form: {
          password: '123456',
        },
        rules: {
          password: [
            { required: true, message: '请输入支付密码', trigger: 'blur' },
          ],
        },
        loading: false,
      })

      const handleSubmit = () => {
        state['formRef'].validate((valid) => {
          if (valid) {
            state.loading = true
            setTimeout(() => {
              emit('change-step', 2)
              state.loading = false
            }, 2000)
          } else {
            state.loading = false
          }
        })
      }
      const handlePrev = () => {
        emit('change-step', 0)
      }

      return {
        ...toRefs(state),
        handleSubmit,
        handlePrev,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .pay-top-content {
    text-align: center;

    .pay-success {
      display: block;
      margin: $base-margin auto 5px auto;
      font-size: 40px;
      color: var(--el-color-success);
    }
  }

  .pay-bottom {
    padding: $base-padding;
    margin-top: $base-margin;
    background: #f5f7f8;
    border: 1px dashed $base-border-color;
    border-radius: $base-border-radius;
  }

  .pay-button-group {
    display: block;
    margin: $base-margin auto;
    text-align: center;
  }
</style>
