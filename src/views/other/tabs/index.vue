<template>
  <div class="tabs-container">
    <el-button type="primary" @click="closeOthersTabs">关闭其他</el-button>
    <el-button type="primary" @click="closeLeftTabs">关闭左侧</el-button>
    <el-button type="primary" @click="closeRightTabs">关闭右侧</el-button>
    <el-button type="primary" @click="closeAllTabs">关闭全部</el-button>
    <el-button type="primary" @click="handleTabRemove(route.path)">
      关闭当前
    </el-button>
  </div>
</template>

<script setup>
  import { handleActivePath } from '@/utils/routes'
  import { useTabsStore } from '@/store/modules/tabs'

  const route = useRoute()
  const router = useRouter()

  const tabStore = useTabsStore()
  const { getVisitedRoutes: visitedRoutes } = storeToRefs(tabStore)
  const {
    delVisitedRoute,
    delOthersVisitedRoutes,
    delLeftVisitedRoutes,
    delRightVisitedRoutes,
    delAllVisitedRoutes,
  } = tabStore

  const hoverRoute = ref(null)
  /**
   * 根据原生路径删除标签中的标签
   * @param rawPath 原生路径
   * @returns {Promise<void>}
   */
  const handleTabRemove = async (rawPath) => {
    if (isActive(rawPath)) await toLastTab()
    await delVisitedRoute(rawPath)
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
  const toLastTab = async () => {
    const latestView = visitedRoutes.value
      .filter((_) => _.path !== handleActivePath(route, true))
      .slice(-1)[0]
    if (latestView) await router.push(latestView)
    else await router.push('/')
  }
  const isActive = (path) => {
    return path === handleActivePath(route, true)
  }
</script>
