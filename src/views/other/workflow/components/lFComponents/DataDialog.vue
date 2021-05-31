<template>
  <div>
    {{ data }}
  </div>
</template>

<script>
  export default {
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
  }
</script>
<style scoped></style>
