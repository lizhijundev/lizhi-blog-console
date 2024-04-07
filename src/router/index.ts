/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标，具体配置请查看vip群文档
 */
import type { RouteRecordName, RouteRecordRaw } from 'vue-router'
import type { VabRouteRecord } from '/#/router'
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import Layout from '@vab/layouts/index.vue'
import { setupPermissions } from './permissions'
import { authentication, isHashRouterMode, publicPath } from '@/config'
// import { asyncDemoRoutes } from '@/router/demo.ts'

export const constantRoutes: VabRouteRecord[] = [
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/callback',
    name: 'Callback',
    component: () => import('@/views/callback/index.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/personal',
    name: 'Personal',
    component: Layout,
    meta: {
      title: 'page.home',
      icon: 'home-2-line',
      breadcrumbHidden: true,
      hidden: true,
    },
    children: [
      {
        path: 'center',
        name: 'PersonalCenter',
        component: () => import('@/views/personal/personalCenter/index.vue'),
        meta: {
          title: 'page.personalCenter',
          icon: 'map-pin-user-line',
          hidden: true,
          noColumn: true,
        },
      },
    ],
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403.vue'),
    meta: {
      hidden: true,
    },
  },
  // {
  //   path: '/404',
  //   name: '404',
  //   component: () => import('@/views/404.vue'),
  //   meta: {
  //     hidden: true,
  //   },
  // },
  // {
  //   path: '/:pathMatch(.*)*',
  //   name: '404',
  //   component: () => import('@/views/404.vue'),
  //   meta: {
  //     hidden: true,
  //   },
  // },
]

export const asyncRoutes: VabRouteRecord[] = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    meta: {
      title: 'page.home',
      icon: 'home-2-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: 'page.home',
          icon: 'home-2-line',
          noClosable: true,
        },
      },
    ],
  },
  {
    path: '/setting',
    name: 'SystemManagement',
    component: Layout,
    meta: {
      title: 'page.setting',
      icon: 'user-settings-line',
      guard: ['admin'],
    },
    children: [
      {
        path: 'adminManagement',
        name: 'AdminManagement',
        component: () => import('@/views/setting/adminManagement/index.vue'),
        meta: {
          title: 'page.adminManage',
          icon: 'user-3-line',
        },
      },
      {
        path: 'adminRole',
        name: 'AdminRole',
        component: () => import('@/views/setting/adminRole/index.vue'),
        meta: {
          title: 'page.adminRole',
          icon: 'user-star-line',
        },
      },
      {
        path: 'adminRule',
        name: 'AdminRule',
        component: () => import('@/views/setting/adminRule/index.vue'),
        meta: {
          title: 'page.adminRule',
          icon: 'shield-keyhole-line',
        },
      },
    ],
  },
  // ...asyncDemoRoutes,
]

const router = createRouter({
  history: isHashRouterMode
    ? createWebHashHistory(publicPath)
    : createWebHistory(publicPath),
  routes: constantRoutes as RouteRecordRaw[],
})

function fatteningRoutes(routes: VabRouteRecord[]): VabRouteRecord[] {
  return routes.flatMap((route: VabRouteRecord) => {
    return route.children ? fatteningRoutes(route.children) : route
  })
}

function addRouter(routes: VabRouteRecord[]) {
  routes.forEach((route: VabRouteRecord) => {
    if (!router.hasRoute(route.name)) router.addRoute(route as RouteRecordRaw)
    if (route.children) addRouter(route.children)
  })
}

export function resetRouter(routes: VabRouteRecord[] = constantRoutes) {
  routes.map((route: VabRouteRecord) => {
    if (route.children) route.children = fatteningRoutes(route.children)
  })
  router.getRoutes().forEach(({ name }) => {
    router.hasRoute(<RouteRecordName>name) &&
      router.removeRoute(<RouteRecordName>name)
  })
  console.log('resetRouter', routes)
  console.log('router', router.getRoutes())
  addRouter(routes)
}

export function setupRouter(app: any) {
  if (authentication === 'intelligence') addRouter(asyncRoutes)
  setupPermissions(router)
  app.use(router)
  return router
}

export default router
