<script lang="ts" setup>
  import { useSettingsStore } from '@/store/modules/settings'
  import { getList } from '@/api/search'

  const vFocus: any = {
    mounted(el: HTMLElement) {
      el.querySelector('input')?.focus()
    },
  }

  const settingsStore = useSettingsStore()
  const { theme } = storeToRefs(settingsStore)

  let timer: any = null
  const state = reactive({
    dialogVisible: false,
    queryForm: {
      searchWord: '',
    },
    restaurants: [],
  })

  const loadAll = async () => {
    const {
      data: { list },
    } = await getList()
    state.restaurants = list
  }

  onMounted(() => {
    if (theme.value.showSearch) loadAll()
  })

  const openDialog = () => {
    state.queryForm.searchWord = ''
    state.dialogVisible = true
  }

  const querySearchAsync = (queryString: any, cb: any) => {
    const restaurants = state.restaurants
    const results = queryString
      ? restaurants.filter(createFilter(queryString))
      : restaurants
    clearTimeout(timer)
    timer = setTimeout(() => {
      cb(results)
    }, 500)
  }

  const createFilter = (queryString: string) => (state: any) =>
    state.value.includes(queryString.toLowerCase())
  const handleSelect = (item: any) => {
    if (item.url) {
      window.open(item.url)
    } else {
      window.open(`https://www.baidu.com/s?wd=${item.value}`)
    }
  }
</script>

<template>
  <span v-if="theme.showSearch">
    <vab-icon icon="search-line" @click="openDialog" />
    <el-dialog v-model="state.dialogVisible" :width="'40%'">
      <el-autocomplete
        v-model="state.queryForm.searchWord"
        v-focus
        :fetch-suggestions="querySearchAsync"
        select-when-unmatched
        @select="handleSelect"
      >
        <template #prefix><vab-icon icon="search-line" /></template>
      </el-autocomplete>
    </el-dialog>
  </span>
</template>

<style lang="scss" scoped>
  :deep() {
    .el-dialog {
      &__header {
        display: none;
        border: 0 !important;
      }
      &__body {
        padding: 0;
        border: 0 !important;
      }
      &__footer {
        display: none;
      }
    }

    .el-autocomplete {
      width: 100%;
      transition: none;
      .el-input__inner {
        width: 100%;
        height: 60px;
        padding-left: $base-padding;
        line-height: 60px;
      }
    }
  }
</style>
