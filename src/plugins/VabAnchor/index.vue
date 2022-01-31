<template>
  <div class="vab-anchor">
    <div v-for="(item, key) in floorList" :key="key" :class="'floor' + key">
      <slot v-if="key === key" :name="'floor' + key" />
    </div>
    <vab-card
      :body-style="{
        padding: '20px 10px 20px 10px',
      }"
      shadow="never"
      style="position: fixed; top: 170px; right: 68px"
    >
      <el-tabs v-model="step" tab-position="right" @tab-click="handleClick">
        <el-tab-pane
          v-for="(item, key) in floorList"
          :key="key"
          :label="item.title"
        />
      </el-tabs>
    </vab-card>
  </div>
</template>

<script>
  export default {
    name: 'VabAnchor',
    props: {
      floorList: {
        type: Array,
        default: () => {
          return [
            { title: '锚点1' },
            { title: '锚点2' },
            { title: '锚点3' },
            { title: '锚点4' },
            { title: '锚点5' },
          ]
        },
      },
    },
    data() {
      return {
        step: '0',
        scrolltop: 0,
        floorObject: {},
      }
    },
    watch: {
      scrolltop(val) {
        val += 200
        const floorObject = this.floorObject
        for (let i = 0; i <= this.floorList.length + 1; i++) {
          if (
            val > floorObject['floor' + i] &&
            (val <= floorObject['floor' + parseInt(i + 1)] || val <= Infinity)
          ) {
            this.step = '' + i + ''
          }
        }
      },
    },
    mounted() {
      this.getFloorDistance()
      document.getElementById('app').addEventListener('scroll', () => {
        this.scrolltop = document.getElementById('app').scrollTop
      })
    },
    methods: {
      handleClick({ index }) {
        this.anchors(index)
      },
      anchors(item) {
        this.pulleyRoll(this.floorObject['floor' + item], this.scrolltop)
      },
      pulleyRoll(top, distance) {
        if (distance < top) {
          let smallInterval = (top - distance) / 50
          let i = 0
          let timer = setInterval(() => {
            i++
            distance += smallInterval
            document.getElementById('app').scrollTop = distance
            if (i == 50) {
              clearInterval(timer)
            }
          }, 10)
        } else if (distance > top) {
          let smallInterval = (distance - top) / 50
          let i = 0
          let timer = setInterval(() => {
            i++
            distance -= smallInterval
            document.getElementById('app').scrollTop = distance
            if (i == 50) {
              clearInterval(timer)
            }
          }, 10)
        }
      },
      getFloorDistance() {
        for (let i = 0; i < this.floorList.length; i++) {
          this.floorObject['floor' + i] = document.getElementsByClassName(
            'floor' + i
          )[0].offsetTop
        }
      },
    },
  }
</script>

<style lang="scss" scoped>
  .vab-anchor {
    [class*='floor'] {
      height: 780px;
      padding: $base-padding;

      &:nth-child(odd) {
        background: #b5ff8a;
      }

      &:nth-child(even) {
        background: #6db9ff;
      }
    }
  }
</style>
