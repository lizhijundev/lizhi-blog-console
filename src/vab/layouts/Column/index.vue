<template>
  <!--分栏布局 -->
  <div
    :class="{
      fixed: fixedHeader,
      'no-tabs-bar': !showTabsBar,
    }"
    class="vab-layout-column"
  >
    <column-bar />
    <div
      :class="{
        ['vab-main-' + theme.columnStyle]: true,
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
  import { computed } from 'vue'

  export default {
    name: 'Column',
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
    },
    setup() {
      const store = useStore()
      return {
        theme: computed(() => store.getters['settings/theme']),
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vab-layout-column {
    .vab-main {
      .fixed-header {
        left: $base-left-menu-width;
        width: $base-right-content-width;
      }

      &.is-collapse-main {
        &.vab-main-horizontal {
          margin-left: $base-left-menu-width-min * 1.3;

          :deep() {
            .fixed-header {
              left: $base-left-menu-width-min * 1.3;
              width: calc(100% - #{$base-left-menu-width-min} * 1.3);
            }
          }
        }
      }
    }
  }
</style>
