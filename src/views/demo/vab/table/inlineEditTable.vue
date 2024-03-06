<template>
  <div class="inline-edit-table-container">
    <el-alert
      :closable="false"
      show-icon
      title="三级路由【不缓存路由并且不固定表格高度】的示例"
      type="success"
    />
    <vab-query-form>
      <vab-query-form-right-panel :span="24">
        <el-form inline :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="标题" />
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
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>
    <el-table v-loading="listLoading" border :data="list">
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
        width="200"
      >
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="标题"
        min-width="300px"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <template v-if="row.edit">
            <el-input v-model="row.title" style="width: 300px" />
            <el-button style="margin-left: 10px" @click="cancelEdit(row)">
              取消
            </el-button>
          </template>
          <span v-else>{{ row.title }}</span>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="作者"
        prop="author"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="150"
      >
        <template #default="{ row }">
          <el-button v-if="row.edit" type="primary" @click="confirmEdit(row)">
            保存
          </el-button>
          <el-button v-else @click="row.edit = !row.edit">编辑</el-button>
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
  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import { Edit, Search } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'InlineEditTable',
    setup() {
      const state = reactive({
        list: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
      })

      const fetchData = async () => {
        state.listLoading = true
        const {
          data: { list, total },
        } = await getList(state.queryForm)
        state.list = list.map((v) => {
          v.edit = false
          v.originalTitle = v.title
          return v
        })
        state.total = total
        state.listLoading = false
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
      const cancelEdit = (row) => {
        row.title = row.originalTitle
        row.edit = false
      }
      const confirmEdit = (row) => {
        row.edit = false
        row.originalTitle = row.title
      }
      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
        handleSizeChange,
        handleCurrentChange,
        queryData,
        cancelEdit,
        confirmEdit,
        Edit,
        Search,
      }
    },
  })
</script>
