<template>
  <el-dialog
    v-model="dialogFormVisible"
    :before-close="handleClose"
    :close-on-click-modal="false"
    :title="title"
    width="909px"
  >
    <div class="upload">
      <el-alert
        :closable="false"
        :title="`支持jpg、jpeg、png格式，单次可最多选择${limit}张图片，每张不可大于${size}M，如果大于${size}M会自动为您过滤`"
        type="info"
      />
      <el-upload
        ref="uploadRef"
        accept="image/png, image/jpeg"
        :action="action"
        :auto-upload="false"
        class="upload-content"
        :close-on-click-modal="false"
        :data="data"
        :file-list="fileList"
        :headers="headers"
        :limit="limit"
        list-type="picture-card"
        :multiple="true"
        :name="name"
        :on-change="handleChange"
        :on-error="handleError"
        :on-exceed="handleExceed"
        :on-preview="handlePreview"
        :on-progress="handleProgress"
        :on-remove="handleRemove"
        :on-success="handleSuccess"
      >
        <template #trigger>
          <vab-icon icon="add-line" />
        </template>
        <el-dialog v-model="dialogVisible" append-to-body title="查看大图">
          <div>
            <el-image :src="dialogImageUrl" />
          </div>
        </el-dialog>
      </el-upload>
    </div>
    <template #footer>
      <div
        v-if="show"
        style="position: absolute; top: 10px; left: 15px; color: #999"
      >
        正在上传中... 当前上传成功数:{{ imgSuccessNum }}张 当前上传失败数:{{
          imgErrorNum
        }}张
      </div>
      <el-button type="primary" @click="handleClose">关闭</el-button>
      <el-button
        :loading="loading"
        style="margin-left: 10px"
        type="success"
        @click="submitUpload"
      >
        开始上传
      </el-button>
    </template>
  </el-dialog>
</template>

<script>
  import { useUserStore } from '@/store/modules/user'
  import _ from 'lodash'

  export default defineComponent({
    name: 'VabUpload',
    props: {
      url: {
        type: String,
        default: '/upload',
        required: true,
      },
      name: {
        type: String,
        default: 'file',
        required: true,
      },
      limit: {
        type: Number,
        default: 50,
        required: true,
      },
      size: {
        type: Number,
        default: 1,
        required: true,
      },
    },
    setup(props) {
      const userStore = useUserStore()
      const { token } = storeToRefs(userStore)
      const $baseMessage = inject('$baseMessage')

      const state = reactive({
        uploadRef: null,
        show: false,
        loading: false,
        dialogVisible: false,
        dialogImageUrl: '',
        action: '',
        headers: {},
        fileList: [],
        picture: 'picture',
        imgNum: 0,
        imgSuccessNum: 0,
        imgErrorNum: 0,
        typeList: null,
        title: '上传',
        dialogFormVisible: false,
        data: {},
      })

      const submitUpload = () => {
        state.uploadRef.submit()
      }
      const handleProgress = () => {
        state.loading = true
        state.show = true
      }
      const handleChange = (file, fileList) => {
        if (fileList && fileList.length > 0) {
          if (file.size > 1048576 * state.size) {
            fileList.filter((item) => item !== file)
            state.fileList = fileList
          } else {
            state.allImgNum = fileList.length
          }
        }
      }
      const handleSuccess = (response, file, fileList) => {
        state.imgNum = state.imgNum + 1
        state.imgSuccessNum = state.imgSuccessNum + 1
        if (fileList.length === state.imgNum) {
          setTimeout(() => {
            $baseMessage(
              `上传完成! 共上传${fileList.length}张图片`,
              'success',
              'vab-hey-message-success'
            )
          }, 1000)
        }

        setTimeout(() => {
          state.loading = false
          state.show = false
        }, 1000)
      }
      const handleError = (err, file) => {
        state.imgNum = state.imgNum + 1
        state.imgErrorNum = state.imgErrorNum + 1
        $baseMessage(
          `文件[${file.raw.name}]上传失败,文件大小为${_.round(
            file.raw.size / 1024,
            0
          )}KB`,
          'error',
          'vab-hey-message-error'
        )
        setTimeout(() => {
          state.loading = false
          state.show = false
        }, 1000)
      }
      const handleRemove = () => {
        state.imgNum = state.imgNum - 1
        state.allNum = state.allNum - 1
      }
      const handlePreview = (file) => {
        state.dialogImageUrl = file.url
        state.dialogVisible = true
      }
      const handleExceed = (files) => {
        $baseMessage(
          `当前限制选择 ${state.limit} 个文件，本次选择了
                  ${files.length}
                  个文件`,
          'error',
          'vab-hey-message-error'
        )
      }
      const handleShow = (data) => {
        state.title = '上传'
        state.data = data
        state.dialogFormVisible = true
      }
      const handleClose = () => {
        state.fileList = []
        state.picture = 'picture'
        state.allImgNum = 0
        state.imgNum = 0
        state.imgSuccessNum = 0
        state.imgErrorNum = 0
        state.headers['Authorization'] = `Bearer ${token}`
        state.dialogFormVisible = false
      }

      onMounted(() => {
        state.headers['Authorization'] = `Bearer ${token}`
        state.action = props.url
      })

      const percentage = computed(() => {
        if (state.allImgNum === 0) return 0
        return _.round(state.imgNum / state.allImgNum, 2) * 100
      })

      return {
        ...toRefs(state),
        submitUpload,
        handleProgress,
        handleChange,
        handleSuccess,
        handleError,
        handleRemove,
        handlePreview,
        handleExceed,
        handleShow,
        handleClose,
        percentage,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .upload {
    height: 500px;

    .upload-content {
      .el-upload__tip {
        display: block;
        height: 30px;
        line-height: 30px;
      }

      :deep() {
        .el-upload--picture-card {
          width: 128px;
          height: 128px;
          margin: 3px 8px 8px 8px;
          border: 2px dashed #c0ccda;

          .ri-add-line {
            font-size: 24px;
          }
        }

        .el-upload-list--picture {
          margin-bottom: 20px;
        }

        .el-upload-list--picture-card {
          .el-upload-list__item {
            width: 128px;
            height: 128px;
            margin: 3px 8px 8px 8px;
          }
        }
      }
    }
  }
</style>
