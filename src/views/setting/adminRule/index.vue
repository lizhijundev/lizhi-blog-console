<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import RuleEditor from './components/RuleEditor.vue'
  import { getAdminRuleList } from '@/api/adminRule.ts'

  const editorShow = ref(false)
  const editorData = ref({})

  const listData = ref({
    listLoading: false,
    list: [],
  })

  const handleEdit = (ruleData = {}) => {
    editorShow.value = true
    editorData.value = ruleData
    console.log(editorData.value)
  }

  const onLoadRuleData = () => {
    listData.value.listLoading = true
    getAdminRuleList()
      .then(({ data }) => {
        console.log(data)
        listData.value.list = data
      })
      .finally(() => {
        listData.value.listLoading = false
      })
  }

  onMounted(() => {
    onLoadRuleData()
  })
</script>

<template>
  <div class="rule-container">
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
      row-key="path"
      :tree-props="{ children: 'children', hasChildren: 'hasChildren' }"
    >
      <el-table-column
        :label="$t('adminRule.levelName')"
        prop="rule_name"
        show-overflow-tooltip
      />
      <el-table-column :label="$t('adminRule.ruleTitle')" show-overflow-tooltip>
        <template #default="{ row }">
          <vab-icon :icon="row.icon" />
          {{ $t(row.title) }}
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('adminRule.Name')"
        prop="rule_code"
        show-overflow-tooltip
      />
      <el-table-column
        :label="$t('adminRule.path')"
        prop="path"
        show-overflow-tooltip
      />
      <el-table-column :label="$t('common.operation')">
        <template #default="{ row }">
          <el-button type="text" size="small" @click="handleEdit(row)">
            {{ $t('common.edit') }}
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <RuleEditor
      v-model:show="editorShow"
      :data="editorData"
      direction="rtl"
      @fetch-data="onLoadRuleData"
    />
  </div>
</template>

<style scoped lang="scss"></style>
