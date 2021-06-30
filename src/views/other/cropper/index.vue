<template>
  <div class="cropper-container">
    <el-button type="primary" @click="openDialog">点击打开头像裁剪</el-button>
    <vab-cropper ref="vabCropperRef" />
  </div>
</template>

<script>
  import VabCropper from '@/extra/VabCropper'
  import { ref } from 'vue'

  export default {
    name: 'Cropper',
    components: { VabCropper },
    setup() {
      const vabCropperRef = ref()

      function openDialog() {
        vabCropperRef.value.dialogVisible = true
      }

      return {
        vabCropperRef,
        openDialog,
      }
    },
  }
</script>
