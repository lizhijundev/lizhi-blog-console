<template>
  <div class="card-container">
    <vab-query-form class="page-header">
      <vab-query-form-top-panel :span="24">
        <el-form
          :inline="true"
          label-width="50px"
          :model="queryForm"
          @submit.prevent
        >
          <el-form-item label="区域">
            <el-select v-model="queryForm.area" placeholder="请选择活动区域">
              <el-option label="区域一" value="shanghai" />
              <el-option label="区域二" value="beijing" />
            </el-select>
          </el-form-item>
          <el-form-item label="时间">
            <el-date-picker
              v-model="queryForm.datetime"
              placeholder="选择日期时间"
              type="datetime"
            />
          </el-form-item>
          <el-form-item label="名称">
            <el-input v-model="queryForm.title" placeholder="名称" />
          </el-form-item>
          <el-form-item>
            <el-button
              icon="el-icon-search"
              native-type="submit"
              type="primary"
              @click="queryData"
            >
              查询
            </el-button>
          </el-form-item>
        </el-form>
      </vab-query-form-top-panel>
    </vab-query-form>
    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in list"
        :key="index"
        :lg="8"
        :md="8"
        :sm="8"
        :xl="6"
        :xs="24"
      >
        <el-card
          :body-style="{ padding: '0px', position: 'static' }"
          shadow="hover"
        >
          <vab-magnifier
            style="width: 100%; height: 228px"
            type="circle"
            :url="item.img"
            :width="150"
          />
          <div class="card-title">{{ item.title }}</div>
          <div class="card-description">{{ item.description }}</div>
          <div class="card-datetime">{{ item.datetime }}</div>
        </el-card>
      </el-col>
    </el-row>
    <el-pagination
      background
      :current-page="queryForm.pageNo"
      :layout="layout"
      :page-size="queryForm.pageSize"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<script>
  import { reactive, toRefs } from 'vue'
  import VabMagnifier from '@/extra/VabMagnifier'
  import { getList } from '@/api/table'

  export default {
    name: 'Card',
    components: { VabMagnifier },
    setup() {
      const state = reactive({
        list: [],
        total: 0,
        queryForm: { pageNo: 1, pageSize: 20, title: '' },
        layout: 'total, sizes, prev, pager, next, jumper',
      })

      const fetchData = async () => {
        const {
          data: { list, total },
        } = await getList(state.queryForm)
        state.list = list
        state.total = total
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

      fetchData()

      return {
        ...toRefs(state),
        handleSizeChange,
        handleCurrentChange,
        queryData,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .card-container {
    padding: 0 0 $base-padding 0 !important;
    background: $base-color-background !important;

    .page-header {
      display: flex;
      align-items: center;
      padding: $base-padding $base-padding 0 $base-padding;
      margin-bottom: $base-margin;
      background: $base-color-white;
      border: 1px solid #ebeef5;

      :deep() {
        .el-form-item__content {
          width: 221px !important;

          .el-select,
          .el-input,
          .el-date-editor,
          .el-checkbox-group {
            width: 100%;
          }
        }
      }
    }

    :deep() {
      .el-card {
        &__body {
          position: relative;
          padding: $base-padding;
          cursor: pointer;

          img {
            height: 228px;
          }

          .card-title {
            margin: $base-margin $base-margin 10px $base-margin;
            font-size: 16px;
            font-weight: bold;
          }

          .card-description {
            margin: 0 $base-margin 10px $base-margin;
          }

          .card-datetime {
            margin: 0 $base-margin 10px $base-margin;
            color: rgba($base-color-black, 0.6);
          }
        }
      }

      .el-pagination.is-background {
        .btn-next,
        .btn-prev {
          background-color: $base-color-white;
        }

        .el-pager {
          li {
            background-color: $base-color-white;

            &.active {
              background-color: $base-color-blue;
            }
          }
        }
      }
    }
  }
</style>
