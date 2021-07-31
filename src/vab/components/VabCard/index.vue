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

<script>
  import { defineComponent, reactive, toRefs } from 'vue'
  import { onBeforeRouteLeave } from 'vue-router'

  export default defineComponent({
    name: 'VabCard',
    props: {
      header: {
        type: String,
        default: '',
      },
      bodyStyle: {
        type: [String, Object, Array],
        default: '',
      },
      shadow: {
        type: String,
        default: '',
      },
      skeleton: {
        type: Boolean,
        default: false,
      },
      skeletonRows: {
        type: Number,
        default: 4, //显示的数量会比传入的数量多 1
      },
    },
    setup() {
      const state = reactive({
        skeletonShow: true,
        timer: null,
      })

      state.timer = setTimeout(() => {
        state.skeletonShow = false
      }, 500)

      onBeforeRouteLeave((to, from, next) => {
        clearInterval(state.timer)
        next()
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .vab-card {
    &-transition {
      transition: $base-transition;
    }
  }
</style>
