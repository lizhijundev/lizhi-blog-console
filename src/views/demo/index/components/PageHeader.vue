<script setup>
  import MemberAvatar from '@/components/MemberAvatar/Index.vue'
  import { useUserStore } from '@/store/modules/user'
  const userStore = useUserStore()
  const { avatar, nickname } = storeToRefs(userStore)
  const { t } = useI18n()
  const handleTips = () => {
    const hour = new Date().getHours()
    if (hour < 8) {
      return t('layout.global.header.morning', { name: nickname.value })
    } else if (hour <= 11) {
      return t('layout.global.header.forenoon', { name: nickname.value })
    } else if (hour <= 13) {
      return t('layout.global.header.afternoon', { name: nickname.value })
    } else if (hour < 18) {
      return t('layout.global.header.evening', { name: nickname.value })
    } else {
      return t('layout.global.header.night', { name: nickname.value })
    }
  }

  onMounted(() => {
    // 仅在开发坏境和演示地址调用首页更新提示AD，防止正式环境触发更新推广
  })
</script>

<template>
  <el-col :span="24">
    <vab-card class="page-header" shadow="never">
      <MemberAvatar class="page-header-avatar" />
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
    display: flex;
    flex-direction: row;
    align-items: center;
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

    :deep(.el-avatar) {
      font-size: 24px !important;
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
        font-size: 20px;
        font-weight: bold;
        color: #3c4a54;
      }

      &-description {
        font-size: $base-font-size-default;
        color: #808695;
      }
    }
  }
</style>
