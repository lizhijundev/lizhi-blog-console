<script lang="ts" setup>
  import { useSettingsStore } from '@/store/modules/settings'

  const fullYear = new Date().getFullYear()
  const settingsStore = useSettingsStore()
  const { title } = storeToRefs(settingsStore)

  // 国家法律法规要求显示备案号 实际项目请自行修改为自己的备案信息及域名
  const beianShow = ref(false)

  onMounted(() => {
    if (
      location.hostname === 'vue-admin-beautiful.com' ||
      location.hostname === 'chu1204505056.gitee.io'
    ) {
      beianShow.value = true
      // 演示地址禁止调试
      ;(() => {
        function block() {
          setInterval(() => {
            ;(function () {
              return false
            })
              ['constructor']('debugger')
              ['call']()
          }, 50)
        }
        try {
          block()
        } catch (err) {
          console.log(err)
        }
      })()
    }
  })
</script>

<template>
  <footer class="vab-footer">
    Copyright
    <vab-icon icon="copyright-line" />
    {{ fullYear }} {{ title }}
    <!-- <a
      v-if="beianShow"
      class="beian"
      href="https://beian.miit.gov.cn/#/Integrated/index"
      target="_blank"
    >
      鲁ICP备2021002317号-1
    </a> -->
  </footer>
</template>

<style lang="scss" scoped>
  .vab-footer {
    display: flex;
    align-items: center;
    justify-content: center;
    min-height: 55px;
    padding: 0 $base-padding 0 $base-padding;
    color: rgba(0, 0, 0, 0.45);
    background: var(--el-color-white);
    box-shadow: 0 -1px 4px rgba(0, 21, 41, 0.08);

    i {
      margin: 0 5px;
    }
    .beian {
      margin-left: 5px;
      user-select: none;
    }
  }
</style>
