<template>
  <div class="iframe-container">
    <iframe frameborder="0" :src="url" />
  </div>
</template>

<script>
  import { useTabsStore } from '@/store/modules/tabs'

  export default defineComponent({
    name: 'Iframe',
    data() {
      return { url: '' }
    },
    watch: {
      $route: 'handleIframe',
    },
    created() {
      this.handleIframe()
    },
    methods: {
      ...mapActions(useTabsStore, ['changeTabsMeta']),
      handleIframe() {
        this.url = `https://${this.$route.query.url}`
        const meta = { ...this.$route.meta, ...this.$route.query }
        this.$nextTick(() => {
          this.changeTabsMeta({
            title: 'Iframe',
            meta,
          })
        })
      },
    },
  })
</script>

<style lang="scss" scoped>
  .iframe-container {
    iframe {
      width: 100%;
      height: $base-keep-alive-height;
    }
  }
</style>
