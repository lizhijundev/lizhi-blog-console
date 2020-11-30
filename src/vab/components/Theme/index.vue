<template>
  <span v-if="theme.showTheme">
    <vab-remix-icon icon="brush-2-line" @click="handleOpenTheme" />
    <div class="theme-setting">
      <div @click="handleOpenTheme">
        <vab-remix-icon icon="brush-2-line" />
        <p>{{ translateTitle('主题配置') }}</p>
      </div>
      <div @click="randomTheme">
        <vab-remix-icon icon="apps-line" />
        <p>{{ translateTitle('随机换肤') }}</p>
      </div>
      <div @click="getCode">
        <vab-remix-icon icon="file-copy-line" />
        <p>{{ translateTitle('拷贝源码') }}</p>
      </div>
      <div @click="removeLocalStorage">
        <vab-remix-icon icon="delete-bin-4-line" />
        <p>{{ translateTitle('清理缓存') }}</p>
      </div>
    </div>

    <vab-theme-drawer
      ref="theme-drawer"
      @random-theme="randomTheme"
      @reset="resetTheme"
      @save="saveTheme"
      @update-theme="setTheme"
    />
  </span>
</template>

<script>
  import { translateTitle } from '@/utils/i18n'
  import { mapActions, mapGetters } from 'vuex'
  import { shuffle } from '@/utils/array'

  export default {
    name: 'Theme',
    computed: {
      ...mapGetters({
        theme: 'settings/theme',
        device: 'settings/device',
      }),
    },
    created() {
      this.setTheme()
    },
    methods: {
      translateTitle,
      ...mapActions({
        saveTheme: 'settings/saveTheme',
        resetTheme: 'settings/resetTheme',
      }),
      handleOpenTheme() {
        this.$refs['theme-drawer'].drawerVisible = true
      },
      async randomTheme() {
        await this.resetTheme()
        const themeNameArray = ['default', 'ocean', 'green', 'white']
        this.theme.themeName = shuffle(themeNameArray)[0]
        const galleryStyleArray = ['vertical', 'horizontal']
        this.theme.galleryStyle = shuffle(galleryStyleArray)[0]
        const tabsBarStyleArray = ['card', 'smart', 'smooth']
        this.theme.tabsBarStyle = shuffle(tabsBarStyleArray)[0]
        // const showTabsBarRemixIconArray = [true, false]
        // this.theme.showTabsBarRemixIcon = shuffle(showTabsBarRemixIconArray)[0]
        if (this.device === 'desktop') {
          const layoutArray = [
            'horizontal',
            'vertical',
            'gallery',
            'comprehensive',
            'common',
          ]
          this.theme.layout = shuffle(layoutArray)[0]
        } else this.theme.layout = 'vertical'
        await this.setTheme()
        await this.saveTheme()
      },
      setTheme() {
        document.getElementsByTagName(
          'body'
        )[0].className = `vab-theme-${this.theme.themeName}`
      },
      getCode() {
        const url =
          'https://github.com/vue-admin-beautiful/vue-admin-beautiful-pro/blob/master/src/views'
        let path = this.$route.path + '/index.vue'
        if (path === '/vab/icon/remixIcon/index.vue') {
          path = '/vab/icon/remixIcon.vue'
        }
        if (path === '/vab/icon/colorfulIcon/index.vue') {
          path = '/vab/icon/colorfulIcon.vue'
        }
        if (path === '/vab/icon/iconSelector/index.vue') {
          path = '/vab/icon/iconSelector.vue'
        }
        if (path === '/vab/table/comprehensiveTable/index.vue') {
          path = '/vab/table/comprehensiveTable.vue'
        }
        if (path === '/vab/table/inlineEditTable/index.vue') {
          path = '/vab/table/inlineEditTable.vue'
        }
        if (path === '/vab/table/customTable/index.vue') {
          path = '/vab/table/customTable.vue'
        }
        if (path === '/vab/drag/dialogDrag/index.vue') {
          path = '/vab/drag/dialogDrag.vue'
        }
        if (path === '/vab/drag/cardDrag/index.vue') {
          path = '/vab/drag/cardDrag.vue'
        }
        if (path === '/vab/form/comprehensiveForm/index.vue') {
          path = '/vab/form/comprehensiveForm.vue'
        }
        if (path === '/vab/form/stepForm/index.vue') {
          path = '/vab/form/stepForm.vue'
        }
        if (path === '/vab/editor/richTextEditor/index.vue') {
          path = '/vab/editor/richTextEditor.vue'
        }
        if (path === '/vab/editor/markdownEditor/index.vue') {
          path = '/vab/editor/markdownEditor.vue'
        }
        if (path === '/vab/menu1/menu1-1/menu1-1-1/menu1-1-1-1/index.vue') {
          path = '/vab/nested/menu1/menu1-1/menu1-1-1/menu1-1-1-1/index.vue'
        }
        if (path === '/vab/excel/exportExcel/index.vue') {
          path = '/vab/excel/exportExcel.vue'
        }
        if (path === '/vab/excel/exportSelectedExcel/index.vue') {
          path = '/vab/excel/exportSelectedExcel.vue'
        }
        if (path === '/vab/excel/exportMergeHeaderExcel/index.vue') {
          path = '/vab/excel/exportMergeHeaderExcel.vue'
        }
        window.open(url + path)
      },
      removeLocalStorage() {
        localStorage.clear()
        location.reload()
      },
    },
  }
</script>

<style lang="scss" scoped>
  @mixin right-bar {
    position: fixed;
    right: 0;
    z-index: $base-z-index;
    width: 60px;
    min-height: 60px;
    text-align: center;
    cursor: pointer;
    background: $base-color-blue;
    border-radius: $base-border-radius;

    > div {
      padding-top: 10px;
      border-bottom: 0 !important;

      &:hover {
        opacity: 0.9;
      }

      & + div {
        border-top: 1px solid $base-color-white;
      }

      p {
        padding: 0;
        margin: 0;
        font-size: $base-font-size-small;
        line-height: 30px;
        color: $base-color-white;
      }
    }
  }

  .theme-setting {
    @include right-bar;

    top: calc((100vh - 235px) / 2);

    :deep() {
      [class*='ri-'] {
        display: block !important;
        margin-right: auto !important;
        margin-left: auto !important;
        color: $base-color-white !important;
        fill: $base-color-white !important;
      }
    }
  }
</style>
