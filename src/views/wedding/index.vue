<script setup lang="ts">
  import _ from 'lodash'
  import { getWeddingInviteData, getWeddingMessageList } from '@/api/wedding.ts'

  const queryForm = ref({
    page_no: 1,
    page_size: 10,
  })

  const listData = ref({
    listLoading: false,
    total: 0,
    list: [],
  })

  const inviteData = ref([])

  const handleSizeChange = (val: any) => {
    queryForm.value.page_size = val
    fetchData()
  }
  const handleCurrentChange = (val: any) => {
    queryForm.value.page_no = val
    fetchData()
  }
  const queryData = () => {
    queryForm.value.page_no = 1
    fetchData()
  }
  const fetchData = async () => {
    listData.value.listLoading = true
    const params = _.cloneDeep(queryForm.value)
    try {
      const {
        data: { list, total },
      } = await getWeddingMessageList(params)
      listData.value.list = list
      listData.value.total = total
      listData.value.listLoading = false
    } catch (e) {
      listData.value.listLoading = false
    }
  }

  const onLoadInviteData = () => {
    getWeddingInviteData().then((res) => {
      console.log('invite data', res)
      inviteData.value = res.data
    })
  }

  onMounted(() => {
    fetchData()
    onLoadInviteData()
  })
</script>

<template>
  <div class="wedding-msg-container">
    <div class="font-bold text-lg py-4">数据统计</div>
    <div class="grid grid-cols-4 gap-4">
      <div
        v-for="(item, index) in inviteData"
        :key="index"
        class="shadow-md p-8 flex flex-col items-center justify-center"
      >
        <div class="text-sm mb-4">{{ item.nickname }}请柬链接</div>
        <div class="flex flex-row gap-2 items-center justify-center">
          <div class="text-2xl font-bold">{{ item.view_num }}</div>
          <div>次浏览</div>
        </div>
      </div>
    </div>

    <div class="font-bold text-lg py-4">宾客留言</div>
    <el-table v-loading="listData.listLoading" border :data="listData.list">
      <el-table-column label="宾客姓名" prop="name" />
      <el-table-column label="电话" prop="phone" />
      <el-table-column label="出席方式" prop="attend">
        <template #default="{ row }">
          <el-tag v-if="row.attend === 0" type="success" size="small">
            线上祝福
          </el-tag>
          <el-tag v-if="row.attend === 1" type="primary" size="small">
            参加婚礼（{{ row.attend_num }}人）
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column label="留言内容">
        <template #default="{ row }">
          {{ row.content }}
        </template>
      </el-table-column>
      <el-table-column label="留言时间" prop="create_time" align="center" />
    </el-table>
    <el-pagination
      background
      :current-page="queryForm.page_no"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="queryForm.page_size"
      :total="listData.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<style scoped lang="scss"></style>
