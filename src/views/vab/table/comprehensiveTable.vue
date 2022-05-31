<template>
  <div class="comprehensive-table-container">
    <el-alert
      :closable="false"
      show-icon
      title="三级路由【缓存路由、固定表格高度、并根据窗口大小自适应】的示例。详情页请点击操作列按钮，支持tab多开并高亮左侧菜单"
      type="success"
    />
    <vab-query-form>
      <vab-query-form-top-panel>
        <el-form inline label-width="49px" :model="queryForm" @submit.prevent>
          <el-form-item label="标题">
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item label="标题">
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-show="!fold" label="标题">
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-show="!fold" label="标题">
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-show="!fold" label="标题">
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-show="!fold" label="标题">
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-show="!fold" label="标题">
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-show="!fold" label="标题">
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-show="!fold" label="标题">
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-show="!fold" label="标题">
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item v-show="!fold" label="标题">
            <el-input v-model="queryForm.title" placeholder="请输入标题" />
          </el-form-item>
          <el-form-item>
            <el-button
              :icon="Search"
              native-type="submit"
              type="primary"
              @click="queryData"
            >
              查询
            </el-button>
            <el-button text type="primary" @click="handleFold">
              <span v-if="fold">展开</span>
              <span v-else>合并</span>
              <vab-icon
                class="vab-dropdown"
                :class="{ 'vab-dropdown-active': fold }"
                icon="arrow-up-s-line"
              />
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-top-panel>
      <vab-query-form-left-panel :span="24">
        <el-button :icon="Plus" type="primary" @click="handleAdd">
          添加
        </el-button>
        <el-button :icon="Delete" type="danger" @click="handleDelete($event)">
          删除
        </el-button>
        <el-button type="primary" @click="handleMessage">
          $baseMessage
        </el-button>
        <el-button type="primary" @click="handleAlert">$baseAlert</el-button>
        <el-button type="primary" @click="handleConfirm">
          $baseConfirm
        </el-button>
        <el-button type="primary" @click="handleNotify">$baseNotify</el-button>
        <el-button type="primary" @click="handleDetailStayTable">
          停留在本页后台打开详情页后（不常用）
        </el-button>
        <el-badge class="item" value="New">
          <el-button
            style="margin: 0 0 10px 0 !important"
            type="primary"
            @click="handleDetail"
          >
            详情页支持tab多开并高亮左侧菜单
          </el-button>
        </el-badge>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      ref="tableSortRef"
      v-loading="listLoading"
      border
      :data="list"
      :height="height"
      @selection-change="setSelectRows"
      @sort-change="tableSortChange"
    >
      <el-table-column
        align="center"
        show-overflow-tooltip
        type="selection"
        width="55"
      />
      <el-table-column
        align="center"
        label="序号"
        show-overflow-tooltip
        width="55"
      >
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="标题"
        prop="title"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="作者"
        prop="author"
        show-overflow-tooltip
      />
      <el-table-column align="center" label="评级">
        <template #default="{ row }">
          <el-rate v-model="row.rate" disabled />
        </template>
      </el-table-column>
      <el-table-column align="center" label="头像">
        <template #default="{ row }">
          <el-image
            :preview-src-list="imageList"
            preview-teleported
            :src="row.img"
          />
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="点击量"
        prop="pageViews"
        show-overflow-tooltip
        sortable
      />
      <el-table-column
        align="center"
        label="开关"
        prop="switch"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <el-tooltip
            :content="row.switch === 0 ? '点击开启' : '点击关闭'"
            :enterable="false"
            placement="top"
          >
            <el-switch v-model="row.switch" />
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column align="center" label="状态" show-overflow-tooltip>
        <template #default="{ row }">
          <el-tooltip
            class="item"
            :content="row.status"
            effect="dark"
            placement="top-start"
          >
            <el-tag :type="statusFilter(row.status)">
              {{ row.status }}
            </el-tag>
          </el-tooltip>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="时间"
        prop="datetime"
        show-overflow-tooltip
        width="200"
      />
      <el-table-column
        align="center"
        fixed="right"
        label="操作"
        show-overflow-tooltip
        width="200"
      >
        <template #default="{ row }">
          <el-button text type="primary" @click="handleDetail(row)">
            详情
          </el-button>
          <el-button text type="primary" @click="handleEdit(row)">
            编辑
          </el-button>
          <el-button text type="primary" @click="handleDelete(row)">
            删除
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty class="vab-data-empty" description="暂无数据" />
      </template>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <edit ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import { useTabsStore } from '@/store/modules/tabs'
  import { useRoutesStore } from '@/store/modules/routes'
  import { doDelete, getList } from '@/api/table'
  import { handleMatched, handleTabs } from '@/utils/routes'
  import { Delete, Plus, Search } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'ComprehensiveTable',
    components: {
      Edit: defineAsyncComponent(() => import('./components/TableEdit')),
    },
    setup() {
      const router = useRouter()

      const $baseConfirm = inject('$baseConfirm')
      const $baseMessage = inject('$baseMessage')
      const $baseAlert = inject('$baseAlert')
      const $baseNotify = inject('$baseNotify')
      const $baseTableHeight = inject('$baseTableHeight')

      const routesStore = useRoutesStore()
      const { getRoutes: routes } = storeToRefs(routesStore)
      const tabsStore = useTabsStore()
      const { changeTabsMeta, addVisitedRoute } = tabsStore

      const state = reactive({
        editRef: null,
        tableSortRef: null,
        fold: false,
        height: $baseTableHeight(3) - 30,
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
        },
      })

      onActivated(() => {
        state['tableSortRef'].doLayout()
        fetchData()
      })

      const fetchData = async () => {
        state.listLoading = true
        const {
          data: { list, total },
        } = await getList(state.queryForm)
        state.list = list
        const imageList = []
        list.forEach((item) => {
          imageList.push(item.img)
        })
        state.imageList = imageList
        state.total = total
        state.listLoading = false

        setTimeout(() => {
          toggleSelection([state.list[0]])
        }, 0)
      }
      const handleSizeChange = (val) => {
        state.queryForm.pageSize = val
        fetchData()
      }
      const handleCurrentChange = (val) => {
        state.queryForm.pageNo = val
        fetchData()
      }
      const queryData = () => {
        state.queryForm.pageNo = 1
        fetchData()
      }
      const statusFilter = (status) => {
        const statusMap = {
          published: 'success',
          draft: '',
          deleted: 'danger',
        }
        return statusMap[status]
      }
      const handleFold = () => {
        state.fold = !state.fold
        handleHeight()
      }
      const handleHeight = () => {
        if (state.fold) state.height = $baseTableHeight(2) - 47
        else state.height = $baseTableHeight(3) - 30
      }
      const tableSortChange = () => {
        const imageList = []
        state.list.forEach((item) => {
          imageList.push(item.img)
        })
        state.imageList = imageList
      }
      const setSelectRows = (val) => {
        state.selectRows = val
      }
      const handleAdd = () => {
        state['editRef'].showEdit()
      }
      const handleEdit = (row) => {
        state['editRef'].showEdit(row)
      }
      const handleDelete = (row) => {
        if (row.id) {
          $baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            $baseMessage(msg, 'success', 'vab-hey-message-success')
            await fetchData()
          })
        } else {
          if (state.selectRows.length > 0) {
            const ids = state.selectRows.map((item) => item.id).join()
            $baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
              $baseMessage(msg, 'success', 'vab-hey-message-success')
              await fetchData()
            })
          } else {
            $baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
          }
        }
      }
      const handleDetailStayTable = async () => {
        for (let i = 0; i < state.selectRows.length; i++) {
          const matched = handleMatched(routes.value, '/vab/table/detail')
          const tab = handleTabs({
            ...matched[matched.length - 1],
            query: state.selectRows[i],
          })
          if (tab) {
            await addVisitedRoute(tab)
            await changeTabsMeta({
              title: '详情页',
              meta: {
                title: `${tab.query.title} 详情页`,
              },
            })
          }
        }
      }
      const handleDetail = (row) => {
        if (row.id)
          router.push({
            path: '/vab/table/detail',
            query: {
              ...row,
              timestamp: new Date().getTime(), //允许同一个详情页同时打开多次，否则会触发路由被缓存下次无法刷新的bug
            },
          })
        else {
          if (state.selectRows.length === 1) {
            router.push({
              path: '/vab/table/detail',
              query: {
                ...state.selectRows[0],
                timestamp: new Date().getTime(), //允许同一个详情页同时打开多次，否则会触发路由被缓存下次无法刷新的bug
              },
            })
          } else {
            $baseMessage(
              '请选择一行进行详情页跳转',
              'error',
              'vab-hey-message-error'
            )
          }
        }
      }
      const handleMessage = () => {
        $baseMessage('test1', 'success', false, 'vab-hey-message-success')
      }
      const handleAlert = () => {
        $baseAlert('11')
        // $baseAlert('11', '自定义标题', () => {
        //   /* 可以写回调; */
        // })
        // $baseAlert('11', null, () => {
        //   /* 可以写回调; */
        // })
      }
      const handleConfirm = () => {
        $baseConfirm(
          '你确定要执行该操作?',
          null,
          () => {
            /* 可以写回调; */
          },
          () => {
            /* 可以写回调; */
          }
        )
      }
      const handleNotify = () => {
        $baseNotify('测试消息提示', 'test', 'success', 'bottom-right')
      }
      const toggleSelection = (rows) => {
        if (rows) {
          rows.forEach((row) => {
            state['tableSortRef'].toggleRowSelection(row)
          })
        } else {
          state['tableSortRef'].clearSelection()
        }
      }

      onBeforeMount(() => {
        window.addEventListener('resize', handleHeight)
      })
      onUnmounted(() => {
        window.removeEventListener('resize', handleHeight)
      })
      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
        handleSizeChange,
        handleCurrentChange,
        queryData,
        statusFilter,
        handleFold,
        handleHeight,
        tableSortChange,
        setSelectRows,
        handleAdd,
        handleEdit,
        handleDelete,
        handleDetailStayTable,
        handleDetail,
        handleMessage,
        handleAlert,
        handleConfirm,
        handleNotify,
        fetchData,
        Delete,
        Plus,
        Search,
      }
    },
  })
</script>
