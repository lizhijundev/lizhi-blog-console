<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import CalendarEditor from './components/CalendarEditor.vue'
  import _ from 'lodash'
  import { getCalendarList } from '@/api/calendar.ts'
  import { useRouter } from 'vue-router'
  import { baseURL } from '@/config'

  const $baseMessage = inject('$baseMessage')
  const router = useRouter()

  const queryForm = ref({
    page_no: 1,
    page_size: 10,
  })

  const detail = reactive({
    show: false,
    data: {},
  })
  const listData = ref({
    listLoading: false,
    total: 0,
    list: [],
  })

  const handleSizeChange = (val: any) => {
    queryForm.value.page_size = val
    fetchData()
  }
  const handleCurrentChange = (val: any) => {
    queryForm.value.page_no = val
    fetchData()
  }
  const queryData = () => {
    queryForm.value.page_no = 1
    fetchData()
  }
  const fetchData = async () => {
    listData.value.listLoading = true
    const params = _.cloneDeep(queryForm.value)
    try {
      const {
        data: { list, total },
      } = await getCalendarList(params)
      listData.value.list = list
      listData.value.total = total
      listData.value.listLoading = false
    } catch (e) {
      listData.value.listLoading = false
    }
  }

  const handleCopyUrl = (row: any) => {
    console.log('baseURL', baseURL)
    const host = baseURL.replace(/^(https?:\/\/)/, '')
    const url = `webcal://${host}/event?code=${row.activity_code}`
    // 复制到剪切板
    const input = document.createElement('input')
    document.body.appendChild(input)
    input.setAttribute('value', url)
    input.select()
    if (document.execCommand('copy')) {
      document.execCommand('copy')
      $baseMessage('复制成功', 'success', 'vab-hey-message-success')
    }
    document.body.removeChild(input)
  }

  const handleEdit = (ruleData = {}) => {
    detail.show = true
    detail.data = ruleData
  }
  const handleEvent = (row: any) => {
    const params = {
      calendar_id: row.calendar_id,
    }
    router.push({
      name: 'CalendarDetail',
      params,
    })
  }

  onMounted(() => {
    queryData()
  })
</script>

<template>
  <div class="article-tag-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="10">
        <el-button :icon="Plus" type="primary" @click="handleEdit()">
          {{ $t('common.add') }}
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>
    <el-table
      v-loading="listData.listLoading"
      border
      :data="listData.list"
      default-expand-all
      row-key="tag_code"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="ID" prop="calendar_id" width="80px" />
      <el-table-column label="活动名称" prop="activity" />
      <el-table-column label="活动Code" prop="activity_code" />
      <el-table-column label="日历名称" prop="cal_name">
        <template #default="{ row }">
          <div
            class="w-full p-2"
            :style="{
              background: row.calendar_color,
              color: '#fff',
              borderRadius: '4px',
              display: 'inline-block',
            }"
          >
            {{ row.cal_name }}
          </div>
        </template>
      </el-table-column>
      <el-table-column :label="$t('personCenter.fieldStatus')">
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" type="success" size="small">
            {{ $t('common.enable') }}
          </el-tag>
          <el-tag v-else type="danger" size="small">
            {{ $t('common.disable') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('common.operation')"
        align="center"
        width="300px"
      >
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            {{ $t('common.edit') }}
          </el-button>
          <el-button type="primary" size="small" @click="handleCopyUrl(row)">
            复制日历订阅
          </el-button>
          <el-button type="primary" size="small" @click="handleEvent(row)">
            日历事件
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.page_no"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="queryForm.page_size"
      :total="listData.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <CalendarEditor
      v-model:show="detail.show"
      :data="detail.data"
      @fetch-data="fetchData"
    />
  </div>
</template>

<style scoped lang="scss"></style>
