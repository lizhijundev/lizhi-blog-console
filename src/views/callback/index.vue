<template>
  <div class="callback-container" />
</template>

<script>
  import { callback } from '@/utils/social'

  export default defineComponent({
    name: 'Callback',
    setup() {
      const loading = inject('$baseLoading')
      callback()
      window.open(' ', '_self')
      window.close()

      onUnmounted(() => {
        loading.close()
      })
    },
  })
</script>
