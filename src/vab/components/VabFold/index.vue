<template>
  <vab-icon
    class="fold-unfold"
    :icon="collapse ? 'menu-unfold-line' : 'menu-fold-line'"
    @click="toggleCollapse"
  />
</template>

<script>
  import { computed, defineComponent } from 'vue'
  import { useStore } from 'vuex'

  export default defineComponent({
    name: 'VabFold',
    setup() {
      const store = useStore()

      return {
        collapse: computed(() => store.getters['settings/collapse']),
        toggleCollapse: () => store.dispatch('settings/toggleCollapse'),
      }
    },
  })
</script>

<style lang="scss" scoped>
  .fold-unfold {
    color: var(--el-color-grey);
    cursor: pointer;
  }
</style>
