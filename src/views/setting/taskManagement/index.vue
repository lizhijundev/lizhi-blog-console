<template>
  <div class="task-management-container">
    <vab-query-form class="page-header">
      <vab-query-form-top-panel>
        <el-form inline label-width="60px" :model="queryForm" @submit.prevent>
          <el-form-item label="任务名">
            <el-input
              v-model.trim="queryForm.taskName"
              clearable
              placeholder="请输入账号"
            />
          </el-form-item>
          <el-form-item label="周期">
            <el-date-picker
              v-model="queryForm.date"
              end-placeholder="结束日期"
              start-placeholder="开始日期"
              type="daterange"
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
    <el-row :gutter="15">
      <el-col
        v-for="item in list"
        :key="item.id"
        :lg="6"
        :md="8"
        :sm="12"
        :xl="6"
        :xs="24"
      >
        <vab-card class="task-item" shadow="hover">
          <template #header>
            <vab-icon icon="task-line" />
            任务编号 - {{ item.id }}
            <el-tag
              v-if="item.status == 1"
              class="card-header-tag"
              type="success"
            >
              已开启
            </el-tag>
            <el-tag v-else class="card-header-tag" type="danger">已停用</el-tag>
          </template>
          <el-image
            class="task-item-image"
            :src="require('@/assets/task_image/task.png')"
          />

          <div class="task-item-bottom">
            <span>Ip: {{ item.ip }}</span>
            <el-popconfirm
              title="您确定要执行吗?"
              @confirm="handlePlay(item.status)"
            >
              <template #reference>
                <el-button v-if="item.status == 1" circle type="warning">
                  <vab-icon icon="pause-line" />
                </el-button>
                <el-button v-else circle type="primary">
                  <vab-icon icon="play-line" />
                </el-button>
              </template>
            </el-popconfirm>
          </div>
        </vab-card>
      </el-col>
      <el-col :lg="6" :md="8" :sm="12" :xl="6" :xs="24">
        <vab-card class="task-add" shadow="hover" @click="handleAdd">
          <vab-icon icon="add-circle-line" />
          <p>添加任务</p>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getList } from '@/api/taskManagement'
  import { Search } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'TaskManagement',
    setup() {
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        list: [],
        listLoading: true,
        queryForm: {
          taskName: '',
          date: '',
          pageNo: 1,
          pageSize: 5,
        },
      })

      const fetchData = async () => {
        state.listLoading = true
        const {
          data: { list },
        } = await getList(state.queryForm)
        state.list = list
        state.listLoading = false
      }
      const queryData = () => {
        state.queryForm.pageNo = 1
        fetchData()
      }
      const handlePlay = (status) => {
        if (status)
          $baseMessage('模拟停用成功', 'success', 'vab-hey-message-success')
        else $baseMessage('模拟开启成功', 'success', 'vab-hey-message-success')
      }
      const handleAdd = () => {
        $baseMessage('模拟添加成功', 'success', 'vab-hey-message-success')
      }
      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
        fetchData,
        queryData,
        handlePlay,
        handleAdd,
        Search,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .task-management-container {
    padding: 0 !important;
    background: $base-color-background !important;

    .page-header {
      display: flex;
      align-items: center;
      padding: $base-padding $base-padding 0 $base-padding;
      margin-bottom: $base-margin;
      background: var(--el-color-white);
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
        .el-card__header {
          position: relative;

          .card-header-tag {
            position: absolute;
            top: 15px;
            right: $base-margin;
          }

          > div > span {
            display: flex;
            align-items: center;

            i {
              margin-right: 3px;
            }
          }
        }

        .el-card__body {
          position: relative;

          .card-footer-tag {
            position: absolute;
            right: $base-margin;
            bottom: 15px;
          }
        }
      }
    }

    .task-item {
      min-height: 255px;
      max-height: 255px;

      &-image {
        display: block;
        width: 150px;
        margin: 0 auto 20px auto;
      }

      &-bottom {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding-top: 20px;
        text-align: right;
        border-top: 1px solid #ebeef5;

        .el-button--mini.is-circle {
          i {
            margin-right: 0 !important;
            font-size: 14px;
          }
        }
      }
    }

    .task-add {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 255px;
      max-height: 255px;
      color: var(--el-color-primary);
      text-align: center;
      cursor: pointer;

      i {
        font-size: 30px;
      }

      p {
        margin-top: 20px;
        font-size: 12px;
      }
    }
  }
</style>
