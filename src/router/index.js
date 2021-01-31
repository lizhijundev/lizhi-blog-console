/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标，具体配置请查看vip群文档
 */
import {
  createRouter,
  createWebHashHistory,
  createWebHistory,
} from 'vue-router'
import Layout from '@/vab/layouts'
import { getNames } from '@/utils/routes'
import { setupGuard } from '@/router/guard'
import { isHashRouterMode, publicPath } from '@/config'

export const constantRoutes = [
  {
    path: '/redirect',
    component: Layout,
    hidden: true,
    meta: {
      title: '首页',
      icon: 'home-2-line',
      affix: true,
    },
    children: [
      {
        path: '',
        component: () => import('@/views/redirect/index'),
      },
    ],
  },
  {
    path: '/login',
    component: () => import('@/views/login'),
    hidden: true,
  },
  {
    path: '/register',
    component: () => import('@/views/register'),
    hidden: true,
  },
  {
    path: '/callback',
    component: () => import('@/views/callback'),
    hidden: true,
  },
  {
    path: '/403',
    name: '403',
    component: () => import('@/views/403'),
    hidden: true,
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404'),
    hidden: true,
  },
]

export const asyncRoutes = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-2-line',
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index'),
        meta: {
          title: '首页',
          icon: 'home-2-line',
          affix: true,
        },
      },
      {
        path: 'workbench',
        name: 'Workbench',
        component: () => import('@/views/index/workbench'),
        meta: {
          title: '工作台',
          icon: 'settings-6-line',
          dot: true,
        },
      },
    ],
  },
  {
    path: '/vab',
    name: 'Vab',
    component: Layout,
    redirect: '/vab/roles',
    meta: {
      title: '组件',
      icon: 'code-box-line',
    },
    children: [
      {
        path: 'icon',
        name: 'Icon',
        component: () => import('@/views/vab/icon'),
        redirect: '/vab/icon/remixIcon',
        meta: {
          title: '图标',
          icon: 'remixicon-line',
        },
        children: [
          {
            path: 'remixIcon',
            name: 'RemixIcon',
            component: () => import('@/views/vab/icon/remixIcon'),
            meta: {
              title: '小清新图标',
            },
          },
          {
            path: 'iconSelector',
            name: 'IconSelector',
            component: () => import('@/views/vab/icon/iconSelector'),
            meta: {
              title: '图标选择器',
            },
          },
        ],
      },
      {
        path: 'roles',
        name: 'Role',
        component: () => import('@/views/vab/roles'),
        meta: {
          title: '角色权限',
          icon: 'user-3-line',
          badge: 'Pro',
        },
      },
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/vab/table'),
        redirect: '/vab/table/comprehensiveTable',
        meta: {
          title: '表格',
          // 非editor角色的用户可见
          roles: {
            role: ['editor'],
            mode: 'except',
          },
          icon: 'table-2',
        },
        children: [
          {
            path: 'comprehensiveTable',
            name: 'ComprehensiveTable',
            component: () => import('@/views/vab/table/comprehensiveTable'),
            meta: {
              title: '综合表格',
            },
          },
          {
            path: 'detail',
            name: 'Detail',
            component: () => import('@/views/vab/table/detail'),
            hidden: true,
            meta: {
              title: '详情页',
              activeMenu: '/vab/table/comprehensiveTable',
              // tabHidden: true,
            },
          },
          {
            path: 'inlineEditTable',
            name: 'InlineEditTable',
            component: () => import('@/views/vab/table/inlineEditTable'),
            meta: {
              title: '行内编辑表格',
              noKeepAlive: true,
            },
          },
          {
            path: 'customTable',
            name: 'CustomTable',
            component: () => import('@/views/vab/table/customTable'),
            meta: {
              title: '自定义表格',
            },
          },
        ],
      },
      {
        path: 'card',
        name: 'Card',
        component: () => import('@/views/vab/card'),
        meta: {
          title: '卡片',
          roles: ['admin'],
          icon: 'inbox-line',
        },
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/vab/list'),
        meta: {
          title: '列表',
          roles: ['admin'],
          icon: 'list-check-2',
        },
      },
      {
        path: 'form',
        name: 'Form',
        component: () => import('@/views/vab/form'),
        meta: {
          title: '表单',
          roles: ['admin'],
          icon: 'file-list-2-line',
        },
        children: [
          {
            path: 'comprehensiveForm',
            name: 'ComprehensiveForm',
            component: () => import('@/views/vab/form/comprehensiveForm'),
            meta: {
              title: '综合表单',
            },
          },
          {
            path: 'stepForm',
            name: 'StepForm',
            component: () => import('@/views/vab/form/stepForm'),
            meta: {
              title: '分步表单',
            },
          },
        ],
      },
      {
        path: 'cropper',
        name: 'Cropper',
        component: () => import('@/views/vab/cropper'),
        meta: {
          title: '头像裁剪',
          roles: ['admin'],
          icon: 'crop-line',
        },
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('@/views/vab/notice'),
        meta: {
          title: '通知',
          roles: ['admin'],
          icon: 'message-2-line',
          badge: 'New',
        },
      },
      {
        path: 'timeline',
        name: 'Timeline',
        component: () => import('@/views/vab/timeline'),
        meta: {
          title: '时间线',
          roles: ['admin'],
          icon: 'time-line',
          badge: 'New',
        },
      },
      {
        path: 'count',
        name: 'Count',
        component: () => import('@/views/vab/count'),
        meta: {
          title: '数字自增长',
          roles: ['admin'],
          icon: 'number-9',
        },
      },
      {
        path: 'dynamicMeta',
        name: 'DynamicMeta',
        component: () => import('@/views/vab/dynamicMeta'),
        meta: {
          title: '动态Meta',
          roles: ['admin'],
          icon: 'notification-badge-line',
          badge: '0',
        },
      },
      {
        path: 'dynamicSegment',
        name: 'DynamicSegment',
        component: () => import('@/views/vab/dynamicSegment'),
        redirect: '/vab/dynamicSegment/test1/1',
        alwaysShow: true,
        meta: {
          title: '动态路径参数',
          roles: ['admin'],
          icon: 'arrow-left-right-line',
        },
        children: [
          {
            path: 'test1/:id',
            name: 'Test1',
            component: () => import('@/views/vab/dynamicSegment/test1'),
            hidden: true,
            meta: {
              title: 'Params',
              dynamicNewTab: true,
            },
          },
          {
            path: 'test1/1',
            name: 'test1/1',
            component: () => import('@/views/vab/dynamicSegment/test1'),
            meta: { title: 'Params id=1' },
          },
          {
            path: 'test2',
            name: 'Test2',
            component: () => import('@/views/vab/dynamicSegment/test2'),
            hidden: true,
            meta: {
              title: 'Query',
              dynamicNewTab: true,
            },
          },
          {
            path: 'test2?id=1',
            name: 'test2?id=1',
            component: () => import('@/views/vab/dynamicSegment/test2'),
            meta: { title: 'Query id=1' },
          },
        ],
      },
      {
        path: 'drag',
        name: 'Drag',
        component: () => import('@/views/vab/drag'),
        redirect: '/vab/drag/dialogDrag',
        meta: {
          title: '拖拽',
          roles: ['admin'],
          icon: 'drag-drop-line',
        },
        children: [
          {
            path: 'cardDrag',
            name: 'CardDrag',
            component: () => import('@/views/vab/drag/cardDrag'),
            meta: {
              title: '卡片拖拽',
            },
          },
          {
            path: 'flowSheetDrag',
            name: 'FlowSheetDrag',
            component: () => import('@/views/vab/drag/flowSheetDrag'),
            meta: {
              title: '流程图拖拽',
              noKeepAlive: true,
            },
          },
        ],
      },
      {
        path: 'richTextEditor',
        name: 'RichTextEditor',
        component: () => import('@/views/vab/richTextEditor'),
        meta: {
          title: '富文本编辑器',
          roles: ['admin'],
          icon: 'edit-2-line',
        },
      },
      {
        path: 'menu1',
        name: 'Menu1',
        component: () => import('@/views/vab/nested/menu1'),
        redirect: '/vab/menu1/menu1-1/menu1-1-1/menu1-1-1-1',
        alwaysShow: true,
        meta: {
          title: '多级路由缓存',
          roles: ['admin'],
          icon: 'route-line',
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu1-1',
            component: () => import('@/views/vab/nested/menu1/menu1-1'),
            redirect: '/vab/menu1/menu1-1/menu1-1-1/menu1-1-1-1',
            alwaysShow: true,
            meta: {
              title: '多级路由1-1',
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu1-1-1',
                component: () =>
                  import('@/views/vab/nested/menu1/menu1-1/menu1-1-1'),
                redirect: '/vab/menu1/menu1-1/menu1-1-1/menu1-1-1-1',
                alwaysShow: true,
                meta: {
                  title: '多级路由1-1-1',
                },
                children: [
                  {
                    path: 'menu1-1-1-1',
                    name: 'Menu1-1-1-1',
                    meta: {
                      title: '多级路由1-1-1-1',
                    },
                    component: () =>
                      import(
                        '@/views/vab/nested/menu1/menu1-1/menu1-1-1/menu1-1-1-1'
                      ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'loading',
        name: 'Loading',
        component: () => import('@/views/vab/loading'),
        meta: {
          title: '加载',
          roles: ['admin'],
          icon: 'loader-line',
        },
      },
      {
        path: 'player',
        name: 'Player',
        component: () => import('@/views/vab/player'),
        meta: {
          title: '视频播放器',
          roles: ['admin'],
          icon: 'video-line',
          noKeepAlive: true,
        },
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/vab/upload'),
        meta: {
          title: '上传',
          roles: ['admin'],
          icon: 'chat-upload-line',
        },
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/vab/errorLog'),
        meta: {
          title: '错误日志模拟',
          roles: ['admin'],
          icon: 'error-warning-line',
        },
      },
      {
        path: 'cssfx',
        name: 'Cssfx',
        component: () => import('@/views/vab/cssfx'),
        meta: {
          title: 'Css动画',
          roles: ['admin'],
          icon: 'css3-line',
        },
      },
      {
        path: 'social',
        name: 'Social',
        component: () => import('@/views/vab/social'),
        meta: {
          title: '第三方登录',
          roles: ['admin'],
          icon: 'github-fill',
        },
      },
      // {
      //   path: 'mobilePreview',
      //   name: 'MobilePreview',
      //   component: () => import('@/views/vab/mobilePreview'),
      //   meta: {
      //     title: '手机预览',
      //     roles: ['admin'],
      //     icon: 'smartphone-line',
      //   },
      // },
      {
        path:
          'https://github.com/chuzhixin/vue-admin-beautiful?utm_source=gold_browser_extension',
        name: 'ExternalLink',
        meta: {
          title: '外链',
          target: '_blank',
          // 等价roles: ['admin', 'editor'],
          roles: {
            role: ['admin', 'editor'],
            mode: 'oneOf',
          },
          icon: 'external-link-line',
        },
      },
      {
        path: 'iframe',
        name: 'Iframe',
        component: () => import('@/views/vab/iframe'),
        meta: {
          title: 'Iframe',
          roles: ['admin'],
          icon: 'window-line',
        },
      },
      {
        path: 'excel',
        name: 'Excel',
        component: () => import('@/views/vab/excel'),
        redirect: '/vab/excel/exportExcel',
        meta: {
          title: 'Excel',
          roles: ['admin'],
          icon: 'file-excel-2-line',
        },
        children: [
          {
            path: 'exportExcel',
            name: 'ExportExcel',
            component: () => import('@/views/vab/excel/exportExcel'),
            meta: {
              title: '导出Excel',
            },
          },
          {
            path: 'exportSelectedExcel',
            name: 'SelectExcel',
            component: () => import('@/views/vab/excel/exportSelectExcel'),
            meta: {
              title: '导出选中行Excel',
            },
          },
          {
            path: 'exportMergeHeaderExcel',
            name: 'MergeHeaderExcel',
            component: () => import('@/views/vab/excel/exportMergeHeaderExcel'),
            meta: {
              title: '导出合并Excel',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/mall',
    name: 'Mall',
    component: Layout,
    redirect: '/mall/goods',
    meta: {
      title: '物料源',
      icon: 'apps-line',
      roles: ['admin'],
    },
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/mall/goods'),
        meta: {
          title: '物料市场',
          icon: 'shopping-cart-line',
          badge: 'Hot',
        },
      },
    ],
  },
  {
    path: '/setting',
    name: 'PersonnelManagement',
    component: Layout,
    redirect: '/setting/userManagement',
    meta: {
      title: '配置',
      icon: 'user-settings-line',
      roles: ['admin'],
    },
    children: [
      {
        path: 'personalCenter',
        name: 'PersonalCenter',
        component: () => import('@/views/setting/personalCenter'),
        meta: {
          title: '个人中心',
          icon: 'map-pin-user-line',
        },
      },
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () => import('@/views/setting/userManagement'),
        meta: {
          title: '用户管理',
          icon: 'user-3-line',
        },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/setting/roleManagement'),
        meta: {
          title: '角色管理',
          icon: 'admin-line',
        },
      },
      {
        path: 'departmentManagement',
        name: 'DepartmentManagement',
        component: () => import('@/views/setting/departmentManagement'),
        meta: {
          title: '部门管理',
          icon: 'group-line',
        },
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: () => import('@/views/setting/menuManagement'),
        meta: {
          title: '菜单管理',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'systemLog',
        name: 'SystemLog',
        component: () => import('@/views/setting/systemLog'),
        meta: {
          title: '系统日志',
          icon: 'file-shield-2-line',
        },
      },
    ],
  },
  {
    path: '/error',
    name: 'Error',
    component: Layout,
    redirect: '/error/403',
    menuHidden: true,
    meta: {
      title: '错误页',
      icon: 'error-warning-line',
    },
    children: [
      {
        path: '403',
        name: 'Error403',
        component: () => import('@/views/403'),
        meta: {
          title: '403',
          icon: 'error-warning-line',
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404'),
        meta: {
          title: '404',
          icon: 'error-warning-line',
        },
      },
    ],
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/404',
    hidden: true,
  },
]

const router = createRouter({
  history: isHashRouterMode
    ? createWebHashHistory(publicPath)
    : createWebHistory(publicPath),
  routes: constantRoutes,
})

function addRouter(routes) {
  routes.forEach((route) => {
    if (!router.hasRoute(route.name)) router.addRoute(route)
    if (route.children) addRouter(route.children)
  })
}

export function resetRouter(routes = constantRoutes) {
  const names = getNames(routes)
  router.getRoutes().forEach((route) => {
    if (route.name && !names.includes(route.name))
      router.removeRoute(route.name)
  })
  addRouter(routes)
}

export function setupRouter(app) {
  app.use(router)
  setupGuard(router)
  return router
}

export default router
