<template>
  <el-dialog
    v-model="dialogFormVisible"
    title="重置密码"
    width="500px"
    @close="close"
  >
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="账号" prop="username">
        <el-input v-model.trim="form.username" disabled />
      </el-form-item>
      <el-form-item label="密码" prop="password">
        <el-input v-model.trim="form.password" />
      </el-form-item>
      <el-form-item label="确认密码" prop="password2">
        <el-input v-model.trim="form.password2" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { resetAdminMemberPassword } from '@/api/adminMember'

  export default defineComponent({
    name: 'UserManagementEdit',
    emits: ['fetch-data'],
    setup(props, { emit }) {
      const $baseMessage = inject('$baseMessage')

      const checkPwd = (rule, value, callback) => {
        if (value !== state.form.password) {
          callback(new Error('两次输入密码不一致!'))
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
            { required: true, message: '请输入密码', trigger: 'blur' },
            {
              min: 6,
              max: 20,
              message: '长度在 6 到 20 个字符',
              trigger: 'blur',
            },
          ],
          password2: [
            { required: true, message: '请输入确认密码', trigger: 'blur' },
            {
              min: 6,
              max: 20,
              message: '长度在 6 到 20 个字符',
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
            delete state.form.username
            resetAdminMemberPassword(
              state.form.admin_id,
              state.form.password,
              state.form.password2
            ).then((res) => {
              if (res.code === 0) {
                $baseMessage(
                  '密码重置成功',
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
