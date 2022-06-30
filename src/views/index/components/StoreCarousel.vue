<script lang="ts" setup></script>

<template>
  <el-carousel height="180px" :interval="6000">
    <el-carousel-item v-for="item in 4" :key="item">
      <img
        alt=""
        :src="
          '//fastly.jsdelivr.net' +
          '/gh/chuzhi' +
          'xin/image/table/vab-im' +
          'age-' +
          '1' +
          '.jpg'
        "
      />
    </el-carousel-item>
  </el-carousel>
</template>

<style lang="scss" scoped>
  .el-carousel {
    margin-bottom: 20px;
    &__item {
      img {
        width: 100%;
      }
    }
  }
</style>
