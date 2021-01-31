<template>
  <div class="vab-tabs">
    <vab-fold v-if="layout === 'common'" />
    <el-tabs
      v-model="tabActive"
      :class="{
        ['vab-tabs-content-' + theme.tabsBarStyle]: true,
      }"
      class="vab-tabs-content"
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
          <span v-if="theme.showTabsBarIcon">
            <vab-icon
              v-if="item.meta && item.meta.icon"
              :icon="item.meta.icon"
              :is-custom-svg="item.meta.isCustomSvg"
            />
            <!--  如果没有图标那么取第二级的图标 -->
            <vab-icon v-else :icon="item.parentIcon" />
          </span>
          <span>
            {{ translateTitle(item.meta.title) }}
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
      <span class="more">
        {{ translateTitle('更多') }}
        <vab-icon
          :class="{ 'vab-dropdown-active': active }"
          class="vab-dropdown"
          icon="arrow-down-s-line"
        />
      </span>
      <template #dropdown>
        <el-dropdown-menu class="tabs-more">
          <el-dropdown-item command="closeOthersTabs">
            <vab-icon icon="close-line" />
            {{ translateTitle('关闭其他') }}
          </el-dropdown-item>
          <el-dropdown-item command="closeLeftTabs">
            <vab-icon icon="arrow-left-line" />
            {{ translateTitle('关闭左侧') }}
          </el-dropdown-item>
          <el-dropdown-item command="closeRightTabs">
            <vab-icon icon="arrow-right-line" />
            {{ translateTitle('关闭右侧') }}
          </el-dropdown-item>
          <el-dropdown-item command="closeAllTabs">
            <vab-icon icon="close-line" />
            {{ translateTitle('关闭全部') }}
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script>
  import { computed, ref, watchEffect } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { translateTitle } from '@/utils/i18n'
  import { handleActivePath } from '@/utils/routes'

  export default {
    name: 'VabTabs',
    props: {
      layout: {
        type: String,
        default: '',
      },
    },
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const theme = computed(() => store.getters['settings/theme'])
      const routes = computed(() => store.getters['routes/routes'])
      const visitedRoutes = computed(() => store.getters['tabs/visitedRoutes'])
      const addVisitedRoute = (route) =>
        store.dispatch('tabs/addVisitedRoute', route)
      const delVisitedRoute = (rawPath) =>
        store.dispatch('tabs/delVisitedRoute', rawPath)
      const delOthersVisitedRoutes = (activePath) =>
        store.dispatch('tabs/delOthersVisitedRoutes', activePath)
      const delLeftVisitedRoutes = (activePath) =>
        store.dispatch('tabs/delLeftVisitedRoutes', activePath)
      const delRightVisitedRoutes = (activePath) =>
        store.dispatch('tabs/delRightVisitedRoutes', activePath)
      const delAllVisitedRoutes = (activePath) =>
        store.dispatch('tabs/delAllVisitedRoutes', activePath)

      const tabActive = ref('')
      const active = ref(false)

      const isActive = (path) => {
        return path === handleActivePath(route, true)
      }
      const isAffix = (tag) => {
        return tag.meta && tag.meta.affix
      }
      const handleTabClick = (tab) => {
        if (!isActive(tab.name)) router.push(visitedRoutes.value[tab.index])
      }
      const handleVisibleChange = (val) => {
        active.value = val
      }
      const initAffixTabs = (routes) => {
        routes.forEach((route) => {
          if (route.meta && route.meta.affix) addTabs(route, true)
          if (route.children) initAffixTabs(route.children)
        })
      }
      /**
       * 添加标签页
       * @param tag route
       * @param init 是否是从router获取路由
       * @returns {Promise<void>}
       */
      const addTabs = async (tag, init = false) => {
        let parentIcon = ''
        if (tag.matched && tag.matched.length > 1)
          parentIcon = tag.matched[1].meta.icon
        if (tag.name && tag.meta && tag.meta.tabHidden !== true) {
          const path = handleActivePath(tag, true)
          await addVisitedRoute({
            path: path,
            query: tag.query,
            params: tag.params,
            name: tag.name,
            matched: init
              ? [tag.name]
              : tag.matched.map((item) => item.components.default.name),
            parentIcon,
            meta: { ...tag.meta },
          })
          tabActive.value = path
        }
      }
      /**
       * 根据原生路径删除标签中的标签
       * @param rawPath 原生路径
       * @returns {Promise<void>}
       */
      const handleTabRemove = async (rawPath) => {
        await delVisitedRoute(rawPath)
        if (isActive(rawPath)) toLastTab()
      }
      const handleCommand = (command) => {
        switch (command) {
          case 'closeOthersTabs':
            closeOthersTabs()
            break
          case 'closeLeftTabs':
            closeLeftTabs()
            break
          case 'closeRightTabs':
            closeRightTabs()
            break
          case 'closeAllTabs':
            closeAllTabs()
            break
        }
      }
      /**
       * 删除其他标签页
       * @returns {Promise<void>}
       */
      const closeOthersTabs = async () => {
        await delOthersVisitedRoutes(handleActivePath(route, true))
      }
      /**
       * 删除左侧标签页
       * @returns {Promise<void>}
       */
      const closeLeftTabs = async () => {
        await delLeftVisitedRoutes(handleActivePath(route, true))
      }
      /**
       * 删除右侧标签页
       * @returns {Promise<void>}
       */
      const closeRightTabs = async () => {
        await delRightVisitedRoutes(handleActivePath(route, true))
      }
      /**
       * 删除所有标签页
       * @returns {Promise<void>}
       */
      const closeAllTabs = async () => {
        await delAllVisitedRoutes()
        toLastTab()
      }
      /**
       * 跳转最后一个标签页
       */
      const toLastTab = () => {
        const latestView = visitedRoutes.value.slice(-1)[0]
        if (latestView) router.push(latestView)
        else router.push('/')
      }

      initAffixTabs(routes.value)

      watchEffect(() => {
        addTabs(route)
      })

      return {
        theme,
        active,
        isAffix,
        tabActive,
        visitedRoutes,
        handleCommand,
        handleTabClick,
        translateTitle,
        handleTabRemove,
        handleVisibleChange,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vab-tabs {
    position: relative;
    box-sizing: border-box;
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: space-between;
    height: $base-tabs-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    user-select: none;
    background: $base-color-white;
    border-top: 1px solid #f6f6f6;

    :deep() {
      .fold-unfold {
        margin-right: $base-margin;
      }
    }

    .vab-tabs-content {
      width: calc(100% - 60px);

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
                background: mix($base-color-white, $base-color-blue, 90%);
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
                background: mix($base-color-white, $base-color-blue, 90%);

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
                background: mix($base-color-white, $base-color-blue, 90%);

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
              margin-top: ($base-tabs-height - $base-tag-item-height - 4)/2;
              margin-right: -18px;
              line-height: $base-tag-item-height + 4;
              text-align: center;
              text-align: center;
              border: 0;
              transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

              &.is-active {
                padding: 0 30px 0 30px;
                color: $base-color-blue;
                background: mix($base-color-white, $base-color-blue, 90%);
                mask: url('~@/assets/tabs_images/vab-tab.png');
                mask-size: 100% 100%;

                &:hover {
                  padding: 0 30px 0 30px;
                  color: $base-color-blue;
                  background: mix($base-color-white, $base-color-blue, 90%);
                  mask: url('~@/assets/tabs_images/vab-tab.png');
                  mask-size: 100% 100%;
                }
              }

              &:hover {
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
