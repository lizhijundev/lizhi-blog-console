<script setup lang="ts">
  import _ from 'lodash'
  import { saveArticleTag } from '@/api/article.ts'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<{
        tag_id: number
        tag_name: string
        tag_name_en: string
        tag_code: string
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
    tag_id: 0,
    tag_name: '',
    tag_name_en: '',
    tag_code: '',
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
          if (typeof props.data.tag_id === 'undefined') {
            title.value = '新增文章标签'
            form.value = {
              tag_id: 0,
              tag_name: '',
              tag_name_en: '',
              tag_code: '',
              sort: 100,
              status: 0,
            }
          } else {
            title.value = '编辑文章标签'
            form.value = _.cloneDeep(props.data)
          }
        })
      }
    }
  )

  const rules = ref({
    tag_name: [
      {
        required: true,
        message: '请输入文章标签名称',
        trigger: 'change',
      },
    ],
    tag_code: [
      {
        required: true,
        message: '请输入标签代码',
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
        tag_name: form.value.tag_name,
        tag_name_en: form.value.tag_name_en,
        tag_code: form.value.tag_code,
        sort: form.value.sort,
        status: form.value.status,
      }
      if (form.value.tag_id) {
        params.tag_id = form.value.tag_id
      }
      saveArticleTag(params).then(() => {
        emit('fetch-data')
        onClose()
      })
    })
  }

  const onClose = () => {
    drawerShow.value = false
    emit('update:show', false)
    form.value = {
      tag_id: 0,
      tag_name: '',
      tag_name_en: '',
      tag_code: '',
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
        <el-form-item label="标签名称" prop="cate_name">
          <el-input v-model="form.tag_name" clearable />
        </el-form-item>
        <el-form-item label="标签名称(英文)" prop="cate_name_en">
          <el-input v-model="form.tag_name_en" clearable />
        </el-form-item>
        <el-form-item label="标签代码" prop="cate_code">
          <el-input v-model="form.tag_code" clearable />
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
