<template>
  <div class="index-container">
    <el-row :gutter="20">
      <page-header />
    </el-row>
  </div>
</template>

<script>
  import PageHeader from '@/views/demo/index/components/PageHeader.vue'

  export default defineComponent({
    name: 'Index',
    components: {
      PageHeader,
    },
  })
</script>

<style lang="scss" scoped>
  .index-container {
    :deep() {
      .page-header {
        margin-bottom: 20px;
      }

      .access,
      .authorization,
      .version-information {
        min-height: 268px;
        margin-bottom: 20px;
      }

      .el-card {
        .el-card__header {
          position: relative;

          .card-header-tag {
            position: absolute;
            top: 15px;
            right: $base-margin;
          }

          > div > span {
            display: flex;
            align-items: center;

            i {
              margin-right: 3px;
            }
          }
        }

        .el-card__body {
          position: relative;

          .echarts {
            width: 100%;
            height: 127px;
          }

          .card-footer-tag {
            position: absolute;
            right: $base-margin;
            bottom: 15px;
          }
        }
      }

      .bottom {
        padding-top: 20px;
        margin-top: 5px;
        color: #595959;
        text-align: left;
        border-top: 1px solid $base-border-color;
      }
    }
  }
</style>
