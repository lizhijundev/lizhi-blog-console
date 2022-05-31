<template>
  <div class="goods-container">
    <vab-query-form>
      <vab-query-form-right-panel :span="24">
        <el-form ref="form" inline :model="queryForm" @submit.prevent>
          <el-form-item>
            <el-input v-model="queryForm.title" placeholder="请输入商品名称" />
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
          </el-form-item>
        </el-form>
      </vab-query-form-right-panel>
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
        <vab-card :body-style="{ padding: '0px' }" shadow="hover">
          <div class="goods-card-body">
            <div class="goods-tag-group">
              <el-tag hit>{{ item.company }}</el-tag>
            </div>
            <div class="goods-image-group">
              <div class="goods-image">
                <vab-icon v-if="item.icon" :icon="item.icon" />
                <el-image
                  v-if="item.image || item.svg"
                  :class="{ isSvg: item.svg }"
                  :src="item.image || item.svg"
                />
              </div>
            </div>
            <div class="goods-title">{{ item.title }}</div>
            <div class="goods-price">
              <el-tag hit type="warning">{{ item.price }}</el-tag>
              <el-tag v-for="label in item.label" :key="label" hit>
                {{ label }}
              </el-tag>
            </div>
            <div class="goods-description">
              {{ item.description }}
            </div>
            <div class="goods-detail">
              <a
                :href="item.url + '?hmsr=admin-plus&hmpl=&hmcu=&hmkw=&hmci='"
                target="_blank"
              >
                <el-button text type="primary">查看详情</el-button>
              </a>
            </div>
          </div>
        </vab-card>
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
  import { getList } from '@/api/goods'
  import { Search } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'Goods',
    setup() {
      const state = reactive({
        list: [],
        total: 0,
        queryForm: { pageNo: 1, pageSize: 10, title: '' },
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
  .goods-container {
    .goods-card-body {
      position: relative;
      padding: $base-padding;
      cursor: pointer;

      .goods-tag-group {
        position: absolute;
        top: 0;
        right: 0;
        z-index: 9;
        padding: $base-padding * 1.5;
      }

      .goods-image-group {
        height: 200px;
        overflow: hidden;
        background: linear-gradient(to right, #0f2027, #203a43, #2c5364);

        .goods-image {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          height: 200px;

          .isSvg {
            padding: 100px;
          }

          i {
            font-size: 100px;
            color: var(--el-color-white);
          }

          transition: all ease-in-out 0.3s;

          &:hover {
            transform: scale(1.1);
          }
        }
      }

      .goods-title {
        margin: $base-margin 0 8px 0;
        overflow: hidden;
        font-size: 16px;
        font-weight: bold;
        text-overflow: ellipsis;
        white-space: nowrap;
      }

      .goods-price {
        margin: 15px 0 0;
        overflow: hidden;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;

        s {
          color: #c5c8ce;
        }
      }

      .goods-description {
        display: -webkit-box;
        height: 45px;
        margin-top: $base-margin - 5px;
        overflow: hidden;
        font-size: 12px;
        line-height: 20px;
        color: #767676;
        text-overflow: ellipsis;
        box-orient: vertical;
        line-clamp: 2;
      }

      .goods-detail {
        float: right;
        margin-bottom: $base-margin - 9px;
      }
    }
  }
</style>
