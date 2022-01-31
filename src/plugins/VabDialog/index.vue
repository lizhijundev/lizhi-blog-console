<template>
  <div ref="vabDialogRef" class="vab-dialog">
    <el-dialog
      v-model="dialogVisible"
      :append-to-body="appendToBody"
      :fullscreen="isFullscreen"
      :lock-scroll="lockScroll"
      v-bind="$attrs"
      :show-close="false"
      :width="width"
    >
      <template #title>
        <slot name="title">
          <span class="el-dialog__title">{{ title }}</span>
        </slot>
        <div class="vab-dialog__headerbtn">
          <button
            v-if="showFullscreen"
            aria-label="fullscreen"
            type="button"
            @click="setFullscreen"
          >
            <vab-icon v-if="isFullscreen" icon="fullscreen-exit-line" />
            <vab-icon v-else icon="fullscreen-line" />
          </button>
          <button
            v-if="showClose"
            aria-label="close"
            type="button"
            @click="closeDialog"
          >
            <vab-icon icon="close-circle-line" />
          </button>
        </div>
      </template>
      <div v-loading="loading">
        <slot></slot>
      </div>
      <template #footer>
        <slot name="footer"></slot>
      </template>
    </el-dialog>
  </div>
</template>

<script>
  export default defineComponent({
    name: 'VabDialog',
    props: {
      appendToBody: {
        type: Boolean,
        default: false,
      },
      lockScroll: {
        type: Boolean,
        default: true,
      },
      width: {
        type: [String, Number],
        default: '50%',
      },
      modelValue: {
        type: Boolean,
        default: false,
      },
      title: {
        type: String,
        default: '',
      },
      showClose: {
        type: Boolean,
        default: true,
      },
      showFullscreen: {
        type: Boolean,
        default: false,
      },
      drag: {
        type: Boolean,
        default: true,
      },
      loading: {
        type: Boolean,
        default: false,
      },
    },
    setup(props) {
      const state = reactive({
        vabDialogRef: '',
        dialogVisible: false,
        isFullscreen: false,
      })
      onMounted(() => {
        state.dialogVisible = props.modelValue
        if (props.drag) dialogdrag()
      })
      watch(
        () => props.modelValue,
        (val) => {
          state.dialogVisible = val
          if (state.dialogVisible) {
            state['vabDialogRef'].querySelector('.el-dialog').style.top = '0px'
            state['vabDialogRef'].querySelector('.el-dialog').style.left = '0px'
            state.isFullscreen = false
          }
        }
      )

      const closeDialog = () => {
        state.dialogVisible = false
      }
      const setFullscreen = () => {
        state.isFullscreen = !state.isFullscreen
      }
      const dialogdrag = () => {
        const dialogHeaderEl =
          state['vabDialogRef'].querySelector('.el-dialog__header')
        const dragDom = state['vabDialogRef'].querySelector('.el-dialog')
        dialogHeaderEl.style.cursor = 'move'
        dialogHeaderEl.onmousedown = (e) => {
          const disX = e.clientX - dialogHeaderEl.offsetLeft
          const disY = e.clientY - dialogHeaderEl.offsetTop
          const screenWidth = document.body.clientWidth
          const screenHeight = document.documentElement.clientHeight
          const dragDomWidth = dragDom.offsetWidth
          const dragDomheight = dragDom.offsetHeight
          let minDragDomLeft = -dragDom.offsetLeft
          let maxDragDomLeft = screenWidth - dragDom.offsetLeft - dragDomWidth
          let minDragDomTop = -dragDom.offsetTop
          let maxDragDomTop = screenHeight - dragDom.offsetTop - dragDomheight

          if (screenHeight < dragDomheight) {
            return false
          }
          dragDom.style.marginBottom = '0px'

          let styL = getComputedStyle(dragDom).left
          let styT = getComputedStyle(dragDom).top
          if (styL.includes('%')) {
            styL = +document.body.clientWidth * (+styL.replace('%', '') / 100)
            styT = +document.body.clientHeight * (+styT.replace('%', '') / 100)
          } else {
            styL = +styL.replace('px', '')
            styT = +styT.replace('px', '')
          }
          document.onmousemove = function (e) {
            let left = e.clientX - disX
            let top = e.clientY - disY
            if (left < minDragDomLeft) {
              left = minDragDomLeft
            } else if (left > maxDragDomLeft) {
              left = maxDragDomLeft
            }
            if (top < minDragDomTop) {
              top = minDragDomTop
            } else if (top > maxDragDomTop) {
              top = maxDragDomTop
            }
            dragDom.style.cssText += `;left:${left + styL}px;top:${
              top + styT
            }px;`
          }
          document.onmouseup = function () {
            document.onmousemove = null
            document.onmouseup = null
          }
        }
      }

      return {
        ...toRefs(state),
        closeDialog,
        setFullscreen,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .vab-dialog {
    &__headerbtn {
      position: absolute;
      top: var(--el-dialog-padding-primary);
      right: var(--el-dialog-padding-primary);
    }

    button {
      padding: 0;
      margin-left: 15px;
      font-size: var(--el-message-close-size, 16px);
      color: var(--el-color-info);
      cursor: pointer;
      background: transparent;
      border: none;
      outline: none;
      transition: $base-transition;
      &:hover i {
        color: var(--el-color-primary);
      }
    }

    :deep(.el-dialog) {
      &.is-fullscreen {
        top: 0px !important;
        left: 0px !important;
        display: flex;
        flex-direction: column;

        .el-dialog__body {
          flex: 1;
          overflow: auto;
        }

        .el-dialog__footer {
          padding-bottom: 10px;
          border-top: 1px solid var(--el-border-color-base);
        }
      }
    }
  }
</style>
