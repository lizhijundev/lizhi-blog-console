<template>
  <el-config-provider :locale="messages[locale]">
    <router-view />
  </el-config-provider>
</template>

<script>
  import { defineComponent, toRef } from 'vue'
  import i18n from '@/i18n'

  export default defineComponent({
    name: 'VabApp',
    setup() {
      const locale = toRef(i18n.global, 'locale')
      const messages = toRef(i18n.global, 'messages')

      return {
        locale,
        messages,
      }
    },
  })
</script>
