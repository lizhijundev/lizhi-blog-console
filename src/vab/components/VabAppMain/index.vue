<template>
  <div class="vab-app-main">
    <section>
      <VabRouterView />
    </section>
    <vab-footer />
  </div>
</template>

<script>
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'VabAppMain',
  })
</script>
