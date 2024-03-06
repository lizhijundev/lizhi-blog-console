<template>
  <div class="login-container">
    <el-row>
      <el-col :lg="6" :md="6" :sm="24" :xl="8" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
      <el-col :lg="12" :md="12" :sm="24" :xl="8" :xs="24">
        <div class="login-form">
          <div class="login-header">
            <div class="title">
              <span>{{ translateTitle('登录') }}</span>
              <vab-language />
            </div>
            <div class="title-tips">
              {{ translateTitle('欢迎来到') }} {{ title }}
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
                :placeholder="translateTitle('请输入用户名')"
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
                :placeholder="translateTitle('请输入密码')"
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
                {{ translateTitle('登录') }}
              </el-button>
            </el-form-item>
          </el-form>
        </div>
      </el-col>
      <el-col :lg="6" :md="6" :sm="24" :xl="8" :xs="24">
        <div style="color: transparent">占位符</div>
      </el-col>
    </el-row>
    <vab-footer />
  </div>
</template>

<script>
  import { useSettingsStore } from '@/store/modules/settings'
  import { useUserStore } from '@/store/modules/user'
  import { translate } from '@/i18n'
  import { isPassword } from '@/utils/validate'

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
      const route = useRoute()
      const router = useRouter()

      const userStore = useUserStore()
      const settingsStore = useSettingsStore()

      const login = (form) => userStore.login(form)

      const validateUsername = (rule, value, callback) => {
        if ('' === value) callback(new Error(translate('用户名不能为空')))
        else callback()
      }
      const validatePassword = (rule, value, callback) => {
        if (!isPassword(value))
          callback(new Error(translate('密码不能少于6位')))
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
              await login(state.form).catch(() => {})
              await router.push(handleRoute())
            } finally {
              state.loading = false
            }
        })
      }

      // 国家法律法规要求显示备案号 实际项目请自行为自己的备案信息及域名
      const beianShow = ref(false)

      onBeforeMount(() => {})

      watchEffect(() => {
        state.redirect = (route.query && route.query.redirect) || '/'
      })

      onBeforeRouteLeave((to, from, next) => {
        next()
      })

      return {
        translateTitle: translate,
        ...toRefs(state),
        title: settingsStore.getTitle,
        handlePassword,
        handleLogin,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .login-container {
    height: 100vh;
    background: #f1f1f1;

    .login-form {
      position: relative;
      max-width: 100%;
      margin: calc((100vh - 555px) / 2) 5vw 5vw;
      overflow: hidden;
      background: rgba(255, 255, 255, 0.2);
      background-size: 100% 100%;
      border-radius: 10px;
      box-shadow: var(--el-box-shadow-lighter);
      backdrop-filter: blur(10px);
      .login-header {
        background: var(--el-color-primary);
        padding: 4.5vh;
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
        padding: 4.5vh;
      }

      .login-btn {
        display: inherit;
        width: 220px;
        height: 50px;
        margin: 5px auto;
        background: var(--el-color-primary);
        border: 0;
        &:hover {
          opacity: 0.9;
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
          margin: 20px 0;
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
</style>
