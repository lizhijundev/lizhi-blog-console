<template>
  <span v-if="theme.showSearch">
    <vab-icon icon="search-line" @click="openDialog" />
    <el-dialog v-model="state.dialogVisible" :width="'40%'">
      <el-form :model="state.queryForm" @submit.prevent>
        <el-form-item label-width="0">
          <el-autocomplete
            v-model="state.queryForm.searchWord"
            v-focus
            :fetch-suggestions="querySearchAsync"
            select-when-unmatched
            @select="handleSelect"
          >
            <template #prefix><vab-icon icon="search-line" /></template>
          </el-autocomplete>
        </el-form-item>
      </el-form>
    </el-dialog>
  </span>
</template>

<script>
  import { computed, onMounted, reactive } from 'vue'
  import { useStore } from 'vuex'
  import { getList } from '@/api/search'

  export default {
    name: 'VabSearch',
    directives: {
      focus: {
        mounted(el) {
          el.querySelector('input').focus()
        },
      },
    },
    setup() {
      const store = useStore()
      const theme = computed(() => store.getters['settings/theme'])

      let timeout = null
      const state = reactive({
        dialogVisible: false,
        queryForm: {
          searchWord: '',
        },
        restaurants: [],
      })

      const loadAll = async () => {
        const { data } = await getList()
        state.restaurants = data
      }

      onMounted(() => {
        if (theme.value.showSearch) loadAll()
      })

      const openDialog = () => {
        state.queryForm.searchWord = ''
        state.dialogVisible = true
      }

      const querySearchAsync = (queryString, cb) => {
        let restaurants = state.restaurants
        let results = queryString
          ? restaurants.filter(createFilter(queryString))
          : restaurants
        clearTimeout(timeout)
        timeout = setTimeout(() => {
          cb(results)
        }, 500)
      }

      const createFilter = (queryString) => {
        return (state) => state.value.includes(queryString.toLowerCase())
      }

      const handleSelect = (item) => {
        if (item.url) {
          window.open(item.url)
        } else {
          window.open(`https://www.baidu.com/s?wd=${item.value}`)
        }
      }

      return {
        theme,
        state,
        openDialog,
        createFilter,
        handleSelect,
        querySearchAsync,
      }
    },
  }
</script>

<style lang="scss" scoped>
  :deep() {
    .el-dialog {
      .el-dialog__header {
        display: none;
        border: 0 !important;
      }

      .el-dialog__body {
        padding: 0;
        border: 0 !important;
      }

      .el-form-item__content {
        position: relative;

        i {
          position: absolute;
          top: 14px;
        }

        .el-autocomplete {
          width: 100%;

          .el-input__inner {
            width: 100%;
            height: 60px;
            padding-left: $base-padding * 2.5;
            border: 0 !important;
          }
        }
      }
    }
  }
</style>
