<template>
  <div class="iframe-search-container">
    <el-row :gutter="20">
      <el-col
        :lg="{ span: 12, offset: 6 }"
        :md="{ span: 20, offset: 2 }"
        :sm="{ span: 20, offset: 2 }"
        :xl="{ span: 12, offset: 6 }"
        :xs="24"
      >
        <el-form
          ref="formRef"
          label-position="top"
          label-width="100px"
          :model="form"
          :rules="rules"
          @submit.prevent
        >
          <el-form-item label="请输入跳转url" prop="url">
            <el-input v-model="form.url" />
          </el-form-item>
          <el-form-item label="请输入跳转后自动改名的Title" prop="title">
            <el-input v-model="form.title" />
          </el-form-item>
          <el-button
            :icon="Search"
            native-type="submit"
            type="primary"
            @click="handleClick"
          >
            查询
          </el-button>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { isExternal } from '@/utils/validate'
  import { Search } from '@element-plus/icons-vue'

  export default defineComponent({
    name: 'IframeSearch',
    setup() {
      const router = useRouter()
      const validateExternal = (rule, value, callback) => {
        if (!isExternal(value)) callback(new Error('url输入错误'))
        else callback()
      }
      const state = reactive({
        formRef: null,
        rules: {
          url: [
            {
              required: true,
              message: '请输入跳转url',
              trigger: 'blur',
              validator: validateExternal,
            },
          ],
          title: [
            {
              required: true,
              message: '请输入跳转后自动改名的Title',
              trigger: 'blur',
            },
          ],
        },
        form: {
          url: 'https://www.so.com/s?ie=utf-8&fr=none&src=home_suggst_revise&q=vue-admin-beautiful&eci=&nlpv=test_zc_rank1',
          title: '360搜索',
        },
      })

      const handleClick = () => {
        state['formRef'].validate((valid) => {
          if (valid) {
            router.push({
              path: '/other/iframe/view',
              query: state.form,
            })
          }
        })
      }

      return {
        ...toRefs(state),
        handleClick,
        Search,
      }
    },
  })
</script>
