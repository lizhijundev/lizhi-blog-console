<script setup lang="ts">
  import { getAdminRuleTree } from '@/api/adminRule.ts'
  import { saveAdminRole } from '@/api/adminRole.ts'
  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<{
        role_id: number
        role_name: string
        role_code: string
        rule_ids: string
        status: number
      }>,
      default: () => ({}),
    },
    direction: {
      type: String as PropType<'ltr' | 'rtl' | 'ttb' | 'btt'>,
      default: 'ltr',
    },
  })

  const { t } = useI18n()
  const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
    (e: 'fetch-data'): void
  }>()

  const drawerShow = ref(props.show)
  const title = ref('')

  const formRef = ref(null)
  const treeRef = ref(null)
  const form = ref({
    role_id: 0,
    role_name: '',
    role_code: '',
    rule_ids: [0] as any[number],
    status: 0,
  })
  const defaultCheckedKeys = ref([])
  const rulesTree = ref({})
  const treeProps = ref({
    value: 'value',
    label: 'label',
    children: 'children',
  })

  const checkRuleIds = (rule: any, value: any, callback: any) => {
    if (value.length === 0) {
      callback(new Error(t('adminRole.ruleIdsRequired')))
    } else if (!value.includes(0)) {
      callback(new Error(t('adminRole.ruleIdsRequired2')))
    } else {
      callback()
    }
  }

  const rules = ref({
    role_name: [
      {
        required: true,
        message: t('adminRole.roleNameRequired'),
        trigger: 'blur',
      },
    ],
    role_code: [
      {
        required: true,
        message: t('adminRole.roleCodeRequired'),
        trigger: 'blur',
      },
    ],
    rule_ids: [{ validator: checkRuleIds, trigger: 'blur' }],
    status: [
      {
        required: true,
        message: t('adminRole.statusRequired'),
        trigger: 'blur',
      },
    ],
  })

  watch(
    () => props.show,
    (val) => {
      drawerShow.value = val
      if (val) {
        nextTick(() => {
          if (typeof props.data.role_id === 'undefined') {
            title.value = t('adminRole.title', { action: t('common.add') })
            form.value = {
              role_id: 0,
              role_name: '',
              role_code: '',
              rule_ids: [0] as any[number],
              status: 0,
            }
            defaultCheckedKeys.value = [0]
            treeRef.value.setCheckedKeys([0])
          } else {
            title.value = t('adminRole.title', { action: t('common.edit') })

            defaultCheckedKeys.value = props.data.rule_ids
              .split(',')
              .map((item) => Number(item))
            treeRef.value.setCheckedKeys(defaultCheckedKeys.value)
            form.value = {
              role_id: props.data.role_id,
              role_name: props.data.role_name,
              role_code: props.data.role_code,
              rule_ids: defaultCheckedKeys.value,
              status: props.data.status,
            }
          }
        })
      }
    }
  )
  const onCheckChange = (data, checked) => {
    if (checked) {
      form.value.rule_ids = form.value.rule_ids.concat(data.value)
    } else {
      form.value.rule_ids = form.value.rule_ids.filter(
        (item) => item !== data.value
      )
    }
  }

  const onSave = () => {
    const ids = [...new Set(form.value.rule_ids)]
    const params = {
      ...form.value,
      rule_ids: ids.join(','),
    }
    formRef.value.validate((valid) => {
      if (!valid) {
        return
      }
      saveAdminRole(params).then(() => {
        emit('update:show', false)
        emit('fetch-data')
      })
    })
  }

  const onClose = () => {
    drawerShow.value = false
    emit('update:show', false)
    form.value = {
      role_id: 0,
      role_name: '',
      role_code: '',
      rule_ids: [0],
      status: 0,
    }
  }

  const onLoadRuleTree = () => {
    getAdminRuleTree().then((res) => {
      rulesTree.value = res.data
    })
  }

  onMounted(() => {
    onLoadRuleTree()
  })
</script>

<template>
  <el-drawer
    v-model="drawerShow"
    :direction="direction"
    :title="title"
    size="60%"
    @close="onClose"
  >
    <template #default>
      <el-form ref="formRef" label-width="130px" :model="form" :rules="rules">
        <el-form-item :label="$t('adminRole.roleName')" prop="role_name">
          <el-input v-model.trim="form.role_name" />
        </el-form-item>
        <el-form-item :label="$t('adminRole.roleCode')" prop="role_code">
          <el-input
            v-model.trim="form.role_code"
            :disabled="form.role_id > 0"
          />
        </el-form-item>
        <el-form-item :label="$t('adminRole.roleIds')" prop="rule_ids">
          <el-tree
            ref="treeRef"
            style="max-height: 420px"
            node-key="value"
            :data="rulesTree"
            :props="treeProps"
            :default-checked-keys="defaultCheckedKeys"
            :expand-on-click-node="false"
            check-strictly
            show-checkbox
            check-on-click-node
            default-expand-all
            @check-change="onCheckChange"
          />
        </el-form-item>
        <el-form-item :label="$t('personCenter.fieldStatus')" prop="rule_type">
          <el-radio-group v-model="form.status">
            <el-radio :label="0">{{ $t('common.disable') }}</el-radio>
            <el-radio :label="1">{{ $t('common.enable') }}</el-radio>
          </el-radio-group>
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <div style="flex: auto">
        <el-button @click="onClose">{{ $t('common.close') }}</el-button>
        <el-button type="primary" @click="onSave">
          {{ $t('common.save') }}
        </el-button>
      </div>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss"></style>
