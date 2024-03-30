<script setup>
  import { useUserStore } from '@/store/modules/user'
  const userStore = useUserStore()
  const { avatar, username } = storeToRefs(userStore)
  const { t } = useI18n()
  const handleTips = () => {
    const hour = new Date().getHours()
    if (hour < 8) {
      return t('layout.global.header.morning', { name: username.value })
    } else if (hour <= 11) {
      return t('layout.global.header.forenoon', { name: username.value })
    } else if (hour <= 13) {
      return t('layout.global.header.afternoon', { name: username.value })
    } else if (hour < 18) {
      return t('layout.global.header.evening', { name: username.value })
    } else {
      return t('layout.global.header.night', { name: username.value })
    }
  }

  onMounted(() => {
    // 仅在开发坏境和演示地址调用首页更新提示AD，防止正式环境触发更新推广
  })
</script>

<template>
  <el-col :span="24">
    <vab-card class="page-header" shadow="never">
      <el-avatar class="page-header-avatar" :src="avatar" />
      <div class="page-header-tip">
        <p class="page-header-tip-title">
          {{ handleTips() }}
        </p>
      </div>
    </vab-card>
  </el-col>
</template>

<style lang="scss" scoped>
  .page-header {
    transition: none;

    :deep() {
      * {
        transition: none;
      }

      .el-card__body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    &-avatar {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      border-radius: 50%;
    }

    &-tip {
      flex: auto;
      width: calc(100% - 200px);
      min-width: 300px;

      &-title {
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: bold;
        color: #3c4a54;
      }

      &-description {
        min-height: 20px;
        font-size: $base-font-size-default;
        color: #808695;
      }
    }
  }
</style>
