<template>
  <div class="share-container">
    <el-form inline :model="form" @submit.prevent>
      <el-form-item label="URL">
        <el-input v-model="form.url" />
      </el-form-item>
      <el-form-item>
        <el-button native-type="submit" type="primary" @click="copy($event)">
          <vab-icon icon="file-copy-line" />
          拷贝URL
        </el-button>
        <el-popover
          placement="bottom-start"
          title=""
          trigger="hover"
          :width="220"
        >
          <template #reference>
            <el-button native-type="submit" type="primary">
              <vab-icon icon="qr-code-line" />
              生成二维码
            </el-button>
          </template>
          <vab-qr-code
            :dot-scale="0.5"
            :logo-src="require('@/assets/logo.png')"
            :text="form.url"
          />
        </el-popover>
        <!-- <el-popover
          placement="bottom-start"
          title=""
          trigger="hover"
          :width="220"
        >
          <template #reference>
            <el-button native-type="submit" type="primary">
              <vab-icon icon="qr-code-line" />
              生成二维码
            </el-button>
          </template>
          <vab-qr-code
            :dot-scale="0.5"
            :gif-bg-src="require('vue-qr/src/assets/dog.gif')"
            :text="form.url"
          />
        </el-popover> -->
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
  import VabQrCode from '@/plugins/VabQrCode'
  import clip from '@/utils/clipboard'

  export default defineComponent({
    name: 'Share',
    components: {
      VabQrCode,
    },
    setup() {
      const state = reactive({
        form: {
          url: '',
        },
      })
      const copy = (event) => {
        clip(state.form.url, event)
      }

      onMounted(() => {
        state.form.url = 'https://vue-admin-beautiful.com/admin-plus'
      })

      return {
        ...toRefs(state),
        copy,
      }
    },
  })
</script>
<style lang="scss" scoped>
  .share-container {
    :deep() {
      .el-input__inner {
        width: 280px;
      }
    }
  }
</style>
