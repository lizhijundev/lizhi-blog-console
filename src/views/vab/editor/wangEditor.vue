<template>
  <div class="wang-editor-container">
    <Toolbar :editor="editorRef" style="border-bottom: 1px solid #e8e8e8" />
    <Editor
      v-model="html"
      class="wang-editor-content"
      :default-config="editorConfig"
      style="height: 300px"
      @on-created="handleCreated"
    />
    <div class="wang-editor-footer">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
  import '@wangeditor/editor/dist/css/style.css'
  import { IDomEditor } from '@wangeditor/editor'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

  export default defineComponent({
    name: 'WangEditor',
    components: { Editor, Toolbar },
    setup() {
      const $baseMessage: any = inject('$baseMessage')
      const $baseAlert: any = inject('$baseAlert')
      const editorRef = shallowRef<IDomEditor | undefined>(undefined)
      const html = ref(
        '<h1>一级标题</h1><h2>二级标题</h2><h3>三级标题</h3><p>hello world ~~~ </p><blockquote>blockquote</blockquote><pre><code class="language-javascript">const a = 100;</code></pre><p><img src="https://fastly.jsdelivr.net/gh/chuzhixin/image/table/vab-image-1.jpg" alt="" data-href="" style=""/></p>'
      )
      const editorConfig = ref({
        placeholder: '请输入内容...',
        MENU_CONF: {
          uploadImage: {
            server: '', // 你的服务器地址，注意：当前接口格式特殊与其他vab接口不同，请查看vip文档
            fieldName: 'vab-file-name',
            allowedFileTypes: ['image/*'],
            headers: {}, // 如需传递token请写到在这里
          },
        },
      })

      const handleCreated = (editor: IDomEditor) => {
        editorRef.value = editor
      }
      onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
      })

      const onSubmit = () => {
        $baseAlert(html.value)
        $baseMessage('模拟保存成功', 'success', 'vab-hey-message-success')
      }

      return {
        editorRef,
        html,
        editorConfig,
        handleCreated,
        onSubmit,
      }
    },
  })
</script>

<style lang="scss">
  .wang-editor-container {
    padding: 0 !important;
    margin: -19px -19px 19px -19px;
    overflow: hidden !important;
    background: $base-color-background !important;

    &.w-e-full-screen-container {
      z-index: 9999 !important;
    }

    [classname='w-e-toolbar-init'] {
      border-bottom: 1px solid #e8e8e8 !important;
    }

    .wang-editor-content {
      width: 70%;
      height: 500px !important;
      padding: 0px 40px 0 40px;
      margin: 20px auto 20px auto;
      background-color: #fff;
      border: 0;
    }

    .wang-editor-footer {
      width: 70%;
      margin: auto;
    }

    @media (max-width: 576px) {
      .wang-editor-title,
      .wang-editor-content,
      .wang-editor-footer {
        width: 90%;
      }
    }
  }
</style>
