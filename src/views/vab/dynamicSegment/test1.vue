<template>
  <div class="test1-container">
    <h3>取值方式：this.params</h3>
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
    name: 'Test1',
    data() {
      return {
        route: {},
      }
    },
    created() {
      const route = this.$route
      this.$nextTick(() => {
        this.changeTabsMeta({
          title: 'Params',
          meta: {
            title: `Params Id: ${route.params.id}`,
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
    methods: {
      ...mapActions({
        changeTabsMeta: 'tabs/changeTabsMeta',
      }),
    },
  }
</script>
