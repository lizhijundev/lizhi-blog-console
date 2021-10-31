<template>
  <div class="delete-column-container">
    <el-alert :closable="closable" :title="title" />
  </div>
</template>

<script>
  export default {
    name: 'DeleteColumn',
    data() {
      return {
        closable: false,
        title:
          '当前页面示例仅在分栏布局中只有一个children时在路由中配置noColumn时生效，用于隐藏二级菜单',
      }
    },
  }
</script>
