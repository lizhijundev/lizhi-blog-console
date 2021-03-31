/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标，具体配置请查看vip群文档
 */
const List = [
  {
    path: '/',
    name: 'Root',
    component: 'Layout',
    redirect: '/index',
    meta: {
      title: '首页',
      icon: 'home-2-line',
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: '@/views/index',
        meta: {
          title: '首页',
          icon: 'home-2-line',
          noClosable: true,
        },
      },
      {
        path: 'workbench',
        name: 'Workbench',
        component: '@/views/index/workbench',
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
    component: 'Layout',
    redirect: '/vab/roles',
    meta: {
      title: '组件',
      icon: 'code-box-line',
    },
    children: [
      {
        path: 'icon',
        name: 'Icon',
        component: '@/views/vab/icon',
        redirect: '/vab/icon/remixIcon',
        meta: {
          title: '图标',
          icon: 'remixicon-line',
        },
        children: [
          {
            path: 'remixIcon',
            name: 'RemixIcon',
            component: '@/views/vab/icon/remixIcon',
            meta: {
              title: '小清新图标',
            },
          },
          {
            path: 'iconSelector',
            name: 'IconSelector',
            component: '@/views/vab/icon/iconSelector',
            meta: {
              title: '图标选择器',
            },
          },
        ],
      },
      {
        path: 'roles',
        name: 'Role',
        component: '@/views/vab/roles',
        meta: {
          title: '角色权限',
          icon: 'user-3-line',
          badge: 'Pro',
        },
      },
      {
        path: 'table',
        name: 'Table',
        component: '@/views/vab/table',
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
            component: '@/views/vab/table/comprehensiveTable',
            meta: {
              title: '综合表格',
            },
          },
          {
            path: 'detail',
            name: 'Detail',
            component: '@/views/vab/table/detail',
            hidden: true,
            meta: {
              title: '详情页',
              activeMenu: '/vab/table/comprehensiveTable',
              dynamicNewTab: true, //详情页根据id传参不同可打开多个
            },
          },
          {
            path: 'inlineEditTable',
            name: 'InlineEditTable',
            component: '@/views/vab/table/inlineEditTable',
            meta: {
              title: '行内编辑表格',
              noKeepAlive: true,
            },
          },
          {
            path: 'customTable',
            name: 'CustomTable',
            component: '@/views/vab/table/customTable',
            meta: {
              title: '自定义表格',
            },
          },
        ],
      },
      {
        path: 'card',
        name: 'Card',
        component: '@/views/vab/card',
        meta: {
          title: '卡片',
          roles: ['admin'],
          icon: 'inbox-line',
        },
      },
      {
        path: 'list',
        name: 'List',
        component: '@/views/vab/list',
        meta: {
          title: '列表',
          roles: ['admin'],
          icon: 'list-check-2',
        },
      },
      {
        path: 'form',
        name: 'Form',
        component: '@/views/vab/form',
        meta: {
          title: '表单',
          roles: ['admin'],
          icon: 'file-list-2-line',
        },
        children: [
          {
            path: 'comprehensiveForm',
            name: 'ComprehensiveForm',
            component: '@/views/vab/form/comprehensiveForm',
            meta: {
              title: '综合表单',
            },
          },
          {
            path: 'stepForm',
            name: 'StepForm',
            component: '@/views/vab/form/stepForm',
            meta: {
              title: '分步表单',
            },
          },
        ],
      },
      {
        path: 'richTextEditor',
        name: 'RichTextEditor',
        component: '@/views/vab/richTextEditor',
        meta: {
          title: '富文本编辑器',
          roles: ['admin'],
          icon: 'edit-2-line',
        },
      },
    ],
  },
  {
    path: '/other',
    name: 'Other',
    component: 'Layout',
    redirect: '/other/workflow',
    meta: {
      title: '其他',
      icon: 'archive-line',
      roles: ['admin'],
    },
    children: [
      {
        path: 'workflow',
        name: 'Workflow',
        component: '@/views/other/workflow',
        meta: {
          title: '工作流',
          roles: ['admin'],
          icon: 'flow-chart',
        },
      },
      {
        path: 'print',
        name: 'Print',
        component: '@/views/other/print',
        meta: {
          title: '打印',
          roles: ['admin'],
          icon: 'printer-line',
        },
      },
      {
        path: 'cropper',
        name: 'Cropper',
        component: '@/views/other/cropper',
        meta: {
          title: '头像裁剪',
          roles: ['admin'],
          icon: 'crop-line',
        },
      },
      {
        path: 'notice',
        name: 'Notice',
        component: '@/views/other/notice',
        meta: {
          title: '通知',
          roles: ['admin'],
          icon: 'message-2-line',
        },
      },
      {
        path: 'timeline',
        name: 'Timeline',
        component: '@/views/other/timeline',
        meta: {
          title: '时间线',
          roles: ['admin'],
          icon: 'time-line',
        },
      },
      {
        path: 'count',
        name: 'Count',
        component: '@/views/other/count',
        meta: {
          title: '数字自增长',
          roles: ['admin'],
          icon: 'number-9',
        },
      },
      {
        path: 'dynamicMeta',
        name: 'DynamicMeta',
        component: '@/views/other/dynamicMeta',
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
        component: '@/views/other/dynamicSegment',
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
            component: '@/views/other/dynamicSegment/test1',
            hidden: true,
            meta: {
              title: 'Params',
              dynamicNewTab: true,
            },
          },
          {
            path: 'test1/1',
            name: 'test1/1',
            component: '@/views/other/dynamicSegment/test1',
            meta: { title: 'Params id=1' },
          },
          {
            path: 'test2',
            name: 'Test2',
            component: '@/views/other/dynamicSegment/test2',
            hidden: true,
            meta: {
              title: 'Query',
              dynamicNewTab: true,
            },
          },
          {
            path: 'test2?id=1',
            name: 'test2?id=1',
            component: '@/views/other/dynamicSegment/test2',
            meta: { title: 'Query id=1' },
          },
        ],
      },
      {
        path: 'contextmenu',
        name: 'Contextmenu',
        component: '@/views/other/contextmenu',
        meta: {
          title: '右键菜单',
          roles: ['admin'],
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'loading',
        name: 'Loading',
        component: '@/views/other/loading',
        meta: {
          title: '加载',
          roles: ['admin'],
          icon: 'loader-line',
        },
      },
      {
        path: 'player',
        name: 'Player',
        component: '@/views/other/player',
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
        component: '@/views/other/upload',
        meta: {
          title: '上传',
          roles: ['admin'],
          icon: 'chat-upload-line',
        },
      },
      {
        path: 'menu1',
        name: 'Menu1',
        component: '@/views/other/nested/menu1',
        redirect: '/other/menu1/menu1-1/menu1-1-1/menu1-1-1-1',
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
            component: '@/views/other/nested/menu1/menu1-1',
            redirect: '/other/menu1/menu1-1/menu1-1-1/menu1-1-1-1',
            alwaysShow: true,
            meta: {
              title: '多级路由1-1',
            },
            children: [
              {
                path: 'menu1-1-1',
                name: 'Menu1-1-1',
                component: '@/views/other/nested/menu1/menu1-1/menu1-1-1',
                redirect: '/other/menu1/menu1-1/menu1-1-1/menu1-1-1-1',
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
                    component:
                      '@/views/other/nested/menu1/menu1-1/menu1-1-1/menu1-1-1-1',
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
        component: '@/views/other/errorLog',
        meta: {
          title: '错误日志模拟',
          roles: ['admin'],
          icon: 'error-warning-line',
        },
      },
      {
        path: 'cssfx',
        name: 'Cssfx',
        component: '@/views/other/cssfx',
        meta: {
          title: 'Css动画',
          roles: ['admin'],
          icon: 'css3-line',
        },
      },
      {
        path: 'social',
        name: 'Social',
        component: '@/views/other/social',
        meta: {
          title: '第三方登录',
          roles: ['admin'],
          icon: 'github-fill',
        },
      },
      // {
      //   path: 'mobilePreview',
      //   name: 'MobilePreview',
      //   component: '@/views/vab/mobilePreview',
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
        component: '@/views/other/iframe',
        redirect: '/other/iframe/search',
        meta: {
          title: 'Iframe',
          roles: ['admin'],
          icon: 'window-line',
        },
        children: [
          {
            path: 'view',
            name: 'IframeView',
            component: '@/views/other/iframe/view',
            hidden: true,
            meta: {
              title: 'Iframe',
              icon: 'window-line',
              dynamicNewTab: true,
            },
          },
          {
            path: 'view?url=https%3A%2Fwww.baidu.com&title=%E7%99%BE%E5%BA%A6',
            name: 'baiduIframe',
            component: '@/views/other/iframe/view',
            meta: { title: '百度', icon: 'baidu-fill' },
          },
          {
            path:
              'view?url=https%3A%2Fgitee.com%2Fchu1204505056%2Fvue-admin-beautiful&title=Gitee',
            name: 'githubIframe',
            component: '@/views/other/iframe/view',
            meta: { title: 'Gitee', icon: 'github-fill' },
          },
          {
            path: 'search',
            name: 'IframeSearch',
            component: '@/views/other/iframe/search',
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
        component: '@/views/other/excel',
        redirect: '/other/excel/exportExcel',
        meta: {
          title: 'Excel',
          roles: ['admin'],
          icon: 'file-excel-2-line',
        },
        children: [
          {
            path: 'exportExcel',
            name: 'ExportExcel',
            component: '@/views/other/excel/exportExcel',
            meta: {
              title: '导出Excel',
            },
          },
          {
            path: 'exportSelectedExcel',
            name: 'SelectExcel',
            component: '@/views/other/excel/exportSelectExcel',
            meta: {
              title: '导出选中行Excel',
            },
          },
          {
            path: 'exportMergeHeaderExcel',
            name: 'MergeHeaderExcel',
            component: '@/views/other/excel/exportMergeHeaderExcel',
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
    component: 'Layout',
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
        component: '@/views/mall/goods',
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
    component: 'Layout',
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
        component: '@/views/setting/personalCenter',
        meta: {
          title: '个人中心',
          icon: 'map-pin-user-line',
        },
      },
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: '@/views/setting/userManagement',
        meta: {
          title: '用户管理',
          icon: 'user-3-line',
        },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: '@/views/setting/roleManagement',
        meta: {
          title: '角色管理',
          icon: 'admin-line',
        },
      },
      {
        path: 'departmentManagement',
        name: 'DepartmentManagement',
        component: '@/views/setting/departmentManagement',
        meta: {
          title: '部门管理',
          icon: 'group-line',
        },
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: '@/views/setting/menuManagement',
        meta: {
          title: '菜单管理',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'systemLog',
        name: 'SystemLog',
        component: '@/views/setting/systemLog',
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
    component: 'Layout',
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
        component: '@/views/403',
        meta: {
          title: '403',
          icon: 'error-warning-line',
        },
      },
      {
        path: '404',
        name: 'Error404',
        component: '@/views/404',
        meta: {
          title: '404',
          icon: 'error-warning-line',
        },
      },
    ],
  },
]
module.exports = [
  {
    url: '/router/getList',
    type: 'get',
    response() {
      return {
        code: 200,
        msg: 'success',
        data: { list: List },
      }
    },
  },
]
