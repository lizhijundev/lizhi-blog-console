<template>
  <vab-icon icon="lock-line" @click="handleLock" />

  <transition mode="out-in" name="fade-transform">
    <div v-if="lock" class="vab-screen-lock">
      <div
        class="vab-screen-lock-background"
        :style="{
          background: `fixed url(${background}) center`,
          backgroundSize: '100% 100%',
          filter: 'blur(15px)',
        }"
      ></div>

      <div class="vab-screen-lock-content">
        <div class="vab-screen-lock-content-title">
          <el-avatar :size="180" :src="avatar" />
          <vab-icon :icon="lockIcon ? 'lock-line' : 'lock-unlock-line'" />

          {{ title }} 屏幕已锁定

          {{ time }}
        </div>
        <div class="vab-screen-lock-content-form">
          <el-form ref="formRef" :model="form" :rules="rules" @submit.prevent>
            <el-form-item label="" :label-width="0" prop="password">
              <el-input
                v-model="form.password"
                v-focus
                autocomplete="off"
                placeholder="请输出密码123456"
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
                    解锁
                  </el-button>
                </template>
              </el-input>
            </el-form-item>
          </el-form>
        </div>
        <span @click="redomBackground">切换壁纸</span>
      </div>
    </div>
  </transition>
</template>

<script>
  import { computed, defineComponent, onMounted, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import dayjs from 'dayjs'

  export default defineComponent({
    name: 'VabLock',
    directives: {
      focus: {
        mounted(el) {
          el.querySelector('input').focus()
        },
      },
    },
    setup() {
      const store = useStore()
      const avatar = computed(() => store.getters['user/avatar'])
      const lock = computed(() => store.getters['settings/lock'])
      const title = computed(() => store.getters['settings/title'])

      const validatePass = (rule, value, callback) => {
        if (value === '' || value !== '123456') {
          callback(new Error('请输入正确的密码'))
        } else {
          callback()
        }
      }
      const state = reactive({
        background: `https://gitee.com/chu1204505056/image/raw/master/vab-image-lock/${Math.round(
          Math.random() * 31
        )}.jpg`,
        formRef: '',
        time: '',
        form: {
          password: '123456',
        },
        rules: {
          password: [{ validator: validatePass, trigger: 'blur' }],
        },
        lockIcon: true,
      })

      const handleLock = () => {
        store.dispatch('settings/lock')
        if (document.getElementsByClassName('vab-side-bar')[0])
          document.getElementsByClassName('vab-side-bar')[0].style.display =
            'none'
      }

      const handleUnLock = () => {
        state['formRef'].validate(async (valid) => {
          if (valid) {
            state.lockIcon = false
            setTimeout(async () => {
              await store.dispatch('settings/unLock')
              state.lockIcon = true
              await redomBackground()
              if (document.getElementsByClassName('vab-side-bar')[0])
                document.getElementsByClassName(
                  'vab-side-bar'
                )[0].style.display = ''
            }, 500)
          }
        })
      }

      const redomBackground = () => {
        state.background = ''
        state.background = `https://gitee.com/chu1204505056/image/raw/master/vab-image-lock/${Math.round(
          Math.random() * 31
        )}.jpg`
      }

      onMounted(() => {
        setInterval(() => {
          state.time = dayjs().format('HH:mm:ss')
        }, 1000)

        if (lock.value) {
          if (document.getElementsByClassName('vab-side-bar')[0])
            document.getElementsByClassName('vab-side-bar')[0].style.display =
              'none'
        }
      })

      return {
        ...toRefs(state),
        avatar,
        lock,
        title,
        handleLock,
        handleUnLock,
        redomBackground,
      }
    },
  })
</script>

<style lang="scss" scoped>
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
    background-color: rgba(255, 255, 255, 0.6);
    transition: $base-transition;
    backdrop-filter: blur(10px);

    &-background {
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: $base-z-index - 1;
    }

    &-content {
      z-index: $base-z-index;
      padding: 40px 95px 40px 95px;
      color: #252a30;
      text-align: center;
      background: rgba(255, 255, 255, 0.6);
      backdrop-filter: blur(10px);
      border-radius: 15px;

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

          .el-input__suffix {
            right: 0;

            .el-button {
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
</style>
