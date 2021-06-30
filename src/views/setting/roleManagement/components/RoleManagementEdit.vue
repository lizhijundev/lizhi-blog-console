<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    width="500px"
    @close="close"
  >
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="角色码" prop="role">
        <el-input v-model="form.role" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { getCurrentInstance, reactive, toRefs } from 'vue'
  import { doEdit } from '@/api/roleManagement'

  export default {
    name: 'RoleManagementEdit',
    emits: ['fetch-data'],
    setup(props, { emit }) {
      const { proxy } = getCurrentInstance()

      const state = reactive({
        form: {},
        rules: {
          role: [{ required: true, trigger: 'blur', message: '请输入角色码' }],
        },
        title: '',
        dialogFormVisible: false,
      })

      const showEdit = (row) => {
        if (!row) {
          state.title = '添加'
        } else {
          state.title = '编辑'
          state.form = Object.assign({}, row)
        }
        state.dialogFormVisible = true
      }
      const close = () => {
        state['formRef'].resetFields()
        state.form = {}
        state.dialogFormVisible = false
      }
      const save = () => {
        state['formRef'].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(this.form)
            proxy.$baseMessage(msg, 'success', false, 'vab-hey-message-success')
            emit('fetch-data')
            close()
          }
        })
      }

      return {
        ...toRefs(state),
        showEdit,
        close,
        save,
      }
    },
  }
</script>
