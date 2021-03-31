<template>
  <vab-icon
    :icon="collapse ? 'menu-unfold-line' : 'menu-fold-line'"
    class="fold-unfold"
    @click="toggleCollapse"
  />
</template>

<script>
  import { computed } from 'vue'
  import { useStore } from 'vuex'

  export default {
    name: 'VabFold',
    setup() {
      const store = useStore()
      return {
        collapse: computed(() => store.getters['settings/collapse']),
        toggleCollapse: () => store.dispatch('settings/toggleCollapse'),
      }
    },
  }
</script>

<style lang="scss" scoped>
  .fold-unfold {
    color: $base-color-grey;
    cursor: pointer;
  }
</style>
