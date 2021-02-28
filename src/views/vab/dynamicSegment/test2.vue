<template>
  <div class="test2-container">
    <h3>取值方式：this.query</h3>
    <el-alert
      :closable="false"
      :title="JSON.stringify(route)"
      show-icon
      type="success"
    />
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
    methods: {
      ...mapActions({
        changeTabsMeta: 'tabs/changeTabsMeta',
      }),
    },
  }
</script>
