<template>
  <div class="test2-container">
    <el-alert
      :closable="false"
      show-icon
      title="取值方式：this.query"
      type="success"
    />
    {{ route }}
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Test2',
    data() {
      return {
        route: {},
      }
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
