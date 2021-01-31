<template>
  <div class="icon-selector-container">
    <el-alert
      :closable="false"
      show-icon
      title="图标选择器演示"
      type="success"
    />
    <el-popover
      :width="292"
      popper-class="icon-selector-popper"
      trigger="hover"
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
  import VabIconSelector from '@/extra/VabIconSelector'

  export default {
    name: 'IconSelector',
    components: { VabIconSelector },
    data() {
      return {
        icon: '24-hours-fill',
      }
    },
    methods: {
      handleIcon(item) {
        this.icon = item
      },
    },
  }
</script>
