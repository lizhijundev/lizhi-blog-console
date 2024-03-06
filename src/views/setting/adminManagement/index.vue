<template>
  <div class="user-management-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="10">
        <el-button :icon="Plus" type="primary" @click="handleEdit($event)">
          {{ translateTitle('添加') }}
        </el-button>
        <!--        <el-button :icon="Delete" type="danger" @click="handleDelete($event)">-->
        <!--          批量删除-->
        <!--        </el-button>-->
      </vab-query-form-left-panel>
      <vab-query-form-right-panel :span="14">
        <el-form inline :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input
              v-model.trim="queryForm.username"
              clearable
              :placeholder="translateTitle('请输入用户名')"
            />
          </el-form-item>
          <el-form-item>
            <el-select
              v-model="queryForm.status"
              clearable
              :placeholder="translateTitle('状态')"
            >
              <el-option :label="translateTitle('全部')" value="" />
              <el-option :label="translateTitle('启用')" value="1" />
              <el-option :label="translateTitle('禁用')" value="0" />
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button :icon="Search" type="primary" @click="queryData">
              {{ translateTitle('查询') }}
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table v-loading="listLoading" border :data="list">
      <!--      <el-table-column align="center" show-overflow-tooltip type="selection" />-->
      <!--      <el-table-column align="center" label="序号" width="55">-->
      <!--        <template #default="{ $index }">-->
      <!--          {{ $index + 1 }}-->
      <!--        </template>-->
      <!--      </el-table-column>-->
      <el-table-column
        align="center"
        label="ID"
        width="80px"
        prop="admin_id"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        :label="translateTitle('用户名')"
        prop="username"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        :label="translateTitle('昵称')"
        prop="nickname"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        :label="translateTitle('状态')"
        prop="status"
        width="90px"
        show-overflow-tooltip
      >
        <template #default="{ row }">
          <el-tag :type="row.status === 1 ? 'success' : 'danger'" effect="dark">
            {{ translateTitle(row.status === 1 ? '启用' : '禁用') }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        :label="translateTitle('修改时间')"
        prop="update_time"
        show-overflow-tooltip
      />
      <el-table-column align="center" :label="translateTitle('操作')">
        <template #default="{ row }">
          <el-button text type="primary" @click="handleEdit(row)">
            {{ translateTitle('编辑') }}
          </el-button>
          <el-button text type="primary" @click="handleResetPwd(row)">
            {{ translateTitle('重置密码') }}
          </el-button>
          <el-button text type="primary" @click="handleDelete(row)">
            {{ translateTitle('删除') }}
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty
          class="vab-data-empty"
          :description="translateTitle('暂无数据')"
        />
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
    <user-management-password
      ref="userManagementPasswordRef"
      @fetch-data="fetchData"
    />
  </div>
</template>

<script>
  import { doDelete, getList } from '@/api/userManagement'
  import { Delete, Plus, Search } from '@element-plus/icons-vue'
  import { deleteAdminMember, getAdminMemberList } from '@/api/adminMember'
  import { translate } from '@/i18n'

  export default defineComponent({
    name: 'UserManagement',
    components: {
      Edit: defineAsyncComponent(
        () => import('./components/UserManagementEdit')
      ),
      UserManagementPassword: defineAsyncComponent(
        () => import('./components/UserManagementPassword')
      ),
    },
    setup() {
      const $baseConfirm = inject('$baseConfirm')
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        editRef: null,
        userManagementPasswordRef: null,
        list: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        queryForm: {
          pageNo: 1,
          pageSize: 10,
          username: '',
          status: '',
        },
      })

      const setSelectRows = (val) => {
        state.selectRows = val
      }
      const handleEdit = (row) => {
        if (row.admin_id) {
          state['editRef'].showEdit(row)
        } else {
          state['editRef'].showEdit()
        }
      }
      const handleResetPwd = (row) => {
        if (row.admin_id) {
          state['userManagementPasswordRef'].showEdit(row)
        }
      }
      const handleDelete = (row) => {
        if (row.admin_id) {
          $baseConfirm('你确定要删除当前项吗', null, async () => {
            deleteAdminMember(row.admin_id).then((res) => {
              $baseMessage('已删除', 'success', 'vab-hey-message-success')
              fetchData()
            })
          })
        } else {
          if (state.selectRows.length > 0) {
            $baseConfirm('你确定要删除选中项吗', null, async () => {
              // 队列批量调用删除
              state.selectRows.map((item) => {
                deleteAdminMember(item.admin_id).then((res) => {})
              })
            })
          } else {
            $baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
          }
        }
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
      const fetchData = async () => {
        state.listLoading = true
        const {
          data: { list, total },
        } = await getAdminMemberList(state.queryForm)
        state.list = list
        state.total = total
        state.listLoading = false
      }
      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
        setSelectRows,
        handleEdit,
        handleResetPwd,
        handleDelete,
        handleSizeChange,
        handleCurrentChange,
        queryData,
        fetchData,
        translateTitle: translate,
        Delete,
        Plus,
        Search,
      }
    },
  })
</script>
