<template>
  <div class="test1-container">
    <el-alert :closable="false" show-icon title="params" type="success" />
    <vab-json-viewer copyable :expand-depth="5" sort :value="route" />
  </div>
</template>

<script>
  import { defineComponent, nextTick, onMounted, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import VabJsonViewer from '@/extra/VabJsonViewer'

  export default defineComponent({
    name: 'Test1',
    components: { VabJsonViewer },
    setup() {
      const store = useStore()
      const route = useRoute()
      const state = reactive({
        route: {},
      })
      const changeTabsMeta = (options) =>
        store.dispatch('tabs/changeTabsMeta', options)
      const handleParams = () => {
        nextTick(() => {
          changeTabsMeta({
            title: 'Query',
            meta: {
              title: `Query Id=${route.query.id}`,
            },
          })

          const _route = route.matched[0].children.filter(
            (item) => item.name === 'Test1'
          )[0]
          const id = route.path.substring(
            route.path.lastIndexOf('/') + 1,
            route.path.length
          )

          state.route = {
            path: _route.path,
            params: {
              id,
            },
            name: _route.name,
            meta: _route.meta,
          }
        })
      }
      onMounted(() => {
        handleParams()
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>
