<template>
  <div class="upload-container">
    <el-alert
      :closable="false"
      show-icon
      title="演示环境可能无法模拟上传"
      type="success"
    />
    <vab-upload
      ref="vabUpload"
      :limit="50"
      :size="2"
      name="file"
      url="/upload"
    />
    <el-button type="primary" @click="handleShow()">模拟上传</el-button>
  </div>
</template>

<script>
  import VabUpload from '@/extra/VabUpload'

  export default {
    name: 'Upload',
    components: {
      VabUpload,
    },
    data() {
      return {}
    },
    methods: {
      handleShow() {
        this.$refs['vabUpload'].handleShow()
      },
    },
  }
</script>
