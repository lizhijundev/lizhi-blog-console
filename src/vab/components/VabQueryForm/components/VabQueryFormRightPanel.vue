<template>
  <el-col :lg="span" :md="24" :sm="24" :xl="span" :xs="24">
    <div class="right-panel">
      <slot />
    </div>
  </el-col>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'VabQueryFormRightPanel',
    props: {
      span: {
        type: Number,
        default: 10,
      },
    },
  })
</script>
