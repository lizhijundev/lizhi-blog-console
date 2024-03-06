<template>
  <div class="icon-selector-container">
    <el-alert
      :closable="false"
      show-icon
      title="图标选择器演示"
      type="success"
    />
    <el-popover
      popper-class="icon-selector-popper"
      trigger="hover"
      :width="292"
    >
      <template #reference>
        <el-button>
          <vab-icon :icon="icon" />
          图标选择器
          <vab-icon icon="arrow-down-s-line" />
        </el-button>
      </template>
      <vab-icon-selector @handle-icon="handleIcon" />
    </el-popover>
  </div>
</template>

<script>
  import VabIconSelector from '@/plugins/VabIconSelector'

  export default defineComponent({
    name: 'IconSelector',
    components: { VabIconSelector },
    setup() {
      const state = reactive({
        icon: '24-hours-fill',
      })

      const handleIcon = (item) => {
        state.icon = item
      }

      return {
        ...toRefs(state),
        handleIcon,
      }
    },
  })
</script>
