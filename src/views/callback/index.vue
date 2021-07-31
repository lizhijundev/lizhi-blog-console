<template>
  <div class="callback-container" />
</template>

<script>
  import { defineComponent, getCurrentInstance, onBeforeUnmount } from 'vue'
  import { callback } from '@/utils/social'

  export default defineComponent({
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
  })
</script>
