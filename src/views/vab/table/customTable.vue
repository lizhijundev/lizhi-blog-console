<template>
  <div class="custom-table-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button icon="el-icon-plus" type="primary" @click="handleAdd">
          添加
        </el-button>
        <el-button icon="el-icon-delete" type="danger" @click="handleDelete">
          删除
        </el-button>
      </vab-query-form-left-panel>
      <vab-query-form-right-panel>
        <el-form
          ref="form"
          :inline="true"
          :model="queryForm"
          label-width="0"
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
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
    </vab-query-form>

    <el-table
      ref="tableSort"
      v-loading="listLoading"
      :data="list"
      border
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
      <el-table-column
        v-for="(item, index) in finallyColumns"
        :key="index"
        :label="item.label"
        :sortable="item.sortable"
        :width="item.width"
        align="center"
      >
        <template #default="{ row }">
          <span v-if="item.label === '评级'">
            <el-rate v-model="row.rate" disabled />
          </span>
          <span v-else-if="item.label === '头像'">
            <el-image :preview-src-list="imageList" :src="row.img" />
          </span>
          <span v-else>{{ row[item.prop] }}</span>
        </template>
      </el-table-column>

      <el-table-column align="center" show-overflow-tooltip width="85">
        <template #header>
          <el-popover popper-class="custom-table-checkbox" trigger="hover">
            <el-checkbox-group v-model="checkList">
              <el-checkbox
                v-for="(item, index) in columns"
                :key="index"
                :disabled="'标题' === item.label"
                :label="item.label"
              />
            </el-checkbox-group>
            <template #reference>
              <el-button icon="el-icon-setting" />
            </template>
          </el-popover>
        </template>
        <template #default="{ row }">
          <el-button type="text" @click="handleEdit(row)">编辑</el-button>
          <el-button type="text" @click="handleDelete(row)">删除</el-button>
        </template>
      </el-table-column>
      <template #empty>
        <el-image
          :src="require('@/assets/empty_images/data_empty.png')"
          class="vab-data-empty"
        />
      </template>
    </el-table>
    <el-pagination
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      background
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <table-edit ref="edit" @fetch-data="fetchData" />
  </div>
</template>

<script>
  import _ from 'lodash'
  import { doDelete, getList } from '@/api/table'
  import TableEdit from './components/TableEdit'

  export default {
    name: 'CustomTable',
    components: {
      TableEdit,
    },
    data() {
      return {
        checkList: ['标题', '作者', '评级', '头像', '点击量', '时间'],
        columns: [
          {
            order: 2,
            label: '标题',
            width: 'auto',
            prop: 'title',
            sortable: true,
          },
          {
            order: 3,
            label: '作者',
            width: 'auto',
            prop: 'author',
            sortable: true,
          },
          {
            order: 4,
            label: '评级',
            width: '200',
            prop: 'rate',
            sortable: true,
          },
          {
            order: 5,
            label: '头像',
            width: 'auto',
            prop: 'img',
            sortable: true,
          },
          {
            order: 6,
            label: '点击量',
            width: 'auto',
            prop: 'pageViews',
            sortable: true,
          },
          {
            order: 7,
            label: '时间',
            width: 'auto',
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
          pageSize: 10,
          title: '',
        },
      }
    },
    computed: {
      finallyColumns() {
        let finallyArray = []
        this.checkList.forEach((checkItem) => {
          finallyArray.push(
            this.columns.filter((item) => item.label === checkItem)[0]
          )
        })
        return _.sortBy(finallyArray, (item) => item.order)
      },
    },
    created() {
      this.fetchData()
    },
    methods: {
      setSelectRows(val) {
        this.selectRows = val
      },
      handleAdd() {
        this.$refs['edit'].showEdit()
      },
      handleEdit(row) {
        this.$refs['edit'].showEdit(row)
      },
      handleDelete(row) {
        if (row.id) {
          this.$baseConfirm('你确定要删除当前项吗', null, async () => {
            const { msg } = await doDelete({ ids: row.id })
            this.$baseMessage(msg, 'success', false, 'vab-hey-message-success')
            await this.fetchData()
          })
        } else {
          if (this.selectRows.length > 0) {
            const ids = this.selectRows.map((item) => item.id).join()
            this.$baseConfirm('你确定要删除选中项吗', null, async () => {
              const { msg } = await doDelete({ ids: ids })
              this.$baseMessage(
                msg,
                'success',
                false,
                'vab-hey-message-success'
              )
              await this.fetchData()
            })
          } else {
            this.$baseMessage(
              '未选中任何行',
              'error',
              false,
              'vab-hey-message-error'
            )
            return false
          }
        }
      },
      handleSizeChange(val) {
        this.queryForm.pageSize = val
        this.fetchData()
      },
      handleCurrentChange(val) {
        this.queryForm.pageNo = val
        this.fetchData()
      },
      handleQuery() {
        this.queryForm.pageNo = 1
        this.fetchData()
      },
      async fetchData() {
        this.listLoading = true
        const { data, totalCount } = await getList(this.queryForm)
        this.list = data
        const imageList = []
        data.forEach((item) => {
          imageList.push(item.img)
        })
        this.imageList = imageList
        this.total = totalCount
        this.listLoading = false
      },
    },
  }
</script>

<style lang="scss" scoped>
  .custom-table-container {
    :deep() {
      i {
        cursor: pointer;
      }
    }
  }
</style>
<style lang="scss">
  .custom-table-checkbox {
    .el-checkbox {
      display: block !important;
      margin: 0 0 $base-margin/4 10px;
    }
  }
</style>
