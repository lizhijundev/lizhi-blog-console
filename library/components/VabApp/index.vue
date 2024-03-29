<script lang="ts" setup>
  import { pwa } from '@/config'
  import { useHead } from '@vueuse/head'
  import { enLocale, zhLocale } from '@/i18n'

  const route = useRoute()
  const { locale: language } = useI18n()

  const locale = computed(() => (language.value === 'en' ? enLocale : zhLocale))

  const VabUpdate = defineAsyncComponent(
    () => import('@/plugins/VabUpdate/index.vue')
  )

  const siteData = reactive({
    description: '',
  })
  watchEffect(() => {
    siteData.description = `${'Vue'} ${'Admin'} ${'Plus'}-${route.meta.title} - 简介、官网、首页、文档和下载 - 前端开发框架`
  })
  useHead({
    meta: [
      {
        name: `description`,
        content: computed(() => siteData.description),
      },
    ],
  })
</script>
<template>
  <el-config-provider
    :button="{
      autoInsertSpace: true,
    }"
    :locale="locale"
  >
    <router-view v-slot="{ Component }">
      <component :is="Component" />
    </router-view>
    <vab-update v-if="pwa" ref="vabUpdateRef" />
  </el-config-provider>
</template>
