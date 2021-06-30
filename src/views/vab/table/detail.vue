<template>
  <div class="detail-container">
    <el-page-header :content="'【' + title + '】详情页面'" @back="goBack" />
    <!--  <el-alert
      :closable="false"
      show-icon
      title="详情页菜单高亮，并缓存详情页，返回上一页再次打开可看到效果，dynamicNewTab可配置详情页只打开一个tab页还是可以根据参数不同无限打开多个，当前展示的是可以打开多个"
      type="success"
    /> -->
    <el-form :inline="true" :model="form">
      <el-form-item label="输入框缓存">
        <el-input v-model="form.text" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { nextTick, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { handleActivePath } from '@/utils/routes'

  export default {
    name: 'Detail',
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()

      const changeTabsMeta = (options) =>
        store.dispatch('tabs/changeTabsMeta', options)
      const delVisitedRoute = (path) =>
        store.dispatch('tabs/delVisitedRoute', path)

      const state = reactive({
        route: {},
        form: {
          text: '',
        },
        title: '加载中',
      })

      const goBack = async () => {
        const detailPath = await handleActivePath(route, true)
        await router.push('/vab/table/comprehensiveTable')
        await delVisitedRoute(detailPath)
      }

      nextTick(() => {
        changeTabsMeta({
          title: '详情页',
          meta: {
            title: `${route.query.title} 详情页`,
          },
        })
        state.title = route.query.title
        state.route = {
          path: route.path,
          params: route.params,
          query: route.query,
          name: route.name,
          meta: route.meta,
        }
      })

      return {
        ...toRefs(state),
        goBack,
      }
    },
  }
</script>
