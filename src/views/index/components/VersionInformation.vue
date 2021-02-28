<template>
  <el-card class="version-information" shadow="hover">
    <template #header>
      <vab-icon icon="information-line" />
      信息
      <el-tag class="card-header-tag">部署时间:{{ updateTime }}</el-tag>
    </template>
    <el-scrollbar>
      <table class="table">
        <tr>
          <td>vue</td>
          <td>{{ dependencies['vue'] }}</td>
          <td>@vue/cli</td>
          <td>{{ devDependencies['@vue/cli-service'] }}</td>
        </tr>
        <tr>
          <td>vuex</td>
          <td>{{ dependencies['vuex'] }}</td>
          <td>vue-router</td>
          <td>{{ dependencies['vue-router'] }}</td>
        </tr>
        <tr>
          <td>vue-i18n</td>
          <td>{{ dependencies['vue-i18n'] }}</td>
          <td>element-plus</td>
          <td>{{ dependencies['element-plus'] }}</td>
        </tr>
        <tr>
          <td>授权渠道</td>
          <td colspan="3">
            <el-popover trigger="hover" :width="400">
              <div style="text-align: center">
                <el-image
                  src="https://gitee.com/chu1204505056/image/raw/master/zfb_799.jpg"
                  style="width: 200px"
                />
                <p style="font-size: 13px">
                  付款后加QQ 1204505056 Vue3.x +
                  element-plus，拥有完整的登录鉴权和前后端多种配置的动态路由流程，仅限自己及团队使用，源码不得二次出售转卖，恶意分享取消使用资格
                  )
                </p>
              </div>
              <template #reference>
                <a
                  target="_blank"
                  href="https://chu1204505056.gitee.io/authorization"
                >
                  <el-button type="primary">购买源码 ￥799</el-button>
                </a>
              </template>
            </el-popover>
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
  </el-card>
</template>

<script>
  import { dependencies, devDependencies } from '*/package.json'

  export default {
    data() {
      return {
        updateTime: process.env.VUE_APP_UPDATE_TIME,
        dependencies,
        devDependencies,
      }
    },
  }
</script>

<style lang="scss" scoped>
  .version-information {
    .table {
      width: 100%;
      color: #666;
      border-collapse: collapse;
      background-color: #fff;

      td {
        position: relative;
        padding: 9px 15px;
        overflow: hidden;
        font-size: 14px;
        line-height: 20px;
        text-overflow: ellipsis;
        white-space: nowrap;
        border: 1px solid #e6e6e6;

        &:nth-child(odd) {
          width: 20%;
          text-align: right;
          background-color: #f7f7f7;
        }
      }
    }
  }
</style>
