<template>
  <div :class="classObj" class="vue-admin-beautiful-wrapper">
    <component
      :is="theme.layout"
      :collapse="collapse"
      :device="device"
      :fixed-header="theme.fixedHeader"
      :show-tabs-bar="theme.showTabsBar"
    />
    <el-backtop />
  </div>
</template>

<script>
  import { useStore } from 'vuex'
  import { computed, onMounted, onBeforeMount, onBeforeUnmount } from 'vue'

  export default {
    name: 'Layout',
    setup() {
      const store = useStore()
      const device = computed(() => store.getters['settings/device'])
      const collapse = computed(() => store.getters['settings/collapse'])
      const theme = computed(() => store.getters['settings/theme'])
      const toggleDevice = (device) =>
        store.dispatch('settings/toggleDevice', device)
      const foldSideBar = () => store.dispatch('settings/foldSideBar')
      const openSideBar = () => store.dispatch('settings/openSideBar')

      let isMobile = false
      let oldLayout = ''

      const handleLayouts = () => {
        const isMobileTemp =
          document.body.getBoundingClientRect().width - 1 < 992
        if (isMobileTemp !== isMobile) {
          if (isMobileTemp) {
            oldLayout = theme.value.layout
            foldSideBar()
          } else {
            openSideBar()
          }
          theme.value.layout = isMobileTemp ? 'vertical' : oldLayout
          toggleDevice(isMobileTemp ? 'mobile' : 'desktop')
          isMobile = isMobileTemp
        }
      }

      onMounted(() => {
        handleLayouts()
      })
      onBeforeMount(() => {
        window.addEventListener('resize', handleLayouts)
      })
      onBeforeUnmount(() => {
        window.removeEventListener('resize', handleLayouts)
      })

      return {
        classObj: computed(() => {
          return {
            mobile: device.value === 'mobile',
          }
        }),
        device,
        collapse,
        theme,
        toggleDevice,
        foldSideBar,
        openSideBar,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vue-admin-beautiful-wrapper {
    position: relative;
    width: 100%;
    height: 100%;

    [class*='vab-layout-'] {
      position: relative;

      :deep() {
        .vab-layout-header {
          box-shadow: $base-box-shadow;
        }
      }

      &.fixed {
        padding-top: $base-nav-bar-height + $base-tabs-bar-height;
      }

      &.fixed.no-tabs-bar {
        padding-top: $base-nav-bar-height;
      }
    }

    :deep() {
      .fixed-header {
        position: fixed;
        top: 0;
        right: 0;
        left: 0;
        z-index: $base-z-index - 1;
        width: 100%;
        overflow: hidden;
      }

      .vab-main {
        position: relative;
        width: auto;
        min-height: 100%;
        margin-left: $base-left-menu-width;

        &.is-collapse-main {
          margin-left: $base-left-menu-width-min;

          .fixed-header {
            left: $base-left-menu-width-min;
            width: calc(100% - #{$base-left-menu-width-min});
          }
        }
      }
    }

    /* 手机端开始 */
    &.mobile {
      :deep() {
        .vab-layout-vertical {
          .el-scrollbar.side-bar-container.is-collapse {
            width: 0;
          }

          .vab-main {
            .fixed-header {
              left: 0;
              width: 100%;
            }

            width: 100%;
            margin-left: 0;
          }
        }

        /* 隐藏分页和页码跳转 */
        .el-pager,
        .el-pagination__jump {
          display: none;
        }
      }
    }

    /* 手机端结束 */
  }
</style>
