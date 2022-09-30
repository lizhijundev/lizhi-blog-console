<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    width="500px"
    @close="close"
  >
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="父级key值" prop="parentKey">
        <el-input v-model="form.parentKey" disabled />
      </el-form-item>
      <el-form-item label="id" prop="id">
        <el-input v-model="form.id" disabled />
      </el-form-item>
      <el-form-item label="key值" prop="key">
        <el-input v-model="form.key" />
      </el-form-item>
      <el-form-item label="字典值" prop="value">
        <el-input v-model="form.value" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { doEdit } from '@/api/dictionaryManagement'
  import { uuid } from '@/utils'

  export default defineComponent({
    name: 'DictionaryManagementEdit',
    emits: ['fetch-data'],
    setup(props, { emit }) {
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        formRef: null,
        form: {
          id: uuid(),
        },
        rules: {},
        title: '',
        dialogFormVisible: false,
      })
      const showEdit = (row) => {
        state.title = '添加/编辑'
        if (row) state.form = { ...JSON.parse(JSON.stringify(row)), id: uuid() }
        else state.form = { id: uuid(), parentKey: 'root' }
        state.dialogFormVisible = true
      }
      const close = () => {
        state['formRef'].resetFields()
        state.form = {
          id: uuid(),
        }
        state.dialogFormVisible = false
      }
      const save = () => {
        state['formRef'].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(state.form)
            $baseMessage(msg, 'success', 'vab-hey-message-success')
            emit('fetch-data', { key: state.form.parentKey })
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
  })
</script>
