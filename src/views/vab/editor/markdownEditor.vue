<template>
  <div class="markdown-editor-container">
    <el-row :gutter="20">
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <vab-markdown-editor
          ref="mde"
          v-model="value"
          @show-html="handleShowHtml"
        />
        <el-button @click="handleAddText">增加文本</el-button>
        <el-button @click="handleAddImg">增加图片</el-button>
      </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <el-card shadow="hover">
          <template #header>
            <span>markdown转换html实时演示区域</span>
          </template>
          <div v-html="html" />
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import VabMarkdownEditor from '@/extra/VabMarkdownEditor'

  export default {
    name: 'MarkdownEditor',
    components: { VabMarkdownEditor },
    data() {
      return {
        value: '## admin-plus is a great enterprise front-end framework',
        html: '<h2>admin-plus is a great enterprise front-end framework</h2>',
      }
    },
    methods: {
      handleAddText() {
        this.$refs.mde.add('\n### 新增加的内容')
      },
      handleAddImg() {
        this.$refs.mde.add(
          '\n![](https://gitee.com/chu1204505056/image/raw/master/ewm.png)'
        )
      },
      handleShowHtml(html) {
        this.html = html
      },
    },
  }
</script>
