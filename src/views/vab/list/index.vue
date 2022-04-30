<template>
  <div class="list-container">
    <el-row :gutter="20">
      <vab-query-form>
        <vab-query-form-top-panel :span="24">
          <el-form inline :model="queryForm" @submit.prevent>
            <el-form-item>
              <el-input
                v-model.trim="queryForm.title"
                clearable
                placeholder="请输入标题"
              />
            </el-form-item>
            <el-form-item>
              <el-button :icon="Search" type="primary" @click="queryData">
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-top-panel>
      </vab-query-form>
      <el-col v-if="emptyShow" :span="24">
        <el-empty class="vab-data-empty" description="暂无数据" />
      </el-col>
      <el-col :span="24">
        <ul v-loading="listLoading">
          <li v-for="(item, index) in list" :key="index" class="list-item">
            <div class="list-item-meta">
              <div class="list-item-meta-avatar">
                <el-image :src="item.img" />
              </div>
              <div class="list-item-meta-content">
                <div class="list-item-meta-title">
                  {{ item.title }}
                </div>
                <div class="list-item-meta-description">
                  {{ item.description }}
                </div>
              </div>
              <div class="list-item-meta-content">
                <div class="list-item-meta-item">
                  <span>时间</span>
                  <p>{{ item.datetime }}</p>
                </div>
              </div>
              <div class="list-item-meta-content">
                <el-progress :percentage="item.percentage" />
              </div>
            </div>
          </li>
        </ul>
      </el-col>
      <el-col :span="24">
        <el-pagination
          background
          :current-page="queryForm.pageNo"
          :layout="layout"
          :page-size="queryForm.pageSize"
          :total="total"
          @current-change="handleCurrentChange"
          @size-change="handleSizeChange"
        />
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getList } from '@/api/table'
  import { Search } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'List',
    setup() {
      const state = reactive({
        list: [],
        total: 0,
        queryForm: { pageNo: 1, pageSize: 10, title: '' },
        layout: 'total, sizes, prev, pager, next, jumper',
        listLoading: true,
        emptyShow: true,
      })

      const fetchData = async () => {
        state.listLoading = true
        const {
          data: { list, total },
        } = await getList(state.queryForm)
        state.list = list
        state.total = total
        state.listLoading = false
        state.emptyShow = false
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
      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
        handleSizeChange,
        handleCurrentChange,
        queryData,
        Search,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .list-container {
    ul {
      padding: 0;
      margin: 0;
      list-style: none;
      outline: none;

      .list-item {
        padding: $base-padding;
        border-bottom: 1px solid $base-border-color;

        &-meta {
          display: flex;
          flex: 1 1;
          align-items: flex-start;

          &-avatar {
            margin-right: 16px;

            :deep() {
              .el-image {
                width: 61px;
                height: 61px;
              }
            }
          }

          &-content {
            flex: 1 0;
            width: 0;
            color: rgba(0, 0, 0, 0.85);
          }

          &-title {
            margin-top: 11px;
            margin-bottom: 4px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.85);
          }

          &-description {
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
          }

          &-item {
            display: inline-block;
            height: 61px;
            margin-left: 40px;
            font-size: 14px;
            color: rgba(0, 0, 0, 0.45);
            vertical-align: middle;

            > span {
              line-height: 30px;
            }

            > p {
              margin-top: 4px;
              margin-bottom: 0;
            }
          }

          :deep() {
            .el-progress {
              margin-top: 21px;
            }
          }
        }
      }
    }
  }
</style>
