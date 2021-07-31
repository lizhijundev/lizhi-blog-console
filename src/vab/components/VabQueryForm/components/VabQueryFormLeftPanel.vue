<template>
  <el-col :lg="span" :md="24" :sm="24" :xl="span" :xs="24">
    <div class="left-panel">
      <slot />
    </div>
  </el-col>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'VabQueryFormLeftPanel',
    props: {
      span: {
        type: Number,
        default: 14,
      },
    },
  })
</script>
