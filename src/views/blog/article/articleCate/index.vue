<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import ArticleCateEditor from './components/ArticleCateEditor.vue'
  import { getArticleCateList } from '@/api/article.ts'

  const detail = reactive({
    show: false,
    data: {},
  })
  const listData = ref({
    listLoading: false,
    list: [],
  })
  const onLoadRuleData = () => {
    listData.value.listLoading = true
    getArticleCateList()
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
    onLoadRuleData()
  })
</script>

<template>
  <div class="article-cate-container">
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
      row-key="cate_code"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column label="分类ID" prop="cate_id" width="80px" />

      <el-table-column label="分类名称">
        <template #default="{ row }">
          <span>{{ row.cate_name }}</span>
          <span v-if="row.cate_name_en">({{ row.cate_name_en }})</span>
        </template>
      </el-table-column>
      <el-table-column label="分类代码" prop="cate_code" />
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
    <ArticleCateEditor
      v-model:show="detail.show"
      :data="detail.data"
      @fetch-data="onLoadRuleData"
    />
  </div>
</template>

<style scoped lang="scss"></style>
