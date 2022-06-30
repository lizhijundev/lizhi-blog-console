<script setup>
  const props = defineProps({
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
    draggable: {
      type: Boolean,
      default: true,
    },
    loading: {
      type: Boolean,
      default: false,
    },
  })
  const emit = defineEmits(['update:modelValue'])

  const dialogVisible = useVModel(props, 'modelValue', emit)
  const isFullscreen = ref(false)

  const closeDialog = () => {
    dialogVisible.value = false
  }
  const setFullscreen = () => {
    isFullscreen.value = !isFullscreen.value
  }
</script>

<template>
  <div class="vab-dialog">
    <el-dialog
      v-model="dialogVisible"
      v-bind="$attrs"
      :append-to-body="appendToBody"
      :draggable="draggable"
      :fullscreen="isFullscreen"
      :lock-scroll="lockScroll"
      :show-close="false"
      :width="width"
    >
      <template #header>
        <slot name="header">
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
