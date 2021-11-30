<template>
  <el-scrollbar
    class="vab-column-bar-container"
    :class="{
      'is-collapse': collapse,
      ['vab-column-bar-container-' + theme.columnStyle]: true,
    }"
  >
    <vab-logo />
    <el-tabs
      v-model="extra.first"
      tab-position="left"
      @tab-click="handleTabClick"
    >
      <template
        v-for="(route, index) in handleRoutes"
        :key="index + route.name"
      >
        <el-tab-pane :name="route.name">
          <template #label>
            <div
              class="vab-column-grid"
              :class="{
                ['vab-column-grid-' + theme.columnStyle]: true,
              }"
              :title="translateTitle(route.meta.title)"
            >
              <div>
                <vab-icon
                  v-if="route.meta.icon"
                  :icon="route.meta.icon"
                  :is-custom-svg="route.meta.isCustomSvg"
                />
                <span>
                  {{ translateTitle(route.meta.title) }}
                </span>
              </div>
            </div>
          </template>
        </el-tab-pane>
      </template>
    </el-tabs>

    <el-menu
      v-if="menushow"
      :background-color="variables['column-second-menu-background']"
      :default-active="activeMenu"
      :default-openeds="defaultOpeneds"
      mode="vertical"
      :unique-opened="uniqueOpened"
    >
      <el-divider>
        {{ translateTitle(handleGroupTitle) }}
      </el-divider>
      <template v-for="route in handlePartialRoutes" :key="route.path">
        <vab-menu v-if="route.meta && !route.meta.hidden" :item="route" />
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import {
    computed,
    defineComponent,
    nextTick,
    reactive,
    toRefs,
    watch,
    watchEffect,
  } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { translateTitle } from '@/utils/i18n'
  import { handleActivePath, handleMatched } from '@/utils/routes'
  import { defaultOpeneds, openFirstMenu, uniqueOpened } from '@/config'
  import variables from '@/vab/styles/variables/variables.scss'
  import { isExternal } from '@/utils/validate'

  export default defineComponent({
    name: 'VabColumnBar',
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()

      const routes = computed(() => store.getters['routes/routes'])
      const activeName = computed(() => store.getters['routes/activeName'])
      const extra = computed(() => store.getters['settings/extra'])
      const theme = computed(() => store.getters['settings/theme'])
      const collapse = computed(() => store.getters['settings/collapse'])
      const handleRoutes = computed(() =>
        routes.value.filter(
          (_route) => _route.meta && _route.meta.hidden !== true
        )
      )
      const handlePartialRoutes = computed(() => {
        const activeMenu = handleActiveMenu()
        return activeMenu ? activeMenu.children : []
      })
      const handleGroupTitle = computed(() => {
        const activeMenu = handleActiveMenu()
        return activeMenu ? activeMenu.meta.title : ''
      })

      const state = reactive({
        activeMenu: '',
        menushow: true,
      })

      const foldSideBar = () => store.dispatch('settings/foldSideBar')
      const openSideBar = () => store.dispatch('settings/openSideBar')
      const handleActiveMenu = () =>
        routes.value.find((_route) => _route.name === extra.value.first)
      const handleTabClick = (handler) => {
        if (handler !== true && openFirstMenu) router.push(handleActiveMenu())
        if (isExternal(handleActiveMenu().path)) {
          window.open(handleActiveMenu().path)
          setTimeout(() => {
            router.push('/')
          }, 1000)
        }
        state.menushow = false
        nextTick(() => (state.menushow = true))
        handleNoColumn()
      }
      const handleNoColumn = () => {
        if (theme.value.layout === 'column' && route.meta.noColumn) {
          foldSideBar()
          if (document.querySelector('.fold-unfold'))
            document.querySelector('.fold-unfold').style = 'display:none'
        } else {
          openSideBar()
          if (document.querySelector('.fold-unfold'))
            document.querySelector('.fold-unfold').style = ''
        }
      }

      watchEffect(() => (state.activeMenu = handleActivePath(route)))

      watch(
        () => route.matched[0].name,
        (name) => {
          state.activeMenu = handleActivePath(route)
          const firstMenu = name
          if (extra.value.first !== firstMenu) {
            extra.value.first = firstMenu
            handleTabClick(true)
          }
          handleNoColumn()
        },
        {
          immediate: true,
        }
      )

      watch(
        () => activeName.value,
        (val) => {
          const matched = handleMatched(routes.value, val)
          extra.value.first = matched[0].name
          state.activeMenu = matched[matched.length - 1].path
        }
      )

      return {
        ...toRefs(state),
        openSideBar,
        foldSideBar,
        extra,
        theme,
        collapse,
        variables,
        handleRoutes,
        uniqueOpened,
        defaultOpeneds,
        handleTabClick,
        handleNoColumn,
        translateTitle,
        handleGroupTitle,
        handlePartialRoutes,
      }
    },
  })
</script>

<style lang="scss" scoped>
  @mixin active {
    &:hover {
      color: var(--el-color-primary);
      background-color: var(--vab-column-second-menu-active) !important;

      i,
      svg {
        color: var(--el-color-primary);
      }
    }

    &.is-active {
      color: var(--el-color-primary);
      background-color: var(--vab-column-second-menu-active) !important;
    }
  }

  .vab-column-bar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    width: $base-left-menu-width;
    height: 100vh;
    overflow: hidden;
    background: var(--vab-column-second-menu-background);
    box-shadow: $base-box-shadow;

    :deep() {
      * {
        transition: $base-transition;
      }
    }

    &-vertical,
    &-card,
    &-arrow {
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

            .vab-column-grid {
              width: $base-left-menu-width-min - 10 !important;
              height: $base-left-menu-width-min - 10 !important;
              border-radius: 5px;
            }

            &.is-active {
              background: transparent !important;

              .vab-column-grid {
                background: var(--el-color-primary);
              }
            }
          }
        }

        .el-tabs + .el-menu {
          left: $base-left-menu-width-min + 10;
          width: $base-left-menu-width - $base-left-menu-width-min - 20;
        }

        .el-sub-menu .el-sub-menu__title,
        .el-menu-item {
          min-width: 180px;
          border-radius: 5px;
        }
      }
    }

    &-arrow {
      :deep() {
        .el-tabs {
          .el-tabs__item {
            &.is-active {
              background: transparent !important;

              .vab-column-grid {
                background: transparent !important;

                &:after {
                  position: absolute;
                  right: 0;
                  width: 0;
                  height: 0;
                  overflow: hidden;
                  content: '';
                  border-color: transparent #{var(--el-color-white)} transparent
                    transparent;
                  border-style: solid dashed dashed;
                  border-width: 8px;
                }
              }
            }
          }
        }

        .el-tabs + .el-menu {
          left: $base-left-menu-width-min + 10;
          width: $base-left-menu-width - $base-left-menu-width-min - 20;
        }

        .el-sub-menu .el-sub-menu__title,
        .el-menu-item {
          min-width: 180px;
          border-radius: 5px;
        }
      }
    }

    .vab-column-grid {
      display: flex;
      align-items: center;
      width: $base-left-menu-width-min;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;

      &-vertical,
      &-card,
      &-arrow {
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
        height: #{math.div($base-left-menu-width-min, 1.3)};
        padding-left: #{math.div($base-padding, 2)};
      }
    }

    :deep() {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      .el-tabs {
        position: fixed;

        .el-tabs__header.is-left {
          margin-right: 0 !important;

          .el-tabs__nav-wrap.is-left {
            margin-right: 0 !important;
            background: var(--vab-column-first-menu-background);

            .el-tabs__nav-scroll {
              height: 100%;
              overflow-y: auto;

              &::-webkit-scrollbar {
                width: 0;
                height: 0;
              }
            }
          }
        }

        .el-tabs__nav {
          height: calc(100vh - #{$base-logo-height});
          background: var(--vab-column-first-menu-background);
        }

        .el-tabs__item {
          height: auto;
          padding: 0;
          color: var(--el-color-white);

          &.is-active {
            background: var(--el-color-primary);
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
            color: var(--el-color-black);
          }
        }

        .el-menu-item,
        .el-sub-menu__title {
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
