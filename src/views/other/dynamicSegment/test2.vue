<template>
  <div class="test2-container">
    <el-alert
      :closable="false"
      title="取值方式：this.query"
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
    name: 'Test2',
    components: { VabJsonViewer },
    data() {
      return {
        route: {},
      }
    },
    watch: {
      $route: 'handleQuery',
    },
    created() {
      this.handleQuery()
    },
    methods: {
      ...mapActions({
        changeTabsMeta: 'tabs/changeTabsMeta',
      }),
      handleQuery() {
        const route = this.$route
        this.$nextTick(() => {
          this.changeTabsMeta({
            title: 'Query',
            meta: {
              title: `Query Id=${this.$route.query.id}`,
            },
          })
          this.route = {
            path: route.path,
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
