<script setup lang="ts">
  import _ from 'lodash'
  import { saveCalendarEvent } from '@/api/calendar.ts'
  import dayjs from 'dayjs'

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<{
        event_id: number
        calendar_id: number
        uuid: string
        event_name: string
        event_desc: string
        classification: string
        image: string
        create_at: number
        start_at: number
        end_at: number
        is_fullday: number
        address: string
        address_name: string
        coordinates: string
        organizer_email: string
        organizer_name: string
        alert: string
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
    event_id: 0,
    calendar_id: 0,
    uuid: '',
    event_name: '',
    event_desc: '',
    classification: 'PUBLIC',
    image: '',
    create_at: 0,
    start_at: 0,
    end_at: 0,
    is_fullday: 0,
    address: '',
    address_name: '',
    coordinates: '',
    organizer_email: '',
    organizer_name: '',
    alert: [],
    status: 1,
  })

  const drawerShow = ref(false)
  const title = ref('')
  watch(
    () => props.show,
    (val) => {
      drawerShow.value = val
      if (val) {
        nextTick(() => {
          if (typeof props.data.event_id === 'undefined') {
            title.value = '创建日程'
            form.value = {
              event_id: 0,
              calendar_id: props.data.calendar_id,
              uuid: '',
              event_name: '',
              event_desc: '',
              classification: 'PUBLIC',
              image: '',
              create_at: 0,
              start_at: 0,
              end_at: 0,
              is_fullday: 0,
              address: '',
              address_name: '',
              coordinates: '',
              organizer_email: '',
              organizer_name: '',
              alert: [],
              status: 1,
            }
          } else {
            title.value = '编辑日程'
            form.value = _.cloneDeep(props.data)
          }
        })
      }
    }
  )

  const rules = ref({
    event_name: [
      { required: true, message: '请输入日程名称', trigger: 'blur' },
    ],
    classification: [
      { required: true, message: '请选择分类', trigger: 'blur' },
    ],
    start_at: [{ required: true, message: '请选择开始时间', trigger: 'blur' }],
    end_at: [{ required: true, message: '请选择结束时间', trigger: 'blur' }],
  })

  const onSave = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return
      }
      const params: any = {
        calendar_id: form.value.calendar_id,
        uuid: form.value.uuid,
        event_name: form.value.event_name,
        event_desc: form.value.event_desc,
        classification: form.value.classification,
        image: form.value.image,
        start_at: dayjs(form.value.start_at).unix(),
        end_at: dayjs(form.value.end_at).unix(),
        is_fullday: Number(form.value.is_fullday),
        address: form.value.address,
        address_name: form.value.address_name,
        coordinates: form.value.coordinates,
        organizer_email: form.value.organizer_email,
        organizer_name: form.value.organizer_name,
        alert: JSON.stringify(
          form.value.alert.map((item) => {
            return {
              beforeMinutes: Number(item.beforeMinutes),
              msg: item.msg,
            }
          })
        ),
        status: form.value.status,
      }
      if (form.value.event_id) {
        params.event_id = form.value.event_id
      }
      // console.log('params', params)
      saveCalendarEvent(params).then(() => {
        emit('fetch-data')
        onClose()
      })
    })
  }

  const onClose = () => {
    drawerShow.value = false
    emit('update:show', false)
    form.value = {
      event_id: 0,
      calendar_id: 0,
      uuid: '',
      event_name: '',
      event_desc: '',
      classification: 'PUBLIC',
      image: '',
      create_at: 0,
      start_at: 0,
      end_at: 0,
      is_fullday: 0,
      address: '',
      address_name: '',
      coordinates: '',
      organizer_email: '',
      organizer_name: '',
      alert: [],
      status: 1,
    }
  }

  const onAddAlert = () => {
    form.value.alert.push({ beforeMinutes: '', msg: '' })
  }

  const onDelAlert = (index: number) => {
    form.value.alert.splice(index, 1)
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
        <el-form-item v-show="form.event_id > 0" label="UUID">
          <el-input v-model="form.uuid" disabled />
        </el-form-item>
        <el-form-item v-show="form.event_id > 0" label="最后编辑">
          <el-date-picker v-model="form.create_at" type="datetime" disabled />
        </el-form-item>
        <el-form-item label="日程名称" prop="event_name">
          <el-input v-model="form.event_name" clearable />
        </el-form-item>
        <el-form-item label="日程描述" prop="event_desc">
          <el-input v-model="form.event_desc" clearable />
        </el-form-item>
        <el-form-item label="日程类型" prop="classification">
          <el-radio-group v-model="form.classification">
            <el-radio value="PUBLIC">开放</el-radio>
            <el-radio value="PRIVATE">私有</el-radio>
            <el-radio value="CONFIDENTIAL">机密</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="开始时间" prop="start_at">
          <el-date-picker
            v-model="form.start_at"
            type="datetime"
            placeholder="选择日程开始时间"
          />
        </el-form-item>
        <el-form-item label="结束时间" prop="end_at">
          <el-date-picker
            v-model="form.end_at"
            type="datetime"
            placeholder="选择日程结束时间"
          />
        </el-form-item>
        <el-form-item label="全天日程" prop="classification">
          <el-radio-group v-model="form.is_fullday">
            <el-radio :value="0">非全天日程</el-radio>
            <el-radio :value="1">全天日程</el-radio>
          </el-radio-group>
        </el-form-item>
        <el-form-item label="日程地址" prop="address">
          <el-input v-model="form.address" clearable />
        </el-form-item>
        <el-form-item label="地址名称" prop="address_name">
          <el-input v-model="form.address_name" clearable />
        </el-form-item>
        <el-form-item label="地址坐标" prop="coordinates">
          <div class="flex flex-col gap-2">
            <el-input v-model="form.coordinates" clearable />
            <div class="text-sm text-gray-500">
              请输入经纬度，逗号分隔(113.886937,22.578022)
            </div>
          </div>
        </el-form-item>
        <el-form-item label="组织者名字" prop="organizer_email">
          <el-input v-model="form.organizer_email" clearable />
        </el-form-item>
        <el-form-item label="组织者Email" prop="organizer_name">
          <el-input v-model="form.organizer_name" clearable />
        </el-form-item>
        <el-form-item label="提醒时间" prop="alert">
          <div class="flex flex-col gap-2">
            <el-button type="primary" size="small" @click="onAddAlert">
              添加提醒
            </el-button>
            <div
              v-for="(item, index) in form.alert"
              :key="index"
              class="flex items-center gap-2"
            >
              <el-input
                v-model="form.alert[index].beforeMinutes"
                placeholder="提前时间（分钟）"
                clearable
              />
              <el-input
                v-model="form.alert[index].msg"
                clearable
                placeholder="提醒内容"
              />
              <el-button type="danger" @click="onDelAlert(index)">
                删除
              </el-button>
            </div>
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
