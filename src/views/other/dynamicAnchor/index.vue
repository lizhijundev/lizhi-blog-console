<template>
  <div class="dynamic-anchor-container">
    <vab-anchor :floor-list="floorList">
      <!--TODO 待优化  这里不会动态循环，想做成饿了么那种 el-menu >>> el-menu-item 这种嵌套并且可循环的組件形式 -->
      <template #floor0>用户管理</template>
      <template #floor1>配置管理</template>
      <template #floor2>角色管理</template>
      <template #floor3>定时任务补偿</template>
    </vab-anchor>
  </div>
</template>

<script>
  import VabAnchor from '@/plugins/VabAnchor'

  export default defineComponent({
    name: 'DynamicAnchor',
    components: { VabAnchor },
    setup() {
      const state = reactive({
        floorList: [
          { title: '用户管理' },
          { title: '配置管理' },
          { title: '角色管理' },
          { title: '定时任务补偿' },
        ],
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .dynamic-anchor-container {
  }
</style>
