<template>
  <div class="vab-avatar-list">
    <el-tooltip
      v-for="(item, index) in avatarList"
      :key="index"
      :content="item.username"
      effect="dark"
      placement="top-start"
    >
      <el-avatar :src="item.avatar" />
    </el-tooltip>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'VabAvatarList',
    props: {
      avatarList: {
        type: Array,
        default: () => [],
      },
    },
  })
</script>

<style lang="scss" scoped>
  .vab-avatar-list {
    :deep() {
      .el-avatar {
        display: inline-block;
        margin-left: -15px;
        cursor: pointer;
        border: 3px solid var(--el-color-white);
      }
    }
  }
</style>
