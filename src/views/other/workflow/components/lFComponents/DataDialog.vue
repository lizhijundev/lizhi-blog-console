<template>
  <div>
    <vab-json-viewer copyable :expand-depth="5" sort :value="data" />
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import VabJsonViewer from '@/extra/VabJsonViewer'

  export default defineComponent({
    components: { VabJsonViewer },
    props: {
      graphData: {
        type: Object,
        default: () => {},
      },
    },
    data() {
      return {
        data: [],
      }
    },
    created() {
      this.data = JSON.parse(
        JSON.stringify([
          {
            edges: this.graphData.edges,
            nodes: this.graphData.nodes,
          },
        ])
      )
    },
  })
</script>
<style scoped></style>
