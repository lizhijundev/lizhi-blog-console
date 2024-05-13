<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import CoverEditor from './components/CoverEditor.vue'
  import _ from 'lodash'
  import { getMediaList } from '@/api/media.ts'

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
      } = await getMediaList(params)
      listData.value.list = list
      listData.value.total = total
      listData.value.listLoading = false
    } catch (e) {
      listData.value.listLoading = false
    }
  }

  const handleEdit = (ruleData = {}) => {
    detail.show = true
    detail.data = ruleData
  }

  onMounted(() => {
    queryData()
  })
</script>

<template>
  <div class="article-tag-container">
    <el-table
      v-loading="listData.listLoading"
      border
      :data="listData.list"
      default-expand-all
      row-key="tag_code"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="ID" prop="id" width="80px" />

      <el-table-column label="素材">
        <template #default="{ row }">
          <el-image class="w-10" :src="`${row.host + row.path}`" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="平台">
        <template #default="{ row }">
          <el-tag v-if="row.platform === 1">腾讯云</el-tag>
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
        align="center"
        :label="$t('common.createTime')"
        prop="create_time"
        show-overflow-tooltip
      />
      <!--      <el-table-column :label="$t('common.operation')" align="center">-->
      <!--        <template #default="{ row }">-->
      <!--          <el-button type="primary" size="small" @click="handleEdit(row)">-->
      <!--            {{ $t('common.edit') }}-->
      <!--          </el-button>-->
      <!--        </template>-->
      <!--      </el-table-column>-->
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
  </div>
</template>

<style scoped lang="scss"></style>
