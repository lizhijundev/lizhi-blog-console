<template>
  <div class="wang-editor-container">
    <!--
    重要提示：
    截至2022年1月15日，wangEditor-5 beta版本目前无法直接初始化html数据，仅能初始化chidren节点数据接口，
    这意味着数据库需要分别保存html与content，如果有编辑回显功能时，您可能需要增加大量额外工作量来处理回显
    介意者请勿使用，详见：https://www.wangeditor.com/v5/guide/getting-started.html#content-%E5%88%9D%E5%A7%8B%E5%8C%96%E5%86%85%E5%AE%B9 -->
    <Toolbar
      :editor="editorRef"
      :mode="mode"
      style="border-bottom: 1px solid #e8e8e8"
    />
    <Editor
      class="wang-editor-content"
      :default-config="editorConfig"
      :default-content="defaultContent"
      :default-html="defaultHtml"
      :mode="mode"
      style="height: 300px"
      @on-change="handleChange"
      @on-created="handleCreated"
    />
    <div class="wang-editor-footer">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>

<script lang="ts">
  import { IDomEditor } from '@wangeditor/editor'
  import { Editor, Toolbar } from '@wangeditor/editor-for-vue'

  export default defineComponent({
    name: 'WangEditor',
    components: { Editor, Toolbar },
    setup() {
      const $baseMessage: any = inject('$baseMessage')
      const flag = ref(false)
      const mode = 'default'
      const editorRef = shallowRef<IDomEditor | undefined>(undefined)
      const defaultContent = ref([
        {
          type: 'header1',
          children: [
            {
              text: '一级标题',
            },
          ],
        },
        {
          type: 'header2',
          children: [
            {
              text: '二级标题',
            },
          ],
        },
        {
          type: 'header3',
          children: [
            {
              text: '三级标题',
            },
          ],
        },
        {
          type: 'paragraph',
          children: [{ text: 'hello world ~~~ ' }],
        },
        {
          type: 'blockquote',
          children: [{ text: 'blockquote' }],
        },
        {
          type: 'pre',
          children: [
            {
              type: 'code',
              language: 'javascript',
              children: [{ text: 'const a = 100;' }],
            },
          ],
        },
        {
          type: 'paragraph',
          children: [
            {
              type: 'image',
              src:
                'https://cdn.jsdelivr.net/gh/' +
                'chuzh' +
                'ixin/image' +
                '/table/vab-image-1.jpg',
              children: [{ text: '' }],
            },
          ],
        },
      ])
      const defaultHtml = ''
      const editorConfig = {
        placeholder: '请输入内容...',
        MENU_CONF: {},
      }

      const handleCreated = (editor: IDomEditor) => {
        editorRef.value = editor
      }
      const handleChange = (editor: IDomEditor) => {
        console.log('change:', editor.getText())
      }
      const handlePaste = (
        editor: IDomEditor,
        event: ClipboardEvent,
        callback: (val: boolean) => void
      ) => {
        editor.insertText('test')
        callback(false)
      }
      const handleCreateEditor = () => {
        flag.value = !flag.value
      }
      onBeforeUnmount(() => {
        const editor = editorRef.value
        if (editor == null) return
        editor.destroy()
      })

      const onSubmit = () => {
        $baseMessage('模拟保存成功', 'success', 'vab-hey-message-success')
      }

      return {
        flag,
        editorRef,
        mode,
        defaultHtml,
        defaultContent,
        editorConfig,
        handleCreated,
        handleChange,
        handlePaste,
        handleCreateEditor,
        onSubmit,
      }
    },
  })
</script>

<style src="@wangeditor/editor/dist/css/style.css"></style>
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
