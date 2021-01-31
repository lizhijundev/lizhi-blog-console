<template>
  <el-dropdown @command="handleCommand" @visible-change="handleVisibleChange">
    <span class="avatar-dropdown">
      <el-avatar :src="avatar" class="user-avatar" />
      <div class="user-name">
        <span class="hidden-xs-only">{{ username }}</span>
        <vab-icon
          :class="{ 'vab-dropdown-active': active }"
          class="vab-dropdown"
          icon="arrow-down-s-line"
        />
      </div>
    </span>
    <template #dropdown>
      <el-dropdown-menu>
        <el-dropdown-item command="personalCenter">
          <vab-icon icon="user-line" />
          {{ translateTitle('个人中心') }}
        </el-dropdown-item>
        <el-dropdown-item command="logout">
          <vab-icon icon="logout-circle-r-line" />
          {{ translateTitle('退出登录') }}
        </el-dropdown-item>
      </el-dropdown-menu>
    </template>
  </el-dropdown>
</template>

<script>
  import { computed, ref } from 'vue'
  import { useStore } from 'vuex'
  import { useRoute, useRouter } from 'vue-router'
  import { toLoginRoute } from '@/utils/routes'
  import { translateTitle } from '@/utils/i18n'

  export default {
    name: 'VabAvatar',
    setup() {
      const store = useStore()
      const route = useRoute()
      const router = useRouter()
      const active = ref(false)
      const logout = () => store.dispatch('user/logout')

      const handleVisibleChange = (val) => {
        active.value = val
      }
      const handleCommand = async (command) => {
        switch (command) {
          case 'logout':
            await logout
            await router.push(toLoginRoute(route.path))
            break
          case 'personalCenter':
            await router.push('/setting/personalCenter')
            break
        }
      }

      return {
        active,
        handleCommand,
        translateTitle,
        handleVisibleChange,
        avatar: computed(() => store.getters['user/avatar']),
        username: computed(() => store.getters['user/username']),
      }
    },
  }
</script>

<style lang="scss" scoped>
  .avatar-dropdown {
    display: flex;
    align-content: center;
    align-items: center;
    justify-content: center;
    justify-items: center;

    .user-avatar {
      width: 40px;
      height: 40px;
      margin-left: 15px;
      cursor: pointer;
      border-radius: 50%;
    }

    .user-name {
      position: relative;
      display: flex;
      align-content: center;
      align-items: center;
      height: 40px;
      margin-left: 6px;
      line-height: 40px;
      cursor: pointer;

      [class*='ri-'] {
        margin-left: 0 !important;
      }
    }
  }
</style>
