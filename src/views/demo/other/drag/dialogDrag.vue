<template>
  <div class="dialog-drag-container">
    <el-button type="primary" @click="handleClick">可拖拽弹窗</el-button>
    <dialog-demo ref="dialogRef" />
  </div>
</template>

<script>
  export default defineComponent({
    name: 'DialogDrag',
    components: {
      DialogDemo: defineAsyncComponent(() => import('./components/DialogDemo')),
    },
    setup() {
      const state = reactive({
        dialogRef: '',
      })
      const handleClick = () => {
        state['dialogRef'].dialogVisible = true
      }
      return {
        ...toRefs(state),
        handleClick,
      }
    },
  })
</script>
