<template>
  <div class="test1-container">
    <el-alert
      :closable="false"
      title="取值方式：this.params"
      show-icon
      type="success"
    />
    <vab-json-viewer :value="route" :expand-depth="5" copyable sort />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'
  import VabJsonViewer from 'vue-json-viewer'

  export default {
    name: 'Test1',
    components: { VabJsonViewer },
    data() {
      return {
        route: {},
      }
    },
    watch: {
      $route: 'handleParams',
    },
    created() {
      this.handleParams()
    },
    methods: {
      ...mapActions({
        changeTabsMeta: 'tabs/changeTabsMeta',
      }),
      handleParams() {
        const route = this.$route
        this.$nextTick(() => {
          this.changeTabsMeta({
            title: 'Params',
            meta: {
              title: `Params Id=${route.params.id}`,
            },
          })
          this.route = {
            path: route.matched[route.matched.length - 1].path,
            fullPath: route.fullPath,
            params: route.params,
            query: route.query,
            name: route.name,
            meta: route.meta,
          }
        })
      },
    },
  }
</script>
