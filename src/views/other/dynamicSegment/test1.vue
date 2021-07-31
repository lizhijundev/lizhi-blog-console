<template>
  <div class="test1-container">
    <el-alert
      :closable="false"
      show-icon
      title="取值方式：this.params"
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
    name: 'Test1',
    components: { VabJsonViewer },
    setup() {
      const { proxy } = getCurrentInstance()

      const state = reactive({
        route: {},
      })

      const handleParams = () => {
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
  })
</script>
