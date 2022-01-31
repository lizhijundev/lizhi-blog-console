<template>
  <div class="test2-container">
    <el-alert :closable="false" show-icon title="query" type="success" />
    <vab-json-viewer copyable :expand-depth="5" sort :value="route" />
  </div>
</template>

<script>
  import { useTabsStore } from '@/store/modules/tabs'
  import VabJsonViewer from 'vue-json-viewer'

  export default defineComponent({
    name: 'Test2',
    components: { VabJsonViewer },
    setup() {
      const route = useRoute()

      const tabsStore = useTabsStore()
      const { changeTabsMeta } = tabsStore

      const state = reactive({
        route: {},
      })
      const handleQuery = () => {
        nextTick(() => {
          changeTabsMeta({
            title: 'Query',
            meta: {
              title: `Query Id=${route.query.id}`,
            },
          })
          state.route = {
            path: route.path,
            query: route.query,
            name: route.name,
            meta: route.meta,
          }
        })
      }
      onMounted(() => {
        handleQuery()
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>
