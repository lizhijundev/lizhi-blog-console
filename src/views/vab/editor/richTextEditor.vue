<template>
  <div class="rich-text-editor-container">
    <el-form ref="formRef" label-width="100px" :model="form" :rules="rules">
      <el-form-item label="标题" prop="title">
        <el-input v-model="form.title" v-focus maxlength="20" />
      </el-form-item>
      <el-form-item label="所属模块" prop="module">
        <el-select v-model="form.module">
          <el-option label="新闻动态" value="1" />
          <el-option label="实时热点" value="2" />
        </el-select>
      </el-form-item>
      <el-form-item class="vab-quill-content" label="内容" prop="content">
        <vab-quill
          v-model="form.content"
          :min-height="400"
          :options="options"
        />
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handleAddImg">
          模拟在富文本编辑器添加上传到文件服务器的图片url
        </el-button>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" @click="handlePreview">预览效果</el-button>
        <el-button type="primary" @click="handleSave">保存</el-button>
      </el-form-item>
    </el-form>
    <el-dialog v-model="dialogTableVisible" title="预览效果">
      <h1 class="news-title">{{ form.title }}</h1>
      <div class="news-content" v-html="form.content" />
    </el-dialog>
    <vab-upload
      ref="vabUploadRef"
      :limit="50"
      name="file"
      :size="2"
      url="/upload"
    />
  </div>
</template>

<script>
  import VabQuill from '@/plugins/VabQuill'
  import VabUpload from '@/plugins/VabUpload'

  export default defineComponent({
    name: 'RichTextEditor',
    components: { VabQuill, VabUpload },
    directives: {
      focus: {
        mounted(el) {
          setTimeout(() => {
            el.querySelector('input').focus()
          }, 500)
        },
      },
    },
    setup() {
      const $baseConfirm = inject('$baseConfirm')
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        formRef: null,
        vabUploadRef: null,
        borderColor: '#dcdfe6',
        dialogTableVisible: false,
        form: {
          title: '',
          module: '',
          content: '',
        },
        rules: {
          title: [
            {
              required: true,
              message: '请输入标题',
              trigger: 'blur',
            },
          ],
          module: [
            {
              required: true,
              message: '请选择模块',
              trigger: 'change',
            },
          ],
          content: [
            {
              required: true,
              message: '请输入内容',
              trigger: 'blur',
            },
          ],
        },
        options: {
          theme: 'snow',
          bounds: document.body,
          debug: 'warn',
          modules: {
            toolbar: {
              container: [
                ['bold', 'italic', 'underline', 'strike'],
                [{ header: [1, 2, 3, 4, 5, 6, false] }],
                [{ size: ['small', false, 'large', 'huge'] }],
                [{ color: [] }, { background: [] }],
                ['blockquote', 'code-block'],
                [{ list: 'ordered' }, { list: 'bullet' }],
                [{ script: 'sub' }, { script: 'super' }],
                [{ indent: '-1' }, { indent: '+1' }],
                [{ align: [] }],
                [{ direction: 'rtl' }],
                [{ font: [] }],
                ['clean'],
                ['link', 'image', 'vab-upload-image'],
              ],
              handlers: {
                'vab-upload-image': () => {
                  $baseConfirm(
                    '演示环境未使用真实文件服务器，故图片上传回显不会生效，开发时请修改为正式文件服务器地址',
                    '温馨提示',
                    () => {
                      state['vabUploadRef'].handleShow()
                    },
                    () => {
                      handleAddImg()
                    },
                    '模拟打开文件上传',
                    '模拟添加一张文件服务器图片'
                  )
                },
              },
            },
          },
          placeholder: '内容...',
          readOnly: false,
        },
      })

      const handlePreview = () => {
        state['formRef'].validate((valid) => {
          state['formRef'].validateField('content', () => {})
          if (valid) {
            state.dialogTableVisible = true
          }
        })
      }
      const handleSave = () => {
        state['formRef'].validate((valid) => {
          state['formRef'].validateField('content', (errorMsg) => {
            state.borderColor = '#dcdfe6'
            if (errorMsg) {
              state.borderColor = '#F56C6C'
            }
          })
          if (valid) {
            $baseMessage('submit!', 'success', 'vab-hey-message-success')
          }
        })
      }
      const handleAddImg = () => {
        state.form.content +=
          '<img src="https://cdn.jsdelivr.net/gh/chuzhixin/image/ewm.png" />'
      }

      return {
        ...toRefs(state),
        handlePreview,
        handleSave,
        handleAddImg,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .rich-text-editor-container {
    .news {
      &-title {
        text-align: center;
      }

      &-content {
        :deep() {
          p {
            line-height: 30px;

            img {
              display: block;
              margin-right: auto;
              margin-left: auto;
            }
          }
        }
      }
    }

    .vab-quill-content {
      :deep() {
        .el-form-item__content {
          line-height: normal;
        }
      }
    }

    :deep() {
      .vab-quill {
        .ql-vab-upload-image {
          font-family: 'remixicon', sans-serif !important;
          font-size: 16px;
          font-weight: 580;

          &:before {
            content: '\ee46';
          }
        }
      }
    }
  }
</style>
