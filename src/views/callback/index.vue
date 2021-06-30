<template>
  <div class="callback-container" />
</template>

<script>
  import { getCurrentInstance, onBeforeUnmount } from 'vue'
  import { callback } from '@/utils/social'

  export default {
    name: 'Callback',
    setup() {
      const { proxy } = getCurrentInstance()

      const loading = proxy.$baseLoading()
      callback()
      window.open(' ', '_self')
      window.close()

      onBeforeUnmount(() => {
        loading.close()
      })
    },
  }
</script>
