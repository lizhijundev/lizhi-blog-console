<template>
  <!--常规布局 -->
  <div
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabsBar,
    }"
    class="layout-container-common"
  >
    <div :class="fixedHeader ? 'fixed-header' : ''" class="layout-header">
      <top-bar layout="common" />
      <div>
        <side-bar layout="common" />
        <div
          v-show="showTabsBar"
          :class="collapse ? 'is-collapse-main' : ''"
          class="vab-main"
        >
          <tabs-bar layout="common" />
        </div>
      </div>
    </div>
    <div
      :class="collapse ? 'is-collapse-main' : ''"
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
  @mixin container-common {
    background: #20222a !important;
  }
  @mixin fix-header {
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    z-index: $base-z-index - 2;
    width: 100%;
    overflow: hidden;
  }

  .layout-header {
    box-shadow: $base-box-shadow;
  }

  .layout-container-common {
    position: relative;

    :deep() {
      .el-menu {
        @include container-common;

        .el-submenu__title {
          @include container-common;
        }

        .el-menu-item {
          @include container-common;
        }
      }

      .side-bar-container {
        @include container-common;
      }

      .tabs-content {
        width: calc(100% - 80px) !important;
      }
    }

    &.fixed {
      padding-top: calc(
        #{$base-top-bar-height} + #{$base-tabs-bar-height}
      ) !important;
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-top-bar-height !important;
    }

    :deep() {
      .vab-main {
        width: 88%;
        margin: auto;
      }

      .fixed-header {
        @include fix-header;
      }

      .nav-bar-container {
        .fold-unfold {
          display: none;
        }
      }
    }
  }

  .layout-container-common {
    :deep() {
      .top-bar-container {
        .vab-main {
          width: 100%;
          margin: auto $base-padding;
        }
      }
    }
  }

  .layout-container-common {
    position: relative;

    .mask {
      position: fixed;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      z-index: $base-z-index - 1;
      width: 100%;
      height: 100vh;
      overflow: hidden;
      background: #000;
      opacity: 0.5;
    }

    &.fixed {
      padding-top: calc(#{$base-nav-bar-height} + #{$base-tabs-bar-height});
    }

    &.fixed.no-tabs-bar {
      padding-top: $base-nav-bar-height;
    }

    .vab-main {
      position: relative;
      width: auto;
      min-height: 100%;
      margin-left: $base-left-menu-width;

      :deep() {
        .fixed-header {
          @include fix-header;

          left: $base-left-menu-width;
          width: $base-right-content-width;
        }

        .app-main-container {
          border-radius: $base-border-radius;
        }
      }

      &.is-collapse-main {
        margin-left: $base-left-menu-width-min;

        :deep() {
          .fixed-header {
            left: $base-left-menu-width-min;
            width: calc(100% - 65px);
          }
        }
      }
    }
  }
</style>
