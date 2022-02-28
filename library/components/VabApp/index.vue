<script setup>
  import i18n from '@/i18n'
  import { pwa } from '@/config'

  const VabUpdate = defineAsyncComponent(() => import('@/plugins/VabUpdate'))

  const locale = toRef(i18n.global, 'locale')
  const messages = toRef(i18n.global, 'messages')
</script>

<template>
  <el-config-provider
    :button="{
      autoInsertSpace: true,
    }"
    :locale="messages[locale]"
  >
    <router-view />
    <vab-update v-if="pwa" ref="vabUpdateRef" />
  </el-config-provider>
</template>
