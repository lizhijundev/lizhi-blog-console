<template>
  <vab-icon
    v-if="theme.showFullScreen"
    :icon="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'"
    @click="click"
  />
</template>

<script>
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    onBeforeUnmount,
    onMounted,
    ref,
  } from 'vue'
  import { useStore } from 'vuex'
  import screenfull from 'screenfull'

  export default defineComponent({
    name: 'VabFullScreen',
    setup() {
      const store = useStore()

      const { proxy } = getCurrentInstance()

      const isFullscreen = ref(false)

      const change = () => {
        isFullscreen.value = screenfull.isFullscreen
      }

      const click = () => {
        if (!screenfull.isEnabled) {
          proxy.$baseMessage('开启全屏失败', 'error', 'vab-hey-message-error')
        }
        screenfull.toggle()
      }

      onMounted(() => {
        if (screenfull.isEnabled) screenfull.on('change', change)
      })

      onBeforeUnmount(() => {
        if (screenfull.isEnabled) screenfull.off('change', change)
      })

      return {
        click,
        change,
        isFullscreen,
        theme: computed(() => store.getters['settings/theme']),
      }
    },
  })
</script>
