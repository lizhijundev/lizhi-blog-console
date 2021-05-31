<template>
  <div class="test1-container">
    <el-alert
      :closable="false"
      show-icon
      title="取值方式：this.params"
      type="success"
    />
    {{ route }}
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
