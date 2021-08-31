<template>
  <el-scrollbar
    class="vab-side-bar"
    :class="{ 'is-collapse': collapse, 'side-bar-common': layout === 'common' }"
  >
    <vab-logo
      v-if="
        layout === 'vertical' ||
        layout === 'comprehensive' ||
        layout === 'float'
      "
    />
    <el-menu
      :active-text-color="variables['menu-color-active']"
      :background-color="variables['menu-background']"
      :collapse="collapse"
      :collapse-transition="false"
      :default-active="activeMenu"
      :default-openeds="defaultOpeneds"
      menu-trigger="click"
      mode="vertical"
      :text-color="variables['menu-color']"
      :unique-opened="uniqueOpened"
    >
      <template
        v-for="(route, index) in handleRoutes"
        :key="index + route.name"
      >
        <vab-menu v-if="route.meta && !route.meta.hidden" :item="route" />
      </template>
    </el-menu>
  </el-scrollbar>
</template>

<script>
  import { computed, defineComponent, ref, watch, watchEffect } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import { handleActivePath, handleMatched } from '@/utils/routes'
  import { defaultOpeneds, uniqueOpened } from '@/config'
  import variables from '@/vab/styles/variables/variables.scss'

  export default defineComponent({
    name: 'VabSideBar',
    props: {
      layout: {
        type: String,
        default: 'vertical',
      },
    },
    setup(props) {
      const store = useStore()
      const route = useRoute()

      const extra = computed(() => store.getters['settings/extra'])
      const routes = computed(() => store.getters['routes/routes'])
      const activeName = computed(() => store.getters['routes/activeName'])
      const collapse = computed(() => store.getters['settings/collapse'])

      const activeMenu = ref()
      const handleRoutes = computed(() =>
        props.layout === 'comprehensive'
          ? handlePartialRoutes()
          : routes.value.flatMap((_route) =>
              _route.meta && _route.meta.levelHidden === true && _route.children
                ? _route.children
                : _route
            )
      )

      const handlePartialRoutes = () => {
        const activeMenu = routes.value.find(
          (_route) => _route.name === extra.value.first
        )
        return activeMenu ? activeMenu.children : []
      }

      watchEffect(() => (activeMenu.value = handleActivePath(route)))

      watch(
        () => activeName.value,
        (val) => {
          const matched = handleMatched(routes.value, val)
          extra.value.first = matched[0].name
          activeMenu.value = matched[matched.length - 1].path
        }
      )

      return {
        routes,
        collapse,
        variables,
        activeMenu,
        handleRoutes,
        uniqueOpened,
        defaultOpeneds,
      }
    },
  })
</script>

<style lang="scss" scoped>
  @mixin active {
    &:hover {
      color: var(--el-color-white);
      background-color: var(--vab-menu-active);
    }

    &.is-active {
      color: var(--el-color-white);
      background-color: var(--vab-menu-active);
    }
  }

  .vab-side-bar {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: $base-z-index + 1;
    width: $base-left-menu-width;
    height: 100vh;
    overflow: hidden;
    background: var(--vab-menu-background);
    box-shadow: $base-box-shadow;
    transition: $base-transition;

    &.side-bar-common {
      top: $base-top-bar-height;
      height: calc(100vh - #{$base-top-bar-height});
    }

    &.is-collapse {
      width: $base-left-menu-width-min;
      border-right: 0;

      :deep() {
        .el-menu--collapse.el-menu {
          > .el-menu-item,
          > .el-sub-menu {
            text-align: center;

            .el-tag {
              display: none;
            }
          }
        }

        .el-menu-item,
        .el-sub-menu {
          text-align: left;
        }

        .el-menu--collapse {
          border-right: 0;

          .el-sub-menu__icon-arrow {
            right: 10px;
            margin-top: -3px;
          }
        }
      }
    }

    :deep() {
      .el-scrollbar__wrap {
        overflow-x: hidden;
      }

      .el-menu-item,
      .el-sub-menu__title {
        height: $base-menu-item-height;
        overflow: hidden;
        line-height: $base-menu-item-height;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;

        i {
          color: inherit;
        }
      }

      .el-menu-item {
        @include active;
      }
    }
  }
</style>

<!--由于element-plus
bug使用popper-append-to-body=false会导致多级路由无法显示，故所有菜单必须生成至body下，样式必须放到body下-->
<style lang="scss">
  @mixin menuActiveHover {
    &:hover,
    &.is-active {
      i {
        color: var(--el-color-white);
      }

      color: var(--el-color-white);
      background: var(--el-color-primary);

      .el-sub-menu__title {
        i {
          color: var(--el-color-white);
        }

        color: var(--el-color-white);
        background: var(--el-color-primary);
      }
    }
  }

  .el-menu {
    border-right: 0;
  }

  .el-popper {
    .el-menu--vertical {
      .el-menu-item,
      .el-sub-menu {
        height: $base-menu-item-height;
        line-height: $base-menu-item-height;
        text-overflow: ellipsis;
        white-space: nowrap;
        vertical-align: middle;
        @include menuActiveHover;

        i {
          color: inherit;
        }

        .el-sub-menu__title {
          height: $base-menu-item-height;
          line-height: $base-menu-item-height;
          text-overflow: ellipsis;
          white-space: nowrap;
          vertical-align: middle;
          @include menuActiveHover;
        }
      }
    }
  }
</style>
