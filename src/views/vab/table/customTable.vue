<template>
  <div
    class="custom-table-container"
    :class="{ 'vab-fullscreen': isFullscreen }"
  >
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-form inline label-width="0" :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item>
            <el-button
              :icon="Search"
              native-type="submit"
              type="primary"
              @click="queryData"
            >
              查询
            </el-button>
            <el-button :icon="Plus" type="primary" @click="handleAdd">
              添加
            </el-button>
            <el-button
              :icon="Delete"
              type="danger"
              @click="handleDelete($event)"
            >
              删除
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <div class="stripe-panel">
          <el-checkbox v-model="stripe">斑马纹</el-checkbox>
        </div>
        <div class="border-panel">
          <el-checkbox v-model="border">边框（可拉伸列）</el-checkbox>
        </div>
        <el-button
          style="margin: 0 10px 10px 0 !important"
          text
          type="primary"
          @click="clickFullScreen"
        >
          <vab-icon
            :icon="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'"
          />
        </el-button>
        <el-popover popper-class="custom-table-radio" trigger="hover">
          <el-radio-group v-model="lineHeight">
            <el-radio label="large">大</el-radio>
            <el-radio label="default">中</el-radio>
            <el-radio label="small">小</el-radio>
          </el-radio-group>
          <template #reference>
            <el-button
              style="margin: 0 10px 10px 0 !important"
              text
              type="primary"
            >
              <vab-icon icon="line-height" />
            </el-button>
          </template>
        </el-popover>
        <el-popover popper-class="custom-table-checkbox" trigger="hover">
          <template #reference>
            <el-button
              style="margin: 0 0 10px 0 !important"
              text
              type="primary"
            >
              <vab-icon icon="settings-line" />
            </el-button>
          </template>
          <el-checkbox-group v-model="checkList">
            <vab-draggable
              v-bind="dragOptions"
              item-key="{ element }"
              :list="columns"
            >
              <template #item="{ element }">
                <div>
                  <vab-icon icon="drag-drop-line" />
                  <el-checkbox
                    :disabled="element.disableCheck === true"
                    :label="element.label"
                  >
                    {{ element.label }}
                  </el-checkbox>
                </div>
              </template>
            </vab-draggable>
          </el-checkbox-group>
        </el-popover>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      ref="tableSortRef"
      v-loading="listLoading"
      :border="border"
      :data="list"
      :height="height"
      :size="lineHeight"
      :stripe="stripe"
      @selection-change="setSelectRows"
    >
      <el-table-column align="center" type="selection" width="55" />
      <el-table-column
        align="center"
        label="序号"
        show-overflow-tooltip
        width="200"
      >
        <template #default="{ $index }">
          {{ $index + 1 }}
        </template>
      </el-table-column>

      <!--  TODO element-plus未知原因不支持拖拽后宽度重新计算，暂时放弃 -->
      <el-table-column
        v-for="(item, index) in finallyColumns"
        :key="index"
        align="center"
        :label="item.label"
        :prop="item.prop"
        :sortable="item.sortable"
        width="auto"
      >
        <template #default="{ row }">
          <span v-if="item.label === '评级'">
            <el-rate v-model="row.rate" disabled />
          </span>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column
        align="center"
        label="操作"
        show-overflow-tooltip
        width="200"
      >
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
        <!--  <el-image
          class="vab-data-empty"
          :src="require('@/assets/empty_images/data_empty.png')"
        /> -->
        <el-empty class="vab-data-empty" description="暂无数据" />
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
  </div>
</template>

<script>
  import { doDelete, getList } from '@/api/table'
  import VabDraggable from 'vuedraggable'
  import { Delete, Plus, Search, Setting } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'CustomTable',
    components: {
      Edit: defineAsyncComponent(() => import('./components/TableEdit')),
      VabDraggable,
    },
    setup() {
      const $baseConfirm = inject('$baseConfirm')
      const $baseMessage = inject('$baseMessage')
      const $baseTableHeight = inject('$baseTableHeight')

      const state = reactive({
        tableSortRef: null,
        editRef: null,
        border: true,
        height: $baseTableHeight(1),
        stripe: false,
        lineHeight: 'small',
        isFullscreen: false,
        checkList: ['标题', '作者', '评级', '点击量', '时间'],
        columns: [
          {
            label: '标题',
            prop: 'title',
            sortable: true,
            disableCheck: true,
          },
          {
            label: '作者',
            prop: 'author',
            sortable: true,
          },
          {
            label: '评级',
            prop: 'rate',
            sortable: true,
          },
          {
            label: '点击量',
            prop: 'pageViews',
            sortable: true,
          },
          {
            label: '时间',
            prop: 'datetime',
            sortable: true,
          },
        ],
        list: [],
        imageList: [],
        listLoading: true,
        layout: 'total, sizes, prev, pager, next, jumper',
        total: 0,
        selectRows: '',
        queryForm: {
          pageNo: 1,
          pageSize: 20,
          title: '',
        },
      })

      const dragOptions = computed(() => {
        return {
          animation: 600,
          group: 'description',
        }
      })
      const finallyColumns = computed(() => {
        return state.columns.filter((item) =>
          state.checkList.includes(item.label)
        )
      })

      const fetchData = async () => {
        state.listLoading = true
        const {
          data: { list, total },
        } = await getList(state.queryForm)
        state.list = list
        const imageList = []
        list.forEach((item) => {
          imageList.push(item.img)
        })
        state.total = total
        state.listLoading = false
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

      const clickFullScreen = () => {
        state.isFullscreen = !state.isFullscreen
        handleHeight()
      }
      const handleHeight = () => {
        if (state.isFullscreen) state.height = proxy.$baseTableHeight(1) + 210
        else state.height = proxy.$baseTableHeight(1)
      }

      const setSelectRows = (val) => {
        state.selectRows = val
      }
      const handleAdd = () => {
        state['editRef'].showEdit()
      }
      const handleEdit = (row) => {
        state['editRef'].showEdit(row)
      }
      const handleDelete = (row) => {
        if (row.id) {
          $baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            $baseMessage(msg, 'success', 'vab-hey-message-success')
            await fetchData()
          })
        } else {
          if (state.selectRows.length > 0) {
            const ids = state.selectRows.map((item) => item.id).join()
            $baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
              $baseMessage(msg, 'success', 'vab-hey-message-success')
              await fetchData()
            })
          } else {
            $baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
          }
        }
      }
      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
        dragOptions,
        finallyColumns,
        handleSizeChange,
        handleCurrentChange,
        queryData,
        handleHeight,
        setSelectRows,
        clickFullScreen,
        fetchData,
        handleAdd,
        handleEdit,
        handleDelete,
        Plus,
        Delete,
        Search,
        Setting,
      }
    },
  })
</script>

<style lang="scss" scoped>
  @use 'sass:math';
  .custom-table-container {
    :deep() {
      i {
        cursor: pointer;
      }
    }

    .right-panel {
      .stripe-panel,
      .border-panel {
        margin: 0 10px #{math.div($base-margin, 2)} 10px !important;

        :deep() {
          .el-checkbox__label {
            margin-left: 0 !important;
          }
        }
      }

      [class*='ri'] {
        font-size: $base-font-size-big;
        color: var(--el-color-black);
      }
    }
  }
</style>
<style lang="scss">
  html body .custom-table-checkbox {
    [class*='ri'] {
      vertical-align: -0.5px !important;
      cursor: pointer;
    }

    .el-checkbox {
      margin: 5px 0 5px 8px;
    }
  }

  .custom-table-radio {
    width: 240px !important;
  }
</style>
