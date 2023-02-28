<script lang="ts" setup>
  import { translate } from '@/i18n'
  import { useSettingsStore } from '@/store/modules/settings'

  const $sub: any = inject('$sub')
  const $unsub: any = inject('$unsub')
  const $baseLoading: any = inject('$baseLoading')

  const settingsStore: any = useSettingsStore()
  const { theme, device }: any = storeToRefs(settingsStore)
  const { saveTheme, resetTheme, updateTheme }: any = settingsStore

  const state = reactive({
    drawerVisible: false,
  })

  const handleOpenTheme = () => {
    state.drawerVisible = true
  }

  const updateMenuWidth = () => {
    useCssVar('--el-left-menu-width', ref(null)).value = theme.value.menuWidth
  }

  const setDefaultTheme = async () => {
    await resetTheme()
    await updateTheme()
    state.drawerVisible = false
    if (document.body.getBoundingClientRect().width - 1 < 992) location.reload()
  }

  const handleSaveTheme = async () => {
    await saveTheme()
    state.drawerVisible = false
    if (document.body.getBoundingClientRect().width - 1 < 992) location.reload()
  }

  const shuffle = (val: string | boolean, list: (string | boolean)[]) =>
    list.filter((_) => _ !== val)[(Math.random() * (list.length - 1)) | 0]

  const randomTheme = async () => {
    const loading = $baseLoading(0)
    // 随机换肤重置移除主题，防止代码更新影响样式
    await resetTheme()

    theme.value.themeName = shuffle(theme.value.themeName, [
      'blue-black',
      'blue-white',
      'ocean',
      'green-black',
      'green-white',
      'purple-black',
      'purple-white',
      'red-black',
      'red-white',
    ])
    theme.value.columnStyle = shuffle(theme.value.columnStyle, [
      'vertical',
      'horizontal',
      'card',
      'arrow',
    ])
    // theme.value.background = shuffle(theme.value.background, [
    //   'none',
    //   'vab-background',
    // ])
    theme.value.tabsBarStyle = shuffle(theme.value.tabsBarStyle, [
      'card',
      'smart',
      'smooth',
    ])
    theme.value.showTabsIcon = shuffle(theme.value.showTabsIcon, [true, false])
    theme.value.layout =
      device.value === 'desktop'
        ? shuffle(theme.value.layout, [
            'horizontal',
            'vertical',
            'column',
            'comprehensive',
            'common',
            'float',
          ])
        : 'vertical'

    try {
      await updateTheme()
      await saveTheme()
    } finally {
      setTimeout(() => {
        loading.close()
      }, 1000)
    }
  }

  $sub('theme', () => {
    handleOpenTheme()
  })
  $sub('random-theme', () => {
    randomTheme()
  })

  onBeforeUnmount(() => {
    $unsub('theme')
    $unsub('random-theme')
  })
</script>

<template>
  <el-drawer
    v-model="state.drawerVisible"
    append-to-body
    class="vab-drawer"
    direction="rtl"
    size="285px"
    :title="translate('主题配置')"
  >
    <el-scrollbar height="88vh">
      <el-form ref="form" label-position="left" :model="theme">
        <el-form-item>
          <template #label>
            {{ translate('布局') }}
            <el-tooltip
              :content="
                translate(
                  '布局配置仅' +
                    '在电脑视窗下生效，手机视窗时将' +
                    '默认锁定为纵向布局'
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
            <el-option key="column" :label="translate('分栏')" value="column" />
            <el-option
              key="comprehensive"
              :label="translate('综合')"
              value="comprehensive"
            />
            <el-option
              key="vertical"
              :label="translate('纵向')"
              value="vertical"
            />
            <el-option
              key="horizontal"
              :label="translate('横向')"
              value="horizontal"
            />
            <el-option key="common" :label="translate('常规')" value="common" />
            <el-option key="float" :label="translate('浮动')" value="float" />
          </el-select>
        </el-form-item>
        <el-form-item :label="translate('主题')">
          <el-select v-model="theme.themeName" @change="updateTheme">
            <el-option
              key="blue-black"
              :label="translate('蓝黑')"
              value="blue-black"
            />
            <el-option
              key="blue-white"
              :label="translate('蓝白')"
              value="blue-white"
            />
            <el-option
              key="green-black"
              :label="translate('绿黑')"
              value="green-black"
            />
            <el-option
              key="green-white"
              :label="translate('绿白')"
              value="green-white"
            />
            <el-option
              key="purple-black"
              :label="translate('紫黑')"
              value="purple-black"
            />
            <el-option
              key="purple-white"
              :label="translate('紫白')"
              value="purple-white"
            />
            <!-- 红黑、红白主题完成群文档任务免费获取 -->
            <el-option
              key="red-black"
              :label="translate('红黑')"
              value="red-black"
            />
            <el-option
              key="red-white"
              :label="translate('红白')"
              value="red-white"
            />
            <el-option key="ocean" :label="translate('渐变')" value="ocean" />
          </el-select>
        </el-form-item>
        <el-form-item class="vab-item-custom">
          <template #label>
            {{ translate('菜单背景') }}
            <el-tooltip
              :content="
                translate(
                  '支持纵向布局' +
                    '、分栏布局、综合' +
                    '布局、常规布局，不支持横' +
                    '向布局、浮动' +
                    '布局'
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
            @change="updateTheme"
          >
            <el-radio-button class="none" label="none" />
            <el-radio-button class="vab-background" label="vab-background" />
          </el-radio-group>
        </el-form-item>
        <el-form-item :label="translate('菜单宽度')">
          <el-select
            v-model="theme.menuWidth"
            :disabled="
              theme.layout === 'float' || theme.layout === 'horizontal'
            "
            @change="updateMenuWidth"
          >
            <el-option key="266px" label="266px" value="266px" />
            <el-option key="277px" label="277px" value="277px" />
            <el-option key="288px" label="288px" value="288px" />
          </el-select>
        </el-form-item>
        <el-form-item :label="translate('标签')">
          <el-switch v-model="theme.showTabs" />
        </el-form-item>
        <el-form-item>
          <template #label>
            {{ translate('标签图标') }}
            <el-tooltip
              :content="translate('标签开启时生效')"
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
            {{ translate('标签风格') }}
            <el-tooltip
              :content="translate('标签开启时生效')"
              effect="dark"
              placement="top"
            >
              <vab-icon icon="question-line" />
            </el-tooltip>
          </template>
          <el-select v-model="theme.tabsBarStyle" :disabled="!theme.showTabs">
            <el-option key="card" :label="translate('卡片')" value="card" />
            <el-option key="smart" :label="translate('灵动')" value="smart" />
            <el-option key="smooth" :label="translate('圆滑')" value="smooth" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <template #label>
            {{ translate('分栏风格') }}
            <el-tooltip
              :content="translate('分栏布局时生效')"
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
              :label="translate('纵向')"
              value="vertical"
            />
            <el-option
              key="horizontal"
              :label="translate('横向')"
              value="horizontal"
            />
            <el-option key="card" :label="translate('卡片')" value="card" />
            <el-option key="arrow" :label="translate('箭头')" value="arrow" />
          </el-select>
        </el-form-item>
        <el-form-item :label="translate('头部固定')">
          <el-switch
            v-model="theme.fixedHeader"
            :disabled="theme.layout === 'common'"
          />
        </el-form-item>
        <el-form-item :label="translate('国际化')">
          <el-switch v-model="theme.showLanguage" />
        </el-form-item>
        <el-form-item :label="translate('进度条')">
          <el-switch v-model="theme.showProgressBar" />
        </el-form-item>
        <el-form-item :label="translate('刷新')">
          <el-switch v-model="theme.showRefresh" />
        </el-form-item>
        <el-form-item :label="translate('搜索')">
          <el-switch v-model="theme.showSearch" />
        </el-form-item>
        <el-form-item :label="translate('通知')">
          <el-switch v-model="theme.showNotice" />
        </el-form-item>
        <el-form-item :label="translate('全屏')">
          <el-switch v-model="theme.showFullScreen" />
        </el-form-item>
        <el-form-item :label="translate('锁屏')">
          <el-switch v-model="theme.showLock" />
        </el-form-item>
        <el-form-item :label="translate('页面动画')">
          <el-switch v-model="theme.showPageTransition" />
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <el-button type="primary" @click="handleSaveTheme">
        {{ translate('保存') }}
      </el-button>
      <el-button @click="setDefaultTheme">
        {{ translate('恢复默认') }}
      </el-button>
    </template>
  </el-drawer>
</template>

<style lang="scss">
  @use 'sass:math';
  .vab-drawer {
    .el-drawer__header {
      padding: $base-padding $base-padding 0 $base-padding;
      margin-bottom: 0;
    }

    .el-drawer__body {
      padding-right: 0;

      .el-scrollbar__wrap {
        height: calc(100vh - 80px);
        padding-right: $base-padding;

        .el-divider--horizontal {
          margin: $base-margin * 2 0 $base-margin * 2 0;
        }

        .el-form-item {
          display: flex;
          align-items: center;

          &__label {
            flex: 1 1;
            i {
              cursor: pointer;
            }
          }

          &__content {
            flex: 0 0 auto;
          }

          &.vab-item-custom {
            display: block !important;
            height: 130px;
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

          .el-input__inner {
            width: 115px;
          }
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
</style>
