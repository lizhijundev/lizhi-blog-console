<template>
  <div class="vab-tabs">
    <vab-fold v-if="layout === 'common'" />
    <el-tabs
      v-model="tabActive"
      class="vab-tabs-content"
      :class="{
        ['vab-tabs-content-' + theme.tabsBarStyle]: true,
      }"
      type="card"
      @tab-click="handleTabClick"
      @tab-remove="handleTabRemove"
    >
      <el-tab-pane
        v-for="item in visitedRoutes"
        :key="item.path"
        :closable="!isNoCLosable(item)"
        :name="item.path"
      >
        <template #label>
          <span
            style="display: inline-block"
            @contextmenu.prevent="openMenu($event, item)"
          >
            <template v-if="theme.showTabsBarIcon">
              <vab-icon
                v-if="item.meta && item.meta.icon"
                :icon="item.meta.icon"
                :is-custom-svg="item.meta.isCustomSvg"
              />
              <!--  如果没有图标那么取第二级的图标 -->
              <vab-icon v-else :icon="item.parentIcon" />
            </template>
            <span>
              {{ translateTitle(item.meta.title) }}
            </span>
          </span>
        </template>
      </el-tab-pane>
    </el-tabs>

    <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
      <span class="vab-tabs-more" :class="{ 'vab-tabs-more-active': active }">
        <span class="vab-tabs-more-icon">
          <i class="box box-t"></i>
          <i class="box box-b"></i>
        </span>
      </span>
      <template #dropdown>
        <el-dropdown-menu class="tabs-more">
          <el-dropdown-item command="closeOthersTabs">
            <vab-icon icon="close-line" />
            <span>
              {{ translateTitle('关闭其他') }}
            </span>
          </el-dropdown-item>
          <el-dropdown-item command="closeLeftTabs">
            <vab-icon icon="arrow-left-line" />
            <span>
              {{ translateTitle('关闭左侧') }}
            </span>
          </el-dropdown-item>
          <el-dropdown-item command="closeRightTabs">
            <vab-icon icon="arrow-right-line" />
            <span>
              {{ translateTitle('关闭右侧') }}
            </span>
          </el-dropdown-item>
          <el-dropdown-item command="closeAllTabs">
            <vab-icon icon="close-line" />
            <span>
              {{ translateTitle('关闭全部') }}
            </span>
          </el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
    <ul
      v-if="visible"
      class="contextmenu el-dropdown-menu el-dropdown-menu--small"
      :style="{ left: left + 'px', top: top + 'px' }"
    >
      <li
        class="el-dropdown-menu__item"
        :class="{ 'is-disabled': visitedRoutes.length === 1 }"
        @click="closeOthersTabs"
      >
        <vab-icon icon="close-line" />
        <span>{{ translateTitle('关闭其他') }}</span>
      </li>
      <li
        class="el-dropdown-menu__item"
        :class="{ 'is-disabled': !visitedRoutes.indexOf(hoverRoute) }"
        @click="closeLeftTabs"
      >
        <vab-icon icon="arrow-left-line" />
        <span>{{ translateTitle('关闭左侧') }}</span>
      </li>
      <li
        class="el-dropdown-menu__item"
        :class="{
          'is-disabled':
            visitedRoutes.indexOf(hoverRoute) === visitedRoutes.length - 1,
        }"
        @click="closeRightTabs"
      >
        <vab-icon icon="arrow-right-line" />
        <span>{{ translateTitle('关闭右侧') }}</span>
      </li>
      <li class="el-dropdown-menu__item" @click="closeAllTabs">
        <vab-icon icon="close-line" />
        <span>{{ translateTitle('关闭全部') }}</span>
      </li>
    </ul>
  </div>
</template>

<script>
  import { computed, getCurrentInstance, ref, watch, watchEffect } from 'vue'
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

      const addVisitedRoute = (_route) =>
        store.dispatch('tabs/addVisitedRoute', _route)
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

      const { proxy } = getCurrentInstance()

      const tabActive = ref('')
      const active = ref(false)

      const hoverRoute = ref(null)
      const visible = ref(false)
      const top = ref(0)
      const left = ref(0)

      const isActive = (path) => path === handleActivePath(route, true)
      const isNoCLosable = (tag) => tag.meta && tag.meta.noClosable
      const handleTabClick = (tab) => {
        if (!isActive(tab.name)) router.push(visitedRoutes.value[tab.index])
      }
      const handleVisibleChange = (val) => {
        active.value = val
      }
      const initNoCLosableTabs = (routes) => {
        routes.forEach((_route) => {
          if (_route.meta && _route.meta.noClosable) addTabs(_route, true)
          if (_route.children) initNoCLosableTabs(_route.children)
        })
      }
      /**
       * 添加标签页
       * @param tag route
       * @param init 是否是从router获取路由
       * @returns {Promise<void>}
       */
      const addTabs = async (tag, init = false) => {
        let parentIcon = null
        if (tag.matched)
          for (let i = tag.matched.length - 2; i >= 0; i--)
            if (!parentIcon && tag.matched[i].meta.icon)
              parentIcon = tag.matched[i].meta.icon
        if (!parentIcon) parentIcon = 'menu-line'
        if (tag.name && tag.meta.title && tag.meta.tabHidden !== true) {
          const path = handleActivePath(tag, true)
          await addVisitedRoute({
            path: path,
            query: tag.query,
            params: tag.params,
            name: tag.name,
            matched: init
              ? [tag.name]
              : tag.matched.map((_route) => _route.components.default.name),
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
        if (isActive(rawPath)) await toLastTab()
        await delVisitedRoute(rawPath)
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
        if (hoverRoute.value) {
          await router.push(hoverRoute.value)
          await delOthersVisitedRoutes(hoverRoute.value.path)
        } else await delOthersVisitedRoutes(handleActivePath(route, true))
        await closeMenu()
      }
      /**
       * 删除左侧标签页
       * @returns {Promise<void>}
       */
      const closeLeftTabs = async () => {
        if (hoverRoute.value) {
          await router.push(hoverRoute.value)
          await delLeftVisitedRoutes(hoverRoute.value.path)
        } else await delLeftVisitedRoutes(handleActivePath(route, true))
        await closeMenu()
      }
      /**
       * 删除右侧标签页
       * @returns {Promise<void>}
       */
      const closeRightTabs = async () => {
        if (hoverRoute.value) {
          await router.push(hoverRoute.value)
          await delRightVisitedRoutes(hoverRoute.value.path)
        } else await delRightVisitedRoutes(handleActivePath(route, true))
        await closeMenu()
      }
      /**
       * 删除所有标签页
       * @returns {Promise<void>}
       */
      const closeAllTabs = async () => {
        await delAllVisitedRoutes()
        await toLastTab()
        await closeMenu()
      }
      /**
       * 跳转最后一个标签页
       */
      const toLastTab = async () => {
        const latestView = visitedRoutes.value
          .filter((_) => _.path !== handleActivePath(route, true))
          .slice(-1)[0]
        if (latestView) await router.push(latestView)
        else await router.push('/')
      }
      const openMenu = (e, item) => {
        const offsetLeft = proxy.$el.getBoundingClientRect().left
        const offsetWidth = proxy.$el.offsetWidth
        const maxLeft = Math.round(offsetWidth)
        const leftTemp = Math.round(e.clientX - offsetLeft)
        if (leftTemp > maxLeft) left.value = maxLeft
        else left.value = leftTemp
        top.value = Math.round(e.clientY - 60)
        hoverRoute.value = item
        hoverRoute.value.path = item.path
        visible.value = true
      }
      const closeMenu = () => {
        visible.value = false
        hoverRoute.value = null
      }

      initNoCLosableTabs(routes.value)

      watch(
        () => route.fullPath,
        () => {
          addTabs(route)
        },
        {
          immediate: true,
        }
      )
      watchEffect(() => {
        if (visible.value) document.body.addEventListener('click', closeMenu)
        else document.body.removeEventListener('click', closeMenu)
      })

      return {
        top,
        left,
        theme,
        active,
        visible,
        openMenu,
        closeMenu,
        tabActive,
        hoverRoute,
        isNoCLosable,
        visitedRoutes,
        handleCommand,
        closeAllTabs,
        closeLeftTabs,
        closeRightTabs,
        closeOthersTabs,
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
    min-height: $base-tabs-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    user-select: none;
    background: $base-color-white;
    border-top: 1px solid #f6f6f6;

    :deep() {
      .fold-unfold {
        margin-right: $base-margin;
      }

      [class*='ri'] {
        margin-right: 3px;
      }
    }

    &-content {
      width: calc(100% - 40px);

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
                outline: none;
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
              outline: none;
              transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

              &.is-active {
                background: mix($base-color-white, $base-color-blue, 90%);
                outline: none;

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
              margin-top: #{math.div(
                  $base-tabs-height - $base-tag-item-height - 4,
                  2
                )};
              margin-right: -18px;
              line-height: $base-tag-item-height + 4;
              text-align: center;
              border: 0;
              outline: none;
              transition: padding 0.3s cubic-bezier(0.645, 0.045, 0.355, 1) !important;

              &.is-active {
                padding: 0 30px 0 30px;
                color: $base-color-blue;
                background: mix($base-color-white, $base-color-blue, 90%);
                outline: none;
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

    .contextmenu {
      position: absolute;
      top: 0;
      left: 0;
      z-index: 10;
    }

    &-more {
      position: relative;
      box-sizing: border-box;

      &-active,
      &:hover {
        &:after {
          position: absolute;
          bottom: 0;
          left: 0;
          height: 0;
          content: '';
        }

        .vab-tabs-more-icon {
          transform: rotate(90deg);

          .box-t {
            &:before {
              transform: rotate(45deg);
            }
          }

          .box:before,
          .box:after {
            background: $base-color-blue;
          }
        }
      }

      &-icon {
        display: inline-block;
        color: #9a9a9a;
        cursor: pointer;
        transition: transform 0.3s ease-out;

        .box {
          position: relative;
          display: block;
          width: 14px;
          height: 8px;

          &:before {
            position: absolute;
            top: 2px;
            left: 0;
            width: 6px;
            height: 6px;
            content: '';
            background: #9a9a9a;
          }

          &:after {
            position: absolute;
            top: 2px;
            left: 8px;
            width: 6px;
            height: 6px;
            content: '';
            background: #9a9a9a;
          }
        }

        .box-t {
          &:before {
            transition: transform 0.3s ease-out 0.3s;
          }
        }
      }
    }
  }
</style>
