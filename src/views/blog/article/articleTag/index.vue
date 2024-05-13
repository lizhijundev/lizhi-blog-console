<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import ArticleTagEditor from './components/ArticleTagEditor.vue'
  import { getArticleTagList } from '@/api/article.ts'

  const detail = reactive({
    show: false,
    data: {},
  })
  const listData = ref({
    listLoading: false,
    list: [],
  })
  const onLoadTagData = () => {
    listData.value.listLoading = true
    getArticleTagList()
      .then(({ data }) => {
        listData.value.list = data
      })
      .finally(() => {
        listData.value.listLoading = false
      })
  }

  const handleEdit = (ruleData = {}) => {
    detail.show = true
    detail.data = ruleData
  }

  onMounted(() => {
    onLoadTagData()
  })
</script>

<template>
  <div class="article-tag-container">
    <vab-query-form>
      <vab-query-form-left-panel :span="10">
        <el-button :icon="Plus" type="primary" @click="handleEdit()">
          {{ $t('common.add') }}
        </el-button>
      </vab-query-form-left-panel>
    </vab-query-form>
    <el-table
      v-loading="listData.listLoading"
      border
      :data="listData.list"
      default-expand-all
      row-key="tag_code"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="标签ID" prop="tag_id" width="80px" />

      <el-table-column label="标签名称">
        <template #default="{ row }">
          <span>{{ row.tag_name }}</span>
          <span v-if="row.tag_name_en">({{ row.tag_name_en }})</span>
        </template>
      </el-table-column>
      <el-table-column label="标签代码" prop="tag_code" />
      <el-table-column :label="$t('adminRule.sort')" prop="sort" />
      <el-table-column :label="$t('personCenter.fieldStatus')">
        <template #default="{ row }">
          <el-tag v-if="row.status === 1" type="success" size="small">
            {{ $t('common.enable') }}
          </el-tag>
          <el-tag v-else type="danger" size="small">
            {{ $t('common.disable') }}
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column :label="$t('common.operation')" align="center">
        <template #default="{ row }">
          <el-button type="primary" size="small" @click="handleEdit(row)">
            {{ $t('common.edit') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <ArticleTagEditor
      v-model:show="detail.show"
      :data="detail.data"
      @fetch-data="onLoadTagData"
    />
  </div>
</template>

<style scoped lang="scss"></style>
