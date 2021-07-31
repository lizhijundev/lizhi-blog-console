<template>
  <el-col :span="24">
    <div class="bottom-panel">
      <slot />
    </div>
  </el-col>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'VabQueryFormBottomPanel',
  })
</script>
