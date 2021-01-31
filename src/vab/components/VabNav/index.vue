<template>
  <div class="vab-nav">
    <el-row :gutter="15">
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="4">
        <div class="left-panel">
          <vab-fold />
          <el-tabs
            v-if="layout === 'comprehensive'"
            v-model="extra.first"
            tab-position="top"
            @tab-click="handleTabClick"
          >
            <el-tab-pane
              v-for="item in handleRoutes"
              :key="item.name"
              :name="item.name"
            >
              <template #label>
                <vab-icon
                  v-if="item.meta.icon"
                  :icon="item.meta.icon"
                  :is-custom-svg="item.meta.isCustomSvg"
                  style="min-width: 16px"
                />
                <span>{{ translateTitle(item.meta.title) }}</span>
              </template>
            </el-tab-pane>
          </el-tabs>
          <vab-breadcrumb v-else class="hidden-xs-only" />
        </div>
      </el-col>
      <el-col :lg="12" :md="12" :sm="12" :xl="12" :xs="20">
        <div class="right-panel">
          <vab-error-log />
          <vab-search />
          <vab-notice />
          <vab-full-screen />
          <vab-language />
          <vab-theme />
          <vab-refresh />
          <vab-avatar />
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { computed, watchEffect } from 'vue'
  import { useStore } from 'vuex'
  import { translateTitle } from '@/utils/i18n'
  import { openFirstMenu } from '@/config'
  import { useRoute, useRouter } from 'vue-router'

  export default {
    name: 'VabNav',
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
      const extra = computed(() => store.getters['routes/extra'])
      const routes = computed(() => store.getters['routes/routes'])

      const handleRoutes = computed(() => {
        return routes.value.filter((item) => item.hidden !== true && item.meta)
      })
      const handlePartialRoutes = computed(() => {
        return extra.value.first
          ? routes.value.find((item) => item.name === extra.value.first)
              .children
          : []
      })

      const handleTabClick = (handler) => {
        if (handler !== true && openFirstMenu)
          router.push(handlePartialRoutes.value[0].path)
      }

      watchEffect(() => {
        const firstMenu = route.matched[0].name
        if (extra.value.first !== firstMenu) {
          extra.value.first = firstMenu
          handleTabClick(true)
        }
      })

      return {
        extra,
        routes,
        handleRoutes,
        handleTabClick,
        translateTitle,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vab-nav {
    position: relative;
    height: $base-nav-height;
    padding-right: $base-padding;
    padding-left: $base-padding;
    overflow: hidden;
    user-select: none;
    background: $base-color-white;
    box-shadow: $base-box-shadow;

    .left-panel {
      display: flex;
      align-items: center;
      justify-items: center;
      height: $base-nav-height;

      :deep() {
        .vab-breadcrumb {
          margin-left: $base-margin;
        }

        .el-tabs {
          margin-left: $base-margin;

          .el-tabs__header {
            margin: 0;
          }

          .el-tabs__item {
            > div {
              display: flex;
              align-items: center;

              i {
                margin-right: 3px;
              }
            }
          }
        }

        .el-tabs__nav-wrap::after {
          display: none;
        }
      }
    }

    .right-panel {
      display: flex;
      align-content: center;
      align-items: center;
      justify-content: flex-end;
      height: $base-nav-height;

      :deep() {
        [class*='ri-'] {
          margin-left: $base-margin;
          color: $base-color-gray;
          cursor: pointer;
        }

        button {
          [class*='ri-'] {
            margin-left: 0;
            color: $base-color-white;
            cursor: pointer;
          }
        }
      }
    }
  }
</style>
