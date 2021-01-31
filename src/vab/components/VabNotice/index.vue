<template>
  <el-badge v-if="theme.showNotice" :value="badge" type="danger">
    <el-popover :width="300" placement="bottom" trigger="hover">
      <template #reference>
        <vab-icon icon="notification-line" />
      </template>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="translateTitle('通知')" name="notice">
          <div class="notice-list">
            <el-scrollbar>
              <ul>
                <li v-for="(item, index) in list" :key="index">
                  <el-avatar :size="45" :src="item.image" />
                  <span v-html="item.notice" />
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-tab-pane>
        <el-tab-pane :label="translateTitle('邮件')" name="email">
          <div class="notice-list">
            <el-scrollbar>
              <ul>
                <li v-for="(item, index) in list" :key="index">
                  <el-avatar :size="45" :src="item.image" />
                  <span>{{ item.email }}</span>
                </li>
              </ul>
            </el-scrollbar>
          </div>
        </el-tab-pane>
      </el-tabs>
      <div class="notice-clear" @click="handleClearNotice">
        <el-button type="text">
          <vab-icon icon="close-circle-line" />
          {{ translateTitle('清空消息') }}
        </el-button>
      </div>
    </el-popover>
  </el-badge>
</template>

<script>
  import { computed, getCurrentInstance, nextTick, ref } from 'vue'
  import { useStore } from 'vuex'
  import { translateTitle } from '@/utils/i18n'
  import { getList } from '@/api/notice'

  export default {
    name: 'VabNotice',
    setup() {
      const store = useStore()
      const { ctx } = getCurrentInstance()

      const list = ref([])
      const badge = ref(null)
      const activeName = ref('notice')
      const theme = computed(() => store.getters['settings/theme'])

      const fetchData = async () => {
        const { data } = await getList()
        badge.value = data.length === 0 ? null : data.length
        list.value = data
      }

      nextTick(() => {
        if (theme.value.showNotice) fetchData()
      })

      const handleClick = () => {
        fetchData()
      }

      const handleClearNotice = () => {
        badge.value = null
        list.value = []
        ctx.$baseMessage(
          '清空消息成功',
          'success',
          false,
          'vab-hey-message-success'
        )
      }

      return {
        list,
        badge,
        theme,
        fetchData,
        activeName,
        handleClick,
        translateTitle,
        handleClearNotice,
      }
    },
  }
</script>

<style lang="scss" scoped>
  :deep() {
    .el-tabs__active-bar {
      min-width: 28px;
    }
  }

  .notice-list {
    height: 29vh;

    ul {
      padding: 0 15px 0 0;
      margin: 0;

      li {
        display: flex;
        align-items: center;
        padding: 10px 0 10px 0;

        :deep() {
          .el-avatar {
            flex-shrink: 0;
            width: 50px;
            height: 50px;
            border-radius: 50%;
          }
        }

        span {
          margin-left: 10px;
        }
      }
    }
  }

  .notice-clear {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 0 0 0;
    font-size: 14px;
    text-align: center;
    cursor: pointer;
    border-top: 1px solid #e8eaec;

    i {
      margin-right: 3px;
    }
  }
</style>
