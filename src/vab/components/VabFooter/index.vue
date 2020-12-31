<template>
  <footer class="vab-footer">
    Copyright
    <vab-icon icon="copyright-line" />
    {{ title }} {{ fullYear }} by {{ copyright }}
  </footer>
</template>

<script>
  import { copyright, title } from '@/config'

  export default {
    name: 'VabFooter',
    setup() {
      return {
        fullYear: new Date().getFullYear(),
        copyright,
        title,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vab-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 55px;
    padding: 0 $base-padding 0 $base-padding;
    color: rgba(0, 0, 0, 0.45);
    background: $base-color-white;
    border-top: 1px dashed $base-border-color;

    i {
      margin: 0 5px;
    }
  }
</style>
