<script lang="ts" setup>
  const { dependencies, devDependencies, lastBuildTime, version } = __APP_INFO__

  const handleUrl = (name: string) => {
    window.open(`https://github.com/${name}/releases`)
  }
</script>

<template>
  <vab-card class="version-information" shadow="hover">
    <template #header>
      <vab-icon icon="information-line" />
      信息
      <el-tag class="card-header-tag">
        当前版本：V{{ version }} &nbsp; 部署时间：{{ lastBuildTime }}
      </el-tag>
    </template>
    <el-scrollbar>
      <table class="table">
        <tr>
          <td @dblclick="handleUrl('vuejs/core')">vue</td>
          <td>
            {{ dependencies['vue'] }}
            <el-popover
              content="已升级至最新版本"
              placement="top-start"
              trigger="hover"
              :width="200"
            >
              <template #reference>
                <vab-icon icon="arrow-up-line" />
              </template>
            </el-popover>
          </td>
          <td @dblclick="handleUrl('antfu/unplugin-auto-import')">
            unplugin-auto-import
          </td>
          <td>{{ devDependencies['unplugin-auto-import'] }}</td>
        </tr>
        <tr>
          <td @dblclick="handleUrl('vuejs/pinia')">pinia</td>
          <td>{{ dependencies['pinia'] }}</td>
          <td>vue-router</td>
          <td>{{ dependencies['vue-router'] }}</td>
        </tr>
        <tr>
          <td @dblclick="handleUrl('microsoft/TypeScript')">typescript</td>
          <td>{{ devDependencies['typescript'] }}</td>
          <td @dblclick="handleUrl('element-plus/element-plus')">
            element-plus
          </td>
          <td>
            {{ dependencies['element-plus'] }}
            <el-popover
              content="已升级至最新版本"
              placement="top-start"
              trigger="hover"
              :width="200"
            >
              <template #reference>
                <vab-icon icon="arrow-up-line" />
              </template>
            </el-popover>
          </td>
        </tr>
        <tr>
          <td>授权渠道</td>
          <td colspan="3">
            <a
              href="https://vue-admin-beautiful.com/authorization"
              target="_blank"
            >
              <el-button type="primary">购买源码 ￥799</el-button>
            </a>
            <a
              href="https://github.com/chuzhixin/vue-admin-better/"
              target="_blank"
            >
              <el-button type="warning">开源免费版</el-button>
            </a>
          </td>
        </tr>
      </table>
    </el-scrollbar>
  </vab-card>
</template>

<style lang="scss" scoped>
  .version-information {
    .table {
      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;

      td {
        position: relative;
        padding: 9px 15px !important;
        overflow: hidden;
        font-size: 14px;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: 1px solid #e6e6e6;

        i {
          color: var(--el-color-success);
          vertical-align: -3px;
          cursor: pointer;
        }

        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }
  }
</style>
