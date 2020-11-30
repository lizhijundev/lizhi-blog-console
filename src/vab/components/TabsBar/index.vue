<template>
  <div class="tabs-bar-container">
    <fold v-if="layout === 'common'" />
    <el-tabs
      v-model="tabActive"
      :class="{
        ['tabs-content-' + theme.tabsBarStyle]: true,
      }"
      class="tabs-content"
      type="card"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :closable="!isAffix(item)"
        :name="item.path"
      >
        <template #label>
          <span v-if="theme.showTabsBarRemixIcon">
            <vab-remix-icon
              v-if="item.meta && item.meta.remixIcon"
              :icon="item.meta.remixIcon"
              :is-custom-svg="item.meta.isCustomSvgIcon"
            />
            <!--  如果没有图标那么取第二级的图标 -->
            <vab-remix-icon v-else :icon="item.parentRemixIcon" />
            {{ translateTitle(item.meta.title) }}
          </span>
          <span v-else>
            {{ translateTitle(item.meta.title) }}
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
      <span class="more">
        {{ translateTitle('更多') }}
        <vab-remix-icon
          :class="{ 'vab-dropdown-active': active }"
          class="vab-dropdown"
          icon="arrow-down-s-line"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu class="tabs-more">
          <el-dropdown-item command="closeOthersTabs">
            <vab-remix-icon icon="close-line" />
            {{ translateTitle('关闭其他') }}
          </el-dropdown-item>
          <el-dropdown-item command="closeLeftTabs">
            <vab-remix-icon icon="arrow-left-line" />
            {{ translateTitle('关闭左侧') }}
          </el-dropdown-item>
          <el-dropdown-item command="closeRightTabs">
            <vab-remix-icon icon="arrow-right-line" />
            {{ translateTitle('关闭右侧') }}
          </el-dropdown-item>
          <el-dropdown-item command="closeAllTabs">
            <vab-remix-icon icon="close-line" />
            {{ translateTitle('关闭全部') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'
  import { mapActions, mapGetters } from 'vuex'
  import { handleActivePath } from '@/utils/routes'

  export default {
    name: 'TabsBar',
    props: {
      layout: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        affixTabs: [],
        tabActive: '',
        active: false,
      }
    },
    computed: {
      ...mapGetters({
        visitedRoutes: 'tabsBar/visitedRoutes',
        routes: 'routes/routes',
        theme: 'settings/theme',
      }),
    },
    watch: {
      $route: {
        handler(route) {
          this.$nextTick(() => {
            this.addTabs(route)
          })
        },
        immediate: true,
      },
    },
    created() {
      this.initAffixTabs(this.routes)
    },
    methods: {
      translateTitle,
      ...mapActions({
        addVisitedRoute: 'tabsBar/addVisitedRoute',
        delVisitedRoute: 'tabsBar/delVisitedRoute',
        delOthersVisitedRoutes: 'tabsBar/delOthersVisitedRoutes',
        delLeftVisitedRoutes: 'tabsBar/delLeftVisitedRoutes',
        delRightVisitedRoutes: 'tabsBar/delRightVisitedRoutes',
        delAllVisitedRoutes: 'tabsBar/delAllVisitedRoutes',
      }),
      handleTabClick(tab) {
        if (!this.isActive(tab.name))
          this.$router.push(this.visitedRoutes[tab.index])
      },
      handleVisibleChange(val) {
        this.active = val
      },
      initAffixTabs(routes) {
        routes.forEach((route) => {
          if (route.meta && route.meta.affix) this.addTabs(route, true)
          if (route.children) this.initAffixTabs(route.children)
        })
      },
      /**
       * 添加标签页
       * @param tag route
       * @param init 是否是从router获取路由
       * @returns {Promise<void>}
       */
      async addTabs(tag, init = false) {
        let parentRemixIcon = ''
        if (tag.matched && tag.matched.length > 1)
          parentRemixIcon = tag.matched[1].meta.remixIcon
        if (tag.name && tag.meta && tag.meta.tabHidden !== true) {
          const path = handleActivePath(tag, true)
          await this.addVisitedRoute({
            path: path,
            query: tag.query,
            params: tag.params,
            name: tag.name,
            matched: init
              ? [tag.name]
              : tag.matched.map((item) => item.components.default.name),
            parentRemixIcon,
            meta: { ...tag.meta },
          })
          this.tabActive = path
        }
      },
      /**
       * 根据原生路径删除标签中的标签
       * @param rawPath 原生路径
       * @returns {Promise<void>}
       */
      async handleTabRemove(rawPath) {
        await this.delVisitedRoute(rawPath)
        if (this.isActive(rawPath)) this.toLastTab()
      },
      handleCommand(command) {
        switch (command) {
          case 'closeOthersTabs':
            this.closeOthersTabs()
            break
          case 'closeLeftTabs':
            this.closeLeftTabs()
            break
          case 'closeRightTabs':
            this.closeRightTabs()
            break
          case 'closeAllTabs':
            this.closeAllTabs()
            break
        }
      },
      /**
       * 删除其他标签页
       * @returns {Promise<void>}
       */
      async closeOthersTabs() {
        await this.delOthersVisitedRoutes(handleActivePath(this.$route, true))
      },
      /**
       * 删除左侧标签页
       * @returns {Promise<void>}
       */
      async closeLeftTabs() {
        await this.delLeftVisitedRoutes(handleActivePath(this.$route, true))
      },
      /**
       * 删除右侧标签页
       * @returns {Promise<void>}
       */
      async closeRightTabs() {
        await this.delRightVisitedRoutes(handleActivePath(this.$route, true))
      },
      /**
       * 删除所有标签页
       * @returns {Promise<void>}
       */
      async closeAllTabs() {
        await this.delAllVisitedRoutes()
        if (
          !this.affixTabs.some((tag) =>
            this.isActive(handleActivePath(tag, true))
          )
        )
          this.toLastTab()
      },
      /**
       * 跳转最后一个标签页
       */
      toLastTab() {
        const latestView = this.visitedRoutes.slice(-1)[0]
        if (latestView) this.$router.push(latestView)
        else this.$router.push('/')
      },
      isActive(path) {
        return path === handleActivePath(this.$route, true)
      },
      isAffix(tag) {
        return tag.meta && tag.meta.affix
      },
    },
  }
</script>

<style lang="scss" scoped>
  .tabs-bar-container {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    height: $base-tabs-bar-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    user-select: none;
    background: $base-color-white;
    border-top: 1px solid #f6f6f6;

    :deep() {
      .fold-unfold {
        margin-right: $base-padding;
      }
    }

    .tabs-content {
      width: calc(100% - 70px);

      &-card {
        height: $base-tag-item-height;

        :deep() {
          .el-tabs__nav-next,
          .el-tabs__nav-prev {
            height: $base-tag-item-height;
            line-height: $base-tag-item-height;
          }

          .el-tabs__header {
            border-bottom: 0;

            .el-tabs__nav {
              border: 0;
            }

            .el-tabs__item {
              box-sizing: border-box;
              height: $base-tag-item-height;
              margin-right: 5px;
              line-height: $base-tag-item-height;
              border: 1px solid $base-border-color;
              border-radius: $base-border-radius;
              transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

              &.is-active {
                color: $base-color-blue;
                background: rgba($base-color-blue, 0.1);
                border: 1px solid $base-color-blue;
              }

              &:hover {
                border: 1px solid $base-color-blue;
              }
            }
          }
        }
      }

      &-smart {
        height: $base-tag-item-height;
        :deep() {
          .el-tabs__nav-next,
          .el-tabs__nav-prev {
            height: $base-tag-item-height;
            line-height: $base-tag-item-height;
          }

          .el-tabs__header {
            border-bottom: 0;

            .el-tabs__nav {
              border: 0;
            }

            .el-tabs__item {
              height: $base-tag-item-height;
              margin-right: 5px;
              line-height: $base-tag-item-height;
              border: 0;
              transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;
              &.is-active {
                background: rgba($base-color-blue, 0.1);
                &:after {
                  width: 100%;
                  transition: $base-transition;
                }
              }
              &:after {
                position: absolute;
                bottom: 0;
                left: 0;
                width: 0;
                height: 2px;
                content: '';
                background-color: $base-color-blue;
                transition: $base-transition;
              }
              &:hover {
                background: rgba($base-color-blue, 0.1);
                &:after {
                  width: 100%;
                  transition: $base-transition;
                }
              }
            }
          }
        }
      }

      &-smooth {
        height: $base-tag-item-height + 4;

        :deep() {
          .el-tabs__nav-next,
          .el-tabs__nav-prev {
            height: $base-tag-item-height + 4;
            line-height: $base-tag-item-height + 4;
          }

          .el-tabs__header {
            border-bottom: 0;

            .el-tabs__nav {
              border: 0;
            }

            .el-tabs__item {
              height: $base-tag-item-height + 4;
              padding: 0 30px 0 30px;
              margin-top: ($base-tabs-bar-height - $base-tag-item-height - 4)/2;
              margin-right: -15px;
              line-height: $base-tag-item-height + 4;
              border: 0;
              transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

              &.is-active {
                padding: 0 30px 0 30px;
                color: $base-color-blue;
                background: rgba($base-color-blue, 0.1);
                mask: url('~@/assets/tabs_images/vab-tab.png');
                mask-size: 100% 100%;

                &:hover {
                  padding: 0 30px 0 30px;
                  color: $base-color-blue;
                  background: rgba($base-color-blue, 0.1);
                  mask: url('~@/assets/tabs_images/vab-tab.png');
                  mask-size: 100% 100%;
                }
              }

              &:hover {
                z-index: $base-z-index;
                padding: 0 30px 0 30px;
                color: $base-color-black;
                background: #dee1e6;
                mask: url('~@/assets/tabs_images/vab-tab.png');
                mask-size: 100% 100%;
              }
            }
          }
        }
      }
    }

    .more {
      display: flex;
      align-content: center;
      align-items: center;
      cursor: pointer;
    }
  }
</style>
