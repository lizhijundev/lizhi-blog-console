<script setup lang="ts">
  import { getAdminRuleTree, saveAdminRule } from '@/api/adminRule.ts'
  import VabIconSelector from '@/plugins/VabIconSelector/index.vue'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<{
        rule_id: number
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
  watch(
    () => props.show,
    (val) => {
      drawerShow.value = val
      if (val) {
        nextTick(() => {
          if (typeof props.data.rule_id === 'undefined') {
            title.value = t('adminRule.title', { action: t('common.add') })
            form.value = {
              rule_id: '',
              pid: 0,
              rule_type: 1,
              rule_name: '',
              rule_code: '',
              path: '',
              component: '',
              title: '',
              icon: '',
              meta: '{}',
            }
          } else {
            title.value = t('adminRule.title', { action: t('common.edit') })
            form.value = props.data
          }
        })
      }
    }
  )

  const formRef = ref(null)
  const form = ref({
    rule_id: '',
    pid: '',
    rule_type: 1,
    rule_name: '',
    rule_code: '',
    path: '',
    component: '',
    title: '',
    icon: '',
    meta: '{}',
  })

  const checkFrontendField = (rule: any, value: any, callback: any) => {
    if (form.value.rule_type === 1 && !value) {
      callback(new Error(t('adminRule.frontendFieldRequired')))
    }
    callback()
  }

  const checkMeta = (rule: any, value: any, callback: any) => {
    console.log('checkMeta', value, rule)
    callback()
  }

  const rules = ref({
    pid: [
      {
        required: true,
        message: t('adminRule.pidRequired'),
        trigger: 'change',
      },
    ],
    rule_name: [
      {
        required: true,
        message: t('adminRule.ruleNameRequired'),
        trigger: 'change',
      },
    ],
    rule_type: [
      {
        required: true,
        message: t('adminRule.ruleTypeRequired'),
        trigger: 'change',
      },
    ],
    rule_code: [
      {
        required: true,
        message: t('adminRule.ruleCodeRequired'),
        trigger: 'change',
      },
    ],
    path: [
      {
        required: true,
        message: t('adminRule.pathRequired'),
        trigger: 'change',
      },
    ],
    component: [{ validator: checkFrontendField, trigger: 'change' }],
    title: [{ validator: checkFrontendField, trigger: 'change' }],
    meta: [{ validator: checkMeta, trigger: 'change' }],
  })
  const rulesTree = ref({})

  const onSave = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return
      }
      saveAdminRule(form.value).then(() => {
        emit('update:show', false)
        emit('fetch-data')
      })
    })
  }

  const onClose = () => {
    drawerShow.value = false
    emit('update:show', false)
    form.value = {
      rule_id: '',
      pid: '',
      rule_type: 1,
      rule_name: '',
      rule_code: '',
      path: '',
      component: '',
      title: '',
      icon: '',
      meta: '{}',
    }
  }

  const handleIcon = (item) => {
    form.value.icon = item
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
      <el-form ref="formRef" label-width="180px" :model="form" :rules="rules">
        <el-form-item :label="$t('adminRule.level')" prop="pid">
          <el-tree-select
            v-model="form.pid"
            :data="rulesTree"
            check-strictly
            :render-after-expand="false"
          />
        </el-form-item>
        <el-form-item :label="$t('adminRule.levelName')" prop="rule_name">
          <el-input v-model.trim="form.rule_name" />
          <div class="form-tips">
            {{ $t('adminRule.ruleNameTips') }}
          </div>
        </el-form-item>
        <el-form-item :label="$t('adminRule.ruleType')" prop="rule_type">
          <el-select v-model="form.rule_type" clearable>
            <el-option :label="$t('adminRule.frontend')" :value="1" />
            <el-option :label="$t('adminRule.api')" :value="2" />
          </el-select>
        </el-form-item>
        <div v-if="[1, 2].includes(form.rule_type)">
          <el-form-item
            :label="`${form.rule_type === 1 ? $t('adminRule.frontendName') : $t('adminRule.apiName')}`"
            prop="rule_code"
          >
            <el-input v-model.trim="form.rule_code" />
          </el-form-item>
          <el-form-item :label="$t('adminRule.path')" prop="path">
            <el-input v-model.trim="form.path" />
            <div class="form-tips">
              {{ $t('adminRule.pathTips') }}
            </div>
          </el-form-item>
        </div>
        <div v-if="form.rule_type === 1">
          <el-form-item :label="$t('adminRule.component')" prop="path">
            <el-input v-model.trim="form.component" />
            <div class="form-tips">
              {{ $t('adminRule.componentTips') }}
            </div>
          </el-form-item>
          <el-form-item :label="$t('adminRule.pageTitle')" prop="title">
            <el-input v-model.trim="form.title" />
            <div class="form-tips">{{ $t('adminRule.i18nTips') }}</div>
          </el-form-item>
          <el-form-item :label="$t('adminRule.pageIcon')" prop="icon">
            <el-popover
              popper-class="icon-selector-popper"
              trigger="hover"
              placement="top-start"
              :width="292"
            >
              <template #reference>
                <el-input v-model.trim="form.icon">
                  <template #append>
                    <vab-icon :icon="form.icon" />
                  </template>
                </el-input>
              </template>
              <vab-icon-selector @handle-icon="handleIcon" />
            </el-popover>
          </el-form-item>
          <el-form-item :label="$t('adminRule.meta')" prop="meta">
            <el-input v-model.trim="form.meta" type="textarea" />
          </el-form-item>
        </div>
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
