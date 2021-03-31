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

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import getPageTitle from '@/utils/pageTitle'
  import i18n from '@/i18n'

  export default {
    name: 'VabLanguage',
    setup() {
      const store = useStore()
      const route = useRoute()
      const changeLanguage = () => store.dispatch('settings/changeLanguage')

      const handleCommand = (command) => {
        changeLanguage(command)
        i18n.global.locale = command
        document.title = getPageTitle(route.meta.title)
      }

      return {
        handleCommand,
        theme: computed(() => store.getters['settings/theme']),
      }
    },
  }
</script>
