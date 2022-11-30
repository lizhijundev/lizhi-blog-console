<script lang="ts" setup>
  import { getList } from '@/api/description'

  const voice = ref<SpeechSynthesisVoice>(
    undefined as unknown as SpeechSynthesisVoice
  )

  const text = ref('')
  const speech = useSpeechSynthesis(text, {
    voice,
  })

  const fetchData = async () => {
    const {
      data: { description },
    } = await getList()
    text.value = description
  }

  let synth: SpeechSynthesis
  const voices = ref<SpeechSynthesisVoice[]>([])
  onMounted(() => {
    if (speech.isSupported.value) {
      setTimeout(() => {
        synth = window.speechSynthesis
        voices.value = synth.getVoices()
        voice.value = voices.value[0]
      }, 100)
      fetchData()
    }
  })

  const play = () => {
    if (speech.status.value === 'pause') window.speechSynthesis.resume()
    else speech.speak()
  }
  const pause = () => {
    window.speechSynthesis.pause()
  }
  const stop = () => {
    window.speechSynthesis.cancel()
  }
</script>

<template>
  <div class="speech-synthesis-container">
    <div v-if="!speech.isSupported">
      Your browser does not support SpeechSynthesis API,
      <a href="https://caniuse.com/mdn-api_speechsynthesis" target="_blank">
        more details
      </a>
    </div>
    <div v-else>
      <el-row :gutter="20">
        <el-col :lg="6" :md="14" :sm="24" :xl="10" :xs="24">
          <el-form label-position="top">
            <el-form-item label="文本">
              <el-input v-model="text" rows="12" type="textarea" />
            </el-form-item>
            <el-form-item label="语言">
              <el-select v-model="voice" style="width: 400px">
                <el-option
                  v-for="item in voices"
                  :key="item.name"
                  :label="item.name"
                  :value="item"
                />
              </el-select>
            </el-form-item>
            <el-form-item label="操作">
              <el-button
                :disabled="speech.isPlaying.value"
                type="primary"
                @click="play"
              >
                {{ speech.status.value === 'pause' ? '继续' : '播放' }}
              </el-button>
              <el-button
                :disabled="!speech.isPlaying.value"
                type="warning"
                @click="pause"
              >
                暂停
              </el-button>
              <el-button
                :disabled="!speech.isPlaying.value"
                type="danger"
                @click="stop"
              >
                结束
              </el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
  </div>
</template>

<style lang="scss" scoped></style>
