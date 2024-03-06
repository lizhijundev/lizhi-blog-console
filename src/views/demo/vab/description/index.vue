<template>
  <div class="description-container">
    <vab-card shadow="never">
      <!--  <el-radio-group v-model="size">
        <el-radio label="large">默认</el-radio>
        <el-radio label="default">中等</el-radio>
        <el-radio label="small">小</el-radio>
      </el-radio-group> -->

      <el-descriptions border :column="3" :size="size" title="With border">
        <template #extra>
          <el-button size="small" type="primary">Operation</el-button>
        </template>
        <el-descriptions-item>
          <template #label>Username</template>
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Telephone</template>
          18100000000
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Place</template>
          Suzhou
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Remarks</template>
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item>
          <template #label>Address</template>
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions :column="3" :size="size" title="Without border">
        <template #extra>
          <el-button size="small" type="primary">Operation</el-button>
        </template>
        <el-descriptions-item label="Username">
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item label="Telephone">
          18100000000
        </el-descriptions-item>
        <el-descriptions-item label="Place">Suzhou</el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address">
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions
        border
        :column="4"
        direction="vertical"
        :size="size"
        title="Vertical list with border"
      >
        <el-descriptions-item label="Username">
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item label="Telephone">
          18100000000
        </el-descriptions-item>
        <el-descriptions-item label="Place" :span="2">
          Suzhou
        </el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address">
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>

      <el-descriptions
        :column="4"
        direction="vertical"
        :size="size"
        title="Vertical list without border"
      >
        <el-descriptions-item label="Username">
          kooriookami
        </el-descriptions-item>
        <el-descriptions-item label="Telephone">
          18100000000
        </el-descriptions-item>
        <el-descriptions-item label="Place" :span="2">
          Suzhou
        </el-descriptions-item>
        <el-descriptions-item label="Remarks">
          <el-tag size="small">School</el-tag>
        </el-descriptions-item>
        <el-descriptions-item label="Address">
          No.1188, Wuzhong Avenue, Wuzhong District, Suzhou, Jiangsu Province
        </el-descriptions-item>
      </el-descriptions>
    </vab-card>

    <vab-card shadow="never">
      手风琴
      <el-switch v-model="accordion" inline-prompt @change="handleAccordion" />

      <el-collapse v-model="activeName" :accordion="accordion">
        <el-collapse-item name="1" title="Consistency">
          <div>
            Consistent with real life: in line with the process and logic of
            real life, and comply with languages and habits that the users are
            used to;
          </div>
          <div>
            Consistent within interface: all elements should be consistent, such
            as: design style, icons and texts, position of elements, etc.
          </div>
        </el-collapse-item>
        <el-collapse-item name="2" title="Feedback">
          <div>
            Operation feedback: enable the users to clearly perceive their
            operations by style updates and interactive effects;
          </div>
          <div>
            Visual feedback: reflect current state by updating or rearranging
            elements of the page.
          </div>
        </el-collapse-item>
        <el-collapse-item name="3" title="Efficiency">
          <div>
            Simplify the process: keep operating process simple and intuitive;
          </div>
          <div>
            Definite and clear: enunciate your intentions clearly so that the
            users can quickly understand and make decisions;
          </div>
          <div>
            Easy to identify: the interface should be straightforward, which
            helps the users to identify and frees them from memorizing and
            recalling.
          </div>
        </el-collapse-item>
        <el-collapse-item name="4" title="Controllability">
          <div>
            Decision making: giving advices about operations is acceptable, but
            do not make decisions for the users;
          </div>
          <div>
            Controlled consequences: users should be granted the freedom to
            operate, including canceling, aborting or terminating current
            operation.
          </div>
        </el-collapse-item>
      </el-collapse>
    </vab-card>
  </div>
</template>

<script>
  export default defineComponent({
    name: 'Description',
    setup() {
      const state = reactive({
        size: 'default',
        accordion: false,
        activeName: ['1', '2', '3', '4'],
      })

      const handleAccordion = (val) => {
        if (val) state.activeName = '1'
        else state.activeName = ['1', '2', '3', '4']
      }

      return {
        ...toRefs(state),
        handleAccordion,
      }
    },
  })
</script>

<style lang="scss" scoped>
  .description-container {
    padding: 0 !important;
    background: $base-color-background !important;

    :deep() {
      .el-descriptions {
        padding-top: $base-padding !important;
      }

      .el-collapse {
        margin-top: $base-margin !important;
      }
    }
  }
</style>
