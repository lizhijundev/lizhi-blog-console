<template>
  <el-col
    v-for="(item, index) in iconList"
    :key="index"
    :lg="3"
    :md="3"
    :sm="6"
    :xl="3"
    :xs="12"
  >
    <vab-card
      v-if="item.click && item.click === 'changeTheme'"
      class="icon-panel"
      shadow="hover"
      @click="changeTheme"
    >
      <vab-icon :icon="item.icon" :style="{ color: item.color }" />
      <p>{{ item.title }}</p>
    </vab-card>
    <vab-card
      v-else-if="item.click && item.click === 'randomTheme'"
      class="icon-panel"
      shadow="hover"
      @click="randomTheme"
    >
      <el-badge value="点我">
        <vab-icon :icon="item.icon" :style="{ color: item.color }" />
      </el-badge>
      <p>{{ item.title }}</p>
    </vab-card>
    <vab-card
      v-else-if="item.click && item.click === 'handleMore'"
      class="icon-panel"
      shadow="hover"
      @click="handleMore"
    >
      <vab-icon :icon="item.icon" :style="{ color: item.color }" />
      <p>{{ item.title }}</p>
    </vab-card>
    <vab-link v-else target="_blank" :to="item.link">
      <vab-card class="icon-panel" shadow="hover">
        <vab-icon :icon="item.icon" :style="{ color: item.color }" />
        <p>{{ item.title }}</p>
      </vab-card>
    </vab-link>
  </el-col>
</template>

<script>
  import { defineComponent, getCurrentInstance } from 'vue'

  export default defineComponent({
    setup() {
      const { proxy } = getCurrentInstance()

      // 卡片图标
      const iconList = [
        {
          click: 'randomTheme',
          icon: 'apps-line',
          title: '随机换肤',
          link: '',
          color: '#95de64',
        },
        {
          click: 'changeTheme',
          icon: 'brush-2-line',
          title: '主题配置',
          link: '',
          color: '#69c0ff',
        },
        {
          icon: 'baidu-line',
          title: '百度一下',
          link: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=GitHub-chuzhixin%2Fvue-admin-beautiful%3A%F0%9F%9A%80vue-admi&oq=GitHub-chuzhixin%252Fvue-admin-beautiful%253A%25F0%259F%259A%2580vue-admi...&rsv_pq=a66fa3b80007fbd4&rsv_t=e8e0KMl6if8HMAuFVY8LMAEV2XLPQ%2F%2F29GPh2qVDUL20gxXFWjHTwkD%2BNhE&rqlang=cn&rsv_enter=0&rsv_dl=tb&rsv_btype=t&inputT=1163&rsv_sug3=104&rsv_sug4=1821&bs=GitHub-chuzhixin%2Fvue-admin-beautiful%3A%F0%9F%9A%80vue-admi...',
          color: '#1890FF',
        },
        {
          icon: 'video-line',
          title: '视频播放器',
          link: '/other/player',
          color: '#ffc069',
        },
        {
          icon: 'table-line',
          title: '表格',
          link: '/vab/table/comprehensiveTable',
          color: '#5cdbd3',
        },
        {
          icon: 'code-box-line',
          title: '源码',
          link: 'https://github.com/chuzhixin/vue-admin-beautiful',
          color: '#b37feb',
        },
        {
          click: 'handleMore',
          icon: 'notification-2-line',
          title: '公告',
          link: '',
          color: '#ff85c0',
        },
        {
          click: 'handleMore',
          icon: 'gift-line',
          title: '礼物',
          link: '',
          color: '#ffd666',
        },
      ]

      const changeTheme = () => {
        proxy.$pub('theme')
      }
      const handleMore = () => {
        proxy.$baseAlert('敬请期待！')
      }
      const randomTheme = () => {
        proxy.$pub('random-theme')
      }

      return {
        iconList,
        changeTheme,
        handleMore,
        randomTheme,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .icon-panel {
    margin-bottom: 20px;
    text-align: center;
    cursor: pointer;

    .el-card__body {
      height: 120px;

      &:hover {
        i {
          transform: scale(1.15);
        }
      }

      i {
        display: block;
        width: 50px;
        height: 50px;
        margin: auto;
        font-size: 40px;
        transition: all ease-in-out 0.3s;
      }

      p {
        margin-top: 10px;
        text-align: center;
      }
    }
  }
</style>
