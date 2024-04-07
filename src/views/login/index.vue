<template>
  <div class="login-container">
    <div class="bg"></div>
    <div class="login-form">
      <div class="login-header">
        <div class="title">
          <span>{{ $t('login.title') }}</span>
          <vab-language />
        </div>
        <div class="title-tips">
          {{ $t('login.welcome', { title: title }) }}
        </div>
      </div>
      <el-form
        ref="formRef"
        class="form"
        label-position="left"
        :model="form"
        :rules="rules"
      >
        <el-form-item prop="username">
          <el-input
            v-model.trim="form.username"
            v-focus
            :placeholder="$t('login.usernameTips')"
            tabindex="1"
            type="text"
          >
            <template #prefix>
              <vab-icon icon="user-line" />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            :key="passwordType"
            ref="passwordRef"
            v-model.trim="form.password"
            :placeholder="$t('login.pwdTips')"
            tabindex="2"
            :type="passwordType"
            @keyup.enter="handleLogin"
          >
            <template #prefix>
              <vab-icon icon="lock-line" />
            </template>
            <template v-if="passwordType === 'password'" #suffix>
              <vab-icon
                class="show-password"
                icon="eye-off-line"
                @click="handlePassword"
              />
            </template>
            <template v-else #suffix>
              <vab-icon
                class="show-password"
                icon="eye-line"
                @click="handlePassword"
              />
            </template>
          </el-input>
        </el-form-item>
        <el-form-item>
          <el-button
            class="login-btn"
            :loading="loading"
            type="primary"
            @click="handleLogin"
          >
            {{ $t('login.login') }}
          </el-button>
        </el-form-item>
      </el-form>
    </div>
    <el-dialog v-model="otpDialog" :title="$t('personCenter.TwoFactor')">
      <el-form
        ref="otpFormRef"
        :model="otpForm"
        :rules="otpRules"
        label-width="140px"
      >
        <el-form-item
          :label="$t('personCenter.TwoFactorVerifyCode')"
          prop="code"
        >
          <el-input v-model="otpForm.code" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="openOtp">
            {{ $t('login.login') }}
          </el-button>
        </el-form-item>
      </el-form>
    </el-dialog>
    <vab-footer />
  </div>
</template>

<script>
  import { useSettingsStore } from '@/store/modules/settings'
  import { useUserStore } from '@/store/modules/user'
  import { isPassword } from '@/utils/validate'
  import { tokenName } from '@/config/setting.config'

  export default defineComponent({
    name: 'Login',
    directives: {
      focus: {
        mounted(el) {
          el.querySelector('input').focus()
        },
      },
    },
    setup() {
      const { t } = useI18n()
      const route = useRoute()
      const router = useRouter()

      const userStore = useUserStore()
      const settingsStore = useSettingsStore()

      const login = (form) => userStore.login(form)

      const validateUsername = (rule, value, callback) => {
        if ('' === value) callback(new Error(t('login.usernameError')))
        else callback()
      }
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value)) callback(new Error(t('login.pwdError')))
        else callback()
      }

      const state = reactive({
        formRef: null,
        passwordRef: null,
        form: {
          username: '',
          password: '',
        },
        rules: {
          username: [
            {
              required: true,
              trigger: 'blur',
              validator: validateUsername,
            },
          ],
          password: [
            {
              required: true,
              trigger: 'blur',
              validator: validatePassword,
            },
          ],
        },
        loading: false,
        passwordType: 'password',
        redirect: undefined,
        previewText: '',
      })

      const handleRoute = () => {
        return state.redirect === '/404' || state.redirect === '/403'
          ? '/'
          : state.redirect
      }
      const handlePassword = () => {
        state.passwordType === 'password'
          ? (state.passwordType = '')
          : (state.passwordType = 'password')
        nextTick(() => {
          state['passwordRef'].focus()
        })
      }
      const handleLogin = async () => {
        state['formRef'].validate(async (valid) => {
          if (valid)
            try {
              state.loading = true
              login(state.form)
                .then(async (data) => {
                  if (data.login_success) {
                    userStore.afterLogin(data[tokenName], tokenName)
                    await router.push(handleRoute())
                  } else {
                    console.log(data)
                    otpDialog.value = true
                    otpForm.value = {
                      admin_id: data.admin_id,
                    }
                  }
                })
                .catch(() => {})
            } finally {
              state.loading = false
            }
        })
      }

      onBeforeMount(() => {})

      watchEffect(() => {
        state.redirect = (route.query && route.query.redirect) || '/'
      })

      onBeforeRouteLeave((to, from, next) => {
        next()
      })

      const otpFormRef = ref(null)
      const otpDialog = ref(false)
      const otpForm = ref({
        admin_id: 0,
        code: '',
      })
      const otpRules = ref({
        code: [
          { required: true, message: t('login.otpTips'), trigger: 'blur' },
        ],
      })
      const openOtp = () => {
        otpFormRef.value.validate(async (valid) => {
          if (valid) {
            await userStore.loginByOtp(otpForm.value)
            await router.push(handleRoute())
          }
        })
      }

      return {
        ...toRefs(state),
        title: settingsStore.getTitle,
        handlePassword,
        handleLogin,
        otpFormRef,
        otpDialog,
        otpForm,
        otpRules,
        openOtp,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .login-container {
    position: absolute;
    width: 100%;
    height: 100vh;
    left: 0;
    top: 0;
    background: linear-gradient(45deg, #040710, #192032);
    @keyframes circle {
      0% {
        transform: translateX(-20%) translateY(20px);
      }
      100% {
        transform: translateX(-50%) translateY(120px) rotate(360deg);
      }
    }

    .bg {
      position: relative;
      width: 300px;
      height: 300px;
      border-radius: 20px;
      left: 50%;
      top: 20px;
      filter: blur(70px);
      background: #a8c9ec;
      animation: circle 5s linear infinite alternate;
      //background: url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9Ii43NSIgZmlsbD0iI0M1Q0VFMCIvPjwvc3ZnPg==)
      //  repeat;
    }
    .login-form {
      position: absolute;
      width: 480px;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      overflow: hidden;
      background: rgba(255, 255, 255, 0.2);
      border-radius: 10px;
      backdrop-filter: blur(10px);
      box-shadow: 0 0 10px rgba(255, 255, 255, 0.5);
      :deep(.el-input) {
        .el-input__wrapper {
          background: rgba(255, 255, 255, 0.2);
          .el-input__inner {
            color: #fff;
            font-size: 16px;
          }
        }
      }
      @keyframes wave {
        0% {
          background-position: 0 50%;
        }
        50% {
          background-position: 100% 50%;
        }
        100% {
          background-position: 0 50%;
        }
      }

      .login-header {
        //background-image: linear-gradient(
        //  60deg,
        //  var(--el-color-primary),
        //  var(--el-color-primary-light-3)
        //);
        //animation: wave 2s infinite linear;
        padding: 4.5vh 4.5vh 1vh 4.5vh;

        .title {
          font-size: 28px;
          font-weight: 500;
          color: var(--el-color-white);
          display: flex;
          flex-direction: row;
          align-items: center;
          justify-content: space-between;
          :deep(.ri-translate) {
            color: var(--el-color-white);
            cursor: pointer;
          }
        }
        .title-tips {
          margin-top: 24px;
          font-size: 18px;
          font-weight: 400;
          color: var(--el-color-white);
        }
      }
      .form {
        padding: 1vh 4.5vh 4.5vh 4.5vh;
      }

      .login-btn {
        display: inherit;
        width: 100%;
        height: 50px;
        margin: 5px auto;
        color: var(--el-color-primary);
        background-color: rgba(255, 255, 255, 0.7);
        backdrop-filter: blur(10px);
        border: 0;
        transition: background-color 0.3s;
        &:hover {
          background-color: rgba(255, 255, 255, 1);
        }
      }

      .tips {
        margin-bottom: 10px;
        font-size: $base-font-size-default;
        color: var(--el-color-white);
        span {
          &:first-of-type {
            margin-right: 16px;
          }
        }
      }

      .title-container {
        position: relative;
        .title {
          margin: 0 auto 40px;
          font-size: 34px;
          font-weight: bold;
          color: var(--el-color-primary);
          text-align: center;
        }
      }

      i {
        position: absolute;
        top: 8px;
        left: 15px;
        font-size: 16px;
        color: #fff;
      }

      .show-password {
        float: right;
        width: 32px;
        height: 32px;
        font-size: 16px;
      }

      :deep() {
        .el-form-item {
          padding-right: 0;
          margin: 20px 0 30px 0;
          color: #454545;
          background: transparent;
          border: 1px solid transparent;
          border-radius: 2px;

          &__content {
            min-height: $base-input-height;
            line-height: $base-input-height;
          }

          &__error {
            position: absolute;
            top: 100%;
            left: 18px;
            font-size: $base-font-size-small;
            line-height: 18px;
            color: var(--el-color-error);
          }
        }

        .el-input {
          box-sizing: border-box;

          input {
            height: 48px;
            padding-left: 30px;
            line-height: 48px;
            border: 0;
          }

          &__suffix-inner {
            position: absolute;
            right: 65px;
            cursor: pointer;
          }
        }

        .code {
          position: absolute;
          top: 4px;
          right: 4px;
          cursor: pointer;
          border-radius: $base-border-radius;
        }
      }
    }

    :deep() {
      .vab-footer {
        position: fixed;
        bottom: 20px;
        width: 100%;
        color: var(--el-color-info) !important;
        text-align: center;
        background: transparent;
        border: 0;
      }
    }
  }
  @media (max-width: 768px) {
    .login-container {
      .login-form {
        width: 90%;
        min-width: 320px;
      }
    }
  }
</style>
