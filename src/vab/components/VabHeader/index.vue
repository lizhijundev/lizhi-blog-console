<template>
  <div class="vab-header">
    <div class="vab-main">
      <el-row :gutter="20">
        <el-col :span="6">
          <vab-logo />
        </el-col>
        <el-col :span="18">
          <div class="right-panel">
            <el-menu
              v-if="'horizontal' === layout"
              :active-text-color="variables['menu-color-active']"
              :background-color="variables['menu-background']"
              :default-active="activeMenu"
              :text-color="variables['menu-color']"
              menu-trigger="hover"
              mode="horizontal"
            >
              <template v-for="route in handleRoutes">
                <vab-menu
                  v-if="!route.hidden"
                  :key="route.path"
                  :item="route"
                  :layout="layout"
                />
              </template>
            </el-menu>
            <vab-error-log />
            <vab-search />
            <vab-notice />
            <vab-full-screen />
            <vab-language />
            <vab-theme />
            <vab-refresh />
            <vab-avatar />
          </div>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<script>
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute } from 'vue-router'
  import { handleActivePath } from '@/utils/routes'
  import variables from '@/vab/styles/variables/variables.scss'

  export default {
    name: 'VabHeader',
    props: {
      layout: {
        type: String,
        default: 'horizontal',
      },
    },
    setup() {
      const store = useStore()
      const route = useRoute()
      const routes = computed(() => store.getters['routes/routes'])

      const menuTrigger = ref('hover')

      const activeMenu = computed(() => {
        return handleActivePath(route)
      })

      const handleRoutes = computed(() => {
        return routes.value.flatMap((route) => {
          return route.menuHidden === true && route.children
            ? route.children
            : route
        })
      })

      return {
        variables,
        activeMenu,
        menuTrigger,
        handleRoutes,
      }
    },
  }
</script>
<style lang="scss">
  .el-menu--horizontal {
    .el-menu-item,
    .el-submenu__title {
      height: $base-top-bar-height/1.3 !important;
      padding: 0 $base-padding !important;
      line-height: $base-top-bar-height/1.3 !important;
    }

    [class*='ri-'] {
      margin-left: 0;
      color: rgba($base-color-white, 0.9) !important;
      cursor: pointer !important;
    }

    .el-submenu,
    .el-menu-item {
      i {
        color: inherit !important;
      }

      &.is-active {
        border-bottom: 0 solid transparent !important;

        .el-submenu__title {
          border-bottom: 0 solid transparent !important;
        }
      }
    }

    .el-menu-item {
      &.is-active {
        background: $base-color-blue !important;
      }
    }
  }
</style>

<style lang="scss" scoped>
  .vab-header {
    display: flex;
    align-items: center;
    justify-items: flex-end;
    height: $base-top-bar-height;
    background: $base-menu-background;

    .vab-main {
      padding: 0 $base-padding 0 $base-padding;

      .right-panel {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        height: $base-top-bar-height;

        :deep() {
          > .el-menu--horizontal.el-menu
            > .el-submenu
            > .el-submenu__title
            > .el-submenu__icon-arrow {
            float: right;
            margin-top: ($base-top-bar-height - 11) / 2 !important;
          }

          > .el-menu--horizontal.el-menu > .el-menu-item {
            .el-tag {
              margin-top: $base-top-bar-height / 2 - 7 !important;
              margin-left: 5px;
            }

            .vab-dot {
              float: right;
              margin-top: ($base-top-bar-height - 6) / 2 + 1;
            }

            @media only screen and (max-width: 1199px) {
              .el-tag {
                display: none;
              }
            }
          }

          .el-menu {
            &.el-menu--horizontal {
              * {
                border: 0 !important;
              }

              > .el-menu-item,
              > .el-submenu {
                height: $base-top-bar-height !important;
                line-height: $base-top-bar-height !important;

                > .el-submenu__title {
                  height: $base-top-bar-height !important;
                  line-height: $base-top-bar-height !important;
                }
              }
            }
          }

          .user-name {
            color: rgba($base-color-white, 0.9);
          }

          .user-name + i {
            color: rgba($base-color-white, 0.9);
          }

          [class*='ri-'] {
            margin-left: $base-margin;
            color: rgba($base-color-white, 0.9);
            cursor: pointer;
          }

          button {
            svg {
              margin-right: 0;
              color: rgba($base-color-white, 0.9);
              cursor: pointer;
              fill: rgba($base-color-white, 0.9);
            }
          }
        }
      }
    }
  }
</style>
