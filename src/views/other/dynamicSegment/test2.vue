<template>
  <div class="test2-container">
    <el-alert :closable="false" show-icon title="query" type="success" />
    <vab-json-viewer copyable :expand-depth="5" sort :value="route" />
  </div>
</template>

<script>
  import { defineComponent, nextTick, onMounted, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import VabJsonViewer from '@/extra/VabJsonViewer'

  export default defineComponent({
    name: 'Test2',
    components: { VabJsonViewer },
    setup() {
      const store = useStore()
      const route = useRoute()
      const state = reactive({
        route: {},
      })
      const changeTabsMeta = (options) =>
        store.dispatch('tabs/changeTabsMeta', options)
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
