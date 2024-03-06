<template>
  <div class="watermark-container">
    <el-button type="primary" @click="setWatermark(title)">添加水印</el-button>
    <el-button type="primary" @click="setCustomWatermark">
      添加自定义水印
    </el-button>
    <el-button type="primary" @click="setWatermark('')">移除水印</el-button>
  </div>
</template>

<script lang="ts">
  import Watermark from '@/utils/watermark'
  import { useSettingsStore } from '@/store/modules/settings'

  export default defineComponent({
    name: 'Watermark',
    setup() {
      const settingsStore = useSettingsStore()
      const { title } = storeToRefs(settingsStore)

      const setWatermark = (value: string) => {
        //@ts-ignore
        Watermark.set(value)
      }
      const setCustomWatermark = () => {
        ElMessageBox.prompt('请输入自定义水印', '温馨提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
        })
          .then(({ value }) => {
            if (value) setWatermark(value)
          })
          .catch(() => {})
      }

      return {
        title,
        setWatermark,
        setCustomWatermark,
      }
    },
  })
</script>

<style lang="scss" scoped></style>
