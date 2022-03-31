<script lang="ts" setup>
  import { useSettingsStore } from '@/store/modules/settings'
  import getPageTitle from '@/utils/pageTitle'
  import { VabRoute } from '/#/router'
  import i18n from '@/i18n'

  const route: VabRoute = useRoute()

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)
  const { changeLanguage } = settingsStore

  const handleCommand = (language: string) => {
    changeLanguage(language)
    i18n.global.locale = language
    document.title = getPageTitle(route.meta.title)
  }
</script>

<template>
  <el-dropdown v-if="theme.showLanguage" @command="handleCommand">
    <vab-icon icon="translate" />
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="zh">中文简体</el-dropdown-item>
        <el-dropdown-item command="en">English</el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>
