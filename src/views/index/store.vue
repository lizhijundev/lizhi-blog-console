<script lang="ts">
  export default defineComponent({
    name: 'Store',
  })
</script>

<script lang="ts" setup>
  // defineOptions({
  //   name: 'Store',
  // })
  const StoreHeader = defineAsyncComponent(
    () => import('./components/StoreHeader.vue')
  )
  const StoreLeft = defineAsyncComponent(
    () => import('./components/StoreLeft.vue')
  )
  const StoreCard = defineAsyncComponent(
    () => import('./components/StoreCard.vue')
  )
  const StoreCarousel = defineAsyncComponent(
    () => import('./components/StoreCarousel.vue')
  )
  const StoreList = defineAsyncComponent(
    () => import('./components/StoreList.vue')
  )
</script>

<template>
  <div class="store-container">
    <el-row :gutter="20">
      <el-col :lg="16" :md="12" :sm="24" :xl="16" :xs="24">
        <store-header />
        <store-left />
      </el-col>
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <store-card />
        <store-carousel />
        <store-list />
      </el-col>
    </el-row>
  </div>
</template>

<style lang="scss" scoped>
  .store-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
