<template>
  <el-image v-if="isExternal" :src="icon" class="img-icon" />
  <svg v-else-if="isCustomSvg" :class="svgClass" aria-hidden="true">
    <use :xlink:href="'#vab-icon-' + icon" />
  </svg>
  <!-- 内置svg雪碧图较大，对性能要求苛刻的用户请勿使用isDefaultSvg属性 -->
  <svg v-else-if="isDefaultSvg" class="vab-icon">
    <use :xlink:href="remixIconPath + '#ri-' + icon" />
  </svg>
  <i
    v-else
    :class="{
      ['ri-' + icon]: true,
    }"
    aria-hidden="true"
  />
</template>

<script>
  import 'remixicon/fonts/remixicon.css'
  import { isExternal } from '@/utils/validate'

  export default {
    name: 'VabIcon',
    props: {
      icon: {
        type: String,
        required: true,
      },
      // 是否使用自定义图标
      isCustomSvg: {
        type: Boolean,
        default: false,
      },
      // 是否使用本地库Remix图标
      isDefaultSvg: {
        type: Boolean,
        default: false,
      },
      className: {
        type: String,
        default: '',
      },
    },
    data() {
      return {
        remixIconPath: require('remixicon/fonts/remixicon.symbol.svg'),
      }
    },
    computed: {
      isExternal() {
        return isExternal(this.icon)
      },
      svgClass() {
        if (this.className) return `vab-icon ${this.className}`
        else return 'vab-icon'
      },
    },
  }
</script>

<style lang="scss" scoped>
  .img-icon {
    display: inline-block;
    width: 2em;
    height: 2em;
    vertical-align: middle;
  }

  .vab-icon {
    display: inline-block;
    width: $base-font-size-default + 2;
    height: $base-font-size-default + 2;
    margin: 0 auto;
    overflow: hidden;
    vertical-align: middle;
    fill: currentColor;
  }

  [class*='ri'] {
    display: inline-block;
    font-size: $base-font-size-default + 2;
    text-align: center;
    vertical-align: -3.5px;
  }
</style>
