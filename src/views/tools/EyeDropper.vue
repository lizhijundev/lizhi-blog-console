<script setup>
  const { isSupported, open, sRGBHex } = useEyeDropper()
</script>

<template>
  <div class="eye-dropper-container">
    <el-form inline>
      <el-form-item label="">
        <el-button :disabled="!isSupported" type="primary" @click="open">
          {{ isSupported ? '打开取色器' : '取色器不支持您的电脑' }}
        </el-button>
      </el-form-item>
      <el-form-item v-if="isSupported" label="">
        <el-input v-model="sRGBHex" />
      </el-form-item>
    </el-form>
  </div>
</template>
