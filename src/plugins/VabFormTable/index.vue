<template>
  <div class="vab-form-table">
    <vab-query-form>
      <vab-query-form-top-panel :span="12">
        <el-button :icon="Plus" type="primary" @click="handleAdd($event)">
          添加
        </el-button>
      </vab-query-form-top-panel>
    </vab-query-form>
    <el-table :key="toggleIndex" ref="tableRef" border :data="data">
      <el-table-column v-if="drag" align="center" label="操作" width="80">
        <template #default>
          <vab-icon
            class="vab-rank"
            icon="drag-move-2-line"
            style="cursor: move"
          />
        </template>
      </el-table-column>

      <slot></slot>
      <el-table-column align="center" label="操作" width="100px">
        <template #default="{ $index, row }">
          <el-button
            :icon="Delete"
            plain
            type="danger"
            @click="handleDelete(row, $index)"
          >
            删除
          </el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-empty class="vab-data-empty" description="暂无数据" />
      </template>
    </el-table>
  </div>
</template>

<script>
  import { Delete, Plus } from '@element-plus/icons-vue'
  import Sortable from 'sortablejs'

  export default defineComponent({
    name: 'VabFormTable',
    props: {
      modelValue: {
        type: Array,
        default: () => [],
      },
      rowTemplate: {
        type: Object,
        default: () => {},
      },
      drag: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['update:modelValue'],
    setup(props, { emit }) {
      const state = reactive({
        tableRef: null,
        data: [],
        toggleIndex: 0,
      })

      const rowDrop = () => {
        const tbody = state.tableRef.$el.querySelector(
          '.el-table__body-wrapper tbody'
        )
        Sortable.create(tbody, {
          handle: '.vab-rank',
          animation: 300,
          onEnd({ newIndex, oldIndex }) {
            const tableData = state.data
            const currRow = tableData.splice(oldIndex, 1)[0]
            tableData.splice(newIndex, 0, currRow)
            state.toggleIndex += 1
            nextTick(() => {
              rowDrop()
            })
          },
        })
      }
      const handleAdd = () => {
        state.data.push(JSON.parse(JSON.stringify(props.rowTemplate)))
      }
      const handleDelete = (row, index) => {
        state.data.splice(index, 1)
      }

      onMounted(() => {
        state.data = props.modelValue
        if (props.drag) rowDrop()
      })

      watch(
        () => props.modelValue,
        () => (state.data = props.modelValue)
      )

      watch(
        () => state.data,
        () => emit('update:modelValue', state.data)
      )

      return {
        ...toRefs(state),
        rowDrop,
        handleAdd,
        handleDelete,
        Delete,
        Plus,
      }
    },
  })
</script>
