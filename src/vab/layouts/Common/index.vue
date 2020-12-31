<template>
  <!--常规布局 -->
  <div
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabsBar,
    }"
    class="vab-layout-common"
  >
    <div
      :class="{
        'fixed-header': fixedHeader,
      }"
      class="vab-layout-header"
    >
      <top-bar layout="common" />
      <div>
        <side-bar layout="common" />
        <div
          v-show="showTabsBar"
          :class="{
            'is-collapse-main': collapse,
          }"
          class="vab-main"
        >
          <tabs-bar layout="common" />
        </div>
      </div>
    </div>
    <div
      :class="{
        'is-collapse-main': collapse,
      }"
      class="vab-main main-padding"
    >
      <app-main />
    </div>
  </div>
</template>

<script>
  export default {
    name: 'Common',
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
  .vab-layout-common {
    .vab-main {
      .fixed-header {
        left: $base-left-menu-width;
        width: $base-right-content-width;
      }
    }

    :deep() {
      .tabs-content {
        width: calc(
          100% - 60px - #{$base-font-size-default} - #{$base-padding} - 2px
        ) !important;
      }

      .top-bar-container {
        .vab-main {
          width: 100%;
          margin: auto $base-margin;
        }
      }
    }
  }
</style>
