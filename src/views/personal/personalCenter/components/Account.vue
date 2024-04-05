<script setup lang="ts">
  import { getUserInfo, updateAccount } from '@/api/user.ts'
  import { useUserStore } from '@/store/modules/user.ts'
  import _ from 'lodash'

  const userStore = useUserStore()
  const formRef = ref(null)
  const $baseMessage = inject('$baseMessage')

  const form = ref({
    admin_id: 0,
    username: '',
    nickname: '',
    avatar: '',
    desc: '',
    phone: '',
    email: '',
    area: '',
  })

  const { t } = useI18n()
  const rules = ref({
    nickname: [
      { required: true, message: t('validate.required'), trigger: 'blur' },
    ],
    email: [
      {
        pattern: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
        message: t('validate.email'),
        trigger: 'blur',
      },
    ],
  })

  const loadUserInfo = () => {
    getUserInfo().then((res) => {
      form.value.admin_id = res.data.admin_id
      form.value.username = res.data.username
      form.value.nickname = res.data.nickname
      form.value.avatar = res.data.avatar
      form.value.desc = res.data.desc
      form.value.phone = res.data.phone
      form.value.email = res.data.email
      form.value.area = res.data.area
    })
  }

  const onSubmit = () => {
    formRef.value.validate(async (valid) => {
      if (!valid) {
        return
      }
      const params = _.cloneDeep(form.value)
      delete params.admin_id
      updateAccount(params).then(() => {
        userStore.setNickname(form.value.nickname)
        $baseMessage('保存成功', 'success', 'vab-hey-message-success')
      })
    })
  }

  onMounted(() => {
    loadUserInfo()
  })
</script>

<template>
  <el-col :lg="12" :md="16" :sm="24" :xl="12" :xs="24">
    <el-form ref="formRef" label-width="80px" :model="form" :rules="rules">
      <el-form-item :label="$t('personCenter.account')" prop="username">
        <el-input v-model="form.username" disabled />
      </el-form-item>
      <el-form-item :label="$t('personCenter.nickname')" prop="nickname">
        <el-input v-model="form.nickname" />
      </el-form-item>
      <el-form-item :label="$t('personCenter.desc')" prop="desc">
        <el-input v-model="form.desc" />
      </el-form-item>
      <el-form-item :label="$t('personCenter.phone')" prop="phone">
        <el-input v-model="form.phone" />
      </el-form-item>
      <el-form-item :label="$t('personCenter.email')" prop="email">
        <el-input v-model="form.email" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          {{ $t('common.save') }}
        </el-button>
      </el-form-item>
    </el-form>
  </el-col>
</template>

<style scoped lang="scss"></style>
