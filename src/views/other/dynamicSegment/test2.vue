<template>
  <div class="test2-container">
    <el-alert
      :closable="false"
      show-icon
      title="取值方式：this.query"
      type="success"
    />
    <vab-json-viewer copyable :expand-depth="5" sort :value="route" />
  </div>
</template>

<script>
  import {
    defineComponent,
    getCurrentInstance,
    nextTick,
    reactive,
    toRefs,
  } from 'vue'
  import { mapActions } from 'vuex'
  import VabJsonViewer from '@/extra/VabJsonViewer'

  export default defineComponent({
    name: 'Test2',
    components: { VabJsonViewer },
    setup() {
      const { proxy } = getCurrentInstance()

      const state = reactive({
        route: {},
      })
      const handleQuery = () => {
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
  })
</script>
