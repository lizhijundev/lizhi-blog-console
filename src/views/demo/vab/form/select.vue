<template>
  <div class="select-container">
    <vab-card shadow="hover">
      <template #header>
        <span>行政区划</span>
        <el-tag class="card-header-tag" type="danger">New</el-tag>
      </template>
      <el-cascader
        v-model="area"
        clearable
        filterable
        :options="areaOptions"
        :props="{ label: 'name', value: 'code' }"
      />
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>树选择</span>
        <el-tag class="card-header-tag" type="danger">New</el-tag>
      </template>
      <el-tree-select
        v-model="treeValue"
        :data="treeData"
        multiple
        show-checkbox
      />
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>基础用法</span>
      </template>
      <el-select v-model="value1" placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>有禁用选项</span>
      </template>
      <el-select v-model="value2" placeholder="请选择">
        <el-option
          v-for="item in options2"
          :key="item.value"
          :disabled="item.disabled"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>禁用状态</span>
      </template>
      <el-select v-model="value1" disabled placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>可清空单选</span>
      </template>
      <el-select v-model="value1" clearable placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>基础多选</span>
      </template>
      <el-select v-model="value3" multiple placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </vab-card>
    <vab-card shadow="hover">
      <template #header>
        <span>可搜索</span>
      </template>
      <el-select v-model="value1" filterable placeholder="请选择">
        <el-option
          v-for="item in options1"
          :key="item.value"
          :label="item.label"
          :value="item.value"
        />
      </el-select>
    </vab-card>
  </div>
</template>

<script>
  import { getList } from '@/api/area'

  export default defineComponent({
    name: 'Select',
    setup() {
      const state = reactive({
        options1: [
          { value: '选项1', label: '黄金糕' },
          { value: '选项2', label: '双皮奶' },
          { value: '选项3', label: '蚵仔煎' },
          { value: '选项4', label: '龙须面' },
          { value: '选项5', label: '北京烤鸭' },
        ],
        value1: '',
        options2: [
          { value: '选项1', label: '黄金糕' },
          { value: '选项2', label: '双皮奶', disabled: true },
          { value: '选项3', label: '蚵仔煎' },
          { value: '选项4', label: '龙须面' },
          { value: '选项5', label: '北京烤鸭' },
        ],
        value2: '',
        value3: [],
        area: [],
        treeValue: '',
        areaOptions: [],
        treeData: [
          {
            value: '1',
            label: 'Level one 1',
            children: [
              {
                value: '1-1',
                label: 'Level two 1-1',
                children: [
                  {
                    value: '1-1-1',
                    label: 'Level three 1-1-1',
                  },
                ],
              },
            ],
          },
          {
            value: '2',
            label: 'Level one 2',
            children: [
              {
                value: '2-1',
                label: 'Level two 2-1',
                children: [
                  {
                    value: '2-1-1',
                    label: 'Level three 2-1-1',
                  },
                ],
              },
              {
                value: '2-2',
                label: 'Level two 2-2',
                children: [
                  {
                    value: '2-2-1',
                    label: 'Level three 2-2-1',
                  },
                ],
              },
            ],
          },
          {
            value: '3',
            label: 'Level one 3',
            children: [
              {
                value: '3-1',
                label: 'Level two 3-1',
                children: [
                  {
                    value: '3-1-1',
                    label: 'Level three 3-1-1',
                  },
                ],
              },
              {
                value: '3-2',
                label: 'Level two 3-2',
                children: [
                  {
                    value: '3-2-1',
                    label: 'Level three 3-2-1',
                  },
                ],
              },
            ],
          },
        ],
      })

      const fetchData = async () => {
        const {
          data: { list },
        } = await getList()
        state.areaOptions = list
      }

      onMounted(() => {
        fetchData()
      })

      return {
        ...toRefs(state),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .select-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
