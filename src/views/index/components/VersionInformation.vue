<script lang="ts" setup>
  const {
    dependencies,
    devDependencies,
    lastBuildTime: updateTime,
  } = __APP_INFO__

  const handleUrl = (name: string) => {
    window.open(`https://github.com/${name}/releases`)
  }
</script>

<template>
  <vab-card class="version-information" shadow="hover">
    <template #header>
      <vab-icon icon="information-line" />
      信息
      <el-tag class="card-header-tag">部署时间:{{ updateTime }}</el-tag>
    </template>
    <el-scrollbar>
      <table class="table">
        <tr>
          <td @dblclick="handleUrl('vuejs/vue')">vue</td>
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
          <td>@vue/cli</td>
          <td>{{ devDependencies['@vue/cli-service'] }}</td>
        </tr>
        <tr>
          <td>pinia</td>
          <td>{{ dependencies['pinia'] }}</td>
          <td>vue-router</td>
          <td>{{ dependencies['vue-router'] }}</td>
        </tr>
        <tr>
          <td>typescript</td>
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
            <!-- <el-popover trigger="hover" :width="400">
              <div style="text-align: center">
                <el-image
                  :src="require('@/assets/skm1.jpg')"
                  style="width: 200px"
                />
                <p style="font-size: 13px">
                  付款后加QQ 1204505056 Vue3.x +
                  element-plus，拥有完整的登录鉴权和前后端多种配置的动态路由流程，仅限自己及团队使用，源码不得二次出售转卖，恶意分享取消使用资格
                </p>
              </div>
              <template #reference> -->
            <a
              href="https://vue-admin-beautiful.com/authorization"
              target="_blank"
            >
              <el-button type="primary">购买源码 ￥799</el-button>
            </a>
            <!--  </template>
            </el-popover> -->
            <!-- <el-popover trigger="hover" :width="400">
              <div style="text-align: center">
                <el-image
                  :src="require('@/assets/skm2.jpg')"
                  style="width: 200px"
                />
                <p style="font-size: 13px">
                  付款后加QQ 1204505056
                  获取VIP群加群资格，是否购买VIP填是即可(包含开源版及PRO版技术支持、开源版及PRO版问题解答、开源版详细文档，PRO版用户(已付699)无需购买此项!!!(此项不包含PRO版源码))
                </p>
              </div>
              <template #reference>
                <el-button type="primary">开源版技术支持</el-button>
              </template>
            </el-popover> -->
            <a
              href="https://github.com/chuzhixin/vue-admin-beautiful/"
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
