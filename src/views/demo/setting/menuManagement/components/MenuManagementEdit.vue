<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    width="60%"
    @close="close"
  >
    <el-form
      ref="formRef"
      inline
      label-width="140px"
      :model="form"
      :rules="rules"
    >
      <el-form-item label="父级Id" prop="parentId">
        <el-input v-model="form.parentId" />
      </el-form-item>
      <el-form-item label="name" prop="name">
        <el-input v-model="form.name" />
      </el-form-item>
      <el-form-item label="路径" prop="path">
        <el-input v-model="form.path" />
      </el-form-item>
      <el-form-item label="vue文件路径" prop="component">
        <el-input v-model="form.component" />
      </el-form-item>
      <el-form-item label="重定向" prop="redirect">
        <el-input v-model="form.redirect" />
      </el-form-item>
      <el-form-item label="标题" prop="meta.title">
        <el-input v-model="form.meta.title" />
      </el-form-item>
      <el-form-item label="图标">
        <el-popover
          popper-class="icon-selector-popper"
          trigger="hover"
          :width="292"
        >
          <template #reference>
            <el-input v-model="form.meta.icon" />
          </template>
          <vab-icon-selector @handle-icon="handleIcon" />
        </el-popover>
      </el-form-item>
      <el-form-item label="badge">
        <el-input v-model="form.meta.badge" />
      </el-form-item>
      <el-form-item label="dot">
        <el-switch v-model="form.meta.dot" />
      </el-form-item>
      <el-form-item label="隐藏">
        <el-switch v-model="form.meta.hidden" />
      </el-form-item>
      <el-form-item label="始终显示当前节点">
        <el-switch v-model="form.meta.levelHidden" />
      </el-form-item>
      <el-form-item label="自定义svg图标">
        <el-switch v-model="form.meta.isCustomSvg" />
      </el-form-item>
      <el-form-item label="固定">
        <el-switch v-model="form.meta.noClosable" />
      </el-form-item>
      <el-form-item label="无缓存">
        <el-switch v-model="form.meta.noKeepAlive" />
      </el-form-item>
      <el-form-item label="不显示当前标签页">
        <el-switch v-model="form.meta.tabHidden" />
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import VabIconSelector from '@/plugins/VabIconSelector'
  import { doEdit } from '@/api/menuManagement'

  export default defineComponent({
    name: 'MenuManagementEdit',
    components: { VabIconSelector },
    emits: ['fetch-data'],
    setup(props, { emit }) {
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        formRef: null,
        form: {
          meta: {
            title: '',
            icon: '',
            badge: '',
            dot: false,
            hidden: false,
            levelHidden: false,
            isCustomSvg: false,
            noClosable: false,
            noKeepAlive: false,
            tabHidden: false,
          },
        },
        rules: {
          parentId: [
            { required: true, trigger: 'blur', message: '请输入父级id' },
          ],
          name: [{ required: true, trigger: 'blur', message: '请输入name' }],
          path: [{ required: true, trigger: 'blur', message: '请输入path' }],
          component: [
            { required: true, trigger: 'blur', message: '请输入component' },
          ],
          'meta.title': [
            { required: true, trigger: 'blur', message: '请输入标题' },
          ],
        },
        title: '',
        dialogFormVisible: false,
      })

      const handleIcon = (item) => {
        state.form.meta.icon = item
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
          meta: {
            icon: '',
          },
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

      return {
        ...toRefs(state),
        handleIcon,
        showEdit,
        close,
        save,
      }
    },
  })
</script>
