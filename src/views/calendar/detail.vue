<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import EventEditor from './components/EventEditor.vue'
  import _ from 'lodash'
  import { deleteCalendarEvent, getCalendarEventList } from '@/api/calendar.ts'
  import { useRoute } from 'vue-router'
  import dayjs from 'dayjs'
  import { deleteCos } from '@/api/system/file.ts'

  const route = useRoute()
  const $baseConfirm = inject('$baseConfirm')
  const $baseMessage = inject('$baseMessage')

  const queryForm = ref({
    page_no: 1,
    page_size: 10,
    calendar_id: '',
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
      } = await getCalendarEventList(params)
      listData.value.list = list.map((item: any) => {
        item.start_at = dayjs(item.start_at * 1000).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        item.end_at = dayjs(item.end_at * 1000).format('YYYY-MM-DD HH:mm:ss')
        item.create_at = dayjs(item.create_at * 1000).format(
          'YYYY-MM-DD HH:mm:ss'
        )
        return item
      })
      listData.value.total = total
      listData.value.listLoading = false
    } catch (e) {
      listData.value.listLoading = false
    }
  }

  const handleEdit = (ruleData = {}) => {
    if (typeof ruleData.calendar_id === 'undefined') {
      ruleData.calendar_id = queryForm.value.calendar_id
    }
    detail.show = true
    detail.data = ruleData
  }
  const handleDelete = (row: any) => {
    $baseConfirm(
      '你确定要删除当前日程吗?删除后将彻底从服务器删除！无法恢复！',
      null,
      async () => {
        deleteCalendarEvent(row.event_id).then(() => {
          $baseMessage('删除成功', 'success', 'vab-hey-message-success')
          fetchData()
        })
      }
    )
  }

  onMounted(() => {
    queryForm.value.calendar_id = route.params.calendar_id
    queryData()
  })
</script>

<template>
  <div class="event-container">
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
      <el-table-column label="ID" prop="event_id" width="80px" />
      <el-table-column label="日程名称" prop="event_name" />
      <el-table-column label="组织者" prop="organizer_email" />
      <el-table-column label="日程时间" width="480px">
        <template #default="{ row }">
          <div class="w-full p-2">
            <span>{{ row.start_at }} - {{ row.end_at }}</span>
            <span v-if="row.is_fullday === 1">【全天】</span>
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
      <el-table-column :label="$t('common.operation')" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            {{ $t('common.edit') }}
          </el-button>
          <el-button type="danger" size="small" @click="handleDelete(row)">
            删除
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
    <EventEditor
      v-model:show="detail.show"
      :data="detail.data"
      @fetch-data="fetchData"
    />
  </div>
</template>

<style scoped lang="scss"></style>
