<template>
  <!-- 横向布局 -->
  <div
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabsBar,
    }"
    class="vab-layout-horizontal"
  >
    <div
      :class="{
        'fixed-header': fixedHeader,
      }"
      class="vab-layout-header"
    >
      <top-bar />
      <div
        v-show="showTabsBar"
        :class="{
          'tag-bar-horizontal': showTabsBar,
        }"
      >
        <div class="vab-main">
          <tabs-bar />
        </div>
      </div>
    </div>
    <div class="vab-main main-padding">
      <app-main />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Horizontal',
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
  }
</script>

<style lang="scss" scoped>
  .vab-layout-horizontal {
    :deep() {
      .vab-main {
        width: 92% !important;
        margin: auto;
      }
    }

    .tag-bar-horizontal {
      background: $base-color-white;
      box-shadow: $base-box-shadow;
    }

    .nav-bar-container {
      .fold-unfold {
        display: none;
      }
    }
  }
</style>
