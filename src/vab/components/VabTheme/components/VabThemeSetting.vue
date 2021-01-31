<template>
  <ul v-if="theme.showThemeSetting" class="vab-theme-setting">
    <li @click="handleOpenTheme">
      <a>
        <vab-icon icon="brush-2-line" />
        <p>{{ translateTitle('主题配置') }}</p>
      </a>
    </li>
    <li @click="randomTheme">
      <a>
        <vab-icon icon="apps-line" />
        <p>{{ translateTitle('随机换肤') }}</p>
      </a>
    </li>
    <li @click="buy">
      <a>
        <vab-icon icon="shopping-cart-2-line" />
        <p>{{ translateTitle('购买源码') }}</p>
      </a>
    </li>
    <li @click="getCode">
      <a>
        <vab-icon icon="file-copy-line" />
        <p>{{ translateTitle('拷贝源码') }}</p>
      </a>
    </li>
    <li @click="removeLocalStorage">
      <a>
        <vab-icon icon="delete-bin-4-line" />
        <p>
          {{ translateTitle('清理缓存') }}
        </p>
      </a>
    </li>
  </ul>
</template>

<script>
  import { computed, getCurrentInstance } from 'vue'
  import { useRoute } from 'vue-router'
  import { translateTitle } from '@/utils/i18n'
  import emitter from '@/vab/plugins/emitter'
  import { useStore } from 'vuex'

  export default {
    name: 'VabThemeSetting',
    setup() {
      const store = useStore()
      const route = useRoute()
      const { ctx } = getCurrentInstance()

      const handleOpenTheme = () => {
        emitter.$emit('theme')
      }
      const randomTheme = () => {
        emitter.$emit('random-theme')
      }
      const buy = () => {
        window.open('https://chu1204505056.gitee.io/authorization')
      }
      const getCode = () => {
        ctx
          .$prompt(
            '请输入秘钥（秘钥请在源码中查看，跳转后需登录购买时绑定的github账号）',
            '温馨提示',
            {
              confirmButtonText: '确定',
              cancelButtonText: '取消',
            }
          )
          .then(({ value }) => {
            if (value !== 'vabp') {
              // 留给没有购买VueAdminBeautifulPro框架的人的赠言：既然你已经找到这里了，那说明你的能力很出众，也应该很喜欢这个框架吧，但是不绑定github账号依旧看不到源码的，所以加我qq买一个吧
              ctx.$baseMessage(
                '秘钥不正确！',
                'error',
                false,
                'vab-hey-message-error'
              )
              return false
            }
            let path = route.path + '/index.vue'
            let _path = route.path
            switch (_path) {
              case '/workbench':
                path = '/index/workbench.vue'
                break
              case '/vab/icon/remixIcon':
                path = '/vab/icon/remixIcon.vue'
                break
              case '/vab/icon/iconSelector':
                path = '/vab/icon/iconSelector.vue'
                break
              case '/vab/table/comprehensiveTable':
                path = '/vab/table/comprehensiveTable.vue'
                break
              case '/vab/table/inlineEditTable':
                path = '/vab/table/inlineEditTable.vue'
                break
              case '/vab/table/customTable':
                path = '/vab/table/customTable.vue'
                break
              case '/vab/form/comprehensiveForm':
                path = '/vab/form/comprehensiveForm.vue'
                break
              case '/vab/form/stepForm':
                path = '/vab/form/stepForm.vue'
                break
              case '/vab/dynamicSegment/test1/1':
                path = '/vab/dynamicSegment/test1.vue'
                break
              case '/vab/dynamicSegment/test2?id=1':
                path = '/vab/dynamicSegment/test2.vue'
                break
              case '/vab/drag/dialogDrag':
                path = '/vab/drag/dialogDrag.vue'
                break
              case '/vab/drag/cardDrag':
                path = '/vab/drag/cardDrag.vue'
                break
              case '/vab/drag/flowSheetDrag':
                path = '/vab/drag/flowSheetDrag.vue'
                break
              case '/vab/editor/richTextEditor':
                path = '/vab/editor/richTextEditor.vue'
                break
              case '/vab/editor/markdownEditor':
                path = '/vab/editor/markdownEditor.vue'
                break
              case '/vab/menu1/menu1-1/menu1-1-1/menu1-1-1-1':
                path = '/vab/nested/menu1/menu1-1/menu1-1-1/menu1-1-1-1.vue'
                break
              case '/vab/excel/exportExcel':
                path = '/vab/excel/exportExcel.vue'
                break
              case '/vab/excel/exportSelectedExcel':
                path = '/vab/excel/exportSelectedExcel.vue'
                break
              case '/vab/excel/exportMergeHeaderExcel':
                path = '/vab/excel/exportMergeHeaderExcel.vue'
                break
            }
            window.open(
              `https://github.com/vue-admin-beautiful/admin-plus/blob/master/src/views${path}`
            )
          })
      }
      const removeLocalStorage = () => {
        localStorage.clear()
        location.reload()
      }

      return {
        buy,
        getCode,
        randomTheme,
        translateTitle,
        handleOpenTheme,
        removeLocalStorage,
        theme: computed(() => store.getters['settings/theme']),
      }
    },
  }
</script>

<style lang="scss" scoped>
  .vab-theme-setting {
    position: fixed;
    top: 50%;
    right: 0;
    z-index: $base-z-index + 1;
    padding: 0;
    padding: 10px 0 0 0;
    margin: 0;
    text-align: center;
    cursor: pointer;
    background: $base-color-white;
    border: 1px solid $base-border-color;
    border-top-left-radius: $base-border-radius + 3;
    border-bottom-left-radius: $base-border-radius + 3;
    box-shadow: 0 0 50px 0 rgb(82 63 105 / 15%);
    transform: translateY(-50%);

    > li {
      display: flex;
      align-items: center;
      justify-content: center;
      padding: 0 8px 10px 10px;
      margin: 0;
      list-style: none;

      &:nth-child(2) {
        [class*='ri-'] {
          animation: rotate 6s linear infinite;
        }
      }

      $colors: (
        1: #3698fd,
        2: #1bc3bb,
        3: #faa500,
        4: #b37feb,
        5: #ef4c5d,
      );

      @each $key, $color in $colors {
        &:nth-child(#{$key}) {
          a {
            color: $color;
            background: mix($base-color-white, $color, 90%);
            transition: color 0.15s ease, background-color 0.15s ease,
              border-color 0.15s ease, box-shadow 0.15s ease,
              -webkit-box-shadow 0.15s ease;

            &:hover {
              color: $base-color-white;
              background: $color;
            }
          }
        }
      }

      a {
        display: inline-block;
        width: 60px;
        height: 60px;
        padding-top: 10px;
        text-align: center;
        background: #f6f8f9;
        border-radius: $base-border-radius + 3;

        p {
          padding: 0;
          margin: 0;
          overflow: hidden;
          font-size: $base-font-size-small;
          line-height: 25px;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
      }
    }
  }
</style>
