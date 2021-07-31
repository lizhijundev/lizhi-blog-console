<template>
  <component :is="type" v-bind="linkProps(to)">
    <slot />
  </component>
</template>

<script>
  import { computed, defineComponent } from 'vue'
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
      const type = computed(() => {
        if (props.isExternal) return 'a'
        return 'router-link'
      })

      const linkProps = (to) =>
        isExternal(props.icon)
          ? {
              href: to,
              target: '_blank',
              rel: 'noopener',
            }
          : {
              to: to,
            }

      return {
        type,
        linkProps,
      }
    },
  })
</script>
