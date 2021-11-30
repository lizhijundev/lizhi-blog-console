<template>
  <div class="menu-management-container">
    <el-row :gutter="20">
      <el-col :lg="4" :md="8" :sm="24" :xl="4" :xs="24">
        <vab-card shadow="hover">
          <el-tree
            :data="data"
            :default-expanded-keys="['root']"
            node-key="id"
            :props="defaultProps"
            @node-click="handleNodeClick"
          />
        </vab-card>
      </el-col>
      <el-col :lg="20" :md="16" :sm="24" :xl="20" :xs="24">
        <vab-card shadow="hover">
          <vab-query-form>
            <vab-query-form-top-panel :span="12">
              <el-button
                :icon="Plus"
                type="primary"
                @click="handleEdit($event)"
              >
                添加
              </el-button>
            </vab-query-form-top-panel>
          </vab-query-form>
          <el-table
            v-loading="listLoading"
            border
            :data="list"
            default-expand-all
            row-key="path"
            :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
          >
            <el-table-column
              label="标题"
              prop="meta.title"
              show-overflow-tooltip
            />
            <el-table-column label="name" prop="name" show-overflow-tooltip />
            <el-table-column label="路径" prop="path" show-overflow-tooltip />
            <el-table-column label="是否隐藏" show-overflow-tooltip>
              <template #default="{ row }">
                {{ row.meta.hidden ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column
              label="是否隐藏当前节点"
              show-overflow-tooltip
              width="100"
            >
              <template #default="{ row }">
                {{ row.meta.levelHidden ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column
              label="vue文件路径"
              prop="component"
              show-overflow-tooltip
            />
            <el-table-column label="重定向" show-overflow-tooltip>
              <template #default="{ row }">
                {{ row.redirect ? row.redirect : '无' }}
              </template>
            </el-table-column>
            <el-table-column label="图标" show-overflow-tooltip>
              <template #default="{ row }">
                <vab-icon
                  v-if="row.meta && row.meta.icon"
                  :icon="row.meta.icon"
                />
              </template>
            </el-table-column>
            <el-table-column label="是否固定" show-overflow-tooltip>
              <template #default="{ row }">
                {{ row.meta && row.meta.noClosable ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column
              label="是否无缓存"
              show-overflow-tooltip
              width="120"
            >
              <template #default="{ row }">
                {{ row.meta && row.meta.noKeepAlive ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column label="badge" show-overflow-tooltip>
              <template #default="{ row }">
                <el-tag
                  v-if="row.meta && row.meta.badge"
                  effect="dark"
                  type="danger"
                >
                  {{ row.meta.badge }}
                </el-tag>
              </template>
            </el-table-column>
            <el-table-column label="dot" show-overflow-tooltip>
              <template #default="{ row }">
                {{ row.meta && row.meta.dot ? '是' : '否' }}
              </template>
            </el-table-column>
            <el-table-column label="操作" show-overflow-tooltip width="185">
              <template #default="{ row }">
                <el-button type="primary" @click="handleEdit(row)">
                  <vab-icon icon="edit-2-line" />
                  编辑
                </el-button>
                <el-button type="danger" @click="handleDelete(row)">
                  <vab-icon icon="delete-bin-6-line" />
                  删除
                </el-button>
              </template>
            </el-table-column>
            <template #empty>
              <!-- <el-image
                class="vab-data-empty"
                :src="require('@/assets/empty_images/data_empty.png')"
              /> -->
              <el-empty class="vab-data-empty" description="暂无数据" />
            </template>
          </el-table>
        </vab-card>
      </el-col>
    </el-row>
    <edit ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import {
    defineComponent,
    getCurrentInstance,
    onMounted,
    reactive,
    toRefs,
  } from 'vue'
  import { getList } from '@/api/router'
  import { doDelete, getTree } from '@/api/menuManagement'
  import Edit from './components/MenuManagementEdit'
  import { Plus } from '@element-plus/icons'

  export default defineComponent({
    name: 'MenuManagement',
    components: { Edit },
    setup() {
      const { proxy } = getCurrentInstance()

      const state = reactive({
        editRef: null,
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        list: [],
        listLoading: true,
      })

      const handleEdit = (row) => {
        if (row.path && row.component) {
          state['editRef'].showEdit(row)
        } else {
          state['editRef'].showEdit()
        }
      }
      const handleDelete = (row) => {
        if (row.path) {
          proxy.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ paths: row.path })
            proxy.$baseMessage(msg, 'success', 'vab-hey-message-success')
            await fetchData()
          })
        }
      }
      const fetchData = async (role) => {
        state.listLoading = true
        const {
          data: { list },
        } = await getList({ role })
        state.list = list
        state.listLoading = false
      }
      const handleNodeClick = ({ role }) => {
        fetchData(role)
      }

      getTree().then(({ data }) => {
        const { list } = data
        state.data = list
      })
      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
        handleEdit,
        handleDelete,
        fetchData,
        handleNodeClick,
        Plus,
      }
    },
  })
</script>

<style lang="scss" scoped>
  $base: '.menu-management';
  #{$base}-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
