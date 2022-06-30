<script lang="ts" setup>
  const iconList = [
    {
      icon: 'apple-line',
      color: '#464A4E',
    },
    {
      icon: 'qq-line',
      color: '#69c0ff',
    },
    {
      icon: 'wechat-line',
      color: '#95de64',
    },
    {
      icon: 'twitter-line',
      color: '#1890FF',
    },
    {
      icon: 'twitch-line',
      color: '#ffc069',
    },
  ]
</script>

<template>
  <vab-card shadow="hover">
    <template #header>
      <vab-icon icon="medal-line" />
      榜单
    </template>
    <div class="medal-list">
      <div
        v-for="(item, index) in iconList"
        :key="index"
        class="medal-list-item"
      >
        <div class="medal-list-item-rank"></div>
        <div class="medal-list-item-img">
          <div :style="{ background: item.color }">
            <vab-icon :icon="item.icon" />
          </div>
        </div>
        <div class="medal-list-item-left">
          <div class="item-title">title-{{ index }}</div>
          <div class="item-type">type</div>
        </div>
      </div>
    </div>
  </vab-card>
</template>

<style lang="scss" scoped>
  .medal-list {
    &-item {
      position: relative;
      display: block;
      width: 100%;
      height: 80px;
      clear: both;
      background: #ffffff;
      border-radius: 0px;

      $position: (
        1: -5px -122px,
        2: -64px -83px,
        3: -123px -5px,
        4: -123px -39px,
        5: -123px -73px,
      );

      @each $key, $item in $position {
        &:nth-child(#{$key}) {
          .medal-list-item-rank {
            background-position: $item;
          }
        }
      }

      &:after {
        position: absolute;
        right: 20px;
        bottom: 0;
        left: 20px;
        width: calc(100% - 40px);
        height: 1px;
        content: '';
        background: #f0f0f0;
      }

      &-img {
        float: left;
        margin: 10px 16px 25px 56px;
      }

      &-img > div {
        width: 56px;
        height: 56px;
        margin: auto;
        line-height: 56px;
        text-align: center;
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

      &-rank {
        position: absolute;
        top: 26px;
        left: 20px;
        width: 24px;
        height: 24px;
        background-image: url('~@/assets/rank_images/rank.png');
        background-size: 152px 151px;
      }

      &-left {
        float: left;
        height: 48px;
        margin: 10px 0 18px 0;

        .item-title {
          width: 175px;
          margin-bottom: 10px;
          overflow: hidden;
          font-size: 20px;
          color: #333333;
          text-overflow: ellipsis;
          white-space: nowrap;
        }

        .item-type {
          display: inline-block;
          padding: 0 8px;
          font-size: 14px;
          line-height: 20px;
          color: #999;
          background: rgba(153, 153, 153, 0.1);
          border-radius: 1px;
        }
      }
    }
  }
</style>
