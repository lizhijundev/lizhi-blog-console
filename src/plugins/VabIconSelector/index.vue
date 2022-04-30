<script lang="ts" setup>
  import { getIconList } from '@/api/remixIcon'
  const emit = defineEmits(['handle-icon'])
  const state: any = reactive({
    icon: '24-hours-fill',
    layout: 'total, prev, next',
    total: 0,
    background: true,
    height: 0,
    selectRows: '',
    queryIcon: [],
    queryForm: {
      pageNo: 1,
      pageSize: 16,
      title: '',
    },
  })

  const handleSizeChange: any = (val: string) => {
    state.queryForm.pageSize = val
    fetchData()
  }
  const handleCurrentChange: any = (val: string) => {
    state.queryForm.pageNo = val
    fetchData()
  }
  const queryData: any = () => {
    state.queryForm.pageNo = 1
    fetchData()
  }
  const fetchData: any = async () => {
    const {
      data: { list, total },
    } = await getIconList(state.queryForm)
    state.queryIcon = list
    state.total = total
  }
  const handleIcon: any = (item: any) => {
    state.icon = item
    emit('handle-icon', item)
  }

  onMounted(() => {
    fetchData()
  })
</script>

<template>
  <el-row :gutter="20">
    <el-col :span="24">
      <vab-query-form>
        <vab-query-form-top-panel>
          <el-form inline label-width="0" @submit.prevent>
            <el-form-item label="">
              <el-input v-model="state.queryForm.title" />
            </el-form-item>
            <el-form-item label-width="0">
              <el-button native-type="submit" type="primary" @click="queryData">
                查询
              </el-button>
            </el-form-item>
          </el-form>
        </vab-query-form-top-panel>
      </vab-query-form>
    </el-col>

    <el-col v-for="(item, index) in state.queryIcon" :key="index" :span="6">
      <vab-card shadow="hover" @click="handleIcon(item)">
        <vab-icon :icon="item" />
      </vab-card>
    </el-col>
    <el-col :span="24">
      <el-pagination
        :background="state.background"
        :current-page="state.queryForm.pageNo"
        :layout="state.layout"
        :page-size="state.queryForm.pageSize"
        :total="state.total"
        @current-change="handleCurrentChange"
        @size-change="handleSizeChange"
      />
    </el-col>
  </el-row>
</template>

<style lang="scss">
  .icon-selector-popper {
    .el-card__body {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      height: 20px;
      cursor: pointer;

      i {
        font-size: 28px;
        color: var(--el-color-grey);
        text-align: center;
        vertical-align: middle;
        pointer-events: none;
        cursor: pointer;
      }
    }

    .el-pagination {
      margin: 0;
    }
  }
</style>
