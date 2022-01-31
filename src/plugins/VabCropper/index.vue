<template>
  <el-dialog
    v-model="dialogVisible"
    :close-on-click-modal="false"
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
          ref="vabCropper"
          :options="options"
          :origin-img="slide.oriUrl"
          :preview-img="slide.preUrl"
          @get-vab-cropper="getCropper"
        />
      </el-col>
    </el-row>

    <template #footer>
      <div class="vab-cropper-footer">
        <el-button type="primary" @click="upload">上传并保存</el-button>
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
      </div>
    </template>
  </el-dialog>
</template>

<script>
  import { mapActions } from 'pinia'
  import { useUserStore } from '@/store/modules/user'
  import VabCropperBeta from 'vab-cropper'
  import 'vab-cropper/lib/vab-cropper.css'

  export default defineComponent({
    name: 'VabCropper',
    components: { VabCropperBeta },
    data() {
      return {
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
      }
    },
    methods: {
      ...mapActions(useUserStore, ['setAvatar']),
      getCropper(argument) {
        if (this.timer) clearInterval(this.timer)
        this.timer = setTimeout(() => {
          this.slide.preUrl = argument
          this.value = argument
          this.setAvatar(argument)
        }, 10)
      },
      onChange(file) {
        this.$refs['vabCropper'].cancelCropper()
        this.slide = {
          oriUrl: file.url,
          preUrl: file.url,
        }
        this.$refs['vabCropper'].drawImg()
      },
      upload() {
        this.setAvatar(this.value)
        this.$baseMessage('模拟保存成功', 'success', 'vab-hey-message-success')
        this.dialogVisible = false
      },
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
  /* 未知原因深度选择器不好使，临时全局复写样式！！！！！！#TODO */
  .el-dialog__footer {
    height: 62px;

    &:before {
      display: block;
      clear: both;
      content: '';
    }

    > .vab-cropper-footer {
      > div {
        display: inline;

        .el-upload-list {
          display: none;
        }

        .el-upload--picture-card {
          float: right;
          width: auto;
          height: $base-input-height;
          line-height: $base-input-height;
          vertical-align: middle;
          background-color: transparent;
          border: 0;
          border-radius: 0;
        }

        .el-button {
          float: right;
          margin-left: 10px;
        }
      }
    }
  }
</style>
