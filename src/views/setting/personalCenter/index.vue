<template>
  <div class="personal-center-container">
    <vab-card shadow="never">
      <el-tabs v-model="activeTab" tab-position="top">
        <el-tab-pane :label="$t('personCenter.account')" name="account">
          <Account />
        </el-tab-pane>
        <el-tab-pane
          :label="$t('personCenter.passwordAuth')"
          name="passwordAuth"
        >
          <PasswordAuth />
        </el-tab-pane>
        <el-tab-pane :label="$t('personCenter.sessions')" name="sessions">
          <Sessions />
        </el-tab-pane>
      </el-tabs>
    </vab-card>
  </div>
</template>

<script lang="ts" setup>
  const Account = defineAsyncComponent(() => import('./components/Account.vue'))
  const PasswordAuth = defineAsyncComponent(
    () => import('./components/PasswordAuth.vue')
  )
  const Sessions = defineAsyncComponent(
    () => import('./components/Sessions.vue')
  )

  const activeTab = ref('account')
</script>

<style lang="scss" scoped>
  :deep(.el-card) {
    --el-card-border-color: transparent;
  }
  $base: '.personal-center';
  #{$base}-container {
    padding: 0 !important;
    #{$base}-user-info {
      min-height: 100%;
    }
  }
</style>
