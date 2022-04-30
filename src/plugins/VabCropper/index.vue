<template>
  <el-dialog
    v-model="dialogVisible"
    :close-on-click-modal="false"
    custom-class="vab-copper-dialog"
    title="头像裁剪"
    width="470px"
  >
    <el-alert
      title="未保存到数据库，请放心使用，刷新后即可还原到原有状态"
      type="success"
    />
    <el-row>
      <el-col :span="24">
        <vab-cropper-beta
          ref="vabCropperRef"
          :options="options"
          :origin-img="slide.oriUrl"
          :preview-img="slide.preUrl"
          @get-vab-cropper="getCropper"
        />
      </el-col>
    </el-row>

    <template #footer>
      <div class="vab-cropper-footer">
        <el-upload
          accept="image/jpeg,image/gif,image/png"
          action="#"
          :auto-upload="false"
          list-type="picture-card"
          :on-change="onChange"
        >
          <template #default>
            <el-button type="primary">选择图片</el-button>
          </template>
        </el-upload>
        <el-button type="primary" @click="upload">上传并保存</el-button>
      </div>
    </template>
  </el-dialog>
</template>

<script>
  import { useUserStore } from '@/store/modules/user'
  import VabCropperBeta from 'cropper-vue3'
  import 'cropper-vue3/lib/cropper-vue3.css'

  export default defineComponent({
    name: 'VabCropper',
    components: { VabCropperBeta },
    setup() {
      const userStore = useUserStore()
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        vabCropperRef: null,
        dialogVisible: false,
        value: '',
        options: {
          width: 220,
          height: 220,
        },
        slide: {
          oriUrl: require('@/assets/cropper_images/user.gif'),
          preUrl: require('@/assets/cropper_images/user.gif'),
        },
        timer: null,
      })

      const setAvatar = (argument) => userStore.setAvatar(argument)

      const getCropper = (argument) => {
        if (state.timer) clearInterval(state.timer)
        state.timer = setTimeout(() => {
          state.slide.preUrl = argument
          state.value = argument
          setAvatar(argument)
        }, 10)
      }
      const onChange = (file) => {
        state.vabCropperRef.cancelCropper()
        state.slide = {
          oriUrl: file.url,
          preUrl: file.url,
        }
        state.vabCropperRef.drawImg()
      }
      const upload = () => {
        setAvatar(state.value)
        $baseMessage('模拟保存成功', 'success', 'vab-hey-message-success')

        state.dialogVisible = false
      }

      return {
        ...toRefs(state),
        setAvatar,
        getCropper,
        onChange,
        upload,
      }
    },
  })
</script>

<style lang="scss" scoped>
  :deep() {
    @media only screen and (max-width: 767px) {
      .vab-cropper-canvas {
        display: block;
        float: none;
        margin: 0 auto;
      }
      .vab-cropper-preview {
        display: none;
      }
    }

    .el-textarea {
      margin-top: $base-margin;
    }
  }
</style>
<style lang="scss">
  .vab-copper-dialog {
    .el-dialog__footer {
      .el-button {
        float: right;
      }

      &:before {
        display: block;
        clear: both;
        content: '';
      }

      > .vab-cropper-footer {
        > div {
          display: inline;

          .el-upload-list__item {
            display: none;
          }

          .el-upload--picture-card {
            float: right;
            width: auto;
            height: $base-input-height;
            line-height: $base-input-height;
            background-color: transparent;
            border: 0;
            border-radius: 0;
          }

          .el-button {
            float: right;
            margin-right: 10px;
          }
        }
      }
    }
  }
</style>
