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
    path: '/register',
    name: 'Register',
    component: () => import('@/views/register/index.vue'),
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
    path: '/403',
    name: '403',
    component: () => import('@/views/403.vue'),
    meta: {
      hidden: true,
    },
  },
  {
    path: '/404',
    name: '404',
    component: () => import('@/views/404.vue'),
    meta: {
      hidden: true,
    },
  },
]

export const asyncRoutes: VabRouteRecord[] = [
  {
    path: '/',
    name: 'Root',
    component: Layout,
    meta: {
      title: '首页',
      icon: 'home-2-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: () => import('@/views/index/index.vue'),
        meta: {
          title: '首页',
          icon: 'home-2-line',
          noClosable: true,
        },
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/index/dashboard.vue'),
        meta: {
          title: '看板',
          icon: 'dashboard-line',
        },
      },
      {
        path: 'workbench',
        name: 'Workbench',
        component: () => import('@/views/index/workbench.vue'),
        meta: {
          title: '工作台',
          icon: 'settings-6-line',
          dot: true,
        },
      },
      {
        path: 'store',
        name: 'Store',
        component: () => import('@/views/index/store.vue'),
        meta: {
          title: '仓库',
          icon: 'app-store-line',
          dot: true,
        },
      },
    ],
  },
  {
    path: '/vab',
    name: 'Vab',
    component: Layout,
    meta: {
      title: '组件',
      icon: 'code-box-line',
    },
    children: [
      {
        path: 'icon',
        name: 'Icon',
        meta: {
          title: '图标',
          icon: 'remixicon-line',
        },
        children: [
          {
            path: 'remixIcon',
            name: 'RemixIcon',
            component: () => import('@/views/vab/icon/remixIcon.vue'),
            meta: {
              title: '小清新图标',
            },
          },
          {
            path: 'iconSelector',
            name: 'IconSelector',
            component: () => import('@/views/vab/icon/iconSelector.vue'),
            meta: {
              title: '图标选择器',
            },
          },
          {
            path: 'customSvg',
            name: 'CustomSvg',
            component: () => import('@/views/vab/icon/customSvg.vue'),
            meta: {
              title: '自定义图标',
            },
          },
        ],
      },
      {
        path: 'permission',
        name: 'Permission',
        component: () => import('@/views/vab/permission/index.vue'),
        meta: {
          title: '角色权限',
          icon: 'user-3-line',
          badge: 'Pro',
        },
      },
      {
        path: 'table',
        name: 'Table',
        meta: {
          title: '表格',
          // 非editor角色的用户可见
          guard: {
            role: ['Editor'],
            mode: 'except',
          },
          icon: 'table-2',
        },
        children: [
          {
            path: 'comprehensiveTable',
            name: 'ComprehensiveTable',
            component: () => import('@/views/vab/table/comprehensiveTable.vue'),
            meta: {
              title: '综合表格',
            },
          },
          {
            path: 'detail',
            name: 'Detail',
            component: () => import('@/views/vab/table/detail.vue'),
            meta: {
              hidden: true,
              title: '详情页',
              activeMenu: '/vab/table/comprehensiveTable',
              dynamicNewTab: true, //详情页根据id传参不同可打开多个
            },
          },
          {
            path: 'inlineEditTable',
            name: 'InlineEditTable',
            component: () => import('@/views/vab/table/inlineEditTable.vue'),
            meta: {
              title: '行内编辑表格',
              noKeepAlive: true,
            },
          },
          {
            path: 'customTable',
            name: 'CustomTable',
            component: () => import('@/views/vab/table/customTable.vue'),
            meta: {
              title: '自定义表格',
            },
          },
          {
            path: 'dynamicTable',
            name: 'DynamicTable',
            component: () => import('@/views/vab/table/dynamicTable.vue'),
            meta: {
              title: '动态表格',
              badge: 'New',
            },
          },
        ],
      },
      {
        path: 'list',
        name: 'List',
        component: () => import('@/views/vab/list/index.vue'),
        meta: {
          title: '列表',
          guard: ['Admin'],
          icon: 'list-check-2',
        },
      },
      {
        path: 'description',
        name: 'Description',
        component: () => import('@/views/vab/description/index.vue'),
        meta: {
          title: '描述',
          guard: ['Admin'],
          icon: 'slideshow-line',
        },
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: () => import('@/views/vab/calendar/index.vue'),
        meta: {
          title: '日历',
          guard: ['Admin'],
          icon: 'calendar-check-line',
          dot: true,
        },
      },
      {
        path: 'editor',
        name: 'Editor',
        meta: {
          title: '编辑器',
          guard: ['Admin'],
          icon: 'edit-2-line',
        },
        children: [
          {
            path: 'wangEditor',
            name: 'WangEditor',
            component: () => import('@/views/vab/editor/wangEditor.vue'),
            meta: {
              title: '腾讯文档',
              guard: ['Admin'],
              dot: true,
            },
          },
        ],
      },
      {
        path: 'form',
        name: 'Form',
        meta: {
          title: '表单',
          guard: ['Admin'],
          icon: 'file-list-2-line',
        },
        children: [
          {
            path: 'comprehensiveForm',
            name: 'ComprehensiveForm',
            component: () => import('@/views/vab/form/comprehensiveForm.vue'),
            meta: {
              title: '综合表单',
            },
          },
          {
            path: 'stepForm',
            name: 'StepForm',
            component: () => import('@/views/vab/form/stepForm.vue'),
            meta: {
              title: '分步表单',
            },
          },
          {
            path: 'button',
            name: 'Button',
            component: () => import('@/views/vab/form/button.vue'),
            meta: {
              title: '按钮',
            },
          },
          {
            path: 'link',
            name: 'Link',
            component: () => import('@/views/vab/form/link.vue'),
            meta: {
              title: '文字链接',
            },
          },
          {
            path: 'radio',
            name: 'Radio',
            component: () => import('@/views/vab/form/radio.vue'),
            meta: {
              title: '单选框',
            },
          },
          {
            path: 'checkbox',
            name: 'Checkbox',
            component: () => import('@/views/vab/form/checkbox.vue'),
            meta: {
              title: '多选框',
            },
          },
          {
            path: 'input',
            name: 'Input',
            component: () => import('@/views/vab/form/input.vue'),
            meta: {
              title: '输入框',
            },
          },
          {
            path: 'inputNumber',
            name: 'InputNumber',
            component: () => import('@/views/vab/form/inputNumber.vue'),
            meta: {
              title: '计数器',
            },
          },
          {
            path: 'select',
            name: 'Select',
            component: () => import('@/views/vab/form/select.vue'),
            meta: {
              title: '选择器',
              dot: true,
            },
          },
          {
            path: 'switch',
            name: 'Switch',
            component: () => import('@/views/vab/form/switch.vue'),
            meta: {
              title: '开关',
            },
          },
          {
            path: 'slider',
            name: 'Slider',
            component: () => import('@/views/vab/form/slider.vue'),
            meta: {
              title: '滑块',
            },
          },
          {
            path: 'timePicker',
            name: 'TimePicker',
            component: () => import('@/views/vab/form/timePicker.vue'),
            meta: {
              title: '时间选择器',
            },
          },
          {
            path: 'datePicker',
            name: 'DatePicker',
            component: () => import('@/views/vab/form/datePicker.vue'),
            meta: {
              title: '日期选择器',
            },
          },
          {
            path: 'dateTimePicker',
            name: 'DateTimePicker',
            component: () => import('@/views/vab/form/dateTimePicker.vue'),
            meta: {
              title: '日期时间选择器',
            },
          },
          {
            path: 'rate',
            name: 'Rate',
            component: () => import('@/views/vab/form/rate.vue'),
            meta: {
              title: '评分',
            },
          },
        ],
      },
    ],
  },
  {
    path: '/other',
    name: 'Other',
    component: Layout,
    meta: {
      title: '其他',
      icon: 'archive-line',
      guard: ['Admin'],
    },
    children: [
      {
        path: 'workflow',
        name: 'Workflow',
        component: () => import('@/views/other/workflow/index.vue'),
        meta: {
          title: '工作流',
          guard: ['Admin'],
          icon: 'flow-chart',
        },
      },
      {
        path: 'echarts',
        name: 'Echarts',
        component: () => import('@/views/other/echarts/index.vue'),
        meta: {
          title: '图表',
          guard: ['Admin'],
          icon: 'bubble-chart-line',
        },
      },
      {
        path: 'print',
        name: 'Print',
        component: () => import('@/views/other/print/index.vue'),
        meta: {
          title: '打印',
          guard: ['Admin'],
          icon: 'printer-line',
        },
      },
      {
        path: 'notice',
        name: 'Notice',
        component: () => import('@/views/other/notice/index.vue'),
        meta: {
          title: '通知',
          guard: ['Admin'],
          icon: 'message-2-line',
        },
      },
      {
        path: 'timeline',
        name: 'Timeline',
        component: () => import('@/views/other/timeline/index.vue'),
        meta: {
          title: '时间线',
          guard: ['Admin'],
          icon: 'time-line',
        },
      },
      {
        path: 'tabs',
        name: 'Tabs',
        component: () => import('@/views/other/tabs/index.vue'),
        meta: {
          title: '多标签',
          guard: ['Admin'],
          icon: 'bank-card-line',
        },
      },
      {
        path: 'watermark',
        name: 'Watermark',
        component: () => import('@/views/other/watermark/index.vue'),
        meta: {
          title: '水印',
          guard: ['Admin'],
          icon: 'water-flash-line',
          dot: true,
        },
      },
      {
        path: 'share',
        name: 'Share',
        component: () => import('@/views/other/share/index.vue'),
        meta: {
          title: '分享',
          guard: ['Admin'],
          icon: 'share-line',
          dot: true,
        },
      },
      {
        path: 'dynamicAnchor',
        name: 'DynamicAnchor',
        component: () => import('@/views/other/dynamicAnchor/index.vue'),
        meta: {
          title: '动态锚点',
          guard: ['Admin'],
          icon: 'anchor-line',
          badge: 'New',
        },
      },
      {
        path: 'dynamicMeta',
        name: 'DynamicMeta',
        component: () => import('@/views/other/dynamicMeta/index.vue'),
        meta: {
          title: '动态Meta',
          guard: ['Admin'],
          icon: 'notification-badge-line',
          badge: '0',
        },
      },
      {
        path: 'dynamicSegment',
        name: 'DynamicSegment',
        redirect: '/other/dynamicSegment/test1/1',
        meta: {
          title: '动态路径参数',
          guard: ['Admin'],
          icon: 'arrow-left-right-line',
        },
        children: [
          {
            path: 'test1/:id',
            name: 'Test1',
            component: () => import('@/views/other/dynamicSegment/test1.vue'),
            meta: {
              hidden: true,
              title: 'Params',
              dynamicNewTab: true,
            },
          },
          {
            path: 'test1/1',
            name: 'test1/1',
            component: () => import('@/views/other/dynamicSegment/test1.vue'),
            meta: { title: 'Params id=1' },
          },
          {
            path: 'test2',
            name: 'Test2',
            component: () => import('@/views/other/dynamicSegment/test2.vue'),
            meta: {
              hidden: true,
              title: 'Query',
              dynamicNewTab: true,
            },
          },
          {
            path: 'test2?id=1',
            name: 'test2?id=1',
            component: () => import('@/views/other/dynamicSegment/test2.vue'),
            meta: { title: 'Query id=1' },
          },
        ],
      },
      {
        path: 'drag',
        name: 'Drag',
        meta: {
          title: '拖拽',
          guard: ['Admin'],
          icon: 'drag-drop-line',
        },
        children: [
          {
            path: 'dialogDrag',
            name: 'DialogDrag',
            component: () => import('@/views/other/drag/dialogDrag.vue'),
            meta: {
              title: '弹窗拖拽',
              dot: true,
            },
          },
          {
            path: 'cardDrag',
            name: 'CardDrag',
            component: () => import('@/views/other/drag/cardDrag.vue'),
            meta: {
              title: '卡片拖拽',
            },
          },
        ],
      },
      {
        path: 'noLayout',
        name: 'NoLayout',
        component: () => import('@/views/other/noLayout/index.vue'),
        meta: {
          title: '无框',
          guard: ['Admin'],
          icon: 'aspect-ratio-line',
          dot: true,
        },
      },
      {
        path: 'upload',
        name: 'Upload',
        component: () => import('@/views/other/upload/index.vue'),
        meta: {
          title: '上传',
          guard: ['Admin'],
          icon: 'chat-upload-line',
        },
      },
      {
        path: 'menu1',
        name: 'Menu1',
        meta: {
          title: '多级路由缓存',
          guard: ['Admin'],
          icon: 'route-line',
        },
        children: [
          {
            path: 'menu1-1',
            name: 'Menu11',
            meta: {
              title: '多级路由1-1',
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu111',
                meta: {
                  title: '多级路由1-1-1',
                },
                children: [
                  {
                    path: 'menu1-1-1-1',
                    name: 'Menu1111',
                    meta: {
                      title: '多级路由1-1-1-1',
                    },
                    component: () =>
                      import(
                        '@/views/other/nested/menu1/menu1-1/menu1-1-1/menu1-1-1-1/index.vue'
                      ),
                  },
                ],
              },
            ],
          },
        ],
      },
      {
        path: 'log',
        name: 'Log',
        component: () => import('@/views/other/errorLog/index.vue'),
        meta: {
          title: '错误日志模拟',
          guard: ['Admin'],
          icon: 'error-warning-line',
        },
      },
      {
        path: 'cssfx',
        name: 'Cssfx',
        component: () => import('@/views/other/cssfx/index.vue'),
        meta: {
          title: 'Css动画',
          guard: ['Admin'],
          icon: 'css3-line',
        },
      },
      {
        path: 'social',
        name: 'Social',
        component: () => import('@/views/other/social/index.vue'),
        meta: {
          title: '第三方登录',
          guard: ['Admin'],
          icon: 'github-fill',
        },
      },
      // {
      //   path: 'mobilePreview',
      //   name: 'MobilePreview',
      //   component: () => import('@/views/vab/mobilePreview.vue'),
      //   meta: {
      //     title: '手机预览',
      //     guard: ['Admin'],
      //     icon: 'smartphone-line',
      //   },
      // },
      {
        path: '//github.com/chuzhixin/vue-admin-beautiful?utm_source=gold_browser_extension',
        name: 'ExternalLink',
        meta: {
          title: '外链',
          target: '_blank',
          // 等价guard: ['Admin', 'Editor'],
          guard: {
            role: ['Admin', 'Editor'],
            mode: 'oneOf',
          },
          icon: 'external-link-line',
        },
      },
      {
        path: 'iframe',
        name: 'Iframe',
        redirect: '/other/iframe/search',
        meta: {
          title: 'Iframe',
          guard: ['Admin'],
          icon: 'window-line',
        },
        children: [
          {
            path: 'view',
            name: 'IframeView',
            component: () => import('@/views/other/iframe/view.vue'),
            meta: {
              hidden: true,
              title: 'Iframe',
              icon: 'window-line',
              dynamicNewTab: true,
            },
          },
          {
            path: 'view?url=www.so.com&title=360%E6%90%9C%E7%B4%A2&icon=search-2-line',
            name: 'Search360Iframe',
            meta: { title: '360搜索', icon: 'search-2-line' },
          },
          {
            path: 'view?url=www.bilibili.com&title=%E5%93%94%E5%93%A9%E5%93%94%E5%93%A9&icon=bilibili-line',
            name: 'BiliBiliIframe',
            meta: { title: '哔哩哔哩', icon: 'bilibili-line' },
          },
          {
            path: 'search',
            name: 'IframeSearch',
            component: () => import('@/views/other/iframe/search.vue'),
            meta: {
              title: '自定义Iframe',
              icon: 'search-2-line',
            },
          },
        ],
      },
      {
        path: 'excel',
        name: 'Excel',
        meta: {
          title: 'Excel',
          guard: ['Admin'],
          icon: 'file-excel-2-line',
        },
        children: [
          {
            path: 'exportExcel',
            name: 'ExportExcel',
            component: () => import('@/views/other/excel/exportExcel.vue'),
            meta: {
              title: '导出Excel',
            },
          },
          {
            path: 'exportSelectedExcel',
            name: 'SelectExcel',
            component: () =>
              import('@/views/other/excel/exportSelectExcel.vue'),
            meta: {
              title: '导出选中行Excel',
            },
          },
          {
            path: 'exportMergeHeaderExcel',
            name: 'MergeHeaderExcel',
            component: () =>
              import('@/views/other/excel/exportMergeHeaderExcel.vue'),
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
    meta: {
      title: '物料源',
      icon: 'apps-line',
      levelHidden: true,
      guard: ['Admin'],
    },
    children: [
      {
        path: 'goods',
        name: 'Goods',
        component: () => import('@/views/mall/goods/index.vue'),
        meta: {
          title: '物料市场',
          icon: 'shopping-cart-line',
          badge: 'Hot',
        },
      },
    ],
  },
  {
    path: '/noColumn',
    name: 'NoColumn',
    component: Layout,
    meta: {
      title: '无分栏',
      icon: 'delete-column',
      guard: ['Admin'],
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'deleteColumn',
        name: 'DeleteColumn',
        component: () => import('@/views/noColumn/deleteColumn/index.vue'),
        meta: {
          title: '无分栏',
          icon: 'delete-column',
          noColumn: true,
        },
      },
    ],
  },
  {
    path: '/setting',
    name: 'PersonnelManagement',
    component: Layout,
    meta: {
      title: '配置',
      icon: 'user-settings-line',
      guard: ['Admin'],
    },
    children: [
      {
        path: 'personalCenter',
        name: 'PersonalCenter',
        component: () => import('@/views/setting/personalCenter/index.vue'),
        meta: {
          title: '个人中心',
          icon: 'map-pin-user-line',
        },
      },
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: () => import('@/views/setting/userManagement/index.vue'),
        meta: {
          title: '用户管理',
          icon: 'user-3-line',
        },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: () => import('@/views/setting/roleManagement/index.vue'),
        meta: {
          title: '角色管理',
          icon: 'admin-line',
        },
      },
      {
        path: 'departmentManagement',
        name: 'DepartmentManagement',
        component: () =>
          import('@/views/setting/departmentManagement/index.vue'),
        meta: {
          title: '部门管理',
          icon: 'group-line',
        },
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: () => import('@/views/setting/menuManagement/index.vue'),
        meta: {
          title: '菜单管理',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'dictionaryManagement',
        name: 'DictionaryManagement',
        component: () =>
          import('@/views/setting/dictionaryManagement/index.vue'),
        meta: {
          title: '字典管理',
          icon: 'book-2-line',
          dot: true,
        },
      },
      {
        path: 'taskManagement',
        name: 'TaskManagement',
        component: () => import('@/views/setting/taskManagement/index.vue'),
        meta: {
          title: '任务管理',
          icon: 'task-line',
          badge: 'New',
        },
      },
      {
        path: 'systemLog',
        name: 'SystemLog',
        component: () => import('@/views/setting/systemLog/index.vue'),
        meta: {
          title: '系统日志',
          icon: 'file-shield-2-line',
        },
      },
    ],
  },
  {
    path: '/tools',
    name: 'Tools',
    component: Layout,
    meta: {
      title: '工具',
      icon: 'tools-line',
      guard: ['Admin'],
    },
    children: [
      {
        path: 'eyeDropper',
        name: 'EyeDropper',
        component: () => import('@/views/tools/EyeDropper.vue'),
        meta: {
          title: '取色器',
          icon: 'contrast-drop-line',
        },
      },
      {
        path: 'speechSynthesis',
        name: 'SpeechSynthesis',
        component: () => import('@/views/tools/SpeechSynthesis.vue'),
        meta: {
          title: '语音合成',
          icon: 'customer-service-line',
        },
      },
    ],
  },
  {
    path: '//github.com/chuzhixin/vue-admin-beautiful?utm_source=gold_browser_extension',
    name: 'Github',
    component: Layout,
    meta: {
      title: '外链',
      icon: 'external-link-line',
      guard: ['Admin'],
      target: '_blank',
      breadcrumbHidden: true,
      noColumn: true,
    },
    children: [
      {
        path: '//github.com/chuzhixin/vue-admin-beautiful?utm_source=gold_browser_extension',
        name: 'GithubExternalLink',
        component: () => import('@/views/github/githubExternalLink/index.vue'),
        meta: {
          title: '外链',
          icon: 'external-link-line',
          noColumn: true,
          target: '_blank',
        },
      },
    ],
  },

  {
    path: '/error',
    name: 'Error',
    component: Layout,
    meta: {
      title: '错误页',
      icon: 'error-warning-line',
      levelHidden: true,
    },
    children: [
      {
        path: '403',
        name: 'Error403',
        component: () => import('@/views/403.vue'),
        meta: {
          title: '403',
          icon: 'error-warning-line',
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: () => import('@/views/404.vue'),
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
    name: 'NotFound',
    meta: {
      hidden: true,
    },
  },
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
  addRouter(routes)
}

export function setupRouter(app: any) {
  if (authentication === 'intelligence') addRouter(asyncRoutes)
  setupPermissions(router)
  app.use(router)
  return router
}

export default router
