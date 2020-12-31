<template>
  <div class="iframe-container">
    <iframe
      src="https://gitee.com/chu1204505056/vue-admin-beautiful"
      frameborder="0"
    />
  </div>
</template>

<script>
  export default {
    name: 'Iframe',
  }
</script>

<style lang="scss" scoped>
  .iframe-container {
    iframe {
      width: 100%;
      height: $base-keep-alive-height;
    }
  }
</style>
