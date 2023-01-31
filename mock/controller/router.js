/**
 * @description router全局配置，如有必要可分文件抽离，其中asyncRoutes只有在intelligence模式下才会用到，pro版只支持remixIcon图标，具体配置请查看vip群文档
 */
const List = [
  {
    path: '/',
    name: 'Root',
    component: 'Layout',
    meta: {
      title: '首页',
      icon: 'home-2-line',
      breadcrumbHidden: true,
    },
    children: [
      {
        path: 'index',
        name: 'Index',
        component: '@/views/index/index',
        meta: {
          title: '首页',
          icon: 'home-2-line',
          noClosable: true,
        },
      },
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: '@/views/index/dashboard',
        meta: {
          title: '看板',
          icon: 'dashboard-line',
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
      {
        path: 'store',
        name: 'Store',
        component: '@/views/index/store',
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
    component: 'Layout',
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
          {
            path: 'customSvg',
            name: 'CustomSvg',
            component: '@/views/vab/icon/customSvg',
            meta: {
              title: '自定义图标',
            },
          },
        ],
      },
      {
        path: 'permission',
        name: 'Permission',
        component: '@/views/vab/permission/index',
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
            component: '@/views/vab/table/comprehensiveTable',
            meta: {
              title: '综合表格',
            },
          },
          {
            path: 'detail',
            name: 'Detail',
            component: '@/views/vab/table/detail',
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
          {
            path: 'dynamicTable',
            name: 'DynamicTable',
            component: '@/views/vab/table/dynamicTable',
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
        component: '@/views/vab/list/index',
        meta: {
          title: '列表',
          guard: ['Admin'],
          icon: 'list-check-2',
        },
      },
      {
        path: 'description',
        name: 'Description',
        component: '@/views/vab/description/index',
        meta: {
          title: '描述',
          guard: ['Admin'],
          icon: 'slideshow-line',
        },
      },
      {
        path: 'calendar',
        name: 'Calendar',
        component: '@/views/vab/calendar/index',
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
            component: '@/views/vab/editor/wangEditor',
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
          {
            path: 'button',
            name: 'Button',
            component: '@/views/vab/form/button',
            meta: {
              title: '按钮',
            },
          },
          {
            path: 'link',
            name: 'Link',
            component: '@/views/vab/form/link',
            meta: {
              title: '文字链接',
            },
          },
          {
            path: 'radio',
            name: 'Radio',
            component: '@/views/vab/form/radio',
            meta: {
              title: '单选框',
            },
          },
          {
            path: 'checkbox',
            name: 'Checkbox',
            component: '@/views/vab/form/checkbox',
            meta: {
              title: '多选框',
            },
          },
          {
            path: 'input',
            name: 'Input',
            component: '@/views/vab/form/input',
            meta: {
              title: '输入框',
            },
          },
          {
            path: 'inputNumber',
            name: 'InputNumber',
            component: '@/views/vab/form/inputNumber',
            meta: {
              title: '计数器',
            },
          },
          {
            path: 'select',
            name: 'Select',
            component: '@/views/vab/form/select',
            meta: {
              title: '选择器',
              dot: true,
            },
          },
          {
            path: 'switch',
            name: 'Switch',
            component: '@/views/vab/form/switch',
            meta: {
              title: '开关',
            },
          },
          {
            path: 'slider',
            name: 'Slider',
            component: '@/views/vab/form/slider',
            meta: {
              title: '滑块',
            },
          },
          {
            path: 'timePicker',
            name: 'TimePicker',
            component: '@/views/vab/form/timePicker',
            meta: {
              title: '时间选择器',
            },
          },
          {
            path: 'datePicker',
            name: 'DatePicker',
            component: '@/views/vab/form/datePicker',
            meta: {
              title: '日期选择器',
            },
          },
          {
            path: 'dateTimePicker',
            name: 'DateTimePicker',
            component: '@/views/vab/form/dateTimePicker',
            meta: {
              title: '日期时间选择器',
            },
          },
          {
            path: 'rate',
            name: 'Rate',
            component: '@/views/vab/form/rate',
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
    component: 'Layout',
    meta: {
      title: '其他',
      icon: 'archive-line',
      guard: ['Admin'],
    },
    children: [
      {
        path: 'workflow',
        name: 'Workflow',
        component: '@/views/other/workflow/index',
        meta: {
          title: '工作流',
          guard: ['Admin'],
          icon: 'flow-chart',
        },
      },
      {
        path: 'echarts',
        name: 'Echarts',
        component: '@/views/other/echarts/index',
        meta: {
          title: '图表',
          guard: ['Admin'],
          icon: 'bubble-chart-line',
        },
      },
      {
        path: 'print',
        name: 'Print',
        component: '@/views/other/print/index',
        meta: {
          title: '打印',
          guard: ['Admin'],
          icon: 'printer-line',
        },
      },
      {
        path: 'cropper',
        name: 'Cropper',
        component: '@/views/other/cropper/index',
        meta: {
          title: '头像裁剪',
          guard: ['Admin'],
          icon: 'crop-line',
        },
      },
      {
        path: 'notice',
        name: 'Notice',
        component: '@/views/other/notice/index',
        meta: {
          title: '通知',
          guard: ['Admin'],
          icon: 'message-2-line',
        },
      },
      {
        path: 'timeline',
        name: 'Timeline',
        component: '@/views/other/timeline/index',
        meta: {
          title: '时间线',
          guard: ['Admin'],
          icon: 'time-line',
        },
      },
      {
        path: 'count',
        name: 'Count',
        component: '@/views/other/count/index',
        meta: {
          title: '数字自增长',
          guard: ['Admin'],
          icon: 'number-9',
        },
      },
      {
        path: 'tabs',
        name: 'Tabs',
        component: '@/views/other/tabs/index',
        meta: {
          title: '多标签',
          guard: ['Admin'],
          icon: 'bank-card-line',
        },
      },
      {
        path: 'watermark',
        name: 'Watermark',
        component: '@/views/other/watermark/index',
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
        component: '@/views/other/share/index',
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
        component: '@/views/other/dynamicAnchor/index',
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
        component: '@/views/other/dynamicMeta/index',
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
            component: '@/views/other/dynamicSegment/test1',
            meta: {
              hidden: true,
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
            meta: {
              hidden: true,
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
            component: '@/views/other/drag/dialogDrag',
            meta: {
              title: '弹窗拖拽',
              dot: true,
            },
          },
          {
            path: 'cardDrag',
            name: 'CardDrag',
            component: '@/views/other/drag/cardDrag',
            meta: {
              title: '卡片拖拽',
            },
          },
        ],
      },
      {
        path: 'noLayout',
        name: 'NoLayout',
        component: '@/views/other/noLayout/index',
        meta: {
          title: '无框',
          guard: ['Admin'],
          icon: 'aspect-ratio-line',
          dot: true,
        },
      },
      {
        path: 'player',
        name: 'Player',
        component: '@/views/other/player/index',
        meta: {
          title: '视频播放器',
          guard: ['Admin'],
          icon: 'video-line',
          noKeepAlive: true,
        },
      },
      {
        path: 'upload',
        name: 'Upload',
        component: '@/views/other/upload/index',
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
                    component:
                      '@/views/other/nested/menu1/menu1-1/menu1-1-1/menu1-1-1-1/index',
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
        component: '@/views/other/errorLog/index',
        meta: {
          title: '错误日志模拟',
          guard: ['Admin'],
          icon: 'error-warning-line',
        },
      },
      {
        path: 'cssfx',
        name: 'Cssfx',
        component: '@/views/other/cssfx/index',
        meta: {
          title: 'Css动画',
          guard: ['Admin'],
          icon: 'css3-line',
        },
      },
      {
        path: 'social',
        name: 'Social',
        component: '@/views/other/social/index',
        meta: {
          title: '第三方登录',
          guard: ['Admin'],
          icon: 'github-fill',
        },
      },
      // {
      //   path: 'mobilePreview',
      //   name: 'MobilePreview',
      //   component: '@/views/vab/mobilePreview',
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
            component: '@/views/other/iframe/view',
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
        meta: {
          title: 'Excel',
          guard: ['Admin'],
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
        component: '@/views/mall/goods/index',
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
    component: 'Layout',
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
        component: '@/views/noColumn/deleteColumn/index',
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
    component: 'Layout',
    meta: {
      title: '配置',
      icon: 'user-settings-line',
      guard: ['Admin'],
    },
    children: [
      {
        path: 'personalCenter',
        name: 'PersonalCenter',
        component: '@/views/setting/personalCenter/index',
        meta: {
          title: '个人中心',
          icon: 'map-pin-user-line',
        },
      },
      {
        path: 'userManagement',
        name: 'UserManagement',
        component: '@/views/setting/userManagement/index',
        meta: {
          title: '用户管理',
          icon: 'user-3-line',
        },
      },
      {
        path: 'roleManagement',
        name: 'RoleManagement',
        component: '@/views/setting/roleManagement/index',
        meta: {
          title: '角色管理',
          icon: 'admin-line',
        },
      },
      {
        path: 'departmentManagement',
        name: 'DepartmentManagement',
        component: '@/views/setting/departmentManagement/index',
        meta: {
          title: '部门管理',
          icon: 'group-line',
        },
      },
      {
        path: 'menuManagement',
        name: 'MenuManagement',
        component: '@/views/setting/menuManagement/index',
        meta: {
          title: '菜单管理',
          icon: 'menu-2-fill',
        },
      },
      {
        path: 'dictionaryManagement',
        name: 'DictionaryManagement',
        component: '@/views/setting/dictionaryManagement/index',
        meta: {
          title: '字典管理',
          icon: 'book-2-line',
          dot: true,
        },
      },
      {
        path: 'taskManagement',
        name: 'TaskManagement',
        component: '@/views/setting/taskManagement/index',
        meta: {
          title: '任务管理',
          icon: 'task-line',
          badge: 'New',
        },
      },
      {
        path: 'systemLog',
        name: 'SystemLog',
        component: '@/views/setting/systemLog/index',
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
    component: 'Layout',
    meta: {
      title: '工具',
      icon: 'tools-line',
      levelHidden: true,
      guard: ['Admin'],
    },
    children: [
      {
        path: 'eyeDropper',
        name: 'EyeDropper',
        component: '@/views/tools/EyeDropper.vue',
        meta: {
          title: '取色器',
          icon: 'contrast-drop-line',
        },
      },
      {
        path: 'speechSynthesis',
        name: 'SpeechSynthesis',
        component: '@/views/tools/SpeechSynthesis.vue',
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
    component: 'Layout',
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
        component: '@/views/github/githubExternalLink/index',
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
    component: 'Layout',
    meta: {
      title: '错误页',
      icon: 'error-warning-line',
      levelHidden: true,
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
