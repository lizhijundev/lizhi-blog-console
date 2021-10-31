<template>
  <div
    class="custom-table-container"
    :class="{ 'vab-fullscreen': isFullscreen }"
  >
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-form
          :inline="true"
          label-width="0"
          :model="queryForm"
          @submit.prevent
        >
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="标题" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              native-type="submit"
              type="primary"
              @click="handleQuery"
            >
              查询
            </el-button>
            <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
              添加
            </el-button>
            <el-button
              icon="el-icon-delete"
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
          type="primary"
          @click="clickFullScreen"
        >
          <vab-icon
            :icon="isFullscreen ? 'fullscreen-exit-fill' : 'fullscreen-fill'"
          />
          表格全屏
        </el-button>
        <el-popover popper-class="custom-table-checkbox" trigger="hover">
          <el-radio-group v-model="lineHeight">
            <el-radio label="medium">大</el-radio>
            <el-radio label="small">中</el-radio>
            <el-radio label="mini">小</el-radio>
          </el-radio-group>
          <template #reference>
            <el-button style="margin: 0 10px 10px 0 !important" type="primary">
              <vab-icon icon="line-height" />
              表格尺寸
            </el-button>
          </template>
        </el-popover>
        <el-popover popper-class="custom-table-checkbox" trigger="hover">
          <el-checkbox-group v-model="checkList">
            <vab-draggable v-bind="dragOptions" :list="columns">
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
          <template #reference>
            <el-button
              icon="el-icon-setting"
              style="margin: 0 0 10px 0 !important"
              type="primary"
            >
              可拖拽列设置
            </el-button>
          </template>
        </el-popover>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
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
        width="95"
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
        width="85"
      >
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
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
    <table-edit ref="editRef" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    onMounted,
    reactive,
    toRefs,
  } from 'vue'
  import { doDelete, getList } from '@/api/table'
  import TableEdit from './components/TableEdit'
  import VabDraggable from 'vuedraggable'

  export default defineComponent({
    name: 'CustomTable',
    components: {
      TableEdit,
      VabDraggable,
    },
    setup() {
      const { proxy } = getCurrentInstance()

      const state = reactive({
        editRef: null,
        list2: [
          { name: 'John', id: 0 },
          { name: 'Joao', id: 1 },
          { name: 'Jean', id: 2 },
        ],
        isFullscreen: false,
        border: true,
        height: proxy.$baseTableHeight(1),
        stripe: false,
        lineHeight: 'medium',
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
          proxy.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            proxy.$baseMessage(msg, 'success', 'vab-hey-message-success')
            await fetchData()
          })
        } else {
          if (state.selectRows.length > 0) {
            const ids = state.selectRows.map((item) => item.id).join()
            proxy.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
              proxy.$baseMessage(msg, 'success', 'vab-hey-message-success')
              await fetchData()
            })
          } else {
            proxy.$baseMessage('未选中任何行', 'error', 'vab-hey-message-error')
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
        clickFullScreen,
        handleHeight,
        setSelectRows,
        handleAdd,
        handleEdit,
        handleDelete,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .custom-table-container {
    :deep() {
      i {
        cursor: pointer;
      }
    }

    .stripe-panel,
    .border-panel {
      margin: 0 10px #{math.div($base-margin, 2)} 10px !important;
    }
  }
</style>
<style lang="scss">
  .custom-table-checkbox {
    [class*='ri'] {
      vertical-align: -2.5px;
      cursor: pointer;
    }

    .el-checkbox {
      margin: 5px 0 5px 8px;
    }
  }
</style>
