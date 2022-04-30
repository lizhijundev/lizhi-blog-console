<template>
  <div class="player-container">
    <el-row :gutter="20">
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <vab-card shadow="hover">
          <template #header>常规视频播放(可配置弹幕)</template>
          <vab-player-mp4 :config="mp4Config" @player="vabPlayerMp4 = $event" />
          <el-form inline :model="form" style="margin-top: 20px">
            <el-form-item label="弹幕">
              <el-input v-model="form.danmu" placeholder="弹幕" />
            </el-form-item>
            <el-form-item>
              <el-button @click="onSubmit">发射弹幕</el-button>
            </el-form-item>
          </el-form>
        </vab-card>
      </el-col>
      <el-col :lg="12" :md="24" :sm="24" :xl="12" :xs="24">
        <vab-card shadow="hover">
          <template #header>Hls推流、m3u8播放(可配置弹幕)</template>
          <vab-player-hls :config="hlsConfig" @player="vabPlayerHls = $event" />
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { VabPlayerHls, VabPlayerMp4 } from '@/plugins/VabPlayer'
  import { uuid } from '@/utils'

  export default defineComponent({
    name: 'Player',
    components: {
      VabPlayerMp4,
      VabPlayerHls,
    },
    setup() {
      const state = reactive({
        form: {
          danmu: 'admin-plus',
        },
        mp4Config: {
          id: 'mse1',
          url: 'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.mp4',
          volume: 0.6,
          autoplay: true,
          fluid: true,
          screenShot: false,
          pip: false,
          danmu: {
            comments: [
              {
                duration: 15000,
                id: uuid(),
                start: 3000,
                txt: 'admin-plus',
                mode: 'scroll',
                style: {
                  color: '#fff',
                  fontSize: '14px',
                  border: 'solid 1px #ff9500',
                  borderRadius: '2px',
                  padding: '2px 11px',
                  backgroundColor: '#ff9500',
                },
              },
            ],
            area: {
              start: 0,
              end: 1,
            },
          },
        },
        vabPlayerMp4: null,
        hlsConfig: {
          id: 'mse2',
          url: 'https://cdn.jsdelivr.net/gh/chuzhixin/videos@master/video.m3u8',
          volume: 0.6,
          autoplay: false,
          fluid: true,
          pip: false,
          screenShot: false,
        },
        vabPlayerHls: null,
      })

      const onSubmit = () => {
        state.vabPlayerMp4.danmu.sendComment({
          duration: 15000,
          id: uuid(),
          start: state.vabPlayerMp4.cumulateTime * 1100,
          txt: state.form.danmu,
          mode: 'scroll',
          style: {
            marginTop: '20px',
            color: '#fff',
            fontSize: '14px',
            border: 'solid 1px #ff9500',
            borderRadius: '2px',
            padding: '2px 11px',
            backgroundColor: '#ff9500',
            zIndex: '9999',
          },
        })
      }

      return {
        ...toRefs(state),
        onSubmit,
      }
    },
  })
</script>

<style lang="scss" scoped>
  $base: '.player';
  #{$base}-container {
    padding: 0 !important;
    background: $base-color-background !important;
  }
</style>
