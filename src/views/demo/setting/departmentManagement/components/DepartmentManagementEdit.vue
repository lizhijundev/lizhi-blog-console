<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    width="500px"
    @close="close"
  >
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item label="父节点" prop="parentName">
        <el-select v-model="form.parentId" placeholder="请选择父节点">
          <el-option
            :label="form.parentName"
            style="height: auto; padding: 0"
            :value="form.parentId"
          >
            <el-tree
              ref="treeRef"
              :data="treeData"
              default-expand-all
              :props="defaultProps"
              @node-click="handleNodeClick"
            />
          </el-option>
        </el-select>
      </el-form-item>
      <el-form-item label="名称" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="排序" prop="order">
        <el-input v-model="form.order" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { doEdit, getList } from '@/api/departmentManagement'

  export default defineComponent({
    name: 'DepartmentManagementEdit',
    emits: ['fetch-data'],
    setup(props, { emit }) {
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        formRef: null,
        treeData: [],
        defaultProps: {
          children: 'children',
          label: 'name',
        },
        form: {
          parentName: '',
          parentId: '',
        },
        rules: {
          parentName: [
            { required: true, trigger: 'blur', message: '请选择父节点' },
          ],
          name: [{ required: true, trigger: 'blur', message: '请输入名称' }],
          order: [{ required: true, trigger: 'blur', message: '请输入排序' }],
        },
        title: '',
        dialogFormVisible: false,
      })

      const fetchData = async () => {
        const {
          data: { list },
        } = await getList()
        state.treeData = list
      }
      const handleNodeClick = (node) => {
        state.form.parentName = node.name
        state.form.parentId = node.id
      }
      const showEdit = (row) => {
        if (!row) {
          state.title = '添加'
        } else {
          state.title = '编辑'
          state.form = JSON.parse(JSON.stringify(row))
        }
        state.dialogFormVisible = true
      }
      const close = () => {
        state['formRef'].resetFields()
        state.form = {
          parentName: '',
          parentId: '',
        }
        state.dialogFormVisible = false
      }
      const save = () => {
        state['formRef'].validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(state.form)
            $baseMessage(msg, 'success', 'vab-hey-message-success')
            emit('fetch-data')
            close()
          }
        })
      }

      fetchData()

      return {
        ...toRefs(state),
        handleNodeClick,
        showEdit,
        close,
        save,
      }
    },
  })
</script>
