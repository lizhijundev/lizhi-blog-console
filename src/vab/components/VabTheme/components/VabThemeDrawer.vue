<template>
  <el-drawer
    v-model="drawerVisible"
    append-to-body
    custom-class="vab-drawer"
    direction="rtl"
    size="280px"
    :title="translateTitle('主题配置')"
  >
    <el-scrollbar>
      <el-form ref="form" label-position="left" :model="theme">
        <el-form-item>
          <template #label>
            {{ translateTitle('布局') }}
            <el-tooltip
              :content="
                translateTitle(
                  '布局配置仅在电脑视窗下生效，手机视窗时将默认锁定为纵向布局'
                )
              "
              effect="dark"
              placement="top"
            >
              <vab-icon icon="question-line" />
            </el-tooltip>
          </template>
          <el-select
            v-model="theme.layout"
            :disabled="device === 'mobile'"
            placeholder="请选择"
          >
            <el-option
              key="column"
              :label="translateTitle('分栏')"
              value="column"
            />
            <el-option
              key="comprehensive"
              :label="translateTitle('综合')"
              value="comprehensive"
            />
            <el-option
              key="vertical"
              :label="translateTitle('纵向')"
              value="vertical"
            />
            <el-option
              key="horizontal"
              :label="translateTitle('横向')"
              value="horizontal"
            />
            <el-option
              key="common"
              :label="translateTitle('常规')"
              value="common"
            />
            <el-option
              key="float"
              :label="translateTitle('浮动')"
              value="float"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="translateTitle('主题')">
          <el-select v-model="theme.themeName" @change="setTheme">
            <el-option
              key="blue-black"
              :label="translateTitle('蓝黑')"
              value="blue-black"
            />
            <el-option
              key="blue-white"
              :label="translateTitle('蓝白')"
              value="blue-white"
            />
            <el-option
              key="green-black"
              :label="translateTitle('绿黑')"
              value="green-black"
            />
            <el-option
              key="green-white"
              :label="translateTitle('绿白')"
              value="green-white"
            />
            <!-- 红黑、红白主题完成群文档任务免费获取 -->
            <el-option
              key="red-black"
              :label="translateTitle('红黑')"
              value="red-black"
            />
            <el-option
              key="red-white"
              :label="translateTitle('红白')"
              value="red-white"
            />
            <el-option
              key="ocean"
              :label="translateTitle('渐变')"
              value="ocean"
            />
          </el-select>
        </el-form-item>
        <el-form-item class="vab-item-custom">
          <template #label>
            {{ translateTitle('菜单背景') }}
            <el-tooltip
              :content="
                translateTitle(
                  '支持纵向布局、分栏布局、综合布局、常规布局，不支持横向布局、浮动布局'
                )
              "
              effect="dark"
              placement="top"
            >
              <vab-icon icon="question-line" />
            </el-tooltip>
          </template>
          <el-radio-group
            v-model="theme.background"
            :disabled="
              theme.layout === 'float' || theme.layout === 'horizontal'
            "
            @change="setTheme"
          >
            <el-radio-button class="none" label="none" />
            <el-radio-button class="vab-background" label="vab-background" />
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="translateTitle('标签')">
          <el-switch v-model="theme.showTabs" />
        </el-form-item>
        <el-form-item>
          <template #label>
            {{ translateTitle('标签图标') }}
            <el-tooltip
              :content="translateTitle('标签开启时生效')"
              effect="dark"
              placement="top"
            >
              <vab-icon icon="question-line" />
            </el-tooltip>
          </template>
          <el-switch v-model="theme.showTabsIcon" :disabled="!theme.showTabs" />
        </el-form-item>
        <el-form-item>
          <template #label>
            {{ translateTitle('标签风格') }}
            <el-tooltip
              :content="translateTitle('标签开启时生效')"
              effect="dark"
              placement="top"
            >
              <vab-icon icon="question-line" />
            </el-tooltip>
          </template>
          <el-select v-model="theme.tabsBarStyle" :disabled="!theme.showTabs">
            <el-option
              key="card"
              :label="translateTitle('卡片')"
              value="card"
            />
            <el-option
              key="smart"
              :label="translateTitle('灵动')"
              value="smart"
            />
            <el-option
              key="smooth"
              :label="translateTitle('圆滑')"
              value="smooth"
            />
          </el-select>
        </el-form-item>
        <el-form-item>
          <template #label>
            {{ translateTitle('分栏风格') }}
            <el-tooltip
              :content="translateTitle('分栏布局时生效')"
              effect="dark"
              placement="top"
            >
              <vab-icon icon="question-line" />
            </el-tooltip>
          </template>
          <el-select
            v-model="theme.columnStyle"
            :disabled="theme.layout !== 'column'"
          >
            <el-option
              key="vertical"
              :label="translateTitle('纵向')"
              value="vertical"
            />
            <el-option
              key="horizontal"
              :label="translateTitle('横向')"
              value="horizontal"
            />
            <el-option
              key="card"
              :label="translateTitle('卡片')"
              value="card"
            />
            <el-option
              key="arrow"
              :label="translateTitle('箭头')"
              value="arrow"
            />
          </el-select>
        </el-form-item>
        <el-form-item :label="translateTitle('头部固定')">
          <el-switch
            v-model="theme.fixedHeader"
            :disabled="theme.layout === 'common'"
          />
        </el-form-item>
        <el-form-item :label="translateTitle('国际化')">
          <el-switch v-model="theme.showLanguage" />
        </el-form-item>
        <el-form-item :label="translateTitle('进度条')">
          <el-switch v-model="theme.showProgressBar" />
        </el-form-item>
        <el-form-item :label="translateTitle('刷新')">
          <el-switch v-model="theme.showRefresh" />
        </el-form-item>
        <el-form-item :label="translateTitle('搜索')">
          <el-switch v-model="theme.showSearch" />
        </el-form-item>
        <el-form-item :label="translateTitle('通知')">
          <el-switch v-model="theme.showNotice" />
        </el-form-item>
        <el-form-item :label="translateTitle('全屏')">
          <el-switch v-model="theme.showFullScreen" />
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <div class="el-drawer__footer">
      <el-button type="primary" @click="handleSaveTheme">
        {{ translateTitle('保存') }}
      </el-button>
      <el-button @click="setDefaultTheme">
        {{ translateTitle('恢复默认') }}
      </el-button>
    </div>
  </el-drawer>
</template>

<script>
  import {
    computed,
    defineComponent,
    getCurrentInstance,
    onBeforeMount,
    onUnmounted,
    ref,
  } from 'vue'
  import { useStore } from 'vuex'
  import { translateTitle } from '@/utils/i18n'
  import _ from 'lodash'

  export default defineComponent({
    name: 'VabThemeDrawer',
    setup() {
      const store = useStore()

      const theme = computed(() => store.getters['settings/theme'])
      const device = computed(() => store.getters['settings/device'])

      const saveTheme = () => store.dispatch('settings/saveTheme')
      const resetTheme = () => store.dispatch('settings/resetTheme')

      const { proxy } = getCurrentInstance()

      const drawerVisible = ref(false)

      const handleOpenTheme = () => {
        drawerVisible.value = true
      }

      const setDefaultTheme = async () => {
        await resetTheme()
        await setTheme()
        drawerVisible.value = false
      }

      const handleSaveTheme = async () => {
        await saveTheme()
        drawerVisible.value = false
      }

      const randomTheme = async () => {
        const loading = proxy.$baseColorfullLoading(0)
        // 随机换肤重置移除主题，防止代码更新影响样式
        await resetTheme()
        const themeNameArray = [
          'blue-black',
          'blue-white',
          'ocean',
          'green-black',
          'green-white',
          'red-black',
          'red-white',
        ]
        theme.value.themeName = _.shuffle(
          _.pull(themeNameArray, [theme.value.themeName])
        )[0]
        const columnStyleArray = ['vertical', 'horizontal', 'card', 'arrow']
        theme.value.columnStyle = _.shuffle(
          _.pull(columnStyleArray, [theme.value.columnStyle])
        )[0]
        const backgroundArray = ['none', 'vab-background']
        theme.value.background = _.shuffle(
          _.pull(backgroundArray, [theme.value.background])
        )
        const tabsBarStyleArray = ['card', 'smart', 'smooth']
        theme.value.tabsBarStyle = _.shuffle(
          _.pull(tabsBarStyleArray, [theme.value.tabsBarStyle])
        )[0]
        const showTabsIconArray = [true, false]
        theme.value.showTabsIcon = _.shuffle(
          _.pull(showTabsIconArray, [theme.value.showTabsIcon])
        )[0]
        if (device.value === 'desktop') {
          const layoutArray = [
            'horizontal',
            'vertical',
            'column',
            'comprehensive',
            'common',
            'float',
          ]
          theme.value.layout = _.shuffle(
            _.pull(layoutArray, [theme.value.layout])
          )[0]
        } else theme.value.layout = 'vertical'
        await setTheme()
        await saveTheme()
        setTimeout(() => {
          loading.close()
        }, 1000)
      }

      const setTheme = () => {
        document.getElementsByTagName(
          'body'
        )[0].className = `vab-theme-${theme.value.themeName}`
        let variables = require('@/vab/styles/variables/vab-blue-variables.scss')
        if (theme.value.themeName.includes('blue-'))
          variables = require('@/vab/styles/variables/vab-blue-variables.scss')
        if (theme.value.themeName.includes('green-'))
          variables = require('@/vab/styles/variables/vab-green-variables.scss')
        if (theme.value.themeName.includes('red-'))
          variables = require('@/vab/styles/variables/vab-red-variables.scss')
        const style = `
            --el-color-primary: ${variables['vab-color-primary']};
            --el-color-primary-light-1: ${variables['vab-color-primary-light-1']};
            --el-color-primary-light-2: ${variables['vab-color-primary-light-2']};
            --el-color-primary-light-3: ${variables['vab-color-primary-light-3']};
            --el-color-primary-light-4: ${variables['vab-color-primary-light-4']};
            --el-color-primary-light-5: ${variables['vab-color-primary-light-5']};
            --el-color-primary-light-6: ${variables['vab-color-primary-light-6']};
            --el-color-primary-light-7: ${variables['vab-color-primary-light-7']};
            --el-color-primary-light-8: ${variables['vab-color-primary-light-8']};
            --el-color-primary-light-9: ${variables['vab-color-primary-light-9']};
            --el-color-success: ${variables['vab-color-success']};
            --el-color-success-light: ${variables['vab-color-success-light']};
            --el-color-success-lighter: ${variables['vab-color-success-lighter']};
            --el-color-warning: ${variables['vab-color-warning']};
            --el-color-warning-light: ${variables['vab-color-warning-light']};
            --el-color-warning-lighter: ${variables['vab-color-warning-lighter']};
            --el-color-danger: ${variables['vab-color-danger']};
            --el-color-danger-light: ${variables['vab-color-danger-light']};
            --el-color-danger-lighter: ${variables['vab-color-danger-lighter']};
            --el-color-error: ${variables['vab-color-error']};
            --el-color-error-light: ${variables['vab-color-error-light']};
            --el-color-error-lighter: ${variables['vab-color-error-lighter']};
            --el-color-info: ${variables['vab-color-info']};
            --el-color-info-light: ${variables['vab-color-info-light']};
            --el-color-info-lighter: ${variables['vab-color-info-lighter']};
            --el-border-radius-base: ${variables['vab-border-radius-base']};
            `
        document.getElementsByTagName('body')[0].setAttribute('style', style)

        //修改背景图
        if (theme.value.background && theme.value.background !== 'none') {
          document.getElementsByTagName(
            'html'
          )[0].className = `${theme.value.background}`
        } else {
          document.getElementsByTagName('html')[0].className = ``
        }
      }

      onBeforeMount(() => {
        setTheme()
        proxy.$sub('theme', () => {
          handleOpenTheme()
        })
        proxy.$sub('random-theme', () => {
          randomTheme()
        })
      })
      onUnmounted(() => {
        proxy.$unsub('theme')
        proxy.$unsub('random-theme')
      })

      return {
        translateTitle,
        theme,
        device,
        drawerVisible,
        handleOpenTheme,
        setDefaultTheme,
        handleSaveTheme,
        randomTheme,
        setTheme,
      }
    },
  })
</script>

<style lang="scss">
  .vab-drawer {
    .el-drawer__header {
      padding: $base-padding$base-padding 0 $base-padding;
      margin-bottom: 0;
    }

    .el-drawer__body {
      .el-scrollbar__wrap {
        height: calc(100vh - 80px);
        padding: $base-padding;

        .el-divider--horizontal {
          margin: $base-margin * 2 0 $base-margin * 2 0;
        }

        .el-form-item {
          display: flex;
          align-items: center;

          .el-form-item__label {
            flex: 1 1;
          }

          .el-form-item__content {
            flex: 0 0 auto;
          }

          @font-face {
            font-family: 'remixicon';
            src: url('~remixicon/fonts/remixicon.eot?t=1590207869815'); /* IE9*/
            src: url('~remixicon/fonts/remixicon.eot?t=1590207869815#iefix')
                format('embedded-opentype'),
              url('~remixicon/fonts/remixicon.woff2?t=1590207869815')
                format('woff2'),
              url('~remixicon/fonts/remixicon.woff?t=1590207869815')
                format('woff'),
              url('~remixicon/fonts/remixicon.ttf?t=1590207869815')
                format('truetype'),
              url('~remixicon/fonts/remixicon.svg?t=1590207869815#remixicon')
                format('svg');
            font-display: swap;
          }

          &.vab-item-custom {
            display: block !important;
          }

          .el-radio-button {
            display: block;
            float: left;
            width: 80px;
            height: 80px;
            margin: 10px;
            cursor: pointer;
            border-radius: 5px;
            &.is-disabled {
              cursor: not-allowed;
              opacity: 0.6;
            }
            &.is-active {
              box-shadow: 0 0 2px 2px #1890ff;
            }
            .el-radio-button__orig-radio,
            .el-radio-button__inner {
              display: none;
            }
            &.none {
              font-family: 'remixicon', sans-serif !important;
              font-size: 16px;
              font-weight: 580;
              line-height: 80px;
              text-align: center;
              background: #f7f7f7 none;
              background-size: cover;
              &:before {
                content: '\eace';
              }
            }
            &.vab-background {
              background: url(~@/assets/theme_images/background-1.png);
              background-size: cover;
            }
          }
        }

        .el-form-item--small.el-form-item {
          .el-input__inner {
            width: 115px;
          }
        }
      }

      .el-drawer__footer {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: $base-z-index + 1;
        padding: math.div($base-padding, 2);
        background: var(--el-color-white);
        border-top: 1px solid $base-border-color;
      }
    }
  }
</style>
