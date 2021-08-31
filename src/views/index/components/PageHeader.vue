<template>
  <el-col :span="24">
    <vab-card class="page-header" shadow="never">
      <el-avatar class="page-header-avatar" :src="avatar" />
      <div class="page-header-tip">
        <p class="page-header-tip-title">
          {{ handleTips() }}
        </p>
        <p class="page-header-tip-description" v-html="description"></p>
      </div>
      <div class="page-header-avatar-list">
        <vab-avatar-list :avatar-list="avatatList" />
        <p>participants</p>
      </div>
    </vab-card>
  </el-col>
</template>

<script>
  import { computed, defineComponent, reactive, toRefs } from 'vue'
  import { useStore } from 'vuex'
  import { getList } from '@/api/description'
  import VabAvatarList from '@/extra/VabAvatarList'

  export default defineComponent({
    components: { VabAvatarList },
    setup() {
      const store = useStore()

      const username = computed(() => store.getters['user/username'])

      const state = reactive({
        description: '',
        avatatList: [
          {
            avatar: 'https://i.gtimg.cn/club/item/face/img/2/15922_100.gif',
            username: 'good luck',
          },
          {
            avatar:
              'https://gitee.com/chu1204505056/image/raw/master/user/fwfmiao.gif',
            username: 'fwfmiao',
          },
          {
            avatar: 'https://i.gtimg.cn/club/item/face/img/3/15643_100.gif',
            username: '嘻嘻',
          },
        ],
      })

      const handleTips = () => {
        const hour = new Date().getHours()
        return hour < 8
          ? `早上好 ${username.value}，又是元气满满的一天。`
          : hour <= 11
          ? `上午好 ${username.value}，看到你我好开心。`
          : hour <= 13
          ? `中午好 ${username.value}，忙碌了一上午，记得吃午饭哦。`
          : hour < 18
          ? `下午好 ${username.value}，你一定有些累了，喝杯咖啡提提神。`
          : `晚上好 ${username.value}，愿你天黑有灯，下雨有伞。`
      }
      const fetchData = async () => {
        const {
          data: { description },
        } = await getList()
        state.description = description
      }

      fetchData()

      return {
        ...toRefs(state),
        avatar: computed(() => store.getters['user/avatar']),
        handleTips,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .page-header {
    min-height: 125px;
    transition: none;

    :deep() {
      * {
        transition: none;
      }

      .el-card__body {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
      }
    }

    &-avatar {
      width: 60px;
      height: 60px;
      margin-right: 20px;
      border-radius: 50%;
    }

    &-tip {
      flex: auto;
      width: calc(100% - 200px);
      min-width: 300px;

      &-title {
        margin-bottom: 12px;
        font-size: 20px;
        font-weight: bold;
        color: #3c4a54;
      }

      &-description {
        min-height: 20px;
        font-size: $base-font-size-default;
        color: #808695;
      }
    }

    &-avatar-list {
      flex: 1;
      min-width: 100px;
      margin-left: 20px;
      text-align: right;

      p {
        margin-right: 9px;
        line-height: 0;
      }
    }
  }
</style>
