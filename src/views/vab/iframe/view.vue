<template>
  <div class="iframe-container">
    <iframe :src="url" frameborder="0" />
  </div>
</template>

<script>
  import { mapActions } from 'vuex'

  export default {
    name: 'Iframe',
    data() {
      return { url: '' }
    },
    created() {
      this.url = this.$route.query.url
      if (this.$route.query.title)
        this.$nextTick(() => {
          this.changeTabsMeta({
            title: 'Iframe',
            meta: {
              title: this.$route.query.title,
            },
          })
        })
    },
    methods: {
      ...mapActions({
        changeTabsMeta: 'tabs/changeTabsMeta',
      }),
    },
  }
</script>

<style lang="scss" scoped>
  .iframe-container {
    iframe {
      width: 100%;
      height: $base-keep-alive-height;
    }
  }
</style>
