<script setup lang="ts">
  import {
    closeAdminOtp,
    getOtpConfig,
    openAdminOtp,
    updatePwd,
  } from '@/api/user.ts'
  import { isPassword } from '@/utils/validate.ts'
  import VabQrCode from '@/plugins/VabQrCode.ts'

  const $baseMessage = inject('$baseMessage')
  const $baseConfirm = inject('$baseConfirm')
  const formRef = ref(null)
  const form = ref({
    oldPassword: '',
    newPassword: '',
    confirmPassword: '',
  })

  const { t } = useI18n()
  const validatePassword = (rule, value, callback) => {
    if (!isPassword(value)) callback(new Error(t('login.pwdError')))
    else callback()
  }
  const rules = ref({
    oldPassword: [
      { required: true, message: t('validate.required'), trigger: 'blur' },
    ],
    newPassword: [
      { required: true, message: t('validate.required'), trigger: 'blur' },
      { validator: validatePassword, trigger: 'blur' },
    ],
    confirmPassword: [
      { required: true, message: t('validate.required'), trigger: 'blur' },
      {
        validator: (rule, value, callback) => {
          if (value === form.value.newPassword) {
            callback()
          } else {
            callback(new Error(t('validate.passwordInconsistent')))
          }
        },
        trigger: 'blur',
      },
    ],
  })

  const onSubmit = () => {
    formRef.value.validate(async (valid) => {
      if (!valid) {
        return
      }
      console.log(form.value)
      updatePwd(form.value).then(() => {
        $baseMessage(
          t('personCenter.resetPwdSuccess'),
          'success',
          'vab-hey-message-success'
        )
        setTimeout(() => {
          window.location.reload()
        }, 1000)
      })
    })
  }

  const otpConfig = ref({
    otp_status: 0,
    username: '',
    otp_secret: '',
    otp_qrcode: '',
  })
  const otpForm = ref({
    code: '',
  })
  const otpRules = ref({
    code: [
      { required: true, message: t('validate.required'), trigger: 'blur' },
    ],
  })

  const otpFormRef = ref(null)
  const showOtp = ref(false)
  const otpStep = ref(0)

  const onCloseOtp = () => {
    $baseConfirm(t('common.closeConfirm'), null, async () => {
      closeAdminOtp().then(() => {
        $baseMessage(
          t('personCenter.TwoFactorCloseSuccess'),
          'success',
          'vab-hey-message-success'
        )
        otpConfig.value.otp_status = 0
        window.location.reload()
      })
    })
  }

  const openOtp = () => {
    otpFormRef.value.validate(async (valid) => {
      if (!valid) {
        return
      }
      const data = {
        code: otpForm.value.code,
        otp_secret: otpConfig.value.otp_secret,
      }
      openAdminOtp(data).then(() => {
        $baseMessage(
          t('personCenter.TwoFactorSuccess'),
          'success',
          'vab-hey-message-success'
        )
        showOtp.value = false
        otpConfig.value.otp_status = 1
      })
    })
  }

  onMounted(() => {
    getOtpConfig().then((res) => {
      otpConfig.value = res.data
    })
  })
</script>

<template>
  <div class="password-auth-container">
    <el-divider content-position="left">
      {{ $t('personCenter.resetPwd') }}
    </el-divider>
    <el-form ref="formRef" label-width="150px" :model="form" :rules="rules">
      <el-form-item :label="$t('personCenter.password')" prop="oldPassword">
        <el-input v-model="form.oldPassword" type="password" />
      </el-form-item>
      <el-form-item :label="$t('personCenter.newPassword')" prop="newPassword">
        <el-input v-model="form.newPassword" type="password" />
      </el-form-item>
      <el-form-item
        :label="$t('personCenter.confirmPassword')"
        prop="confirmPassword"
      >
        <el-input v-model="form.confirmPassword" type="password" />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="onSubmit">
          {{ $t('personCenter.resetPwd') }}
        </el-button>
      </el-form-item>
    </el-form>

    <el-divider content-position="left">
      {{ $t('personCenter.TwoFactor') }}
    </el-divider>
    <div v-if="!showOtp">
      <p>{{ $t('personCenter.TwoFactorTips') }}</p>
      <p>
        <span>{{ $t('common.currentStatus') }}：</span>
        <span v-if="otpConfig.otp_status === 1">{{ $t('common.opened') }}</span>
        <span v-else>{{ $t('common.closed') }}</span>
      </p>
      <div>
        <el-button
          v-if="otpConfig.otp_status === 0"
          type="primary"
          @click="
            () => {
              showOtp = true
              otpStep = 0
            }
          "
        >
          {{ $t('common.open') }}
        </el-button>
        <el-button
          v-if="otpConfig.otp_status === 1"
          type="primary"
          @click="onCloseOtp"
        >
          {{ $t('common.close') }}
        </el-button>
      </div>
    </div>
    <div v-if="showOtp" class="opt-container">
      <el-steps :active="otpStep">
        <el-step :title="$t('personCenter.TwoFactorStep1')" />
        <el-step :title="$t('personCenter.TwoFactorStep2')" />
      </el-steps>
      <div v-if="otpStep === 0" class="opt-qr-container">
        <div class="content">
          <vab-qr-code
            :dot-scale="0.5"
            :logo-src="require('@/assets/logo.png')"
            :text="otpConfig.otp_qrcode"
          />
          <div class="info">
            <p>{{ $t('personCenter.TwoFactorStep1Title') }}</p>
            <p>{{ $t('personCenter.TwoFactorStep1Notice') }}</p>
            <p>
              {{
                $t('personCenter.TwoFactorStep1Account', {
                  account: otpConfig.username,
                })
              }}
            </p>
            <p>
              {{
                $t('personCenter.TwoFactorStep1Secret', {
                  secret: otpConfig.otp_secret,
                })
              }}
            </p>
          </div>
        </div>
        <div class="op-container">
          <el-button type="primary" @click="showOtp = false">
            {{ $t('common.cancel') }}
          </el-button>
          <el-button type="primary" @click="otpStep = 1">
            {{ $t('common.nextStep') }}
          </el-button>
        </div>
      </div>
      <div v-if="otpStep === 1">
        <p>{{ $t('personCenter.TwoFactorStep2Notice') }}</p>
        <el-form
          ref="otpFormRef"
          :model="otpForm"
          label-width="150px"
          :rules="otpRules"
        >
          <el-form-item
            :label="$t('personCenter.TwoFactorVerifyCode')"
            prop="code"
          >
            <el-input v-model="otpForm.code" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="openOtp">
              {{ $t('personCenter.TwoFactorStep2') }}
            </el-button>
            <el-button
              @click="
                () => {
                  otpStep = 1
                  showOtp = false
                }
              "
            >
              {{ $t('common.cancel') }}
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </div>
  </div>
</template>

<style scoped lang="scss">
  .password-auth-container {
    padding: 20px;
    .el-divider {
      margin: 20px 0;
    }
    p {
      margin: 20px 0;
      line-height: 1.5;
    }
    .opt-container {
      margin-top: 20px;
      .opt-qr-container {
        display: flex;
        flex-direction: column;
        .content {
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          .info {
            margin-top: 20px;
            p {
              margin: 10px 0;
            }
          }
        }
        .op-container {
          display: flex;
          justify-content: flex-end;
          margin-top: 20px;
        }
      }
    }
  }
</style>
