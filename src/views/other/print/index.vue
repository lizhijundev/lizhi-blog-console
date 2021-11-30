<template>
  <div ref="print-container" class="print-container">
    <el-button type="primary" @click="print('vab-print-image')">
      <vab-icon icon="printer-line" />
      打印图片
    </el-button>
    <el-button type="primary" @click="print('vab-print-table')">
      <vab-icon icon="printer-line" />
      打印表格
    </el-button>
    <img
      ref="vab-print-image"
      src="https://gitee.com/chu1204505056/image/raw/master/table/vab-image-1.jpg"
      style="display: block; width: 520px; margin-top: 15px"
    />
    <br />
    <el-table ref="vab-print-table" :data="tableData" style="width: 520px">
      <el-table-column label="姓名" prop="name" width="120px" />
      <el-table-column label="地址" prop="address" />
    </el-table>
  </div>
</template>

<script>
  import { defineComponent } from 'vue'
  import VabPrint from '@/extra/VabPrint'

  export default defineComponent({
    name: 'Print',
    data() {
      return {
        tableData: [
          {
            name: '马云',
            address: '上海市普陀区金沙江路',
          },
          {
            name: '马化腾',
            address: '上海市普陀区金沙江路',
          },
          {
            name: '李彦宏',
            address: '上海市普陀区金沙江路',
          },
          {
            name: '刘强东',
            address: '上海市普陀区金沙江路',
          },
        ],
      }
    },
    methods: {
      async print(val) {
        await VabPrint(this.$refs[val])
      },
    },
  })
</script>
