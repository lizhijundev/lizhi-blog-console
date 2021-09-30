<template>
  <component :is="type" v-bind="linkProps()">
    <slot />
  </component>
</template>

<script>
  import { computed, defineComponent, toRefs } from 'vue'
  import { isExternal } from '@/utils/validate'

  export default defineComponent({
    name: 'VabLink',
    props: {
      to: {
        type: String,
        required: true,
      },
    },
    setup(props) {
      const { to } = toRefs(props)
      const path = to.value

      const type = computed(() => (isExternal(path) ? 'a' : 'router-link'))

      const linkProps = () =>
        isExternal(path)
          ? {
              href: path,
              target: '_blank',
              rel: 'noopener',
            }
          : { to: path }

      return {
        type,
        linkProps,
      }
    },
  })
</script>
