<template>
  <vab-dialog
    v-model="dialogVisible"
    show-fullscreen
    title="温馨提示"
    width="600px"
  >
    昨夜西风凋碧树，独上高楼望尽天涯路
    <template #footer>
      <el-button @click="dialogVisible = false">取 消</el-button>
      <el-button type="primary" @click="dialogVisible = false">确 定</el-button>
    </template>
  </vab-dialog>
</template>

<script>
  import VabDialog from '@/plugins/VabDialog'

  export default defineComponent({
    name: 'DialogDemo',
    components: {
      VabDialog,
    },
    setup() {
      const state = reactive({
        dialogVisible: false,
      })
      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style></style>
