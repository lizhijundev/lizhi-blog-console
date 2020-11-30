<template>
  <el-drawer
    :title="translateTitle('主题配置')"
    v-model="drawerVisible"
    append-to-body
    custom-class="vab-drawer"
    direction="rtl"
    size="280px"
  >
    <el-scrollbar class="theme-scrollbar">
      <div class="el-drawer__body">
        <el-form ref="form" :model="theme" label-position="left">
          <el-divider content-position="left">
            <vab-remix-icon icon="settings-3-line" />
            {{ translateTitle('常用设置') }}
          </el-divider>
          <el-form-item>
            <template #label>
              <label class="el-form-item__label">
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
                  <vab-remix-icon icon="question-line" />
                </el-tooltip>
              </label>
            </template>
            <el-select v-model="theme.layout" :disabled="device === 'mobile'">
              <el-option
                key="gallery"
                :label="translateTitle('画廊')"
                value="gallery"
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
            </el-select>
          </el-form-item>
          <el-form-item :label="translateTitle('主题')">
            <el-select v-model="theme.themeName" @change="setTheme">
              <el-option
                key="default"
                :label="translateTitle('默认')"
                value="default"
              />
              <el-option
                key="ocean"
                :label="translateTitle('海洋之心')"
                value="ocean"
              />
              <el-option
                key="green"
                :label="translateTitle('绿荫草场')"
                value="green"
              />
              <el-option
                key="white"
                :label="translateTitle('碰触纯白')"
                value="white"
              />
            </el-select>
          </el-form-item>
          <el-form-item :label="translateTitle('标签')">
            <el-switch v-model="theme.showTabsBar" />
          </el-form-item>
          <el-form-item>
            <template #label>
              <label class="el-form-item__label">
                {{ translateTitle('标签图标') }}
                <el-tooltip
                  :content="translateTitle('标签开启时生效')"
                  effect="dark"
                  placement="top"
                >
                  <vab-remix-icon icon="question-line" />
                </el-tooltip>
              </label>
            </template>
            <el-switch
              v-model="theme.showTabsBarRemixIcon"
              :disabled="!theme.showTabsBar"
            />
          </el-form-item>
          <el-form-item>
            <template #label>
              <label class="el-form-item__label">
                {{ translateTitle('标签风格') }}
                <el-tooltip
                  :content="translateTitle('标签开启时生效')"
                  effect="dark"
                  placement="top"
                >
                  <vab-remix-icon icon="question-line" />
                </el-tooltip>
              </label>
            </template>
            <el-select
              v-model="theme.tabsBarStyle"
              :disabled="!theme.showTabsBar"
            >
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
              <label class="el-form-item__label">
                {{ translateTitle('画廊风格') }}
                <el-tooltip
                  :content="translateTitle('画廊布局时生效')"
                  effect="dark"
                  placement="top"
                >
                  <vab-remix-icon icon="question-line" />
                </el-tooltip>
              </label>
            </template>
            <el-select
              v-model="theme.galleryStyle"
              :disabled="theme.layout !== 'gallery'"
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
            </el-select>
          </el-form-item>
          <el-divider content-position="left" style="margint-top: 20px">
            <vab-remix-icon icon="settings-3-line" />
            {{ translateTitle('其它设置') }}
          </el-divider>
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
      </div>
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
  import { translateTitle } from '@/utils/i18n'
  import { mapGetters } from 'vuex'

  export default {
    name: 'VabThemeDrawer',
    data() {
      return {
        drawerVisible: false,
      }
    },
    computed: {
      ...mapGetters({
        theme: 'settings/theme',
        device: 'settings/device',
      }),
    },
    emits: ['reset', 'save', 'update-theme'],
    methods: {
      translateTitle,
      async setDefaultTheme() {
        this.$emit('reset')
      },
      async handleSaveTheme() {
        this.$emit('save')
      },
      async setTheme() {
        this.$emit('update-theme')
      },
    },
  }
</script>

<style lang="scss" scoped>
  .theme-scrollbar {
    height: calc(100vh - 118px) !important;
    overflow: hidden;
  }
</style>
<style lang="scss">
  .el-drawer__wrapper {
    outline: none !important;

    * {
      outline: none !important;
    }

    .vab-drawer {
      position: fixed;
      z-index: 99999;
      .el-drawer__header {
        margin-bottom: $base-padding;
      }

      .el-drawer__body {
        padding: 0 $base-padding/2 $base-padding/2 $base-padding/2;

        .el-divider--horizontal {
          margin: 28px 0 28px 0;
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
        }

        .el-form-item--small.el-form-item {
          .el-input__inner {
            width: 115px;
          }
        }
      }

      .el-drawer__footer {
        padding: $base-padding/2;
        border-top: 1px solid $base-border-color;
      }
    }
  }
  .el-select--popper {
    z-index: 9999 !important;
  }
</style>
