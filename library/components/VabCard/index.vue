<script lang="ts" setup>
  defineProps({
    header: {
      type: String,
      default: '',
    },
    bodyStyle: {
      type: Object,
      default: () => {
        return {}
      },
    },
    shadow: {
      type: String,
      default: 'never',
    },
    skeleton: {
      type: Boolean,
      default: false,
    },
    skeletonRows: {
      type: Number,
      default: 4, //显示的数量会比传入的数量多 1
    },
  })

  let timer: any = null
  const skeletonShow = ref(true)

  timer = setTimeout(() => {
    skeletonShow.value = false
  }, 500)

  onBeforeRouteLeave((to, from, next) => {
    clearInterval(timer)
    next()
  })
</script>

<template>
  <el-card :body-style="bodyStyle" class="vab-card" :shadow="shadow">
    <template v-if="$slots.header || header" #header>
      <slot name="header">{{ header }}</slot>
    </template>
    <el-skeleton
      v-if="skeleton"
      animated
      :loading="skeletonShow"
      :rows="skeletonRows"
    >
      <template #default>
        <slot class="vab-card-transition" />
      </template>
    </el-skeleton>
    <slot v-else class="vab-card-transition" />
  </el-card>
</template>

<style lang="scss" scoped>
  .vab-card {
    &-transition {
      transition: $base-transition;
    }
  }
</style>
