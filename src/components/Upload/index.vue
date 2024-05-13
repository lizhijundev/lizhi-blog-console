<script setup lang="ts">
  import { ref, watch } from 'vue'
  import { Close, Plus } from '@element-plus/icons-vue'
  import { formatStorage, random } from '@/utils'
  import {
    ElMessage,
    ElUpload,
    UploadFile,
    UploadRawFile,
    UploadRequestOptions,
  } from 'element-plus'
  import draggable from 'vuedraggable'
  import { uploadFile as uploadFileApi } from '@/api/system/file'

  const emit = defineEmits(['update:modelValue'])
  const moreUploadRef = ref<any>(null)

  const props = defineProps({
    modelValue: {
      type: [String, Array<string>],
      default: '',
    },
    /**
     * 是否显示右上角的删除图片按钮
     */
    showClose: {
      type: Boolean,
      default: false,
    },
    /**
     * 上传的文件key目录前缀
     */
    uploadKey: {
      type: String,
      default: 'default',
    },
    /**
     * 允许上传文件的最大数量
     */
    limit: {
      type: Number,
      default: 3,
    },
    /**
     * 第一张图片标签文字，默认为空不展示
     */
    firstPicTagText: {
      type: String,
      default: '',
    },
    /**
     * 图片数据类型：string-split 分隔符分割字符串 | array 图片数组
     */
    dataType: {
      type: String,
      validator(value: string) {
        return ['string-split', 'array'].includes(value)
      },
      default: 'string-split',
    },
    /**
     * 图片数据分割符 （dataType值为string-split可以传)
     */
    splitChar: {
      type: String,
      default: '|',
    },
    /**
     * 是否允许批量上传
     */
    multiple: {
      type: Boolean,
      default: false,
    },
    /**
     * 最大文件大小 0为不限
     */
    maxFileSize: {
      type: Number,
      default: 0,
    },
    /**
     * 文件格式类型限制，多种格式|隔开
     */
    fileTypeLimit: {
      type: String,
      default: '',
    },
  })

  const imgUrls = ref([] as UploadFile[])

  /**
   * 监听v-model图片列表  ['url1', ...] 或者 url1|url2|...
   */
  watch(
    () => props.modelValue,
    (newVal) => {
      if (props.dataType === 'string-split') {
        imgUrls.value =
          newVal !== ''
            ? String(newVal)
                .split(props.splitChar)
                .map((url) => {
                  return {
                    uid: random(10000, 999999),
                    url: url,
                  }
                })
            : []
      } else if (props.dataType === 'array') {
        if (typeof newVal === 'string') {
          console.warn(
            `【开发者注意】MoreUpload图片上传组件 props dataType === 'array'时，v-model值应该为数组`
          )
          return
        }
        imgUrls.value = newVal.map((url) => {
          return {
            uid: random(10000, 999999),
            url: url,
          }
        })
      }
    }
  )

  // 手动通知父组件图片列表更新
  function emitImageListUpdate(imageList: UploadFile[]) {
    const _arr: string[] = []
    imageList.forEach((item) => {
      if (item.url) {
        _arr.push(item.url)
      }
    })

    if (props.dataType === 'string-split') {
      emit('update:modelValue', _arr.length > 0 ? _arr.join('|') : '')
    } else if (props.dataType === 'array') {
      emit('update:modelValue', _arr)
    }
  }

  /**
   * 当超出限制时，执行的钩子函数
   * @param files
   */
  function onExceed(files: File[]) {
    ElMessage.error(
      `超出上传数量限制，当前可上传${
        imgUrls.value.length + files.length - props.limit
      }张图片`
    )
  }

  /**
   * 在 before-upload 钩子中限制用户上传文件的格式和大小
   */
  function handleBeforeUpload(file: UploadRawFile) {
    // 支持的文件格式与文件类型映射
    const fileExt = {
      '.jpg': 'image/jpeg',
      '.jpeg': 'image/jpeg',
      '.png': 'image/png',
      '.webp': 'image/webp',
    }

    if (props.fileTypeLimit) {
      // 进行文件格式校验
      const allowFileExtArr: string[] = []
      const extMap = props.fileTypeLimit.split('|')
      extMap.forEach((ext) => {
        if (typeof fileExt[ext] !== 'undefined') {
          allowFileExtArr.push(fileExt[ext])
        }
      })
      if (!allowFileExtArr.includes(file.type)) {
        ElMessage.error(`图片格式不符，请上传 ${extMap.join('、')} 格式图片`)
        return false
      }
    }
    // 设置了文件大小限制，进行文件大小校验
    console.log(props.maxFileSize)
    if (props.maxFileSize > 0 && file.size > props.maxFileSize) {
      ElMessage.error(`上传图片不能大于${formatStorage(props.maxFileSize, 0)}`)
      return false
    }
  }

  /**
   * 自定义图片上传
   *
   * @param params
   */
  async function uploadImage(options: UploadRequestOptions): Promise<any> {
    // 限制图片数量
    if (imgUrls.value.length > props.limit) return

    // 测试代码
    // const url = 'https://imgbeta.therol.cn/default/swisse.jpg'

    const response = await uploadFileApi({ file: options.file })
    const url = response.data.url as string

    imgUrls.value.push({
      uid: random(10000, 999999),
      url: url,
      name: '',
      status: 'success',
    })

    emitImageListUpdate(imgUrls.value)
  }

  /**
   * 删除图片
   *
   * @param fileUrl
   */
  function handleRemove(index: number) {
    imgUrls.value.splice(index, 1)
    emitImageListUpdate(imgUrls.value)
  }

  /**
   * 拖拽排序结束
   * @param e
   */
  function onDragEnd() {
    emitImageListUpdate(imgUrls.value)
  }
</script>

<template>
  <!-- 上传组件 -->
  <div class="w-100">
    <!--        v-for="(item, index) in imgUrls" :key="item"-->
    <draggable
      v-model="imgUrls"
      class="img-list"
      ghost-class="ghost"
      item-key="uid"
      @end="onDragEnd"
    >
      <template #item="{ element, index }">
        <div class="img-container">
          <div v-if="index === 0 && firstPicTagText" class="more-uploader__tag">
            {{ firstPicTagText }}
          </div>
          <div class="more-uploader-container">
            <img :src="element.url" class="more-uploader-container__image" />
          </div>
          <!-- 删除图标 -->
          <el-icon
            class="more-uploader__remove"
            @click.stop="handleRemove(index)"
          >
            <Close />
          </el-icon>
        </div>
      </template>
      <template #footer>
        <el-upload
          v-if="imgUrls.length < limit"
          ref="moreUploadRef"
          v-model:file-list="imgUrls"
          action=""
          class="more-uploader"
          :show-file-list="false"
          :multiple="multiple"
          :limit="limit"
          :before-upload="handleBeforeUpload"
          :http-request="uploadImage"
          :on-exceed="onExceed"
        >
          <el-icon class="more-uploader__plus">
            <Plus />
          </el-icon>
        </el-upload>
      </template>
    </draggable>
  </div>
</template>

<style scoped lang="scss">
  .ghost {
    opacity: 0.5;
    background: var(--el-color-primary-dark);
    border-radius: 16px;
  }
  .img-list {
    width: 100%;
    display: flex;
    justify-content: flex-start;
    align-items: center;
    flex-wrap: wrap;
    gap: 16px;

    .img-container {
      position: relative;
      &:hover {
        border-color: var(--el-color-primary);
        .more-uploader__remove {
          display: block !important;
        }
      }
    }

    .more-uploader {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
      transition: var(--el-transition-duration-fast);
      text-align: center;

      &:hover {
        border-color: var(--el-color-primary);
      }
      &-container {
        width: 146px;
        height: 146px;
        border-radius: 6px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        background-color: var(--el-bg-color-page);
        border: 1px solid var(--el-border-color-darker);
        &__image {
          width: 100%;
        }
      }

      &__plus {
        width: 146px;
        height: 146px;
        font-size: 28px;
        color: #8c939d;
        text-align: center;
      }

      &__tag {
        position: absolute;
        left: 0;
        top: 0;
        padding: 4px 6px;
        font-size: var(--el-font-size-small);
        line-height: var(--el-font-size-small);
        background-color: var(--el-color-primary-dark);
        color: #fff;
        border-radius: 6px 0 6px 0;
      }

      &__remove {
        display: none;
        width: 18px;
        height: 18px;
        border-radius: 9px;
        font-size: 14px;
        position: absolute;
        top: 4px;
        right: 4px;
        cursor: pointer;
        color: #ffffff !important;
        background-color: var(--el-color-danger) !important;
        border: 1px solid #fff;
        box-shadow: var(--el-box-shadow-light);
        text-align: center;
        padding: 1px 0;
        transition: all 0.2s ease;
        &:hover {
          background-color: var(--el-color-danger-dark) !important;
        }
      }
    }
  }
</style>
