<template>
  <el-dialog
    v-model="dialogFormVisible"
    :title="title"
    width="500px"
    :close-on-click-modal="false"
    @close="close"
  >
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item :label="$t('adminMan.username')" prop="username">
        <el-input v-model.trim="form.username" :disabled="form.admin_id > 0" />
      </el-form-item>
      <el-form-item :label="$t('adminMan.nickname')" prop="nickname">
        <el-input v-model.trim="form.nickname" />
      </el-form-item>
      <el-form-item :label="$t('adminMan.role')" prop="role_ids">
        <el-select v-model="form.role_ids" multiple clearable>
          <el-option
            v-for="item in roles"
            :key="item.role_id"
            :label="item.role_name"
            :value="item.role_id"
          />
        </el-select>
      </el-form-item>
      <el-form-item :label="$t('personCenter.fieldStatus')" prop="status">
        <el-radio-group v-model="form.status">
          <el-radio :label="1">{{ $t('common.enable') }}</el-radio>
          <el-radio :label="0">{{ $t('common.disable') }}</el-radio>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <template #footer>
      <el-button @click="close">{{ $t('common.cancel') }}</el-button>
      <el-button type="primary" @click="save">
        {{ $t('common.save') }}
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { saveAdminMember } from '@/api/adminMember'
  import { getAdminAllRoleList } from '@/api/adminRole'

  export default defineComponent({
    name: 'UserManagementEdit',
    emits: ['fetch-data'],
    setup(props, { emit }) {
      const $baseMessage = inject('$baseMessage')
      const { t } = useI18n()

      const state = reactive({
        formRef: null,
        isAdd: true,
        roles: [],
        form: {
          admin_id: 0,
          username: '',
          nickname: '',
          role_ids: [],
        },
        rules: {},
        title: '',
        dialogFormVisible: false,
      })

      const showEdit = (row) => {
        onLoadRoles()
        if (!row) {
          state.title = t('adminMan.title', {
            action: t('common.add'),
          })
          state.isAdd = true
          state.form.status = 1
        } else {
          state.title = t('adminMan.title', {
            action: t('common.edit'),
          })
          state.isAdd = false
          state.form = {
            admin_id: row.admin_id,
            username: row.username,
            nickname: row.nickname,
            status: row.status,
            role_ids: row.roles.map((item) => item.role_id),
          }
        }
        state.dialogFormVisible = true
      }
      const close = () => {
        state['formRef'].resetFields()
        state.form = {
          admin_id: 0,
          username: '',
          nickname: '',
          role_ids: [],
        }
        state.dialogFormVisible = false
      }
      const onLoadRoles = () => {
        getAdminAllRoleList().then((res) => {
          if (res.code === 0) {
            state.roles = res.data
          }
        })
      }
      const save = () => {
        state['formRef'].validate(async (valid) => {
          if (valid) {
            const params = _.cloneDeep(state.form)
            if (state.isAdd) {
              delete params.admin_id
            }
            params.role_ids = params.role_ids.join(',')
            saveAdminMember(params).then((res) => {
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
        close,
        save,
      }
    },
  })
</script>
