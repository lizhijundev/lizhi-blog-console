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
      style="display: block; width: 520px"
      src="https://gitee.com/chu1204505056/image/raw/master/fapiao.png"
    />
    <br />
    <el-table ref="vab-print-table" :data="tableData" style="width: 520px">
      <el-table-column prop="name" label="姓名" width="120px" />
      <el-table-column prop="address" label="地址" />
    </el-table>
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  import VabPrint from '@/extra/VabPrint'

  export default {
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
      ...mapActions({
        openSideBar: 'settings/openSideBar',
        foldSideBar: 'settings/foldSideBar',
      }),
      async print(val) {
        await this.foldSideBar()
        await VabPrint(this.$refs[val])
        await this.openSideBar()
      },
    },
  }
</script>
