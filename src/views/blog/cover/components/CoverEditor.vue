<script setup lang="ts">
  import _ from 'lodash'
  import Upload from '@/components/Upload/index.vue'
  import { saveCover } from '@/api/cover.ts'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<{
        id: number
        cover_url: string
        cover_url_mobile: string
        place: string
        place_en: string
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
    id: 0,
    cover_url: '',
    cover_url_mobile: '',
    place: '',
    place_en: '',
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
          if (typeof props.data.id === 'undefined') {
            title.value = '新增封面'
            form.value = {
              id: 0,
              cover_url: '',
              cover_url_mobile: '',
              place: '',
              place_en: '',
              status: 0,
            }
          } else {
            title.value = '编辑封面'
            form.value = _.cloneDeep(props.data)
          }
        })
      }
    }
  )

  const rules = ref({
    cover_url: [
      {
        required: true,
        message: '请上传PC封面',
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
        cover_url: form.value.cover_url,
        cover_url_mobile: form.value.cover_url_mobile,
        place: form.value.place,
        place_en: form.value.place_en,
        status: form.value.status,
      }
      if (form.value.id) {
        params.id = form.value.id
      }
      saveCover(params).then(() => {
        emit('fetch-data')
        onClose()
      })
    })
  }

  const onClose = () => {
    drawerShow.value = false
    emit('update:show', false)
    form.value = {
      id: 0,
      cover_url: '',
      cover_url_mobile: '',
      place: '',
      place_en: '',
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
        <el-form-item label="PC封面" prop="cover_url">
          <div class="flex flex-col gap-2">
            <Upload v-model="form.cover_url" :limit="1" />
            <el-input v-model="form.cover_url" clearable />
            <div class="text-sm text-gray-500">
              PC封面建议大小:2400px * 1400px
            </div>
          </div>
        </el-form-item>
        <el-form-item label="竖屏封面" prop="cover_url_mobile">
          <div class="flex flex-col gap-2">
            <Upload v-model="form.cover_url_mobile" :limit="1" />
            <el-input v-model="form.cover_url_mobile" clearable />
            <div class="text-sm text-gray-500">竖屏建议大小:840px * 1640px</div>
          </div>
        </el-form-item>
        <el-form-item label="地点" prop="place">
          <el-input v-model="form.place" clearable />
        </el-form-item>
        <el-form-item label="地点(英文)" prop="place_en">
          <el-input v-model="form.place_en" clearable />
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
