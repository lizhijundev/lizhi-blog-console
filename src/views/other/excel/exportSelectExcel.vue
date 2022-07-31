<template>
  <div class="select-excel-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-form inline @submit.prevent>
          <el-form-item>
            <el-input v-model="filename" placeholder="请输出要导出文件的名称" />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="handleDownload">
              导出选中行
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-table
      ref="multipleTableRef"
      v-loading="listLoading"
      border
      :data="list"
      @selection-change="handleSelectionChange"
    >
      <el-table-column align="center" type="selection" />
      <el-table-column align="center" label="序号" width="55">
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="标题">
        <template #default="{ row }">
          {{ row.title }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="作者">
        <template #default="{ row }">
          <el-tag>{{ row.author }}</el-tag>
        </template>
      </el-table-column>
      <el-table-column align="center" label="访问量" width="115">
        <template #default="{ row }">
          {{ row.pageViews }}
        </template>
      </el-table-column>
      <el-table-column align="center" label="时间">
        <template #default="{ row }">
          <span>{{ row.datetime }}</span>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import { getList } from '@/api/table'

  export default defineComponent({
    name: 'ExportSelectExcel',
    setup() {
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        multipleTableRef: null,
        list: [],
        listLoading: true,
        multipleSelection: [],
        downloadLoading: false,
        filename: '',
      })

      const fetchData = async () => {
        state.listLoading = true
        const {
          data: { list },
        } = await getList()
        state.list = list
        state.listLoading = false
      }
      const handleSelectionChange = (val) => {
        state.multipleSelection = val
      }
      const handleDownload = () => {
        if (state.multipleSelection.length) {
          state.downloadLoading = true
          import('@/utils/excel').then((excel) => {
            const tHeader = ['Id', 'Title', 'Author', 'Readings', 'Date']
            const filterVal = ['id', 'title', 'author', 'pageViews', 'datetime']
            const list = state.multipleSelection
            const data = state.formatJson(filterVal, list)
            excel.export_json_to_excel({
              header: tHeader,
              data,
              filename: state.filename,
            })
            state.multipleTableRef.clearSelection()
            state.downloadLoading = false
          })
        } else {
          $baseMessage('请至少选择一行', 'error', 'vab-hey-message-error')
        }
      }
      const formatJson = (filterVal, jsonData) => {
        return jsonData.map((v) => filterVal.map((j) => v[j]))
      }

      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
        fetchData,
        handleSelectionChange,
        handleDownload,
        formatJson,
      }
    },
  })
</script>
