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
  import { getCurrentInstance, nextTick, reactive, toRefs } from 'vue'
  import { mapActions } from 'vuex'

  export default {
    name: 'Test1',
    setup() {
      const { proxy } = getCurrentInstance()
      const state = reactive({
        route: {},
      })

      function handleParams() {
        const route = proxy.$route
        nextTick(() => {
          proxy.changeTabsMeta({
            title: 'Params',
            meta: {
              title: `Params Id=${route.params.id}`,
            },
          })
          state.route = {
            path: route.matched[route.matched.length - 1].path,
            params: route.params,
            query: route.query,
            name: route.name,
            meta: route.meta,
          }
        })
      }

      handleParams()

      return {
        ...toRefs(state),
        ...mapActions({
          changeTabsMeta: 'tabs/changeTabsMeta',
        }),
        handleParams,
      }
    },
  }
</script>
