<script setup lang="ts">
  import _ from 'lodash'
  import { saveArticleCate } from '@/api/article.ts'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<{
        cate_id: number
        cate_name: string
        cate_name_en: string
        cate_code: string
        sort: number
        status: number
      }>,
      default: () => ({}),
    },
  })

  const { t } = useI18n()
  const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
    (e: 'fetch-data'): void
  }>()

  const formRef = ref(null)
  const form = ref({
    cate_id: 0,
    cate_name: '',
    cate_name_en: '',
    cate_code: '',
    sort: 100,
    status: 0,
  })

  const drawerShow = ref(false)
  const title = ref('')
  watch(
    () => props.show,
    (val) => {
      drawerShow.value = val
      if (val) {
        nextTick(() => {
          if (typeof props.data.cate_id === 'undefined') {
            title.value = '新增文章分类'
            form.value = {
              cate_id: 0,
              cate_name: '',
              cate_name_en: '',
              cate_code: '',
              sort: 100,
              status: 0,
            }
          } else {
            title.value = '编辑文章分类'
            form.value = _.cloneDeep(props.data)
          }
        })
      }
    }
  )

  const rules = ref({
    cate_name: [
      {
        required: true,
        message: '请输入文章分类名称',
        trigger: 'change',
      },
    ],
    cate_code: [
      {
        required: true,
        message: '请输入分类代码',
        trigger: 'change',
      },
    ],
  })

  const onSave = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return
      }
      const params: any = {
        cate_name: form.value.cate_name,
        cate_name_en: form.value.cate_name_en,
        cate_code: form.value.cate_code,
        sort: form.value.sort,
        status: form.value.status,
      }
      if (form.value.cate_id) {
        params.cate_id = form.value.cate_id
      }
      saveArticleCate(params).then(() => {
        emit('fetch-data')
        onClose()
      })
    })
  }

  const onClose = () => {
    drawerShow.value = false
    emit('update:show', false)
    form.value = {
      cate_id: 0,
      cate_name: '',
      cate_name_en: '',
      cate_code: '',
      sort: 100,
      status: 0,
    }
  }
</script>

<template>
  <el-drawer
    v-model="drawerShow"
    direction="rtl"
    :title="title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    size="60%"
    @close="onClose"
  >
    <template #default>
      <el-form ref="formRef" label-width="180px" :model="form" :rules="rules">
        <el-form-item label="分类名称" prop="cate_name">
          <el-input v-model="form.cate_name" clearable />
        </el-form-item>
        <el-form-item label="分类名称(英文)" prop="cate_name_en">
          <el-input v-model="form.cate_name_en" clearable />
        </el-form-item>
        <el-form-item label="分类代码" prop="cate_code">
          <el-input v-model="form.cate_code" clearable />
        </el-form-item>
        <el-form-item :label="$t('adminRule.sort')" prop="sort">
          <el-input-number v-model="form.sort" controls-position="right" />
        </el-form-item>
        <el-form-item label="是否显示" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
        <el-form-item>
          <el-divider />
          <el-button type="primary" @click="onSave">
            {{ $t('common.save') }}
          </el-button>
          <el-button @click="onClose">{{ $t('common.cancel') }}</el-button>
        </el-form-item>
      </el-form>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss"></style>
