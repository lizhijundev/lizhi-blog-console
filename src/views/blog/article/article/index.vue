<script setup lang="ts">
  import { Plus, Search } from '@element-plus/icons-vue'
  import ArticleEditor from './components/ArticleEditor.vue'
  import {
    deleteArticle,
    getArticleCateList,
    getArticleList,
    getArticleTagList,
  } from '@/api/article.ts'
  import _ from 'lodash'

  const { t } = useI18n()
  const $baseMessage = inject('$baseMessage')
  const queryForm = ref({
    page_no: 1,
    page_size: 10,
    cate_id: '',
    tag_id: [],
    title: '',
    status: '',
  })

  const cateOptions = ref([])
  const tagsOptions = ref([])

  const listData = ref({
    listLoading: false,
    total: 0,
    list: [],
  })
  const detail = reactive({
    show: false,
    data: {} as PropType<{
      article_id: number
      cate_id: number | string
      type: number
      title: string
      cover_url: string
      desc: string
      content: string
      sort: number
      view_num: number
      status: number
    }>,
  })

  const handleSizeChange = (val: any) => {
    queryForm.value.page_size = val
    fetchData()
  }
  const handleCurrentChange = (val: any) => {
    queryForm.value.page_no = val
    fetchData()
  }
  const queryData = () => {
    queryForm.value.page_no = 1
    fetchData()
  }
  const fetchData = async () => {
    listData.value.listLoading = true
    const params = _.cloneDeep(queryForm.value)
    if (params.cate_id && params.cate_id.length > 0) {
      params.cate_id = params.cate_id[params.cate_id.length - 1]
    }
    const {
      data: { list, total },
    } = await getArticleList(params)
    listData.value.list = list
    listData.value.total = total
    listData.value.listLoading = false
  }

  const handleEdit = (row: any) => {
    detail.show = true
    detail.data = row
  }
  const handleDelete = (row) => {
    deleteArticle(row.article_id).then(() => {
      $baseMessage(t('common.opSuccess'), 'success', 'vab-hey-message-success')
      fetchData()
    })
  }

  const onLoadOptions = () => {
    getArticleCateList().then((res) => {
      cateOptions.value = res.data
    })
    getArticleTagList().then((res) => {
      tagsOptions.value = res.data
    })
  }

  onMounted(() => {
    fetchData()
    onLoadOptions()
  })
</script>

<template>
  <div class="article-container">
    <el-form class="lizhi-form" inline :model="queryForm" @submit.prevent>
      <el-row>
        <el-col :span="6">
          <el-form-item label="文章标题">
            <el-input v-model.trim="queryForm.title" clearable />
          </el-form-item>
        </el-col>
        <el-col :span="6">
          <el-form-item label="文章分类">
            <el-select
              v-model="queryForm.cate_id"
              clearable
              placeholder="请选择"
            >
              <el-option
                v-for="item in cateOptions"
                :key="item.cate_id"
                :label="item.cate_name"
                :value="item.cate_id"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <!--        <el-col :span="6">-->
        <!--          <el-form-item label="文章标签">-->
        <!--            <el-select-->
        <!--              v-model="queryForm.tag_id"-->
        <!--              clearable-->
        <!--              multiple-->
        <!--              collapse-tags-->
        <!--              placeholder="请选择"-->
        <!--            >-->
        <!--              <el-option-->
        <!--                v-for="item in tagsOptions"-->
        <!--                :key="item.tag_id"-->
        <!--                :label="item.tag_name"-->
        <!--                :value="item.tag_id"-->
        <!--              />-->
        <!--            </el-select>-->
        <!--          </el-form-item>-->
        <!--        </el-col>-->
        <el-col :span="4">
          <el-form-item :label="$t('personCenter.fieldStatus')">
            <el-select
              v-model="queryForm.status"
              clearable
              :placeholder="$t('personCenter.fieldStatus')"
            >
              <el-option :label="$t('common.all')" value="" />
              <el-option :label="$t('common.enable')" value="1" />
              <el-option :label="$t('common.disable')" value="0" />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="2">
          <el-form-item>
            <el-button :icon="Search" type="primary" @click="queryData">
              {{ $t('common.search') }}
            </el-button>
          </el-form-item>
        </el-col>
      </el-row>
    </el-form>
    <vab-query-form>
      <vab-query-form-top-panel>
        <el-button :icon="Plus" type="primary" @click="handleEdit({})">
          {{ $t('common.add') }}
        </el-button>
      </vab-query-form-top-panel>
    </vab-query-form>
    <el-table v-loading="listData.listLoading" border :data="listData.list">
      <el-table-column
        align="center"
        label="ID"
        width="120px"
        prop="article_id"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="标题"
        prop="title"
        show-overflow-tooltip
      />
      <el-table-column
        align="center"
        label="分类"
        width="120px"
        prop="cate_name"
        show-overflow-tooltip
      />

      <el-table-column align="center" label="标签" width="140px">
        <template #default="{ row }">
          <div class="flex gap-1">
            <el-tag v-for="tag in row.tag" :key="tag.tag_id" effect="dark">
              {{ tag.tag_name }}
            </el-tag>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="阅读数"
        width="120px"
        prop="view_count"
        show-overflow-tooltip
      />

      <el-table-column
        align="center"
        :label="$t('personCenter.fieldStatus')"
        width="120px"
      >
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" type="success" effect="dark">
            {{ $t('common.enable') }}
          </el-tag>
          <el-tag v-else type="danger" effect="dark">
            {{ $t('common.disable') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        align="center"
        label="发布时间"
        prop="publish_time"
        show-overflow-tooltip
      />
      <el-table-column
        v-permissions="['admin']"
        align="center"
        :label="$t('common.operation')"
        width="220px"
      >
        <template #default="{ row }">
          <el-button-group>
            <el-button type="primary" size="small" @click="handleEdit(row)">
              {{ $t('common.edit') }}
            </el-button>
            <el-popconfirm
              title="确定要删除这篇文章吗？"
              @confirm="handleDelete(row)"
            >
              <template #reference>
                <el-button type="danger" size="small">
                  {{ $t('common.delete') }}
                </el-button>
              </template>
            </el-popconfirm>
          </el-button-group>
        </template>
      </el-table-column>
    </el-table>
    <ArticleEditor
      v-model:show="detail.show"
      :data="detail.data"
      @fetch-data="fetchData"
    />
    <el-pagination
      background
      :current-page="queryForm.page_no"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="queryForm.page_size"
      :total="listData.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
  </div>
</template>

<style scoped lang="scss"></style>
