<template>
  <div>
    <el-form ref="formRef" label-width="100px" :model="form" :rules="rules">
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
      <el-form-item label="支付密码" prop="password">
        <el-input v-model="form.password" type="password" />
      </el-form-item>
    </el-form>
    <div class="pay-button-group">
      <el-button :loading="loading" type="primary" @click="handleSubmit">
        提交
      </el-button>
      <el-button @click="handlePrev">上一步</el-button>
    </div>
  </div>
</template>

<script>
  export default defineComponent({
    name: 'Step2',
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
  .pay-button-group {
    display: block;
    margin: 20px auto;
    text-align: center;
  }
</style>
