<script setup lang="ts">
  import {
    getArticleCateList,
    getArticleDetail,
    getArticleTagList,
    saveArticle,
  } from '@/api/article.ts'
  import Upload from '@/components/Upload/index.vue'

  import { MdEditor } from 'md-editor-v3'
  import 'md-editor-v3/lib/style.css'

  import { uploadFile } from '@/api/system/file.ts'
  import dayjs from 'dayjs'

  const cateOptions = ref([])
  const tagsOptions = ref([])

  const props = defineProps({
    show: {
      type: Boolean,
      default: false,
    },
    data: {
      type: Object as PropType<{
        article_id: number
        cate_id: number | string
        tag_id: Array<number>
        title: string
        title_en: string
        cover_url: string
        cover_url_en: string
        desc: string
        desc_en: string
        content: string
        content_en: string
        secret: string
        scope: number
        status: number
        sort: number
        view_count: number
        publish_time: number
      }>,
      default: () => ({}),
    },
  })

  const emit = defineEmits<{
    (e: 'update:show', value: boolean): void
    (e: 'fetch-data'): void
  }>()

  const formRef = ref(null)
  const form: any = ref({
    article_id: 0,
    cate_id: '',
    tag_id: [],
    title: '',
    title_en: '',
    cover_url: '',
    cover_url_en: '',
    desc: '',
    desc_en: '',
    content: '',
    content_en: '',
    secret: '',
    scope: 0,
    status: 0,
    sort: 100,
    view_count: 0,
    publish_time: '',
  })
  const lang_mode = ref('zh')

  const onUploadImg = async (files, callback) => {
    const res = await Promise.all(
      files.map((file) => {
        return new Promise((rev, rej) => {
          uploadFile({ file: file })
            .then((res) => {
              console.log(res)
              rev(res.data.url)
            })
            .catch((err) => {
              rej(err)
            })
        })
      })
    )
    callback(res.map((url) => url))
  }

  const drawerShow = ref(false)
  const title = ref('')
  watch(
    () => props.show,
    (val) => {
      drawerShow.value = val
      if (val) {
        nextTick(() => {
          if (typeof props.data.article_id === 'undefined') {
            title.value = '新增文章'
            form.value = {
              article_id: 0,
              cate_id: '',
              tag_id: [],
              title: '',
              title_en: '',
              cover_url: '',
              cover_url_en: '',
              desc: '',
              desc_en: '',
              content: '',
              content_en: '',
              secret: '',
              scope: 0,
              status: 0,
              sort: 100,
              view_count: 0,
              publish_time: '',
            }
          } else {
            title.value = '编辑文章'
            onLoadArticle(props.data.article_id)
            // form.value = _.cloneDeep(props.data)
          }
        })
      }
    }
  )

  const rules = ref({
    title: [{ required: true, message: '请输入文章标题', trigger: 'blur' }],
    cate_id: [{ required: true, message: '请选择文章分类', trigger: 'change' }],
    cover_url: [
      { required: true, message: '请上传封面图片', trigger: 'change' },
    ],
    desc: [{ required: true, message: '请输入文章摘要', trigger: 'blur' }],
    content: [{ required: true, message: '请输入文章内容', trigger: 'blur' }],
    sort: [{ required: true, message: '请输入排序', trigger: 'blur' }],
    view_count: [{ required: true, message: '请输入阅读数', trigger: 'blur' }],
  })

  const onSave = () => {
    formRef.value.validate((valid) => {
      if (!valid) {
        return
      }
      const params: any = {
        cate_id: form.value.cate_id,
        title: form.value.title,
        title_en: form.value.title_en,
        cover_url: form.value.cover_url,
        cover_url_en: form.value.cover_url_en,
        desc: form.value.desc,
        desc_en: form.value.desc_en,
        content: form.value.content,
        content_en: form.value.content_en,
        secret: form.value.secret,
        scope: form.value.scope,
        status: form.value.status,
        sort: form.value.sort,
        view_count: form.value.view_count,
        publish_time: form.value.publish_time,
      }

      if (params.publish_time) {
        params.publish_time = dayjs(params.publish_time).unix()
      }
      if (form.value.tag_id && form.value.tag_id.length > 0) {
        params.tag_id = form.value.tag_id.join(',')
      }
      if (form.value.article_id) {
        params.article_id = form.value.article_id
      }
      console.log('保存', params)
      saveArticle(params).then(() => {
        emit('fetch-data')
        onClose()
      })
    })
  }

  const onClose = () => {
    drawerShow.value = false
    emit('update:show', false)
    form.value = {
      article_id: 0,
      cate_id: '',
      type: 1,
      title: '',
      cover_url: '',
      desc: '',
      content: '',
      sort: 100,
      view_num: 0,
      status: 0,
    }
  }

  const onLoadOptions = () => {
    getArticleCateList().then((res) => {
      cateOptions.value = res.data
    })
    getArticleTagList().then((res) => {
      tagsOptions.value = res.data
    })
  }

  const onLoadArticle = (articleId: number) => {
    getArticleDetail(articleId).then((res) => {
      form.value = {
        article_id: res.data.article_id,
        cate_id: res.data.cate_id,
        tag_id: res.data.tag.map((item) => item.tag_id),
        title: res.data.title,
        title_en: res.data.title_en,
        cover_url: res.data.cover_url,
        cover_url_en: res.data.cover_url_en,
        desc: res.data.desc,
        desc_en: res.data.desc_en,
        content: res.data.content,
        content_en: res.data.content_en,
        secret: res.data.secret,
        scope: res.data.scope,
        status: res.data.status,
        sort: res.data.sort,
        view_count: res.data.view_count,
        // res.data.publish_time 为YYYY/MM/DD字符串
        publish_time: res.data.publish_time
          ? dayjs(res.data.publish_time).toDate()
          : '',
      }
    })
  }

  onMounted(() => {
    onLoadOptions()
  })
  onBeforeUnmount(() => {})
</script>

<template>
  <el-drawer
    v-model="drawerShow"
    direction="rtl"
    :title="title"
    :close-on-click-modal="false"
    :close-on-press-escape="false"
    size="100%"
    @close="onClose"
  >
    <template #default>
      <el-form ref="formRef" label-width="180px" :model="form" :rules="rules">
        <el-form-item label="语言">
          <el-radio-group v-model="lang_mode">
            <el-radio-button value="zh">中文</el-radio-button>
            <el-radio-button value="en">英文</el-radio-button>
          </el-radio-group>
        </el-form-item>
        <el-form-item v-show="lang_mode === 'zh'" label="标题" prop="title">
          <el-input v-model="form.title" clearable />
        </el-form-item>
        <el-form-item
          v-show="lang_mode === 'en'"
          label="标题(英文)"
          prop="title_en"
        >
          <el-input v-model="form.title_en" clearable />
        </el-form-item>
        <div class="editor-container">
          <div v-show="lang_mode === 'zh'">
            <div class="mb-2">文章内容</div>
            <MdEditor v-model="form.content" @on-upload-img="onUploadImg" />
          </div>
          <div v-show="lang_mode === 'en'">
            <div class="mb-2">文章内容(英文)</div>
            <MdEditor v-model="form.content_en" @on-upload-img="onUploadImg" />
          </div>
        </div>

        <el-form-item label="文章分类" prop="cate_id">
          <el-select v-model="form.cate_id" clearable placeholder="请选择">
            <el-option
              v-for="item in cateOptions"
              :key="item.cate_id"
              :label="item.cate_name"
              :value="item.cate_id"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="文章标签" prop="tag_id">
          <el-select
            v-model="form.tag_id"
            clearable
            placeholder="请选择"
            multiple
          >
            <el-option
              v-for="item in tagsOptions"
              :key="item.tag_id"
              :label="item.tag_name"
              :value="item.tag_id"
            />
          </el-select>
        </el-form-item>

        <el-divider />

        <el-form-item
          v-show="lang_mode === 'zh'"
          label="封面图片"
          prop="cover_url"
        >
          <div class="flex flex-col">
            <Upload v-model="form.cover_url" :limit="1" />
            <el-input v-model="form.cover_url" clearable />
            <div class="text-sm text-gray-500">
              封面图片2.35:1 建议705px * 300px
            </div>
          </div>
        </el-form-item>

        <el-form-item
          v-show="lang_mode === 'en'"
          label="封面图片(英文)"
          prop="cover_url_en"
        >
          <div class="flex flex-col">
            <Upload v-model="form.cover_url_en" :limit="1" />
            <el-input v-model="form.cover_url_en" clearable />
            <div class="text-sm text-gray-500">
              封面图片2.35:1 建议705px * 300px
            </div>
          </div>
        </el-form-item>
        <el-form-item v-show="lang_mode === 'zh'" label="文章摘要" prop="desc">
          <el-input v-model="form.desc" type="textarea" clearable />
        </el-form-item>
        <el-form-item
          v-show="lang_mode === 'en'"
          label="文章摘要(英文)"
          prop="desc_en"
        >
          <el-input v-model="form.desc_en" type="textarea" clearable />
        </el-form-item>

        <el-divider />

        <el-form-item label="文章秘钥" prop="secret">
          <el-input v-model="form.secret" clearable />
        </el-form-item>

        <el-form-item label="可见范围" prop="scope">
          <el-radio-group v-model="form.scope">
            <el-radio :label="0">仅自己可见</el-radio>
            <el-radio :label="1">全部可见</el-radio>
          </el-radio-group>
        </el-form-item>

        <el-form-item label="发布时间" prop="publish_time">
          <el-date-picker
            v-model="form.publish_time"
            type="datetime"
            format="YYYY/MM/DD"
            placeholder="选择发布时间"
          />
        </el-form-item>
        <el-form-item label="阅读数" prop="view_count">
          <el-input-number
            v-model="form.view_count"
            controls-position="right"
          />
        </el-form-item>
        <el-form-item :label="$t('adminRule.sort')" prop="sort">
          <el-input-number v-model="form.sort" controls-position="right" />
        </el-form-item>
        <el-form-item :label="$t('personCenter.fieldStatus')" prop="status">
          <el-switch
            v-model="form.status"
            :active-value="1"
            :inactive-value="0"
          />
        </el-form-item>
      </el-form>
    </template>
    <template #footer>
      <el-button type="primary" @click="onSave">
        {{ $t('common.save') }}
      </el-button>
      <el-button @click="onClose">{{ $t('common.cancel') }}</el-button>
    </template>
  </el-drawer>
</template>

<style scoped lang="scss">
  .editor-container {
    padding: 10px !important;
    margin-bottom: 10px;
    overflow: hidden !important;
    background: $base-color-background !important;

    &.w-e-full-screen-container {
      z-index: 9999 !important;
    }

    [classname='w-e-toolbar-init'] {
      border-bottom: 1px solid #e8e8e8 !important;
    }

    .wang-editor-content {
      width: 100%;
      height: 500px !important;
      padding: 0 40px;
      margin: 20px auto;
      background-color: #fff;
      border: 0;
    }

    .wang-editor-footer {
      width: 70%;
      margin: auto;
    }

    @media (width <= 576px) {
      .wang-editor-title,
      .wang-editor-content,
      .wang-editor-footer {
        width: 90%;
      }
    }
  }
</style>
