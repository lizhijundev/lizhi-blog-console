<script lang="ts" setup>
  import { useUserStore } from '@/store/modules/user'
  import { useSettingsStore } from '@/store/modules/settings'
  import { unlockScreen } from '@/api/user.ts'
  import MemberAvatar from '@/components/MemberAvatar/Index.vue'

  const vFocus: any = {
    mounted(el: HTMLElement) {
      el.querySelector('input')?.focus()
    },
  }

  const userStore = useUserStore()
  const { t } = useI18n()
  const { avatar } = storeToRefs(userStore)
  const settingsStore = useSettingsStore()
  const { theme, lock, title } = storeToRefs(settingsStore)
  const { handleLock: _handleLock, handleUnLock: _handleUnLock } = settingsStore

  const validatePass = (rule: any, value: string, callback: any) => {
    if (value === '') {
      callback(new Error(t('login.pwdTips')))
    } else {
      unlockScreen({
        password: value,
      })
        .then(() => {
          callback()
        })
        .catch((err) => {
          callback(new Error(err.message))
        })
    }
  }

  const formRef = ref()
  const form = ref({
    password: '',
  })
  const rules = {
    password: [{ validator: validatePass, trigger: 'blur' }],
  }

  let lockIcon = true
  const handleUnLock = () => {
    formRef.value.validate(async (valid: boolean) => {
      if (valid) {
        lockIcon = false
        setTimeout(async () => {
          await _handleUnLock()
          lockIcon = true
          const el = document.querySelector('.vab-side-bar') as HTMLElement
          if (el) el.removeAttribute('style')
        }, 500)
      }
    })
  }

  const handleLock = () => {
    _handleLock()
    const el = document.querySelector('.vab-side-bar') as HTMLElement
    if (el) el.style.display = 'none'
  }
</script>

<template>
  <vab-icon v-if="theme.showLock" icon="lock-line" @click="handleLock" />
  <transition v-if="theme.showLock" mode="out-in" name="fade-transform">
    <div v-if="lock" class="vab-screen-lock">
      <div class="vab-screen-lock-content">
        <div class="vab-screen-lock-content-title">
          <MemberAvatar :size="180" />
          <vab-icon :icon="lockIcon ? 'lock-line' : 'lock-unlock-line'" />
          {{ title }} {{ $t('lockView.locked') }}
        </div>
        <div class="vab-screen-lock-content-form">
          <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent>
            <el-form-item label="" :label-width="0" prop="password">
              <el-input
                v-model="form.password"
                v-focus
                autocomplete="off"
                :placeholder="$t('login.pwdTips')"
                type="password"
              >
                <template #suffix>
                  <el-button
                    native-type="submit"
                    type="primary"
                    @click="handleUnLock"
                  >
                    <vab-icon
                      :icon="lockIcon ? 'lock-line' : 'lock-unlock-line'"
                    />
                    {{ $t('lockView.unlock') }}
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
      </div>
    </div>
  </transition>
</template>

<style lang="scss" scoped>
  :deep(.el-avatar) {
    font-size: 60px !important;
  }
  .vab-screen-lock {
    position: fixed;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: $base-z-index;
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    justify-content: center;
    font-weight: bold;

    background: #ebf0fa
      url(data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTIiIGhlaWdodD0iMTIiIGZpbGw9Im5vbmUiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iNiIgY3k9IjYiIHI9Ii43NSIgZmlsbD0iI0M1Q0VFMCIvPjwvc3ZnPg==)
      repeat;
    transition: $base-transition;

    &-content {
      z-index: $base-z-index;
      padding: 40px 95px 40px 95px;
      color: #252a30;
      text-align: center;
      backdrop-filter: blur(10px);
      background: #ffffff;
      border-radius: 10px;
      box-shadow: var(--el-box-shadow-lighter);
      backdrop-filter: blur(10px);

      > span {
        font-size: $base-font-size-small;
        cursor: pointer;
      }

      &-title {
        line-height: 50px;
        color: #252a30;
        text-align: center;

        .ri-lock-line,
        .ri-lock-unlock-line {
          display: block;
          margin: auto !important;
          font-size: 30px;
          color: #252a30 !important;
          transition: $base-transition;
        }
      }

      &-form {
        :deep() {
          .el-input__inner {
            width: 280px;
            height: 40px;
            line-height: 40px;
          }

          .el-input__wrapper {
            padding-right: 0;
            .el-input__suffix {
              right: 0;

              .el-button {
                height: 40px;
                line-height: 40px;
                border-top-left-radius: 0;
                border-bottom-left-radius: 0;
                i {
                  margin-left: 0 !important;
                }
              }

              .el-input__validateIcon {
                display: none;
              }
            }
          }
        }
      }
    }

    @media (max-width: 576px) {
      .vab-screen-lock-content {
        width: auto !important;
        margin: 5vw;
      }
    }
  }
</style>
