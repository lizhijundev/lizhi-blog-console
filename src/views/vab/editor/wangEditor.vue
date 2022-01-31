<template>
  <div class="wang-editor-container">
    <!--
    重要提示：
    截至2022年1月15日，wangEditor-5 beta版本目前无法直接初始化html数据，仅能初始化chidren节点数据接口，
    这意味着数据库需要分别保存html与content，如果有编辑回显功能时，您可能需要增加大量额外工作量来处理回显
    介意者请勿使用，详见：https://www.wangeditor.com/v5/guide/getting-started.html#content-%E5%88%9D%E5%A7%8B%E5%8C%96%E5%86%85%E5%AE%B9 -->
    <Toolbar
      :default-config="toolbarConfig"
      :editor-id="editorId"
      :mode="mode"
      style="border-bottom: 1px solid #ccc"
    />
    <div class="wang-editor-title">
      <el-input v-model="form.title" placeholder="请输入标题" />
      <hr />
    </div>
    <Editor
      class="wang-editor-content"
      :default-config="editorConfig"
      :default-content="getDefaultContent"
      :editor-id="editorId"
      :mode="mode"
      @on-change="onChange"
      @on-created="onCreate"
    />
    <div class="wang-editor-footer">
      <el-button type="primary" @click="onSubmit">保存</el-button>
    </div>
  </div>
</template>

<script>
  import {
    Editor,
    Toolbar,
    getEditor,
    removeEditor,
  } from '@wangeditor/editor-for-vue'
  import _ from 'lodash'

  export default defineComponent({
    name: 'WangEditor',
    components: { Editor, Toolbar },
    setup() {
      const $baseMessage = inject('$baseMessage')

      const editorId = `w-e-${Math.random().toString().slice(-5)}`
      const state = reactive({
        form: {
          title: '',
          content: '',
          html: '',
        },
      })

      const defaultContent = [
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
              src: 'https://gitee.com/chu1204505056/image/raw/master/table/vab-image-1.jpg',
              children: [{ text: '' }],
            },
          ],
        },
      ]
      const getDefaultContent = computed(() => _.cloneDeep(defaultContent))

      const toolbarConfig = {}
      const editorConfig = { placeholder: '请输入内容' }

      //   onMounted(() => {
      //   const content =
      //     '<p><span><br></span></p><pre><code class="language-html"><span>&lt;a href="https://baidu.com"&gt;baidu&lt;/a&gt;</span></code></pre><table style=""><tbody><tr><th colspan="1" rowspan="1" style="text-align: center;"><span>1</span></th><th colspan="1" rowspan="1" style="text-align: center;"><span>2</span></th><th colspan="1" rowspan="1" style="text-align: center;"><span>3</span></th><th colspan="1" rowspan="1" style="text-align: center;"><span>4</span></th><th colspan="1" rowspan="1" style="text-align: center;"><span>5</span></th></tr><tr><td colspan="1" rowspan="1" style="text-align: center;"><span>1</span></td><td colSpan="1" rowSpan="1"><span><br></span><img src="https://gitee.com/chu1204505056/image/raw/master/table/vab-image-1.jpg" alt="" data-href="" style="width: 113.00px;height: 70.63px;"/><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td></tr><tr><td colspan="1" rowspan="1" style="text-align: center;"><span>2</span></td><td colspan="1" rowspan="1" style="text-align: center;"><span>😀😀😀</span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td></tr><tr><td colspan="1" rowspan="1" style="text-align: center;"><span>3</span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td></tr><tr><td colspan="1" rowspan="1" style="text-align: center;"><span>4</span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td></tr><tr><td colspan="1" rowspan="1" style="text-align: center;"><span>5</span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td><td colspan="1" rowspan="1" style="text-align: center;"><span><br></span></td></tr></tbody></table><p><span><br></span></p><p><span><br></span></p>'
      // })

      const onChange = (editor) => {
        state.form.content = editor.children
        state.form.html = editor.getHtml()
      }
      const onSubmit = () => {
        if (!state.form.title || !state.form.content || !state.form.html)
          $baseMessage('标题或内容不能为空', 'error', 'vab-hey-message-error')
        else $baseMessage('模拟保存成功', 'success', 'vab-hey-message-success')
      }

      onUnmounted(() => {
        const editor = getEditor(editorId)
        if (editor == null) return

        editor.destroy()
        removeEditor(editorId)
      })

      return {
        ...toRefs(state),
        editorId,
        mode: 'default',
        getDefaultContent,
        onChange,
        onSubmit,
        toolbarConfig,
        editorConfig,
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

    .wang-editor-title {
      width: 70%;
      padding: 40px 40px 0 40px;
      margin: 20px auto 0px auto;
      background-color: #fff;
      border: 0;

      input {
        width: 100%;
        margin-bottom: 10px;
        font-size: 30px;
        line-height: 1;
        border: 0;
        outline: none;
      }

      hr {
        height: 1px;
        background-color: #e8e8e8;
        border: none;
      }
    }

    .wang-editor-content {
      width: 70%;
      height: 500px !important;
      padding: 0px 40px 0 40px;
      margin: -7px auto 20px auto;
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
