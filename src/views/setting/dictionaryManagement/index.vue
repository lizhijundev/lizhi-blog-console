<template>
  <div class="dictionary-management-container">
    <el-row :gutter="20">
      <el-col :lg="4" :md="8" :sm="24" :xl="4" :xs="24">
        <vab-card shadow="hover">
          <el-button
            class="tree-button"
            :icon="Plus"
            type="primary"
            @click="handleEdit()"
          >
            添加字典分类
          </el-button>
          <el-input v-model="filterText" placeholder="请输入字典名称" />
          <el-tree
            ref="treeRef"
            :data="data"
            default-expand-all
            :default-expanded-keys="['root']"
            :filter-node-method="filterNode"
            node-key="id"
            :props="defaultProps"
            @node-click="handleNodeClick"
          >
            <template #default="{ node, data }">
              <span>{{ node.label }}</span>
              <a
                v-if="!data.children"
                style="float: right; margin-right: 10px"
                @click="remove(node, data)"
              >
                删除
              </a>
            </template>
          </el-tree>
        </vab-card>
      </el-col>
      <el-col :lg="20" :md="16" :sm="24" :xl="20" :xs="24">
        <vab-card shadow="hover">
          <vab-query-form>
            <vab-query-form-top-panel :span="12">
              <el-button
                :disabled="isRoot"
                :icon="Plus"
                type="primary"
                @click="handleEdit({ parentKey })"
              >
                添加
              </el-button>
            </vab-query-form-top-panel>
          </vab-query-form>
          <el-table v-loading="listLoading" border :data="list">
            <el-table-column label="id" prop="id" show-overflow-tooltip />
            <el-table-column label="key值" prop="key" show-overflow-tooltip />
            <el-table-column
              label="字典值"
              prop="value"
              show-overflow-tooltip
            />
            <el-table-column label="操作" show-overflow-tooltip width="200">
              <template #default="{ row }">
                <el-button text type="primary" @click="handleEdit(row)">
                  编辑
                </el-button>
                <el-button text type="primary" @click="handleDelete(row)">
                  删除
                </el-button>
              </template>
            </el-table-column>
            <template #empty>
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
  import { getList } from '@/api/dictionaryManagement'
  import { doDelete, getTree } from '@/api/dictionaryManagement'
  import { Plus } from '@element-plus/icons-vue'
  export default defineComponent({
    name: 'DictionaryManagement',
    components: {
      Edit: defineAsyncComponent(() =>
        import('./components/DictionaryManagementEdit')
      ),
    },
    setup() {
      const $baseConfirm = inject('$baseConfirm')
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        treeRef: null,
        editRef: null,
        data: [],
        defaultProps: {
          children: 'children',
          label: 'label',
        },
        list: [],
        listLoading: true,
        isRoot: true,
        parentKey: '',
      })

      const handleEdit = (row) => {
        state['editRef'].showEdit(row)
      }
      const handleDelete = (row) => {
        if (row.id) {
          $baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ paths: row.id })
            $baseMessage(msg, 'success', 'vab-hey-message-success')
            await fetchData()
          })
        }
      }
      const fetchData = async (data = { key: 'root' }) => {
        data.key !== 'root' ? (state.isRoot = false) : (state.isRoot = true)
        state.parentKey = data.key

        state.listLoading = true
        const {
          data: { list },
        } = await getList(data)
        state.list = list
        state.listLoading = false
      }
      const handleNodeClick = (data) => {
        fetchData(data)
      }

      const filterText = ref('')
      watch(filterText, (value) => {
        state.treeRef.filter(value)
      })

      const filterNode = (value, data) => {
        if (!value) return true
        return data.label.includes(value)
      }

      getTree().then(({ data }) => {
        const { list } = data
        state.data = list
      })
      const remove = (node, data) => {
        const parent = node.parent
        const children = parent.data.children || parent.data
        const index = children.findIndex((d) => d.id === data.id)
        children.splice(index, 1)
        state.data = [...state.data]
      }

      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
        filterText,
        filterNode,
        remove,
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
  $base: '.dictionary-management';
  #{$base}-container {
    padding: 0 !important;
    background: $base-color-background !important;
    .tree-button {
      width: 100%;
      margin-bottom: $base-margin;
    }

    :deep() {
      .el-tree {
        margin-top: $base-margin;
        &-node__label {
          display: block;
          width: 100%;
        }
      }
    }
  }
</style>
