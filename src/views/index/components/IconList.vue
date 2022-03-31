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
      v-else-if="item.click && item.click === 'handleUpdate'"
      class="icon-panel"
      shadow="hover"
      @click="handleUpdate"
    >
      <vab-icon :icon="item.icon" :style="{ color: item.color }" />
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
    <vab-link v-else :to="item.link">
      <vab-card class="icon-panel" shadow="hover">
        <vab-icon :icon="item.icon" :style="{ color: item.color }" />
        <p>{{ item.title }}</p>
      </vab-card>
    </vab-link>
  </el-col>
</template>

<script>
  export default defineComponent({
    setup() {
      const $pub = inject('$pub')
      const $baseAlert = inject('$baseAlert')

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
          click: 'handleUpdate',
          icon: 'upload-cloud-2-line',
          title: '网站升级',
          link: '',
          color: '#ffd666',
        },
        {
          icon: 'baidu-line',
          title: '百度一下',
          link: 'https://www.baidu.com/s?ie=utf-8&f=8&rsv_bp=1&tn=baidu&wd=Vue%20Admin%20Plus%E5%AE%98%E7%BD%91%E3%80%81%E9%A6%96%E9%A1%B5%E3%80%81%E6%96%87%E6%A1%A3%E5%92%8C%E4%B8%8B%E8%BD%BD%20-%20%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6&oq=Vue%20Admin%20Plus%E5%AE%98%E7%BD%91%E3%80%81%E9%A6%96%E9%A1%B5%E3%80%81%E6%96%87%E6%A1%A3%E5%92%8C%E4%B8%8B%E8%BD%BD%20-%20%E5%89%8D%E7%AB%AF%E5%BC%80%E5%8F%91%E6%A1%86%E6%9E%B6&rsv_pq=cbfffef5003538e3&rsv_t=7d18Juf2uB00iQ%2B1DZbwHAT5xZC5dEDts2s%2F2UFpt3nBojO%2FncoD0L3hDTw&rqlang=cn&rsv_enter=1&rsv_dl=tb&si=vue-admin-beautiful.com&ct=2097152',
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
          link: 'https://github.com/chuzhixin',
          color: '#b37feb',
        },
        {
          click: 'handleMore',
          icon: 'notification-2-line',
          title: '公告',
          link: '',
          color: '#ff85c0',
        },
      ]

      const changeTheme = () => {
        $pub('theme')
      }

      const handleUpdate = () => {
        $pub('vab-update')
      }

      const handleMore = () => {
        $baseAlert('敬请期待！')
      }

      const randomTheme = () => {
        $pub('random-theme')
      }

      return {
        iconList,
        changeTheme,
        handleUpdate,
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
