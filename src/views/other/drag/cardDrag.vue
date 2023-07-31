<template>
  <div class="card-drag-container">
    <vab-query-form>
      <vab-query-form-left-panel>
        <el-button type="danger" @click="sort">重置顺序</el-button>
      </vab-query-form-left-panel>
    </vab-query-form>

    <el-row :gutter="20">
      <vab-draggable v-model="iconList" item-key="icon" v-bind="dragOptions">
        <template #item="{ element: item }">
          <el-col :lg="3" :md="3" :sm="6" :xl="3" :xs="12">
            <vab-card class="icon-panel">
              <vab-icon :icon="item.icon" :style="{ color: item.color }" />
              <p>按住拖拽</p>
            </vab-card>
          </el-col>
        </template>
      </vab-draggable>
    </el-row>
  </div>
</template>

<script lang="ts" setup>
  import _ from 'lodash'
  import { getIconList } from '@/api/remixIcon'
  import VabDraggable from 'vuedraggable'

  defineOptions({
    name: 'CardDrag',
  })

  const iconList = ref<any>([])
  const randomHexColor = () => {
    return _.shuffle([
      '#1890FF',
      '#36CBCB',
      '#4ECB73',
      '#FBD437',
      '#F2637B',
      '#975FE5',
    ])
  }
  const fetchData = async () => {
    const { data } = await getIconList({
      pageNo: 1,
      pageSize: 89,
    })
    iconList.value = data.list
      .filter((icon: any) => icon.includes('-line'))
      .map((icon: any, index: any) => {
        return { icon, color: randomHexColor(), order: index + 1 }
      })
  }
  const sort = () => {
    iconList.value = iconList.value.sort((a: any, b: any) => a.order - b.order)
  }
  const dragOptions = computed(() => {
    return {
      animation: 600,
      group: 'description',
      disabled: false,
      ghostClass: 'ghost',
    }
  })

  onMounted(() => {
    fetchData()
  })
</script>

<style lang="scss" scoped>
  .card-drag-container {
    :deep() {
      .el-row {
        display: block;

        > div {
          position: relative;
          display: flex;
          flex-wrap: wrap;
          width: 100%;
        }
      }
    }

    .icon-panel {
      height: 120px;
      text-align: center;
      cursor: move;
      user-select: none;

      &:hover {
        i {
          transform: scale(1.15);
        }
      }

      i {
        display: block;
        width: 50px;
        height: 50px;
        margin: auto;
        font-size: 40px;
        transition: all ease-in-out 0.3s;
      }

      p {
        margin-top: 10px;
      }
    }
  }
</style>
