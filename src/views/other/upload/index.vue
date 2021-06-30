<template>
  <div class="upload-container">
    <vab-upload
      ref="vabUploadRef"
      :limit="50"
      name="file"
      :size="2"
      url="/upload"
    />
    <el-button type="primary" @click="handleShow()">模拟上传</el-button>
  </div>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'
  import { ref } from 'vue'

  export default {
    name: 'Upload',
    components: {
      VabUpload,
    },
    setup() {
      const vabUploadRef = ref()

      function handleShow() {
        vabUploadRef.value.handleShow()
      }

      return {
        vabUploadRef,
        handleShow,
      }
    },
  }
</script>
