<script setup lang="ts">
  import { useUserStore } from '@/store/modules/user'
  const userStore = useUserStore()

  const { avatar, nickname } = storeToRefs(userStore)
  const name = ref('')

  onMounted(() => {
    // nickname截取1
    name.value = nickname.value.slice(0, 1)
  })
</script>

<template>
  <el-avatar v-if="avatar" class="page-header-avatar" :src="avatar" />
  <el-avatar v-else class="page-header-avatar">{{ name }}</el-avatar>
</template>

<style scoped lang="scss">
  :deep(.el-avatar) {
    --el-avatar-text-size: 18px;
  }
</style>
