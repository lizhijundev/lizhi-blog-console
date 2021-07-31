<template>
  <el-col :span="24">
    <div class="top-panel">
      <slot />
    </div>
  </el-col>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'VabQueryFormTopPanel',
  })
</script>
