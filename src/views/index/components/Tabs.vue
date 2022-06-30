<template>
  <div class="tabs">
    <vab-card class="tabs-card" shadow="hover">
      <el-tabs v-model="activeName">
        <el-tab-pane label="配送管理" name="first">
          <el-table :data="tableData" height="280">
            <el-table-column label="日期" prop="date" />
            <el-table-column label="配送信息">
              <el-table-column label="姓名" prop="name" />
              <el-table-column label="省份" prop="province" />
              <el-table-column label="市区" prop="city" />
              <el-table-column label="地址" prop="address" />
              <el-table-column label="邮编" prop="zip" />
            </el-table-column>
            <template #empty>
              <el-empty class="vab-data-empty" description="暂无数据" />
            </template>
          </el-table>
        </el-tab-pane>
        <el-tab-pane label="区域管理" name="second">
          <el-table :data="tableData" height="280">
            <el-table-column label="日期" prop="date" />
            <el-table-column label="区域信息">
              <el-table-column label="姓名" prop="name" />
              <el-table-column label="省份" prop="province" />
              <el-table-column label="市区" prop="city" />
              <el-table-column label="地址" prop="address" />
              <el-table-column label="邮编" prop="zip" />
            </el-table-column>
            <template #empty>
              <el-empty class="vab-data-empty" description="暂无数据" />
            </template>
          </el-table>
        </el-tab-pane>
      </el-tabs>
    </vab-card>
  </div>
</template>

<script>
  export default defineComponent({
    data() {
      return {
        activeName: 'first',
        tableData: [
          {
            date: '2016-05-03',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-02',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-04',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-01',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-08',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-06',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
          {
            date: '2016-05-07',
            name: '王小虎',
            province: '上海',
            city: '普陀区',
            address: '上海市普陀区金沙江路 1518 弄',
            zip: 200333,
          },
        ],
      }
    },
  })
</script>

<style lang="scss" scoped>
  :deep() {
    .el-card {
      height: 383px !important;
    }
  }
</style>
