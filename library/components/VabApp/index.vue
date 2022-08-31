<script lang="ts" setup>
  import { pwa } from '@/config'
  const { locale, messages } = useI18n()

  const VabUpdate = defineAsyncComponent(
    () => import('@/plugins/VabUpdate/index.vue')
  )
</script>

<template>
  <el-config-provider
    :button="{
      autoInsertSpace: true,
    }"
    :locale="messages[locale]"
  >
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <vab-update v-if="pwa" ref="vabUpdateRef" />
  </el-config-provider>
</template>
