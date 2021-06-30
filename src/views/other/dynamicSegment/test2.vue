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
  import { getCurrentInstance, nextTick, reactive, toRefs } from 'vue'
  import { mapActions } from 'vuex'

  export default {
    name: 'Test2',
    setup() {
      const { proxy } = getCurrentInstance()
      const state = reactive({
        route: {},
      })

      function handleQuery() {
        const route = proxy.$route
        nextTick(() => {
          proxy.changeTabsMeta({
            title: 'Query',
            meta: {
              title: `Query Id=${proxy.$route.query.id}`,
            },
          })
          state.route = {
            path: route.path,
            params: route.params,
            query: route.query,
            name: route.name,
            meta: route.meta,
          }
        })
      }

      handleQuery()

      return {
        ...toRefs(state),
        ...mapActions({
          changeTabsMeta: 'tabs/changeTabsMeta',
        }),
      }
    },
  }
</script>
