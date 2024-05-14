<script setup lang="ts">
  import _ from 'lodash'
  import Upload from '@/components/Upload/index.vue'
  import { saveCover } from '@/api/cover.ts'
  import { saveCalendar } from '@/api/calendar.ts'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<{
        calendar_id: number
        activity: string
        activity_code: string
        cal_name: string
        cal_desc: string
        organizer: string
        refresh_interval: number
        calendar_color: string
        status: number
      }>,
      default: () => ({}),
    },
  })

  const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
    (e: 'fetch-data'): void
  }>()

  const formRef = ref(null)
  const form = ref({
    calendar_id: 0,
    activity: '',
    activity_code: '',
    cal_name: '',
    cal_desc: '',
    organizer: '',
    refresh_interval: 5,
    calendar_color: '#409EFF',
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
          if (typeof props.data.calendar_id === 'undefined') {
            title.value = '创建活动日历'
            form.value = {
              calendar_id: 0,
              activity: '',
              activity_code: '',
              cal_name: '',
              cal_desc: '',
              organizer: '',
              refresh_interval: 5,
              calendar_color: '#409EFF',
              status: 0,
            }
          } else {
            title.value = '编辑活动日历'
            form.value = _.cloneDeep(props.data)
          }
        })
      }
    }
  )

  const rules = ref({
    activity: [
      {
        required: true,
        message: '请填写活动名称',
        trigger: 'change',
      },
    ],
    activity_code: [
      {
        required: true,
        message: '请填写活动code',
        trigger: 'change',
      },
    ],
    cal_name: [
      {
        required: true,
        message: '请填写日历名称',
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
        activity: form.value.activity,
        activity_code: form.value.activity_code,
        cal_name: form.value.cal_name,
        cal_desc: form.value.cal_desc,
        organizer: form.value.organizer,
        refresh_interval: form.value.refresh_interval,
        calendar_color: form.value.calendar_color,
        status: form.value.status,
      }
      if (form.value.calendar_id) {
        params.calendar_id = form.value.calendar_id
      }
      saveCalendar(params).then(() => {
        emit('fetch-data')
        onClose()
      })
    })
  }

  const onClose = () => {
    drawerShow.value = false
    emit('update:show', false)
    form.value = {
      calendar_id: 0,
      activity: '',
      activity_code: '',
      cal_name: '',
      cal_desc: '',
      organizer: '',
      refresh_interval: 5,
      calendar_color: '#409EFF',
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
        <el-form-item label="活动名称" prop="activity">
          <el-input v-model="form.activity" clearable />
        </el-form-item>
        <el-form-item label="活动code" prop="activity_code">
          <el-input v-model="form.activity_code" clearable />
        </el-form-item>
        <el-form-item label="日历名称" prop="cal_name">
          <el-input v-model="form.cal_name" clearable />
        </el-form-item>
        <el-form-item label="日历简介" prop="cal_desc">
          <el-input v-model="form.cal_desc" clearable />
        </el-form-item>
        <el-form-item label="组织者Email" prop="organizer">
          <el-input v-model="form.organizer" clearable />
        </el-form-item>
        <el-form-item label="日历刷新频率" prop="refresh_interval">
          <div class="w-full flex flex-col gap-2">
            <el-slider v-model="form.refresh_interval" :min="5" :max="60" />
            <div class="text-sm text-gray-500">单位：分钟</div>
          </div>
        </el-form-item>
        <el-form-item label="日历颜色" prop="calendar_color">
          <div class="flex flex-col gap-2">
            <el-color-picker v-model="form.calendar_color" />
            <div class="text-sm text-gray-500">仅iOS有效</div>
          </div>
        </el-form-item>
        <el-form-item label="是否启用" prop="status">
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
