<script lang="ts" setup>
  import { useSettingsStore } from '@/store/modules/settings'
  import getPageTitle from '@/utils/pageTitle'
  const { locale } = useI18n()

  const route = useRoute()
  const surportLanguage = ref({
    en: 'English',
    zh: '简体中文',
  })

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)
  const { changeLanguage } = settingsStore

  const handleCommand = (language: string) => {
    changeLanguage(language)
    locale.value = language
    document.title = getPageTitle(route.meta.title)
  }
</script>

<template>
  <el-dropdown
    v-if="theme.showLanguage"
    placement="bottom-end"
    @command="handleCommand"
  >
    <vab-icon icon="translate" />
    <template #dropdown>
      <div class="cur-view">
        {{ $t('common.curLang', { lang: surportLanguage[locale] }) }}
      </div>
      <el-dropdown-menu>
        <el-dropdown-item
          v-for="(name, key) in surportLanguage"
          :key="key"
          :command="key"
        >
          {{ name }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<style lang="scss" scoped>
  .cur-view {
    padding: 10px;
    font-size: 14px;
    border-bottom: 1px solid var(--el-border-color-lighter);
    color: var(--el-text-color-primary);
  }
</style>
