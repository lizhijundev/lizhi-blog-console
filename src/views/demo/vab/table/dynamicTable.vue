<template>
  <div class="dynamic-table-container">
    <el-form ref="formRef" :model="form">
      <el-form-item :label-width="0" prop="list">
        <vab-form-table
          v-model="form.list"
          drag
          :row-template="rowTemplate"
          style="width: 100%"
        >
          <el-table-column align="center" label="标题" prop="title">
            <template #default="{ row }">
              <el-input v-model="row.title" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="作者" prop="author">
            <template #default="{ row }">
              <el-input v-model="row.author" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="评级" prop="rate">
            <template #default="{ row }">
              <el-rate v-model="row.rate" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="点击量" prop="pageViews">
            <template #default="{ row }">
              <el-input-number v-model="row.pageViews" type="number" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="时间" prop="datetime">
            <template #default="{ row }">
              <el-date-picker v-model="row.datetime" />
            </template>
          </el-table-column>
          <el-table-column align="center" label="类型" prop="type">
            <template #default="{ row }">
              <el-select v-model="row.type" placeholder="请选择">
                <el-option
                  v-for="item in typeDic"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                />
              </el-select>
            </template>
          </el-table-column>
          <el-table-column align="center" label="开关" prop="switch" width="80">
            <template #default="{ row }">
              <el-switch v-model="row.switch" />
            </template>
          </el-table-column>
        </vab-form-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="save">保存</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import { Delete, Plus, Search } from '@element-plus/icons-vue'
  import VabFormTable from '@/plugins/VabFormTable'
  import { doEdit, getList } from '@/api/table'

  export default defineComponent({
    name: 'DynamicTable',
    components: { VabFormTable },
    setup() {
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        formRef: null,
        rowTemplate: {
          title: '',
          author: '',
          rate: 0,
          pageViews: 0,
          dateTime: '',
          type: 1,
        },
        form: {
          list: [],
        },
        typeDic: [
          {
            label: '热点',
            value: 0,
          },
          {
            label: '头条',
            value: 1,
          },
        ],
      })

      const save = () => {
        state.formRef.validate(async (valid) => {
          if (valid) {
            const { msg } = await doEdit(state.form)
            $baseMessage(msg, 'success', 'vab-hey-message-success')
          } else {
            return false
          }
        })
      }

      const fetchData = async () => {
        const {
          data: { list },
        } = await getList({
          pageSize: 5,
          pageNo: 1,
        })
        state.form.list = list
      }
      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
        save,
        Delete,
        Plus,
        Search,
      }
    },
  })
</script>
