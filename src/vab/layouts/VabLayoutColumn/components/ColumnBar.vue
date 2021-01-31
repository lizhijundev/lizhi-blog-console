<template>
  <el-scrollbar
    :class="{
      'is-collapse': collapse,
      ['column-bar-container-' + theme.columnStyle]: true,
    }"
    class="column-bar-container"
  >
    <vab-logo />
    <el-tabs
      v-model="extra.first"
      tab-position="left"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        v-for="item in handleRoutes"
        :key="item.name"
        :name="item.name"
      >
        <template #label>
          <div
            :class="{
              ['column-grid-' + theme.columnStyle]: true,
            }"
            :title="translateTitle(item.meta.title)"
            class="column-grid"
          >
            <div>
              <vab-icon
                v-if="item.meta.icon"
                :icon="item.meta.icon"
                :is-custom-svg="item.meta.isCustomSvg"
              />
              <span>
                {{ translateTitle(item.meta.title) }}
              </span>
            </div>
          </div>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-menu
      :background-color="variables['column-second-menu-background']"
      :default-active="activeMenu"
      :default-openeds="defaultOpeneds"
      :unique-opened="uniqueOpened"
      mode="vertical"
    >
      <el-divider>
        {{ translateTitle(handleGroupTitle) }}
      </el-divider>
      <template v-for="route in handlePartialRoutes">
        <vab-menu v-if="!route.hidden" :key="route.path" :item="route" />
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { computed, ref, watchEffect } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { translateTitle } from '@/utils/i18n'
  import { handleActivePath } from '@/utils/routes'
  import { defaultOpeneds, openFirstMenu, uniqueOpened } from '@/config'
  import variables from '@/vab/styles/variables/variables.scss'

  export default {
    name: 'ColumnBar',
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const extra = computed(() => store.getters['routes/extra'])
      const routes = computed(() => store.getters['routes/routes'])
      const theme = computed(() => store.getters['settings/theme'])
      const collapse = computed(() => store.getters['settings/collapse'])

      const activeMenu = ref('')

      const handleRoutes = computed(() => {
        return routes.value.filter((item) => item.hidden !== true && item.meta)
      })
      const handlePartialRoutes = computed(() => {
        return extra.value.first
          ? routes.value.find((item) => item.name === extra.value.first)
              .children
          : []
      })
      const handleGroupTitle = computed(() => {
        const group = routes.value.find(
          (item) => item.name === extra.value.first
        )
        return group ? group.meta.title : ''
      })

      const handleTabClick = (handler) => {
        if (handler !== true && openFirstMenu) {
          router.push(handlePartialRoutes.value[0].path)
          store.dispatch('settings/openSideBar')
        }
      }

      watchEffect(() => {
        activeMenu.value = handleActivePath(route)
        const firstMenu = route.matched[0].name
        if (extra.value.first !== firstMenu) {
          extra.value.first = firstMenu
          handleTabClick(true)
        }
      })

      return {
        extra,
        theme,
        collapse,
        variables,
        activeMenu,
        handleRoutes,
        uniqueOpened,
        defaultOpeneds,
        handleTabClick,
        translateTitle,
        handleGroupTitle,
        handlePartialRoutes,
      }
    },
  }
</script>

<style lang="scss" scoped>
  @mixin active {
    &:hover {
      color: $base-color-blue;
      background-color: $base-column-second-menu-background-active !important;

      i,
      svg {
        color: $base-color-blue;
      }
    }

    &.is-active {
      color: $base-color-blue;
      background-color: $base-column-second-menu-background-active !important;
    }
  }

  .column-bar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: $base-left-menu-width;
    height: 100vh;
    overflow: hidden;
    background: $base-column-second-menu-background;
    box-shadow: $base-box-shadow;

    :deep() {
      * {
        transition: $base-transition;
      }
    }

    &-vertical,
    &-card {
      :deep() {
        .el-tabs + .el-menu {
          left: $base-left-menu-width-min;
          width: $base-left-menu-width - $base-left-menu-width-min;
          border: 0;
        }
      }
    }

    &-horizontal {
      :deep() {
        .logo-container-column {
          .logo {
            width: $base-left-menu-width-min * 1.3 !important;
          }

          .title {
            margin-left: $base-left-menu-width-min * 1.3 !important;
          }
        }

        .el-tabs + .el-menu {
          left: $base-left-menu-width-min * 1.3;
          width: $base-left-menu-width - $base-left-menu-width-min * 1.3;
          border: 0;
        }
      }
    }

    &-card {
      :deep() {
        .el-tabs {
          .el-tabs__item {
            padding: 5px !important;

            .column-grid {
              width: $base-left-menu-width-min - 10 !important;
              height: $base-left-menu-width-min - 10 !important;
              border-radius: 5px;
            }

            &.is-active {
              background: transparent !important;

              .column-grid {
                background: $base-color-blue;
              }
            }
          }
        }

        .el-tabs + .el-menu {
          left: $base-left-menu-width-min + 10;
          width: $base-left-menu-width - $base-left-menu-width-min - 20;
        }

        .el-submenu .el-submenu__title,
        .el-menu-item {
          min-width: 180px;
          border-radius: 5px;
        }
      }
    }

    .column-grid {
      display: flex;
      align-items: center;
      width: $base-left-menu-width-min;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;

      &-vertical,
      &-card {
        justify-content: center;
        height: $base-left-menu-width-min;

        > div {
          svg {
            position: relative;
            top: 8px;
            display: block;
            width: $base-font-size-default + 4;
            height: $base-font-size-default + 4;
          }

          [class*='ri-'] {
            display: block;
            height: 20px;
          }
        }
      }

      &-horizontal {
        justify-content: left;
        width: $base-left-menu-width-min * 1.3;
        height: $base-left-menu-width-min / 1.3;
        padding-left: $base-padding / 2;
      }
    }

    :deep() {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      .el-tabs {
        position: fixed;

        .el-tabs__header.is-left {
          margin-right: -3px !important;

          .el-tabs__nav-wrap.is-left {
            margin-right: 0 !important;
            background: $base-column-first-menu-background;

            .el-tabs__nav-scroll {
              height: 100%;
              overflow-y: auto;

              &::-webkit-scrollbar {
                width: 0px;
                height: 0px;
              }
            }
          }
        }

        .el-tabs__nav {
          height: calc(100vh - #{$base-logo-height});
          background: $base-column-first-menu-background;
        }

        .el-tabs__item {
          height: auto;
          padding: 0;
          color: $base-color-white;

          &.is-active {
            background: $base-color-blue;
          }
        }
      }

      .el-tabs__active-bar.is-left,
      .el-tabs--left .el-tabs__nav-wrap.is-left::after {
        display: none;
      }

      .el-menu {
        border: 0;

        .el-divider {
          margin: 0 0 $base-margin 0;
          background-color: #f6f6f6;

          &__text {
            color: $base-color-black;
          }
        }

        .el-menu-item,
        .el-submenu__title {
          height: $base-menu-item-height;
          overflow: hidden;
          line-height: $base-menu-item-height;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: middle;

          @include active;
        }
      }
    }

    &.is-collapse {
      :deep() {
        width: 0;
      }
    }
  }
</style>
