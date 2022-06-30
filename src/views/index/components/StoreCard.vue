<script lang="ts" setup>
  const $baseAlert: any = inject('$baseAlert')

  const iconList = [
    {
      icon: 'apps-line',
      color: '#95de64',
    },
    {
      icon: 'brush-2-line',
      color: '#69c0ff',
    },
    {
      icon: 'upload-cloud-2-line',
      color: '#ffd666',
    },
    {
      icon: 'baidu-line',
      color: '#1890FF',
    },
    {
      icon: 'video-line',
      color: '#ffc069',
    },
    {
      icon: 'table-line',
      color: '#5cdbd3',
    },
  ]

  const handleClick = () => {
    $baseAlert('敬请期待！')
  }
</script>
<template>
  <vab-card shadow="hover">
    <template #header>
      <vab-icon icon="anticlockwise-2-line" />
      快捷方式
    </template>

    <el-row :gutter="20">
      <el-col
        v-for="(item, index) in iconList"
        :key="index"
        :lg="8"
        :md="8"
        :sm="8"
        :xl="8"
        :xs="12"
      >
        <vab-card class="icon-panel" shadow="hover" @click="handleClick">
          <div :style="{ background: item.color }">
            <vab-icon :icon="item.icon" />
          </div>
        </vab-card>
      </el-col>
    </el-row>
  </vab-card>
</template>

<style lang="scss" scoped>
  .icon-panel {
    margin-bottom: 20px;
    text-align: center;
    cursor: pointer;

    .el-card__body {
      height: 120px;

      &:hover {
        i {
          transform: scale(1.05);
        }
      }

      div {
        width: 60px;
        height: 60px;
        margin: auto;
        line-height: 60px;
        border-radius: 12px;

        i {
          display: block;
          width: 50px;
          height: 50px;
          margin: auto;
          font-size: 30px;
          color: #fff;
          transition: all ease-in-out 0.3s;
        }
      }
    }
  }
</style>
