<template>
  <div :class="jvClass">
    <div v-if="copyable" :class="`jv-tooltip ${copyText.align || 'right'}`">
      <span ref="clip" class="jv-button" :class="{ copied }">
        <slot :copied="copied" name="copy">
          {{ copied ? copyText.copiedText : copyText.copyText }}
        </slot>
      </span>
    </div>
    <div class="jv-code" :class="{ open: expandCode, boxed }">
      <json-box
        ref="jsonBox"
        :preview-mode="previewMode"
        :sort="sort"
        :value="value"
      />
    </div>
    <div
      v-if="expandableCode && boxed"
      class="jv-more"
      @click="toggleExpandCode"
    >
      <span class="jv-toggle" :class="{ open: !!expandCode }" />
    </div>
  </div>
</template>

<script>
  import JsonBox from './json-box.vue'
  import Clipboard from 'clipboard'

  export default {
    name: 'JsonViewer',
    components: {
      JsonBox,
    },
    provide() {
      return {
        expandDepth: this.expandDepth,
        timeformat: this.timeformat,
      }
    },
    props: {
      value: {
        type: [Object, Array, String, Number, Boolean, Function],
        required: true,
      },
      expanded: {
        type: Boolean,
        default: false,
      },
      expandDepth: {
        type: Number,
        default: 1,
      },
      copyable: {
        type: [Boolean, Object],
        default: false,
      },
      sort: {
        type: Boolean,
        default: false,
      },
      boxed: {
        type: Boolean,
        default: false,
      },
      theme: {
        type: String,
        default: 'jv-light',
      },
      timeformat: {
        type: Function,
        default: (value) => value.toLocaleString(),
      },
      previewMode: {
        type: Boolean,
        default: false,
      },
    },
    emits: ['copied'],
    data() {
      return {
        copied: false,
        expandableCode: false,
        expandCode: this.expanded,
      }
    },
    computed: {
      jvClass() {
        return 'jv-container ' + this.theme + (this.boxed ? ' boxed' : '')
      },
      copyText() {
        const { copyText, copiedText, timeout, align } = this.copyable

        return {
          copyText: copyText || 'copy',
          copiedText: copiedText || 'copied!',
          timeout: timeout || 2000,
          align,
        }
      },
    },
    watch: {
      value() {
        this.onResized()
      },
    },
    mounted: function () {
      if (this.boxed && this.$refs.jsonBox) {
        this.onResized()
        this.$refs.jsonBox.$el.addEventListener('resized', this.onResized, true)
      }
      if (this.copyable) {
        const clipBoard = new Clipboard(this.$refs.clip, {
          text: () => {
            return JSON.stringify(this.value, null, 2)
          },
        })
        clipBoard.on('success', (e) => {
          this.onCopied(e)
        })
      }
    },
    methods: {
      onResized() {
        this.debResized()
      },
      debResized() {
        this.$nextTick(() => {
          if (!this.$refs.jsonBox) return
          this.expandableCode = this.$refs.jsonBox.$el.clientHeight >= 250
        })
      },
      onCopied(copyEvent) {
        if (this.copied) {
          return
        }
        this.copied = true
        setTimeout(() => {
          this.copied = false
        }, this.copyText.timeout)
        this.$emit('copied', copyEvent)
      },
      toggleExpandCode() {
        this.expandCode = !this.expandCode
      },
    },
  }
</script>

<style>
  .jv-container {
    position: relative;
    box-sizing: border-box;
  }

  .jv-container.boxed {
    border: 1px solid #eee;
    border-radius: 6px;
  }

  .jv-container.boxed:hover {
    position: relative;
    border-color: transparent;
    box-shadow: 0 2px 7px rgba(0, 0, 0, 0.15);
  }

  .jv-container.jv-light {
    font-family: Consolas, Menlo, Courier, monospace;
    font-size: 14px;
    color: #525252;
    white-space: nowrap;
    background: #fff;
  }

  .jv-container.jv-light .jv-ellipsis {
    display: inline-block;
    padding: 0px 4px 2px 4px;
    margin: 0 4px;
    font-size: 0.9em;
    line-height: 0.9;
    color: #999;
    vertical-align: 2px;
    cursor: pointer;
    user-select: none;
    background-color: #eee;
    border-radius: 3px;
  }

  .jv-container.jv-light .jv-button {
    color: #49b3ff;
  }

  .jv-container.jv-light .jv-key {
    margin-right: 4px;
    color: #111111;
  }

  .jv-container.jv-light .jv-item.jv-array {
    color: #111111;
  }

  .jv-container.jv-light .jv-item.jv-boolean {
    color: #fc1e70;
  }

  .jv-container.jv-light .jv-item.jv-function {
    color: #067bca;
  }

  .jv-container.jv-light .jv-item.jv-number {
    color: #fc1e70;
  }

  .jv-container.jv-light .jv-item.jv-object {
    color: #111111;
  }

  .jv-container.jv-light .jv-item.jv-undefined {
    color: #e08331;
  }

  .jv-container.jv-light .jv-item.jv-string {
    color: #42b983;
    word-break: break-word;
    white-space: normal;
  }

  .jv-container.jv-light .jv-item.jv-string .jv-link {
    color: #0366d6;
  }

  .jv-container.jv-light .jv-code .jv-toggle:before {
    padding: 0px 2px;
    border-radius: 2px;
  }

  .jv-container.jv-light .jv-code .jv-toggle:hover:before {
    background: #eee;
  }

  .jv-container .jv-code {
    padding: 30px 20px;
    overflow: hidden;
  }

  .jv-container .jv-code.boxed {
    max-height: 300px;
  }

  .jv-container .jv-code.open {
    max-height: initial !important;
    padding-bottom: 45px;
    overflow: visible;
    overflow-x: auto;
  }

  .jv-container .jv-toggle {
    display: inline-block;
    width: 10px;
    height: 10px;
    margin-right: 2px;
    cursor: pointer;
    background-image: url(./icon.svg);
    background-repeat: no-repeat;
    background-position: center center;
    background-size: contain;
    transition: transform 0.1s;
  }

  .jv-container .jv-toggle.open {
    transform: rotate(90deg);
  }

  .jv-container .jv-more {
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 40px;
    text-align: center;
    cursor: pointer;
  }

  .jv-container .jv-more .jv-toggle {
    position: relative;
    top: 40%;
    z-index: 2;
    color: #888;
    transition: all 0.1s;
    transform: rotate(90deg);
  }

  .jv-container .jv-more .jv-toggle.open {
    transform: rotate(-90deg);
  }

  .jv-container .jv-more:after {
    position: absolute;
    bottom: 0;
    left: 0;
    z-index: 1;
    width: 100%;
    height: 100%;
    content: '';
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 20%,
      rgba(230, 230, 230, 0.3) 100%
    );
    transition: all 0.1s;
  }

  .jv-container .jv-more:hover .jv-toggle {
    top: 50%;
    color: #111;
  }

  .jv-container .jv-more:hover:after {
    background: linear-gradient(
      to bottom,
      rgba(0, 0, 0, 0) 20%,
      rgba(230, 230, 230, 0.3) 100%
    );
  }

  .jv-container .jv-button {
    position: relative;
    z-index: 5;
    display: inline-block;
    padding: 5px;
    cursor: pointer;
  }

  .jv-container .jv-button.copied {
    cursor: default;
    opacity: 0.4;
  }

  .jv-container .jv-tooltip {
    position: absolute;
  }

  .jv-container .jv-tooltip.right {
    right: 15px;
  }

  .jv-container .jv-tooltip.left {
    left: 15px;
  }

  .jv-container .j-icon {
    font-size: 12px;
  }
</style>
