<template>
  <el-scrollbar
    :class="{
      'is-collapse': collapse,
      'gallery-bar-container-vertical': 'vertical' === theme.galleryStyle,
      'gallery-bar-container-horizontal': 'horizontal' === theme.galleryStyle,
    }"
    class="gallery-bar-container"
  >
    <logo />
    <el-tabs
      v-model="firstMenu"
      tab-position="left"
      @tab-click="handleTabClick"
    >
      <el-tab-pane
        v-for="item in handleRoutes"
        :key="item.path"
        :name="item.path"
      >
        <template #label>
          <div
            :class="'gallery-grid-' + theme.galleryStyle"
            :title="translateTitle(item.meta.title)"
            class="gallery-grid"
          >
            <div>
              <vab-remix-icon
                v-if="item.meta.remixIcon"
                :icon="item.meta.remixIcon"
                :is-custom-svg="item.meta.isCustomSvgIcon"
                class="vab-remix-icon"
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
      :background-color="variables['gallery-second-menu-background']"
      :default-active="activeMenu"
      :default-openeds="defaultOpeneds"
      :unique-opened="uniqueOpened"
      mode="vertical"
    >
      <el-divider>
        {{ translateTitle(groupTitle) }}
      </el-divider>
      <vab-menu
        v-for="route in partialRoutes"
        :key="route.path"
        :item="route"
      />
    </el-menu>
  </el-scrollbar>
</template>
<script>
  import { translateTitle } from '@/utils/i18n'
  import variables from '@/vab/styles/variables/variables.scss'
  import { mapActions, mapGetters } from 'vuex'
  import { defaultOpeneds, openFirstMenu, uniqueOpened } from '@/config'
  import { handleActivePath } from '@/utils/routes'

  export default {
    name: 'GalleryBar',
    data() {
      return {
        activeMenu: '',
        firstMenu: '',
        groupTitle: '',
        defaultOpeneds,
        uniqueOpened,
        variables,
      }
    },
    computed: {
      ...mapGetters({
        collapse: 'settings/collapse',
        partialRoutes: 'routes/partialRoutes',
        routes: 'routes/routes',
        theme: 'settings/theme',
      }),
      handleRoutes() {
        return this.routes.filter((item) => item.hidden !== true && item.meta)
      },
    },
    watch: {
      $route: {
        handler(route) {
          this.activeMenu = handleActivePath(route)
          const firstMenu = route.matched[0].path || '/'
          if (this.firstMenu !== firstMenu) {
            this.firstMenu = firstMenu
            this.handleTabClick({ paneName: firstMenu }, true)
          }
        },
        immediate: true,
      },
    },
    methods: {
      translateTitle,
      ...mapActions({
        setPartialRoutes: 'routes/setPartialRoutes',
      }),
      handleTabClick(tab, handler) {
        const childrenArr = this.routes.find(
          (item) => item.path === tab.paneName
        ).children
        this.setPartialRoutes(childrenArr)
        if (handler !== true && openFirstMenu) {
          this.$router.push(childrenArr[0].path)
          this.$store.dispatch('settings/openSideBar')
        }
        this.groupTitle = this.routes.find(
          (item) => item.path === tab.paneName
        ).meta.title
      },
    },
  }
</script>
<style lang="scss" scoped>
  @mixin active {
    &:hover {
      color: $base-color-blue;
      background-color: $base-gallery-second-menu-background-active !important;

      i,
      svg {
        color: $base-color-blue;
      }
    }

    &.is-active {
      color: $base-color-blue;
      background-color: $base-gallery-second-menu-background-active !important;
    }
  }

  .gallery-bar-container {
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: $base-z-index;
    width: $base-left-menu-width;
    height: 100vh;
    overflow: hidden;
    background: $base-gallery-second-menu-background;
    box-shadow: $base-box-shadow;

    &-vertical {
      :deep() {
        .el-tabs + .el-menu {
          left: $base-left-menu-width-min;
          width: calc(#{$base-left-menu-width} - #{$base-left-menu-width-min});
          border: 0;
        }
      }
    }

    &-horizontal {
      :deep() {
        .logo-container-gallery {
          .logo {
            width: $base-left-menu-width-min * 1.3 !important;
          }

          .title {
            margin-left: $base-left-menu-width-min * 1.3 !important;
          }
        }

        .el-tabs + .el-menu {
          left: $base-left-menu-width-min * 1.3;
          width: calc(
            #{$base-left-menu-width} - #{$base-left-menu-width-min} * 1.3
          );
          border: 0;
        }
      }
    }

    .gallery-grid {
      display: flex;
      align-items: center;
      width: $base-left-menu-width-min;
      overflow: hidden;
      text-overflow: ellipsis;
      word-break: break-all;
      white-space: nowrap;

      &-vertical {
        justify-content: center;
        height: $base-left-menu-width-min;

        > div {
          svg,
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
          margin-right: 0 !important;

          .el-tabs__nav-wrap.is-left {
            margin-right: 0 !important;
          }
        }

        .el-tabs__nav {
          height: calc(100vh - #{$base-logo-height});
          background: $base-gallery-first-menu-background;
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
          margin: 0 0 $base-padding 0;
          background-color: #f6f6f6;

          &__text {
            color: $base-color-black;
          }
        }

        .vab-remix-icon {
          font-size: $base-font-size-default + 2;
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
