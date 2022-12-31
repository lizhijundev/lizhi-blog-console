<template>
  <div class="print-container">
    <el-button type="primary" @click="print('imageRef')">
      <vab-icon icon="printer-line" />
      打印图片
    </el-button>
    <el-button type="primary" @click="print('tableRef')">
      <vab-icon icon="printer-line" />
      打印表格
    </el-button>
    <el-button type="primary" @click="remotePrint">
      <vab-icon icon="printer-line" />
      自定义打印
    </el-button>
    <img
      ref="imageRef"
      :src="
        'https://fastly.jsdelivr.net/gh/' +
        'chuzh' +
        'ixin/image' +
        '/table/vab-im' +
        'age-1.jpg'
      "
      style="display: block; width: 520px; margin-top: 15px"
    />
    <br />
    <el-table ref="tableRef" :data="tableData" style="width: 520px">
      <el-table-column label="姓名" prop="name" width="120px" />
      <el-table-column label="地址" prop="address" />
    </el-table>
  </div>
</template>

<script>
  import VabPrint from '@/plugins/VabPrint'

  export default defineComponent({
    name: 'Print',
    setup() {
      const state = reactive({
        imageRef: null,
        tableRef: null,
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
      })

      const print = async (val) => {
        await VabPrint(state[val])
      }
      const remotePrint = () => {
        ElMessageBox.prompt('', '自定义打印', {
          inputType: 'textarea',
          inputValue: `<h1>Vue Admin Plus</h1>
<p>vue-admin-beautiful.com</p>`,
          inputErrorMessage: 'Invalid Email',
          confirmButtonText: '打印',
        })
          .then(({ value }) => {
            VabPrint(value)
          })
          .catch(() => {})
      }

      return {
        ...toRefs(state),
        print,
        remotePrint,
      }
    },
  })
</script>
