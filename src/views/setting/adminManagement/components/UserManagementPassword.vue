<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="$t('personCenter.resetPwd')"
    width="500px"
    :close-on-click-modal="false"
    @close="close"
  >
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item :label="$t('personCenter.account')" prop="username">
        <el-input v-model.trim="form.username" disabled />
      </el-form-item>
      <el-form-item :label="$t('adminMan.password')" prop="password">
        <el-input v-model.trim="form.password" type="password" />
      </el-form-item>
      <el-form-item
        :label="$t('personCenter.confirmPassword')"
        prop="password2"
      >
        <el-input v-model.trim="form.password2" type="password" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="save">
        {{ $t('personCenter.resetPwd') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { resetAdminMemberPassword } from '@/api/adminMember'
  import _ from 'lodash'

  export default defineComponent({
    name: 'UserManagementEdit',
    emits: ['fetch-data'],
    setup(props, { emit }) {
      const $baseMessage = inject('$baseMessage')

      const { t } = useI18n()
      const checkPwd = (rule, value, callback) => {
        if (value !== state.form.password) {
          callback(new Error(t('validate.passwordInconsistent')))
        } else {
          callback()
        }
      }

      const state = reactive({
        formRef: null,
        form: {
          admin_id: 0,
          username: '',
          password: '',
          password2: '',
        },
        rules: {
          password: [
            { required: true, message: t('login.pwdTips'), trigger: 'blur' },
            {
              min: 6,
              max: 20,
              message: t('login.pwdError'),
              trigger: 'blur',
            },
          ],
          password2: [
            { required: true, message: t('login.pwdTips'), trigger: 'blur' },
            {
              min: 6,
              max: 20,
              message: t('login.pwdError'),
              trigger: 'blur',
            },
            { validator: checkPwd, trigger: 'blur' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      })

      const showEdit = (row) => {
        if (!row) {
          state.isAdd = true
          state.dialogFormVisible = false
          return
        }
        state.form.admin_id = row.admin_id
        state.form.username = row.username
        state.dialogFormVisible = true
      }
      const close = () => {
        state['formRef'].resetFields()
        state.form = {
          admin_id: 0,
          username: '',
          password: '',
          password2: '',
        }
        state.dialogFormVisible = false
      }
      const save = () => {
        state['formRef'].validate(async (valid) => {
          if (valid) {
            const params = _.cloneDeep(state.form)
            delete params.username
            resetAdminMemberPassword(
              params.admin_id,
              params.password,
              params.password2
            ).then((res) => {
              if (res.code === 0) {
                $baseMessage(
                  t('common.opSuccess'),
                  'success',
                  'vab-hey-message-success'
                )
                emit('fetch-data')
                close()
              }
            })
          }
        })
      }

      return {
        ...toRefs(state),
        showEdit,
        checkPwd,
        close,
        save,
      }
    },
  })
</script>
