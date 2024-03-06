<template>
  <div class="personal-center-container">
    <el-row :gutter="20">
      <el-col :lg="8" :md="12" :sm="24" :xl="8" :xs="24">
        <vab-card shadow="hover">
          <div class="personal-center-user-info">
            <el-avatar :size="100" :src="avatar" />
            <div class="personal-center-user-info-full-name">
              {{ nickname }}
            </div>
            <ul class="personal-center-user-info-list">
              <li>
                <vab-icon icon="user-3-line" />
                {{ username }}
              </li>
            </ul>
          </div>
        </vab-card>
      </el-col>
      <el-col :lg="16" :md="12" :sm="24" :xl="16" :xs="24">
        <vab-card shadow="hover">
          <el-tabs v-model="activeName">
            <el-tab-pane label="基本信息" name="first">
              <el-col :lg="12" :md="16" :sm="24" :xl="12" :xs="24">
                <el-form label-width="80px" :model="form">
                  <el-form-item label="昵称">
                    <el-input v-model="form.nickname" />
                  </el-form-item>
                  <el-form-item>
                    <el-button type="primary" @click="onSubmit">保存</el-button>
                  </el-form-item>
                </el-form>
              </el-col>
            </el-tab-pane>
          </el-tabs>
        </vab-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { useUserStore } from '@/store/modules/user'
  import { saveAdminMember } from '@/api/adminMember'

  export default defineComponent({
    name: 'PersonalCenter',
    setup() {
      const $baseMessage = inject('$baseMessage')

      const userStore = useUserStore()
      const { nickname, admin_id, avatar, username } = storeToRefs(userStore)

      const state = reactive({
        vabCropperRef: null,
        activeName: 'first',
        form: {
          admin_id: admin_id.value,
          nickname: nickname.value,
        },
      })

      const onSubmit = () => {
        saveAdminMember(state.form).then(() => {
          userStore.setNickname(state.form.nickname)
          $baseMessage('保存成功', 'success', 'vab-hey-message-success')
        })
      }

      return {
        ...toRefs(state),
        avatar,
        username,
        nickname,
        admin_id,
        onSubmit,
      }
    },
  })
</script>

<style lang="scss" scoped>
  $base: '.personal-center';
  #{$base}-container {
    padding: 0 !important;
    background: $base-color-background !important;

    #{$base}-user-info {
      padding: $base-padding;
      text-align: center;

      :deep() {
        .el-avatar {
          img {
            cursor: pointer;
          }
        }
      }

      &-full-name {
        margin-top: 15px;
        font-size: 24px;
        font-weight: 500;
        color: #262626;
      }

      &-description {
        margin-top: 8px;
      }

      &-list {
        margin-top: 18px;
        line-height: 30px;
        text-align: left;
        list-style: none;

        h5 {
          margin: -20px 0 5px;
        }

        :deep() {
          .el-tag {
            margin-right: 10px !important;
          }

          .el-tag + .el-tag {
            margin-left: 0;
          }
        }
      }
    }

    #{$base}-item {
      display: flex;

      i {
        font-size: 40px;
      }

      &-content {
        box-sizing: border-box;
        flex: 1;
        margin-left: $base-margin;

        &-second {
          margin-top: 8px;
        }
      }
    }
  }
</style>
