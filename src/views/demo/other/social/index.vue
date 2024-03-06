<template>
  <div class="social-container">
    <el-button type="primary" @click="handleSocialLogin">
      点击进行Github登录
    </el-button>
    <p v-if="data">{{ data }}</p>
  </div>
</template>

<script>
  import { useUserStore } from '@/store/modules/user'
  import { login } from '@/utils/social'

  export default defineComponent({
    name: 'Social',
    setup() {
      const $baseLoading = inject('$baseLoading')
      const $baseMessage = inject('$baseMessage')

      const userStore = useUserStore()

      const socialLogin = (data) => userStore.socialLogin(data)

      const data = ref()

      const handleSocialLogin = () => {
        const loading = $baseLoading()
        login(`https://github.com/login/oauth/authorize`, {
          client_id:
            process.env.NODE_ENV === 'development'
              ? 'bb8dfd34f6c6a57367e3'
              : 'e104bdc488d009840c4f',
        })
          .then(async (_data) => {
            data.value = _data
            await socialLogin(_data)
            // 登录页面使用，取消注释
            // const routerPath =
            //  this.redirect === "/404" || this.redirect === "/403"
            //    ? "/"
            //    : this.redirect;
            // this.$router.push(routerPath).catch(() => {});
          })
          .catch(() => {
            $baseMessage(
              '第三方登录失败，未返回令牌',
              'error',
              'vab-hey-message-error'
            )
          })
          .finally(() => {
            loading.close()
          })
      }

      return {
        data,
        handleSocialLogin,
      }
    },
  })
</script>
