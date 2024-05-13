<script setup lang="ts">
  import { Plus } from '@element-plus/icons-vue'
  import CoverEditor from './components/CoverEditor.vue'
  import { getArticleTagList } from '@/api/article.ts'
  import { getCoverList } from '@/api/cover.ts'
  import _ from 'lodash'

  const queryForm = ref({
    page_no: 1,
    page_size: 10,
  })

  const detail = reactive({
    show: false,
    data: {},
  })
  const listData = ref({
    listLoading: false,
    total: 0,
    list: [],
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
    try {
      const {
        data: { list, total },
      } = await getCoverList(params)
      listData.value.list = list
      listData.value.total = total
      listData.value.listLoading = false
    } catch (e) {
      listData.value.listLoading = false
    }
  }

  const handleEdit = (ruleData = {}) => {
    detail.show = true
    detail.data = ruleData
  }

  onMounted(() => {
    queryData()
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
      <el-table-column label="ID" prop="id" width="80px" />

      <el-table-column label="PC封面">
        <template #default="{ row }">
          <el-image class="w-10" :src="row.cover_url" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="竖屏封面">
        <template #default="{ row }">
          <el-image class="w-10" :src="row.cover_url_mobile" fit="cover" />
        </template>
      </el-table-column>
      <el-table-column label="地点">
        <template #default="{ row }">
          <span>{{ row.place }}</span>
          <span v-if="row.place_en">({{ row.place_en }})</span>
        </template>
      </el-table-column>
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
    <el-pagination
      background
      :current-page="queryForm.page_no"
      layout="total, sizes, prev, pager, next, jumper"
      :page-size="queryForm.page_size"
      :total="listData.total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <CoverEditor
      v-model:show="detail.show"
      :data="detail.data"
      @fetch-data="fetchData"
    />
  </div>
</template>

<style scoped lang="scss"></style>
