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
      <el-form-item label="菜单">
        <div class="vab-tree-border">
          <el-tree
            ref="treeRef"
            :data="list"
            :default-checked-keys="[
              '/',
              '/vab',
              '/other',
              '/mall',
              '/setting',
              '/error',
            ]"
            :default-expanded-keys="[]"
            node-key="path"
            show-checkbox
          >
            <template #default="{ data }">
              <span>{{ data.meta.title }}</span>
            </template>
          </el-tree>
        </div>
      </el-form-item>
      <el-form-item label="按钮权限">
        <el-checkbox-group v-model="form.btnRolesCheckedList">
          <el-checkbox
            v-for="item in btnRoles"
            :key="item.value"
            :label="item.value"
          >
            {{ item.lable }}
          </el-checkbox>
        </el-checkbox-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">取 消</el-button>
      <el-button type="primary" @click="save">确 定</el-button>
    </template>
  </el-dialog>
</template>

<script>
  import {
    defineComponent,
    getCurrentInstance,
    onMounted,
    reactive,
    toRefs,
  } from 'vue'
  import { doEdit } from '@/api/roleManagement'
  import { getList } from '@/api/router'

  export default defineComponent({
    name: 'RoleManagementEdit',
    emits: ['fetch-data'],
    setup(props, { emit }) {
      const { proxy } = getCurrentInstance()

      const state = reactive({
        formRef: null,
        treeRef: null,
        form: {
          btnRolesCheckedList: [],
        },
        rules: {
          role: [{ required: true, trigger: 'blur', message: '请输入角色码' }],
        },
        title: '',
        dialogFormVisible: false,
        list: [],
        /* btnRoles demo */
        btnRoles: [
          {
            lable: '读',
            value: 'read:system',
          },
          {
            lable: '写',
            value: 'write:system',
          },
          {
            lable: '删',
            value: 'delete:system',
          },
        ],
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
        state.form = {
          btnRolesCheckedList: [],
        }
        state.dialogFormVisible = false
      }
      const fetchData = async () => {
        const {
          data: { list },
        } = await getList()
        state.list = list
      }
      const save = () => {
        state['formRef'].validate(async (valid) => {
          if (valid) {
            const tree = state['treeRef'].getCheckedKeys()
            const treeObject = { 'treeArray:': tree }
            const { msg } = await doEdit({
              ...state.form,
              ...treeObject,
            })
            proxy.$baseMessage(msg, 'success', 'vab-hey-message-success')
            emit('fetch-data')
            close()
          }
        })
      }
      onMounted(() => {
        fetchData()
      })
      return {
        ...toRefs(state),
        showEdit,
        close,
        fetchData,
        save,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .vab-tree-border {
    height: 200px;
    padding: $base-padding;
    overflow-y: auto;
    border: 1px solid #dcdfe6;
    border-radius: $base-border-radius;
  }
</style>
