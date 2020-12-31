<template>
  <!-- 纵向布局 -->
  <div
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabsBar,
    }"
    class="vab-layout-vertical"
  >
    <side-bar />
    <div
      v-if="device === 'mobile' && !collapse"
      class="v-modal"
      @click="handleFoldSideBar"
    />
    <div
      :class="{
        'is-collapse-main': collapse,
      }"
      class="vab-main"
    >
      <div
        :class="{
          'fixed-header': fixedHeader,
        }"
        class="vab-layout-header"
      >
        <nav-bar />
        <tabs-bar v-show="showTabsBar" />
      </div>
      <app-main />
    </div>
  </div>
</template>

<script>
  import { useStore } from 'vuex'

  export default {
    name: 'Vertical',
    props: {
      collapse: {
        type: Boolean,
        default() {
          return false
        },
      },
      fixedHeader: {
        type: Boolean,
        default() {
          return true
        },
      },
      showTabsBar: {
        type: Boolean,
        default() {
          return true
        },
      },
      device: {
        type: String,
        default() {
          return 'desktop'
        },
      },
    },
    setup() {
      const store = useStore()
      return {
        handleFoldSideBar: () => store.dispatch('settings/foldSideBar'),
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vab-layout-vertical {
    .fixed-header {
      left: $base-left-menu-width;
      width: $base-right-content-width;
    }
  }
</style>
