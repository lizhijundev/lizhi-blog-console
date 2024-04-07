<template>
  <div class="user-management-container">
    <el-form class="lizhi-form" inline :model="queryForm" @submit.prevent>
      <el-row>
        <el-col :span="8">
          <el-form-item :label="$t('adminMan.username')">
            <el-input v-model.trim="queryForm.username" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item :label="$t('personCenter.fieldStatus')">
            <el-select
              v-model="queryForm.status"
              clearable
              :placeholder="$t('personCenter.fieldStatus')"
            >
              <el-option :label="$t('common.all')" value="" />
              <el-option :label="$t('common.enable')" value="1" />
              <el-option :label="$t('common.disable')" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="8">
          <el-form-item>
            <el-button :icon="Search" type="primary" @click="queryData">
              {{ $t('common.search') }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>

    <vab-query-form>
      <vab-query-form-top-panel>
        <el-button
          v-permissions="['admin']"
          :icon="Plus"
          type="primary"
          @click="handleEdit($event)"
        >
          {{ $t('common.add') }}
        </el-button>
      </vab-query-form-top-panel>
    </vab-query-form>

    <el-table v-loading="listData.listLoading" border :data="listData.list">
      <el-table-column
        align="center"
        label="ID"
        width="80px"
        prop="admin_id"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        :label="$t('adminMan.username')"
        prop="username"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        :label="$t('adminMan.nickname')"
        prop="nickname"
        show-overflow-tooltip
      />
      <el-table-column align="center" :label="$t('adminMan.role')">
        <template #default="{ row }">
          <el-tag
            v-for="item in row.roles"
            :key="item.role_id"
            type="success"
            effect="dark"
          >
            {{ item.role_name }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        :label="$t('personCenter.fieldStatus')"
        prop="status"
        width="90px"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" type="success" effect="dark">
            {{ $t('common.enable') }}
          </el-tag>
          <el-tag v-else type="danger" effect="dark">
            {{ $t('common.disable') }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="$t('common.updateTime')"
        prop="update_time"
        show-overflow-tooltip
      />
      <el-table-column
        v-permissions="['admin']"
        align="center"
        :label="$t('common.operation')"
        width="280px"
      >
        <template #default="{ row }">
          <el-button-group>
            <el-button
              v-permissions="['admin']"
              size="small"
              type="primary"
              @click="handleEdit(row)"
            >
              {{ $t('common.edit') }}
            </el-button>
            <el-button
              v-permissions="['admin']"
              size="small"
              type="primary"
              @click="handleResetPwd(row)"
            >
              {{ $t('personCenter.resetPwd') }}
            </el-button>
            <el-button
              v-permissions="['admin']"
              size="small"
              type="danger"
              @click="handleDelete(row)"
            >
              {{ $t('common.delete') }}
            </el-button>
          </el-button-group>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty class="vab-data-empty" :description="$t('common.noData')" />
      </template>
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
    <edit ref="editRef" @fetch-data="fetchData" />
    <user-management-password
      ref="userManagementPasswordRef"
      @fetch-data="fetchData"
    />
  </div>
</template>

<script lang="ts" setup>
  import { Plus, Search } from '@element-plus/icons-vue'
  import { deleteAdminMember, getAdminMemberList } from '@/api/adminMember'
  import Edit from './components/UserManagementEdit.vue'
  import UserManagementPassword from './components/UserManagementPassword.vue'

  const $baseConfirm = inject('$baseConfirm')
  const $baseMessage = inject('$baseMessage')
  const { t } = useI18n()

  const editRef = ref(null)
  const userManagementPasswordRef = ref(null)

  const queryForm = ref({
    pageNo: 1,
    pageSize: 10,
    username: '',
    status: '',
  })

  const listData = ref({
    listLoading: false,
    total: 0,
    list: [],
  })

  const handleEdit = (row: any) => {
    if (row.admin_id) {
      editRef.value.showEdit(row)
    } else {
      editRef.value.showEdit()
    }
  }
  const handleResetPwd = (row) => {
    if (row.admin_id) {
      userManagementPasswordRef.value.showEdit(row)
    }
  }
  const handleDelete = (row) => {
    if (row.admin_id) {
      $baseConfirm(t('adminMan.deleteTips'), null, async () => {
        deleteAdminMember(row.admin_id).then(() => {
          $baseMessage(
            t('adminMan.deleted'),
            'success',
            'vab-hey-message-success'
          )
          fetchData()
        })
      })
    } else {
      $baseMessage(t('common.unSelected'), 'error', 'vab-hey-message-error')
    }
  }

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
  const fetchData = async () => {
    listData.value.listLoading = true
    const {
      data: { list, total },
    } = await getAdminMemberList(queryForm.value)
    listData.value.list = list
    listData.value.total = total
    listData.value.listLoading = false
  }
  onMounted(() => {
    fetchData()
  })
</script>
