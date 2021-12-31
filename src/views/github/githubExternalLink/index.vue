<template>
  <div class="github-external-link-container"></div>
</template>

<script>
  import { onMounted } from 'vue'
  //import { useRouter } from 'vue-router'
  export default {
    name: 'GithubExternalLink',
    setup() {
      // const router = useRouter()
      onMounted(() => {
        //window.open(router.path)
      })
    },
  }
</script>
