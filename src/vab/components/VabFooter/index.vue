<template>
  <footer class="vab-footer">
    Copyright
    <vab-icon icon="copyright-line" />
    {{ title }} {{ fullYear }}
  </footer>
</template>

<script>
  import { defineComponent } from 'vue'
  import { title } from '@/config'

  export default defineComponent({
    name: 'VabFooter',
    setup() {
      return {
        title,
        fullYear: new Date().getFullYear(),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .vab-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 55px;
    padding: 0 $base-padding 0 $base-padding;
    color: rgba(0, 0, 0, 0.45);
    background: var(--el-color-white);
    border-top: 1px dashed $base-border-color;

    i {
      margin: 0 5px;
    }
  }
</style>
