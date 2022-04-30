<template>
  <div class="detail-container">
    <el-page-header :content="'【' + title + '】详情页面'" @back="goBack" />
    <el-alert
      :closable="false"
      show-icon
      title="详情页菜单高亮，并缓存详情页，返回上一页再次打开可看到效果，dynamicNewTab可配置详情页只打开一个tab页还是可以根据参数不同无限打开多个，当前展示的是可以打开多个"
      type="success"
    />
    <el-form inline :model="form">
      <el-form-item label="输入框缓存">
        <el-input v-model="form.text" />
      </el-form-item>
      <el-form-item :label-width="0">
        <el-button
          :icon="Refresh"
          type="primary"
          @click="handleRefreshMainPage"
        >
          刷新综合表格页面
        </el-button>
      </el-form-item>
    </el-form>

    <el-descriptions border :column="3" title="详情">
      <template #extra>
        <el-button size="small" type="primary">操作</el-button>
      </template>
      <el-descriptions-item>
        <template #label>标题</template>
        {{ route.query.title }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>作者</template>
        {{ route.query.author }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>时间</template>
        {{ route.query.datetime }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>评级</template>
        <el-rate v-model="route.query.rate" disabled />
      </el-descriptions-item>

      <el-descriptions-item>
        <template #label>备注</template>
        {{ route.query.description }}
      </el-descriptions-item>
      <el-descriptions-item>
        <template #label>
          <i class="el-icon-office-building"></i>
          联系地址
        </template>
        江苏省苏州市吴中区吴中大道 1188 号
      </el-descriptions-item>
    </el-descriptions>

    <vab-json-viewer copyable :expand-depth="5" sort :value="route" />
  </div>
</template>

<script>
  import { useTabsStore } from '@/store/modules/tabs'
  import { handleActivePath } from '@/utils/routes'
  import VabJsonViewer from 'vue-json-viewer'
  import { Refresh } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'Detail',
    components: { VabJsonViewer },
    setup() {
      const route = useRoute()
      const router = useRouter()

      const $pub = inject('$pub')

      const tabsStore = useTabsStore()
      const { changeTabsMeta, delVisitedRoute } = tabsStore

      const state = reactive({
        route: { query: { title: '加载中' } },
        rate: 0,
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

      const handleRefreshMainPage = () => {
        $pub('reload-router-view', 'ComprehensiveTable')
      }

      onMounted(() => {
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
          query: { ...route.query, ...{ rate: parseInt(route.query.rate) } },
          name: route.name,
          meta: route.meta,
        }
      })

      return {
        ...toRefs(state),
        goBack,
        handleRefreshMainPage,
        Refresh,
      }
    },
  })
</script>
