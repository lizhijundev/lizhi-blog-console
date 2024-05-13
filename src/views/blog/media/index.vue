<script setup lang="ts">
  import _ from 'lodash'
  import { getMediaList } from '@/api/media.ts'
  import { deleteCos } from '@/api/system/file.ts'

  const $baseConfirm = inject('$baseConfirm')
  const $baseMessage = inject('$baseMessage')

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

  const onDelete = (row: any) => {
    $baseConfirm(
      '你确定要删除当前素材吗?删除后将彻底从服务器删除！无法恢复！',
      null,
      async () => {
        const { msg } = await deleteCos(row.path)
        $baseMessage(msg, 'success', 'vab-hey-message-success')
        await fetchData()
      }
    )
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
          <el-image
            v-if="row.status === 1"
            class="w-10"
            :src="`${row.host + row.path}`"
            fit="cover"
          />
          <div v-else>无效素材</div>
        </template>
      </el-table-column>
      <el-table-column label="平台">
        <template #default="{ row }">
          <el-tag v-if="row.platform === 1" size="small">腾讯云</el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('personCenter.fieldStatus')">
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" type="success" size="small">
            {{ $t('common.enable') }}
          </el-tag>
          <el-tag v-else-if="row.status === 2" type="danger" size="small">
            已删除
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('common.createTime')"
        prop="create_time"
        show-overflow-tooltip
      />
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            v-if="row.status === 1"
            type="danger"
            size="small"
            @click="onDelete(row)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
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
