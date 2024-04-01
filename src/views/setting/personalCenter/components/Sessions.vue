<script lang="ts" setup>
  import { getLoginLog } from '@/api/user.ts'

  const listLoading = ref(false)
  const listData = ref({
    list: [],
    total: 0,
  })
  const queryForm = ref({
    pageNo: 1,
    pageSize: 10,
  })

  const fetchData = () => {
    getLoginLog(queryForm.value).then((res) => {
      listData.value.list = res.data.list
      listData.value.total = res.data.total
    })
  }

  const handleCurrentChange = (val) => {
    queryForm.value.pageNo = val
    fetchData()
  }
  const handleSizeChange = (val) => {
    queryForm.value.pageSize = val
    fetchData()
  }
  const queryData = () => {
    queryForm.value.pageNo = 1
    fetchData()
  }

  onMounted(() => {
    queryData()
  })
</script>

<template>
  <div>
    <el-table v-loading="listLoading" :data="listData.list" border>
      <el-table-column
        :label="$t('personCenter.fieldLoginTime')"
        prop="login_time"
      />
      <el-table-column
        :label="$t('personCenter.fieldBrowser')"
        prop="browser"
      />
      <el-table-column :label="$t('personCenter.fieldIp')" prop="ip" />
      <el-table-column
        :label="$t('personCenter.fieldExpireTime')"
        prop="expire_time"
      />
      <el-table-column :label="$t('personCenter.fieldStatus')">
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" type="success">
            {{ $t('common.valid') }}
          </el-tag>
          <el-tag v-else-if="row.status === 0" type="danger">
            {{ $t('common.expire') }}
          </el-tag>
        </template>
      </el-table-column>
    </el-table>

    <el-pagination
      :current-page="queryForm.pageNo"
      :page-size="queryForm.pageSize"
      :total="listData.total"
      background
      layout="total, sizes, prev, pager, next, jumper"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<style lang="scss" scoped></style>
