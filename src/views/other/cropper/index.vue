<template>
  <div class="cropper-container">
    <el-button type="primary" @click="openDialog">点击打开头像裁剪</el-button>
    <vab-cropper ref="vabCropperRef" />
  </div>
</template>

<script>
  import VabCropper from '@/plugins/VabCropper'

  export default defineComponent({
    name: 'Cropper',
    components: { VabCropper },
    setup() {
      const vabCropperRef = ref()
      const openDialog = () => {
        vabCropperRef.value.dialogVisible = true
      }

      return {
        vabCropperRef,
        openDialog,
      }
    },
  })
</script>
