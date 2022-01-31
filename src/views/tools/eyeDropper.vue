<script setup>
  const { isSupported, open, sRGBHex } = useEyeDropper()
</script>
<template>
  <div class="eye-dropper-container">
    <p>
      <el-button :disabled="!isSupported" @click="open">
        {{ isSupported ? '打开取色器' : '取色器不支持您的电脑' }}
      </el-button>
    </p>
    <template v-if="isSupported">
      <p>sRGBHex: {{ sRGBHex }}</p>
    </template>
  </div>
</template>
