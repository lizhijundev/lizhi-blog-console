<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import RoleEditor from './components/RoleEditor.vue'
  import { getAdminRoleList } from '@/api/adminRole.ts'

  const editorShow = ref(false)
  const editorData = ref({})

  const queryForm = ref({
    pageNo: 1,
    pageSize: 10,
    status: '',
  })

  const listData = ref({
    listLoading: false,
    total: 0,
    list: [],
  })

  const handleSizeChange = (val) => {
    queryForm.value.pageSize = val
    fetchData()
  }
  const handleCurrentChange = (val) => {
    queryForm.value.pageNo = val
    fetchData()
  }
  const queryData = () => {
    queryForm.value.pageNo = 1
    fetchData()
  }

  const fetchData = () => {
    listData.value.listLoading = true
    getAdminRoleList(queryForm.value)
      .then(({ data }) => {
        listData.value.list = data.list
        listData.value.total = data.total
      })
      .finally(() => {
        listData.value.listLoading = false
      })
  }

  const handleEdit = (ruleData = {}) => {
    editorShow.value = true
    editorData.value = ruleData
  }

  onMounted(() => {
    queryData()
  })
</script>

<template>
  <div class="role-container">
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
      row-key="path"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        :label="$t('adminRole.roleId')"
        prop="role_id"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('adminRole.roleName')"
        prop="role_name"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('adminRole.roleCode')"
        prop="role_code"
        show-overflow-tooltip
      />

      <el-table-column :label="$t('common.operation')">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            {{ $t('common.edit') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="queryForm.pageSize"
      :total="listData.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <RoleEditor
      v-model:show="editorShow"
      :data="editorData"
      direction="rtl"
      @fetch-data="fetchData"
    />
  </div>
</template>

<style scoped lang="scss"></style>
