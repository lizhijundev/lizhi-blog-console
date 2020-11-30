<template>
  <div v-if="routerView" class="app-main-container">
    <div style="background: #fff">
      <router-view v-slot="{ Component, route }">
        <transition mode="out-in" name="fade-transform">
          <keep-alive :include="cachedRoutes" :max="keepAliveMaxNum">
            <component
              v-if="isKeepAlive"
              :is="Component"
              :key="route.path"
              class="app-main-height"
            />
          </keep-alive>
        </transition>
        <transition mode="out-in" name="fade-transform">
          <component
            v-if="!isKeepAlive"
            :is="Component"
            :key="route.path"
            class="app-main-height"
          />
        </transition>
      </router-view>
      <footer class="footer-copyright">
        Copyright
        <vab-remix-icon icon="copyright-line" />
        {{ title }} {{ fullYear }} by {{ copyright }}
      </footer>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'
  import { copyright, keepAliveMaxNum, title } from '@/config'

  export default {
    name: 'AppMain',
    data() {
      return {
        show: false,
        fullYear: new Date().getFullYear(),
        copyright,
        title,
        routerView: true,
        keepAliveMaxNum,
      }
    },
    computed: {
      ...mapGetters({
        visitedRoutes: 'tabsBar/visitedRoutes',
      }),
      isKeepAlive() {
        return !this.$route.meta.noKeepAlive
      },
      cachedRoutes() {
        return [
          ...new Set(
            this.visitedRoutes
              .filter((item) => !item.meta.noKeepAlive)
              .flatMap((item) => item.matched)
          ),
        ]
      },
    },
    created() {
      // 重载所有路由
      // this.$baseEventBus.$on('reload-router-view', () => {
      //   this.routerView = false
      //   this.$nextTick(() => {
      //     this.routerView = true
      //   })
      // })
    },
  }
</script>

<style lang="scss" scoped>
  .app-main-container {
    position: relative;
    width: 100%;
    overflow: hidden;

    .app-main-height {
      min-height: $base-app-main-height;
    }

    .footer-copyright {
      display: flex;
      align-items: center;
      justify-content: center;
      min-height: 55px;
      padding: 0 $base-padding 0 $base-padding;
      color: rgba(0, 0, 0, 0.45);
      background: $base-color-white;
      border-top: 1px dashed $base-border-color;

      i {
        margin: 0 5px;
      }
    }
  }
</style>
